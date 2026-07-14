import express from "express";
import path from "path";
import https from "https";
import http from "http";
import fs from "fs";

interface HttpsGetResponse {
  ok: boolean;
  status: number;
  headers: Record<string, string>;
  buffer: Buffer;
}

function httpsGet(url: string, timeoutMs = 2000): Promise<HttpsGetResponse> {
  return new Promise((resolve, reject) => {
    let resolved = false;
    const client = url.startsWith("https") ? https : http;
    
    const req = client.get(url, {
      timeout: timeoutMs,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/437.36",
      }
    }, (res) => {
      if (resolved) return;
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolved = true;
        req.destroy();
        httpsGet(res.headers.location, timeoutMs).then(resolve).catch(reject);
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
        const headers: Record<string, string> = {};
        for (const [key, val] of Object.entries(res.headers)) {
          if (val !== undefined) {
            headers[key.toLowerCase()] = Array.isArray(val) ? val.join(", ") : val;
          }
        }
        resolve({
          ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
          status: res.statusCode || 0,
          headers,
          buffer: Buffer.concat(chunks)
        });
      });
    });
    
    req.on("timeout", () => {
      if (resolved) return;
      resolved = true;
      req.destroy();
      reject(new Error("Request timeout"));
    });
    
    req.on("error", (err) => {
      if (resolved) return;
      resolved = true;
      reject(err);
    });
  });
}

const BEAUTIFUL_ARCHITECTURAL_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200", // Modern Residence Exterior
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200", // Luxury Modern House Exterior
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", // Elegant Interior Living Room
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200", // Minimalist Modern Living Room
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200", // High-End Luxurious Sofa/Interior
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", // Minimalist Concrete House/Detail
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200", // Premium Concrete & Timber Office
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200", // Glass & Steel Building Facade
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200", // Nordic Style Workspace
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200", // Luxury Bedroom
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200", // Cozy Minimalist Bedroom
  "https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1200", // Elegant Dining Room
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200", // Minimalist Modern Kitchen
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200", // Modern Staircase
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200", // Architectural Concrete Curve
  "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200"  // Warm Wooden Interior detail
];

function getDeterministicUnsplashUrl(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BEAUTIFUL_ARCHITECTURAL_IMAGES.length;
  return BEAUTIFUL_ARCHITECTURAL_IMAGES[index];
}

function getLocalValidImagePath(fileId: string): string | null {
  const possibleNames = [
    `drive_${fileId}`,
    `drive_${fileId}.jpg`,
    `drive_${fileId}.png`,
    `${fileId}`,
    `${fileId}.jpg`,
    `${fileId}.png`
  ];
  
  const possibleDirs = [
    path.join(process.cwd(), "public", "images"),
    path.join(process.cwd(), "dist", "images")
  ];

  for (const dir of possibleDirs) {
    for (const name of possibleNames) {
      const fullPath = path.join(dir, name);
      if (fs.existsSync(fullPath)) {
        try {
          const fd = fs.openSync(fullPath, "r");
          const buffer = Buffer.alloc(100);
          fs.readSync(fd, buffer, 0, 100, 0);
          fs.closeSync(fd);
          const snippet = buffer.toString("utf8");
          if (!snippet.includes("<html") && !snippet.includes("<!DOCTYPE") && !snippet.includes("<HTML")) {
            return fullPath;
          }
        } catch (err) {
          // If read fails, continue
        }
      }
    }
  }
  return null;
}

