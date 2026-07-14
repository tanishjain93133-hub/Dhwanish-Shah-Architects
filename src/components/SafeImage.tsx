import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'hero';
  objectFit?: 'cover' | 'contain';
}

const ARCHITECTURAL_FALLBACKS = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1000&auto=format&fit=crop'
];

export const extractDriveId = (url: string): string | null => {
  if (!url) return null;
  
  if (url.includes('lh3.googleusercontent.com/d/') || url.includes('lh3.googleusercontent.com/u/0/d/')) {
    const parts = url.split('/d/');
    if (parts.length > 1) {
      return parts[1].split('=')[0].split('?')[0];
    }
  }
  
  if (url.includes('drive.google.com/file/d/')) {
    const parts = url.split('/file/d/');
    if (parts.length > 1) {
      return parts[1].split('/')[0].split('?')[0];
    }
  }
  
  // Try parsing queries standardly
  if (url.includes('id=')) {
    try {
      const u = new URL(url);
      const id = u.searchParams.get('id');
      if (id) return id;
    } catch {
      const match = url.match(/[?&]id=([^&]+)/);
      if (match) return match[1];
    }
  }
  
  // General check for anything resembling secondary subdirectories or IDs in lh3 links
  if (url.includes('lh3.googleusercontent.com')) {
    const lastPart = url.split('/').pop();
    if (lastPart) {
      return lastPart.split('=')[0].split('?')[0];
    }
  }
  
  if (url.includes('drive_')) {
    const match = url.match(/drive_([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
  }
  
  return null;
};

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc = ARCHITECTURAL_FALLBACKS[0],
  className,
  size = 'medium',
  objectFit = 'cover',
  ...props 
}) => {
  const getInitialUrl = (originalUrl: string) => {
  if (!originalUrl) return fallbackSrc;

  // Local images (logo, favicon, etc.) should not be processed
  if (
    originalUrl.startsWith("/") ||
    originalUrl.startsWith("./") ||
    originalUrl.startsWith("../")
  ) {
    return originalUrl;
  }

  // Optimize Unsplash images on initialization
  if (originalUrl.includes('unsplash.com')) {
      try {
        const url = new URL(originalUrl);
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('q', '75');
        const width = size === 'small' ? '600' : size === 'medium' ? '1200' : '1600';
        url.searchParams.set('w', width);
        return url.toString();
      } catch (e) {
        return originalUrl;
      }
    }
    
    // Optimize Google Drive for previewing - prefer our server proxy to leverage local caches
    const driveId = extractDriveId(originalUrl);
    if (driveId) {
      if ((window as any).__cachedDriveIds?.has(driveId)) {
        return `/images/drive_${driveId}.jpg`;
      }
      const width = size === 'small' ? '400' : size === 'medium' ? '1000' : '1600';
      return `/api/image-proxy?id=${driveId}&w=${width}`;
    }
    
    return originalUrl;
  };

  const [currentSrc, setCurrentSrc] = useState(() => getInitialUrl(src || ''));
  const [lastSrc, setLastSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync state if src changes
  if (src !== lastSrc) {
    setLastSrc(src);
    setCurrentSrc(getInitialUrl(src || ''));
    setRetryCount(0);
    setIsLoaded(false);
  }

  const getStableDriveUrl = (originalUrl: string, attempt: number) => {
    const driveId = extractDriveId(originalUrl);
    if (!driveId) return fallbackSrc;

    const width = size === 'small' ? '400' : size === 'medium' ? '1000' : '1600';

    switch (attempt) {
      case 1:
        // Attempt 1: Try alternate direct Google thumbnail endpoint
        return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`;
      case 2:
        // Attempt 2: Try standard direct download endpoint
        return `https://drive.google.com/uc?id=${driveId}&export=download`;
      case 3:
        // Attempt 3: Try proxy server-side as ultimate backup
        return `/api/image-proxy?id=${driveId}&w=${width}`;
      default:
        return fallbackSrc;
    }
  };

  const handleError = (e?: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (retryCount < 3) {
      const nextAttempt = retryCount + 1;
      const nextSrc = getStableDriveUrl(src || '', nextAttempt);
      setRetryCount(nextAttempt);
      setCurrentSrc(nextSrc);
    } else {
      setCurrentSrc(fallbackSrc);
    }

    if (e && props.onError) props.onError(e);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalWidth < 10) {
      handleError(e);
      return;
    }
    setIsLoaded(true);

    // Self-healing check: if the image loaded successfully from Google CDN directly but not from our proxy,
    // let's capture it and upload it to our server to heal the public cache!
    const driveId = extractDriveId(src || '');
    if (driveId && currentSrc && !currentSrc.startsWith('/') && !currentSrc.includes('image-proxy') && !currentSrc.includes('unsplash.com')) {
      // It loaded from Google directly! Let's try to capture it. We run after a short delay to ensure rendering is complete.
      setTimeout(() => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            // Verify we got a valid base64 representation of a JPEG and not transparent spacer
            if (dataUrl && dataUrl.startsWith('data:image/jpeg;base64,') && dataUrl.length > 5000) {
              fetch('/api/heal-image', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: driveId,
                  base64: dataUrl
                })
              })
              .then(res => res.json())
              .then(data => {
                if (data && data.success) {
                  console.log(`[Self-Healing] Successfully cached and healed file ID: ${driveId}`);
                }
              })
              .catch(() => {
                // Ignore silent upload errors
              });
            }
          }
        } catch (err) {
          // Ignore CORS/tainting security errors gracefully
        }
      }, 500);
    }

    if (props.onLoad) props.onLoad(e);
  };

  // Immediate layout evaluation for cached images (safeguard for Safari page-load caching)
  useEffect(() => {
    const handleCachedUpdated = () => {
      const driveId = extractDriveId(src || '');
      if (driveId && (window as any).__cachedDriveIds?.has(driveId)) {
        setCurrentSrc(`/images/drive_${driveId}.jpg`);
      }
    };

    window.addEventListener('cached-drive-ids-updated', handleCachedUpdated);
    handleCachedUpdated();

    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth >= 10) {
      setIsLoaded(true);
    }

    return () => {
      window.removeEventListener('cached-drive-ids-updated', handleCachedUpdated);
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-white/5", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }} />
      )}
      <img
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        {...props}
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "transition-all duration-700 w-full h-full optimize-gpu",
          !isLoaded ? "opacity-0 scale-105 blur-lg" : "opacity-100 scale-100 blur-0",
          objectFit === "contain" ? "object-contain" : "object-cover"
        )}
      />
    </div>
  );
};
