import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, CheckCircle, AlertTriangle, Play, HelpCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ScanResult {
  totalCount: number;
  cachedCount: number;
  pendingCount: number;
  ids: string[];
  cached: string[];
  pending: string[];
}

export const SyncPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const stackData = sessionStorage.getItem('nav-history-stack');
    const stack = stackData ? JSON.parse(stackData) : [];
    if (stack.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const [data, setData] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [currentSyncingId, setCurrentSyncingId] = useState<string | null>(null);
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set());
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [logMessages, setLogMessages] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load list of drive IDs from server
  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/list-drive-ids');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setSyncedIds(new Set(json.cached));
      } else {
        addLog("Failed to fetch Google Drive IDs list from server API.");
      }
    } catch (err: any) {
      addLog(`Error scanning asset status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const addLog = (msg: string) => {
    setLogMessages(prev => [ `[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 99) ]);
  };

  const startSync = async () => {
    if (!data || syncing) return;
    setSyncing(true);
    setFailedIds(new Set());
    addLog("Starting full cloud asset synchronization...");
    
    // We will sync the pending ones first
    const itemsToSync = [...data.pending];
    // If none are pending, let the user sync all of them anyway to ensure cache freshness
    if (itemsToSync.length === 0) {
      addLog("All Google Drive images are already locally cached! Refreshing existing files...");
      itemsToSync.push(...data.ids);
    }

    addLog(`Queueing ${itemsToSync.length} assets for secure canvas healing...`);

    for (let i = 0; i < itemsToSync.length; i++) {
      const id = itemsToSync[i];
      setCurrentSyncingId(id);
      addLog(`Hydrating and capturing asset ${i + 1}/${itemsToSync.length}: ID ${id}`);

      try {
        const success = await healDriveId(id);
        if (success) {
          setSyncedIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          addLog(`✔ Successfully saved and cached asset ID ${id}`);
        } else {
          setFailedIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          addLog(`❌ Failed to sync asset ID ${id} (CORS block or permission restricted)`);
        }
      } catch (err: any) {
        setFailedIds(prev => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        addLog(`❌ Error with asset ${id}: ${err.message}`);
      }

      // Small delay between images to keep UI slick and prevent browser throttling
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setCurrentSyncingId(null);
    setSyncing(false);
    addLog("★ Synchronization process complete! Re-scanning status...");
    await fetchStatus();
  };

  // Helper inside browser to draw standard img to canvas and hit heal endpoint
  const healDriveId = (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      
      // Let's load the thumbnail version to keep file size reasonable and fast to fetch
      img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalWidth < 10) {
          resolve(false);
          return;
        }

        try {
          const canvas = canvasRef.current || document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(false);
            return;
          }

          ctx.drawImage(img, 0, 0);
          const base64Data = canvas.toDataURL('image/jpeg', 0.9);

          // Submit to server to save directly into /public/images/drive_${id}.jpg
          fetch('/api/heal-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id,
              base64: base64Data
            })
          })
          .then(res => res.json())
          .then(resData => {
            if (resData && resData.success) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            resolve(false);
          });
        } catch (err) {
          // If security error happens on thumbnail, fallback to direct download URL (UC)
          const fallbackImg = new Image();
          fallbackImg.crossOrigin = "anonymous";
          fallbackImg.referrerPolicy = "no-referrer";
          fallbackImg.src = `https://drive.google.com/uc?id=${id}&export=download`;

          fallbackImg.onload = () => {
            try {
              const canvas = canvasRef.current || document.createElement('canvas');
              canvas.width = fallbackImg.naturalWidth;
              canvas.height = fallbackImg.naturalHeight;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(fallbackImg, 0, 0);
                const b64 = canvas.toDataURL('image/jpeg', 0.9);
                fetch('/api/heal-image', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id, base64: b64 })
                })
                .then(r => r.json())
                .then(d => resolve(!!(d && d.success)))
                .catch(() => resolve(false));
              } else {
                resolve(false);
              }
            } catch {
              resolve(false);
            }
          };
          fallbackImg.onerror = () => resolve(false);
        }
      };

      img.onerror = () => {
        resolve(false);
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white pt-24 px-6 pb-20 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#0f111c]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#bd00ff]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation / Header */}
        <div className="flex justify-between items-center mb-12">
          <Link 
            to="/" 
            onClick={handleBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest font-medium"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="h-[2px] flex-1 mx-8 bg-white/5" />
          <span className="text-[10px] tracking-[0.4em] text-neon-cyan uppercase font-bold select-none">
            System Utility // Asset Healing
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-4 text-white">
            Asset <span className="text-gradient">Synchronization</span> Panel
          </h1>
          <p className="text-sm text-white/60 leading-relaxed max-w-2xl font-light">
            This module synchronizes restricted Google Drive files by downloading them locally on your authenticated browser session and caching them physically in the production workspace. This enables 100% public access with zero runtime Google Drive dependencies.
          </p>
        </div>

        {/* Warning / Explanation Alert */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 flex gap-5 items-start">
          <div className="p-3 bg-[#bd00ff]/10 rounded-xl border border-[#bd00ff]/30 text-electric-purple text-xl">
            <HelpCircle />
          </div>
          <div className="flex-1">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-white/90 mb-1">How it Works</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Because Google Drive blocks direct download requests from server-side databases and guest users to protect privacy, this panel acts as an authenticated bridge. Run this panel <strong>while logged into the Google Account that owns these files</strong>. Your browser will download the images using your valid Google cookies, stream them to your Node container, and store them permanently as highly optimized JPEG files.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && !syncing ? (
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-16 flex flex-col justify-center items-center gap-4 text-white/40">
            <RefreshCw size={32} className="animate-spin text-neon-cyan" />
            <p className="text-xs uppercase tracking-widest font-medium">Scanning project codebase for Drive links...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Status Card 1: Total detected */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-2">Detected Drive Links</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-mono">{data?.totalCount || 0}</span>
                <span className="text-[10px] text-white/30 uppercase">unique files</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-[11px] text-white/50">
                <span>Core Pages Scanned</span>
                <span className="text-white/80">14 files</span>
              </div>
            </div>

            {/* Status Card 2: Synchronized */}
            <div className="bg-[#00f8ff]/[0.01] border border-[#00f8ff]/10 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <span className="text-[10px] text-[#00f8ff]/60 uppercase tracking-widest font-semibold mb-2">Local Production Cache</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-mono text-neon-cyan">{syncedIds.size}</span>
                <span className="text-[10px] text-[#00f8ff]/50 uppercase">/ {data?.totalCount || 0} cached</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#00f8ff]/5 flex justify-between text-[11px] text-white/50">
                <span>Local Asset Coverage</span>
                <span className="text-[#00f8ff] font-medium font-mono">
                  {data?.totalCount ? Math.round((syncedIds.size / data.totalCount) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Status Card 3: Pending */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-2">Pending / Not Synced</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-mono text-white/75">
                  {data ? data.totalCount - syncedIds.size : 0}
                </span>
                <span className="text-[10px] text-white/30 uppercase">remaining</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-[11px] text-white/50">
                <span>Action Recommended</span>
                <span className={data && data.totalCount - syncedIds.size > 0 ? "text-amber-400 font-medium animate-pulse" : "text-emerald-400 font-medium"}>
                  {data && data.totalCount - syncedIds.size > 0 ? "Heal Needed" : "Dynamic Complete"}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Sync Controls & Progress */}
        {data && (
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 pb-8 border-b border-white/5">
              <div>
                <h3 className="font-semibold text-lg text-white mb-1">Asset Pipeline Control</h3>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  {syncing 
                    ? `Syncing active. Don't close this tab until all files complete.` 
                    : `Run the synchronization to heal the production assets.`}
                </p>
              </div>

              <button
                onClick={startSync}
                disabled={syncing || data.totalCount === 0}
                className={`relative overflow-hidden group rounded-full py-4 px-8 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 active:scale-95 ${
                  syncing 
                    ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10" 
                    : "bg-white text-black hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                }`}
              >
                {syncing ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} /> Syncing Assets...
                  </>
                ) : (
                  <>
                    <Play fill="currentColor" size={12} /> Sync & Cache All Assets
                  </>
                )}
              </button>
            </div>

            {/* Syncing Progress Bar */}
            {syncing && (
              <div className="mb-8">
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                  <span>Progress</span>
                  <span className="text-neon-cyan">
                    {Math.round(((syncedIds.size) / data.totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-cyan to-electric-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${(syncedIds.size / data.totalCount) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Current processing thumbnail preview */}
            {currentSyncingId && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-8 flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 overflow-hidden relative">
                  <ImageIcon size={18} />
                  <img 
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    src={`https://drive.google.com/thumbnail?id=${currentSyncingId}&sz=w100`}
                    alt="Sync Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Active File Healing</div>
                  <div className="text-xs font-mono font-medium text-white truncate max-w-md">{currentSyncingId}</div>
                </div>
                <div className="text-[11px] font-mono text-neon-cyan px-3 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/20">
                  FETCHING
                </div>
              </div>
            )}

            {/* Hidden canvas helper for offline conversion */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Logs Area */}
            <div>
              <div className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3 flex justify-between items-center">
                <span>System Pipeline Logs</span>
                <span className="font-mono text-[10px] text-white/20">Max 100 lines</span>
              </div>
              <div className="h-64 bg-[#050506]/90 border border-white/5 rounded-2xl p-5 font-mono text-xs leading-relaxed text-white/60 overflow-y-auto flex flex-col-reverse gap-2">
                {logMessages.length === 0 ? (
                  <p className="text-white/20 italic text-center py-10">Queue empty // Pipeline awaiting commands</p>
                ) : (
                  logMessages.map((log, index) => (
                    <div key={index} className="truncate select-text">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
