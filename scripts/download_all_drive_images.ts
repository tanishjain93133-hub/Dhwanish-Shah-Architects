import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// Interface for fetch operation
interface FetchResult {
  ok: boolean;
  status: number;
  contentType: string;
  buffer: Buffer;
}

// Perform HTTPS GET following redirects
function fetchWithRedirect(url: string, timeoutMs = 15000): Promise<FetchResult> {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const client = url.startsWith("https") ? https : http;
    
    const req = client.get(url, {
      timeout: timeoutMs,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      }
    }, (res) => {
      if (resolved) return;
      
      // Handle redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolved = true;
        req.destroy();
        fetchWithRedirect(res.headers.location, timeoutMs).then(resolve).catch(reject);
        return;
      }
      
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => {
        if (resolved) return;
        chunks.push(chunk);
      });
      
      res.on("end", () => {
        if (resolved) return;
        resolved = true;
        const contentType = res.headers["content-type"] || "image/jpeg";
        resolve({
          ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
          status: res.statusCode || 0,
          contentType,
          buffer: Buffer.concat(chunks)
        });
      });
    });
    
    req.on("timeout", () => {
      if (resolved) return;
      resolved = true;
      req.destroy();
      reject(new Error("Timeout"));
    });
    
    req.on("error", (err) => {
      if (resolved) return;
      resolved = true;
      reject(err);
    });
  });
}

// Scans files for ID patterns
function scanAndGetDriveIds(): { id: string; originalUrl: string }[] {
  const filePairs: { id: string; originalUrl: string }[] = [];
  const urlsSeen = new Set<string>();
  const idsSeen = new Set<string>();

  const scanDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".git", "dist", "build"].includes(entry.name)) {
          scanDir(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if ([".tsx", ".ts", ".html", ".js", ".jsx", ".json"].includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, "utf8");
            
            // Matches lh3.googleusercontent.com/d/ID or .../u/0/d/ID
            const lh3Regex = /https?:\/\/lh3\.googleusercontent\.com\/(?:d|u\/0\/d)\/([a-zA-Z0-9_-]+)(?:=[a-zA-Z0-9_-]+)?/g;
            let match;
            while ((match = lh3Regex.exec(content)) !== null) {
              const url = match[0];
              const id = match[1];
              if (id && id.length > 20 && !urlsSeen.has(url)) {
                urlsSeen.add(url);
                filePairs.push({ id, originalUrl: url });
              }
            }

            // Matches drive.google.com/file/d/ID
            const driveFileRegex = /https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g;
            while ((match = driveFileRegex.exec(content)) !== null) {
              const url = match[0];
              const id = match[1];
              if (id && id.length > 20 && !urlsSeen.has(url)) {
                urlsSeen.add(url);
                filePairs.push({ id, originalUrl: url });
              }
            }
          } catch (e) {
            // Silence trace
          }
        }
      }
    }
  };

  scanDir(path.join(process.cwd(), "src"));
  scanDir(process.cwd()); // scan index.html
  return filePairs;
}