async function validateAndProxyAndSaveImage(id: string, width: string, res: express.Response) {
  // Try to load local valid image first
  const localPath = getLocalValidImagePath(id);
  if (localPath) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.sendFile(localPath);
  }

  // Target Google Drive URLs to fetch from in order (optimized for maximum proxy speed)
  const targetUrls = [
    `https://lh3.googleusercontent.com/d/${id}=w${width}`,
    `https://lh3.googleusercontent.com/u/0/d/${id}=w${width}`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`,
    `https://drive.google.com/uc?id=${id}&export=download`,
    `https://docs.google.com/uc?id=${id}&export=download`
  ];

  let fetchResponse: HttpsGetResponse | null = null;
  let lastError = "";

  for (const url of targetUrls) {
    try {
      const resp = await httpsGet(url, 8000);
      if (resp.ok && resp.buffer.length > 5000) { // minimum image size limit
        const snippet = resp.buffer.toString("utf8", 0, 150);
        const isHtml = snippet.includes("<html") || snippet.includes("<html") || snippet.includes("<!doctype html") || snippet.includes("<HTML") || snippet.includes("<!DOCTYPE");
        if (!isHtml) {
          fetchResponse = resp;
          break;
        } else {
          lastError = `Response from ${url} was HTML/Login page redirect`;
        }
      } else {
        lastError = `Status ${resp.status}, size ${resp.buffer.length} from ${url}`;
      }
    } catch (err: any) {
      lastError = `${err.message || "Unknown error"} on ${url}`;
    }
  }

  if (fetchResponse) {
    const contentType = fetchResponse.headers["content-type"] || "image/jpeg";
    const buffer = fetchResponse.buffer;

    // Save fetched image to disk to heal the broken local files!
    const ext = contentType.includes("png") ? ".png" : ".jpg";
    const names = [
      `drive_${id}`,
      `drive_${id}${ext}`,
      `drive_${id}.jpg`,
      `drive_${id}.png`
    ];
    const dirs = [
      path.join(process.cwd(), "public", "images"),
      path.join(process.cwd(), "dist", "images")
    ];
    
    for (const dir of dirs) {
      if (fs.existsSync(dir)) {
        for (const name of names) {
          try {
            fs.writeFileSync(path.join(dir, name), buffer);
          } catch (e) {
            // Silence write error (e.g. disk read-only or intermediate path issues)
          }
        }
      }
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.send(buffer);
  }

  // Return deterministic Unsplash fallback redirect to make sure guest/incognito users never see broken images!
  console.warn(`[Proxy Fallback] Failed proxy load for ID: ${id}. Reason: ${lastError}. Redirecting to Unsplash fallback.`);
  return res.redirect(getDeterministicUnsplashUrl(id));
}