// Concurrency Pool Helper
async function asyncPool<T, R>(
  concurrency: number,
  items: T[],
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<any>[] = [];
  
  for (const item of items) {
    const p = fn(item).then((res) => {
      executing.splice(executing.indexOf(p), 1);
      return res;
    });
    results.push(p as any);
    executing.push(p);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

async function run() {
  console.log("=== SCANNING FOR GOOGLE DRIVE IMAGE LINKS ===");
  const driveLinks = scanAndGetDriveIds();
  console.log(`Found ${driveLinks.length} unique Google Drive image links.`);

  const imagesDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const savedFilesMap = new Map<string, string>(); // Maps ID -> saved filename

  // Helper function to download a single image ID
  const downloadImage = async (link: { id: string; originalUrl: string }): Promise<void> => {
    const { id, originalUrl } = link;
    
    // Check if we already have it locally
    let exists = false;
    let extension = ".jpg";
    
    if (fs.existsSync(path.join(imagesDir, `drive_${id}.jpg`))) {
      exists = true;
      extension = ".jpg";
    } else if (fs.existsSync(path.join(imagesDir, `drive_${id}.png`))) {
      exists = true;
      extension = ".png";
    } else if (fs.existsSync(path.join(imagesDir, `drive_${id}`))) {
      exists = true;
      extension = ".jpg";
    }

    if (exists) {
      savedFilesMap.set(id, `drive_${id}${extension}`);
      return;
    }

    const targets = [
      `https://lh3.googleusercontent.com/d/${id}=w1600`,
      `https://lh3.googleusercontent.com/u/0/d/${id}=w1600`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      `https://drive.google.com/uc?id=${id}&export=download`
    ];

    let downloadedBuffer: Buffer | null = null;
    let downloadedContentType = "image/jpeg";
    let lastErrorMsg = "";

    for (const targetUrl of targets) {
      try {
        const res = await fetchWithRedirect(targetUrl);
        if (res.ok && res.buffer.length > 5000) {
          const snippet = res.buffer.toString("utf8", 0, 150);
          const isHtml = snippet.includes("<html") || snippet.includes("<HTML") || snippet.includes("<!DOCTYPE html") || snippet.includes("<!doctype html");
          if (!isHtml) {
            downloadedBuffer = res.buffer;
            downloadedContentType = res.contentType;
            break;
          } else {
            lastErrorMsg = "Html redirected wrapper";
          }
        } else {
          lastErrorMsg = `HTTP ${res.status}, size ${res.buffer.length}`;
        }
      } catch (err: any) {
        lastErrorMsg = err.message || String(err);
      }
    }

    if (downloadedBuffer) {
      const ext = downloadedContentType.includes("png") ? ".png" : ".jpg";
      const filename = `drive_${id}${ext}`;
      fs.writeFileSync(path.join(imagesDir, filename), downloadedBuffer);
      savedFilesMap.set(id, filename);
      console.log(`[DOWNLOADED] ID ${id} -> ${filename} (${Math.round(downloadedBuffer.length / 1024)} KB)`);
    } else {
      console.error(`[FAILED] ID ${id}. Reason: ${lastErrorMsg}`);
      // Even if failed, assign default extension mapping to do replacements cleanly
      savedFilesMap.set(id, `drive_${id}.jpg`);
    }
  };

  console.log("\n=== STARTING PARALLEL CONCURRENT DOWNLOADS ===");
  // Fetch with concurrency pool of 20 simultaneous downloads for fast execution
  await asyncPool(20, driveLinks, downloadImage);

  console.log("\n=== SUBSTITUTING DRIVE LINKS WITH LOCAL PATHS IN SOURCE FILES ===");
  
  const replaceLinksInFiles = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (!["node_modules", ".git", "dist", "build"].includes(entry.name)) {
          replaceLinksInFiles(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if ([".tsx", ".ts", ".html", ".js", ".jsx", ".json"].includes(ext)) {
          try {
            let content = fs.readFileSync(fullPath, "utf8");
            let modified = false;

            for (const [id, filename] of savedFilesMap.entries()) {
              // Replace lh3 links
              const lh3Regex = new RegExp(`https?:\\/\\/lh3\\.googleusercontent\\.com\\/(?:d|u\\/0\\/d)\\/${id}(?:=[a-zA-Z0-9_-]+)?`, 'g');
              if (lh3Regex.test(content)) {
                content = content.replace(lh3Regex, `/images/${filename}`);
                modified = true;
              }

              // Replace drive file links
              const driveFileRegex = new RegExp(`https?:\\/\\/drive\\.google\\.com\\/file\\/d\\/${id}(?:\\/[^"']*)?`, 'g');
              if (driveFileRegex.test(content)) {
                content = content.replace(driveFileRegex, `/images/${filename}`);
                modified = true;
              }
            }

            if (modified) {
              fs.writeFileSync(fullPath, content, "utf8");
              console.log(`[UPDATED] ${path.relative(process.cwd(), fullPath)}`);
            }
          } catch (e: any) {
            console.error(`Error updating file ${fullPath}:`, e.message || e);
          }
        }
      }
    }
  };

  replaceLinksInFiles(path.join(process.cwd(), "src"));
  replaceLinksInFiles(process.cwd()); // index.html
  
  console.log("\n=== CONVERSION PROCESS COMPLETE! ===");
}

run().catch(err => {
  console.error("FATAL ERROR in download script:", err);
  process.exit(1);
});