function scanSrcForDriveIds(): string[] {
  const ids = new Set<string>();
  const scanDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".git" && entry.name !== "dist") {
          scanDir(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if ([".tsx", ".ts", ".json", ".js", ".jsx"].includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, "utf8");
            
            // Look for lh3.googleusercontent.com/d/ID
            const lh3Regex = /lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/g;
            let match;
            while ((match = lh3Regex.exec(content)) !== null) {
              if (match[1] && match[1].length > 20) {
                ids.add(match[1]);
              }
            }
            
            // Look for drive.google.com/file/d/ID
            const driveFileRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g;
            while ((match = driveFileRegex.exec(content)) !== null) {
              if (match[1] && match[1].length > 20) {
                ids.add(match[1]);
              }
            }
          } catch (e) {
            // Ignore single file read errors
          }
        }
      }
    }
  };

  scanDir(path.join(process.cwd(), "src"));
  return Array.from(ids);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route: Scan and return all unique Google Drive IDs used in components
  app.get("/api/list-drive-ids", (req, res) => {
    try {
      const ids = scanSrcForDriveIds();
      
      // Determine which are cached
      const cachedList: string[] = [];
      const pendingList: string[] = [];
      
      for (const id of ids) {
        if (getLocalValidImagePath(id)) {
          cachedList.push(id);
        } else {
          pendingList.push(id);
        }
      }
      
      return res.json({
        totalCount: ids.length,
        cachedCount: cachedList.length,
        pendingCount: pendingList.length,
        ids,
        cached: cachedList,
        pending: pendingList
      });
    } catch (err: any) {
      console.error("List Drive IDs Error:", err);
      return res.status(500).send(err.message || "Failed to scan files");
    }
  });

  // API Route: Local file-path interceptor for /images/drive_... filenames
  app.get("/images/drive_:fileId", async (req, res, next) => {
    try {
      const fileIdWithExt = req.params.fileId;
      if (!fileIdWithExt) return next();
      
      const id = fileIdWithExt.split(".")[0];
      if (!id) return next();

      await validateAndProxyAndSaveImage(id, "1000", res);
    } catch (err) {
      console.error(`Local Image Proxy Route Error [file=${req.params.fileId}]:`, err);
      const id = req.params.fileId ? req.params.fileId.split(".")[0] : "default";
      return res.redirect(getDeterministicUnsplashUrl(id));
    }
  });

  // API Route: Image Proxy for Google Drive to bypass Third-Party Cookie blocking
  app.get("/api/image-proxy", async (req, res) => {
    const { id, w } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).send("Missing image id parameter");
    }

    try {
      const width = w && typeof w === "string" ? w : "1000";
      await validateAndProxyAndSaveImage(id, width, res);
    } catch (err: any) {
      console.error(`GP Proxy Error [id=${id}]:`, err);
      return res.redirect(getDeterministicUnsplashUrl(id));
    }
  });

  // API Route: Client-side self-healing endpoint to cache authenticated images
  app.post("/api/heal-image", express.json({ limit: "15mb" }), async (req: express.Request, res: express.Response) => {
    const { id, base64 } = req.body;
    if (!id || typeof id !== "string" || !base64 || typeof base64 !== "string") {
      return res.status(400).send("Missing parameters");
    }

    try {
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      if (buffer.length < 5000) {
        return res.status(400).send("Image too small or invalid");
      }

      // Check if it's HTML
      const snippet = buffer.toString("utf8", 0, 150);
      const isHtml = snippet.includes("<html") || snippet.includes("<!doctype") || snippet.includes("<HTML") || snippet.includes("<!DOCTYPE");
      if (isHtml) {
        return res.status(400).send("Payload is HTML, not a valid image");
      }

      const dirs = [
        path.join(process.cwd(), "public", "images"),
        path.join(process.cwd(), "dist", "images")
      ];
      
      const ext = base64.includes("png") ? ".png" : ".jpg";
      const names = [
        `drive_${id}`,
        `drive_${id}${ext}`,
        `drive_${id}.jpg`,
        `drive_${id}.png`
      ];

      for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        for (const name of names) {
          try {
            fs.writeFileSync(path.join(dir, name), buffer);
          } catch (e) {
            // Squelch single directory file writes (like dist not built yet)
          }
        }
      }

      console.log(`[Self-Healing] Successfully cached and healed image ID: ${id} (${buffer.length} bytes)`);
      return res.json({ success: true, size: buffer.length });
    } catch (err: any) {
      console.error(`[Self-Healing] Failed to save healed image ID: ${id}:`, err);
      return res.status(500).send(err.message || "Internal server error");
    }
  });

  // Helper to extract dynamic project IDs
  function getDynamicProjectIds(): string[] {
    try {
      const filePath = path.join(process.cwd(), "src", "pages", "ProjectDetailPage.tsx");
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const idRegex = /id:\s*['"]([a-zA-Z0-9_-]+)['"]/g;
        const ids = new Set<string>();
        let match;
        while ((match = idRegex.exec(content)) !== null) {
          if (match[1]) {
            ids.add(match[1]);
          }
        }
        return Array.from(ids);
      }
    } catch (err) {
      console.error("Error reading ProjectDetailPage.tsx:", err);
    }
    return [
      'res-dsa-01', 'res-dsa-02', 'res-dsa-10', 'comm-dsa-01',
      'comm-dsa-04', 'comm-dsa-05', 'comm-dsa-06', 'res-dsa-03',
      'res-dsa-04', 'res-dsa-05', 'res-dsa-06', 'res-dsa-07',
      'res-dsa-08', 'comm-dsa-02', 'res-dsa-09', 'comm-dsa-07'
    ];
  }

  // Helper to extract dynamic blog IDs
  function getDynamicBlogIds(): string[] {
    try {
      const blogDir = path.join(process.cwd(), "src", "pages", "blog");
      if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir);
        return files
          .filter(f => f.endsWith(".tsx") || f.endsWith(".ts"))
          .map(f => f.replace(/\.(tsx|ts)$/, "").toLowerCase());
      }
    } catch (err) {
      // ignore
    }
    // Return the hardcoded ones if directory doesn't exist yet but has matching routes
    return ['minimal-luxury-philosophy'];
  }

  // Helper to get detailed metadata for a single project
  function getProjectMetadata(id: string) {
    try {
      const filePath = path.join(process.cwd(), "src", "pages", "ProjectDetailPage.tsx");
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const idEscaped = id.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const blockRegex = new RegExp(`id:\\s*['"]${idEscaped}['"]\\s*,[^}]*title:\\s*['"]([^'"]+)['"]\\s*,[^}]*subtitle:\\s*['"]([^'"]+)['"]\\s*,[^}]*description:\\s*['"]([^'"]+)['"]`, 's');
        const match = blockRegex.exec(content);
        if (match) {
          return {
            title: `${match[1]} | Luxury Project by DSA`,
            description: match[3] || `${match[1]} - A premium ${match[2]} architectural masterpiece designed by Dhwanish Shah Architects (DSA).`
          };
        }
      }
    } catch (err) {
      console.error("Error reading project details for SEO:", err);
    }
    
    // Fallbacks
    const fallbackProjects: Record<string, { title: string, description: string }> = {
      'res-dsa-01': { title: "Subtle Sanctuary", description: "This home interior combines simplicity, functionality, and modern design with soft color tones, spacious layouts, and refined finishes." },
      'res-dsa-02': { title: "Craft House", description: "A beautifully crafted residence featuring traditional design techniques with modern sensibilities, exquisite details, and premium materials." },
      'res-dsa-10': { title: "The Shaded Abode", description: "An architecturally stunning residential home designed with dynamic shaded screens, comfortable open courtyards, and clean modern aesthetics." },
      'comm-dsa-01': { title: "JD Office", description: "A high-end modern corporate office space designed with elegant minimalist work zones, executive lounges, and bespoke detailing." }
    };

    const proj = fallbackProjects[id];
    if (proj) {
      return {
        title: `${proj.title} | Luxury Project by Dhwanish Shah Architects`,
        description: proj.description
      };
    }

    const formattedId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      title: `${formattedId} | Luxury Architectural Design | Dhwanish Shah Architects`,
      description: `Discover ${formattedId}, a luxury custom architectural and interior design project designed by Dhwanish Shah Architects.`
    };
  }

  // Dynamic SEO HTML Hydration Injector
  function injectSeoTags(html: string, reqPath: string): string {
    const domain = "https://dhwanishshaharchitects.com";
    const canonicalUrl = `${domain}${reqPath === "/" ? "" : reqPath}`;
    
    let title = "DSA | Dhwanish Shah Architects";
    let description = "Dhwanish Shah Architects (DSA) is a premium architecture and interior design firm in Ahmedabad specializing in luxury homes, villas, commercial spaces, interior design, renovations, and 3D visualization across India.";
    
    if (reqPath === "/" || reqPath === "") {
      title = "DSA | Dhwanish Shah Architects";
      description = "Dhwanish Shah Architects (DSA) is a premium architecture and interior design firm in Ahmedabad specializing in luxury homes, villas, commercial spaces, interior design, renovations, and 3D visualization across India.";
    } else if (reqPath === "/about") {
      title = "About Dhwanish Shah Architects | Luxury Architecture & Interior Designers";
      description = "Learn about Dhwanish Shah Architects, our design philosophy, and our legacy of creating luxurious residential and commercial masterpieces across India.";
    } else if (reqPath === "/portfolio") {
      title = "Our Portfolio | Luxury Architecture & Design Projects by Dhwanish Shah Architects";
      description = "Explore our architectural and interior design portfolio, featuring high-end residential estates, modern commercial offices, and luxury retail projects by Dhwanish Shah Architects.";
    } else if (reqPath === "/testimonials") {
      title = "Client Reviews & Testimonials | Dhwanish Shah Architects";
      description = "Read what our clients say about their experience collaborating with Dhwanish Shah Architects on their luxury homes, offices, and retail spaces.";
    } else if (reqPath === "/blog") {
      title = "Architecture Blog | DSA | Dhwanish Shah Architects";
      description = "Expert advice, design inspiration, construction tips, and modern architecture ideas to help you create timeless homes and inspiring spaces.";
    } else if (reqPath === "/contact") {
      title = "Contact Dhwanish Shah Architects | Inquire About Luxury Design Services";
      description = "Get in touch with Dhwanish Shah Architects for your luxury residential, commercial, or retail architecture and interior design requirements.";
    } else if (reqPath.startsWith("/project/")) {
      const id = reqPath.split("/")[2];
      if (id) {
        const meta = getProjectMetadata(id);
        title = meta.title;
        description = meta.description;
      }
    } else if (reqPath === "/anchor-house") {
      title = "Anchor House | Architectural Design Review & Gallery | Dhwanish Shah Architects";
      description = "Explore the complete architectural design, spatial layout, and high-quality photography gallery of the Anchor House by Dhwanish Shah Architects.";
    } else if (reqPath === "/aa-wealth") {
      title = "AA Wealth | Commercial Office Design & Review | Dhwanish Shah Architects";
      description = "An in-depth look at AA Wealth's office interior planning, workspace ergonomics, and luxury detailing designed by Dhwanish Shah Architects.";
    } else if (reqPath === "/cp-house-review") {
      title = "CP House | Residence Review & Design Gallery | Dhwanish Shah Architects";
      description = "Review and photograph gallery showcasing the premium material selection and custom craftsmanship of CP House.";
    } else if (reqPath === "/aa-wealth-review") {
      title = "AA Wealth | Corporate Workspace Review & Gallery | Dhwanish Shah Architects";
      description = "Reviewing the corporate workspace planning, luxurious executive cabins, and breakout zones of AA Wealth.";
    } else if (reqPath === "/parth-shah-review") {
      title = "Parth Shah Residence | Interior Design Review | Dhwanish Shah Architects";
      description = "A detailed interior walkthrough and design critique of the custom Parth Shah luxury apartment residence.";
    } else if (reqPath === "/js-house-review") {
      title = "JS House | Modern Luxury Villa Review & Gallery | Dhwanish Shah Architects";
      description = "Explore the review and stunning photography of JS House, an elegant modern villa blending interior and exterior spaces.";
    } else if (reqPath === "/shela-house-review") {
      title = "Shela House | Elegant Residential Design Review | Dhwanish Shah Architects";
      description = "Review and design details of the Shela House, a premium residence in Ahmedabad designed with bespoke furniture and timeless style.";
    } else if (reqPath === "/jd-office-review") {
      title = "JD Office | Contemporary Workspace Design Review | Dhwanish Shah Architects";
      description = "Review of the JD Office interior planning, acoustic detailing, and sophisticated custom lighting schemes by Dhwanish Shah Architects.";
    } else if (reqPath.startsWith("/blog/")) {
      const id = reqPath.split("/")[2];
      if (id) {
        const formattedId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        title = `${formattedId} | Design Journal | Dhwanish Shah Architects`;
        description = `Insights, architectural philosophy, and detailed discussion about ${formattedId} by Dhwanish Shah Architects.`;
      }
    }

    // JSON-LD Structured Data
    const jsonLdOrg = {
      "@context": "https://schema.org",
      "@type": "Architect",
      "name": "Dhwanish Shah Architects",
      "alternateName": "DSA",
      "url": "https://dhwanishshaharchitects.com",
      "logo": `${domain}/logo.png`,
      "image": `${domain}/logo.png`
    };

    const jsonLdLocalBusiness = {
      "@context": "https://schema.org",
      "@type": "ArchitecturalOffice",
      "name": "Dhwanish Shah Architects",
      "image": `${domain}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "601, Anikedhya Capitol 2, Paldi",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380007",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.0120",
        "longitude": "72.5614"
      },
      "url": domain,
      "telephone": "+919879819691",
      "priceRange": "$$$$"
    };

    const jsonLdWebsite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DSA",
      "alternateName": "Dhwanish Shah Architects",
      "url": "https://dhwanishshaharchitects.com"
    };

    const breadcrumbItems = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": domain }
    ];
    if (reqPath !== "/" && reqPath !== "") {
      const parts = reqPath.split("/").filter(Boolean);
      let currentLink = domain;
      parts.forEach((part, index) => {
        currentLink += `/${part}`;
        const name = part.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": currentLink
        });
      });
    }
    const jsonLdBreadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };

    const seoTags = `
    <!-- Standard Meta Tags -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${domain}/logo.png" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${domain}/logo.png" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">${JSON.stringify(jsonLdOrg)}</script>
    <script type="application/ld+json">${JSON.stringify(jsonLdLocalBusiness)}</script>
    <script type="application/ld+json">${JSON.stringify(jsonLdWebsite)}</script>
    <script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumbs)}</script>
    `;

    // Remove existing title tag
    let cleanHtml = html.replace(/<title>.*?<\/title>/gi, "");
    
    // Inject into head
    if (cleanHtml.includes("</head>")) {
      return cleanHtml.replace("</head>", `${seoTags}\n  </head>`);
    }
    
    return cleanHtml;
  }

  // 1. Dynamic Sitemap.xml Route
  app.get("/sitemap.xml", (req, res) => {
    const domain = "https://dhwanishshaharchitects.com";
    const staticPages = [
      "",
      "/about",
      "/portfolio",
      "/testimonials",
      "/blog",
      "/contact",
      "/anchor-house",
      "/aa-wealth",
      "/cp-house-review",
      "/aa-wealth-review",
      "/parth-shah-review",
      "/js-house-review",
      "/shela-house-review",
      "/jd-office-review"
    ];

    const projectIds = getDynamicProjectIds();
    const blogIds = getDynamicBlogIds();

    const allPages = [
      ...staticPages,
      ...projectIds.map(id => `/project/${id}`),
      ...blogIds.map(id => `/blog/${id}`)
    ];

    const sitemapEntries = allPages.map(page => {
      const url = `${domain}${page}`;
      const priority = page === "" ? "1.0" : (page.includes("/project/") || page.includes("/blog/") ? "0.8" : "0.7");
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.status(200).send(sitemapXml);
  });

  // 2. Robots.txt Route
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://dhwanishshaharchitects.com/sitemap.xml`;

    res.header("Content-Type", "text/plain");
    return res.status(200).send(robotsTxt);
  });

  // Client SPA routing & dynamic metadata pre-rendering
  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
  }

  // Handle all other navigation paths (inject SEO tags)
  app.get("*", async (req, res, next) => {
    if (req.path.includes(".") || req.path.startsWith("/api") || req.path.startsWith("/images")) {
      return next();
    }
    
    try {
      let htmlPath = "";
      if (process.env.NODE_ENV !== "production") {
        htmlPath = path.join(process.cwd(), "index.html");
      } else {
        htmlPath = path.join(process.cwd(), "dist", "index.html");
      }

      if (!fs.existsSync(htmlPath)) {
        return next();
      }

      let html = fs.readFileSync(htmlPath, "utf8");
      
      if (process.env.NODE_ENV !== "production" && vite) {
        html = await vite.transformIndexHtml(req.url, html);
      }

      const injectedHtml = injectSeoTags(html, req.path);
      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(injectedHtml);
    } catch (err) {
      console.error("SEO html injection error:", err);
      return next();
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
