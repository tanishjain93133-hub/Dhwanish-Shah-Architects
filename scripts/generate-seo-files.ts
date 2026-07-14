import * as fs from 'fs';
import * as path from 'path';

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
  return ['minimal-luxury-philosophy'];
}

function generateSitemap() {
  const domain = "https://dsa-architects-and-interiors.vercel.app";
  const staticPages = [
    "",
    "/about",
    "/portfolio",
    "/projects",
    "/testimonials",
    "/blog",
    "/lights",
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

  const distDir = path.join(process.cwd(), "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  console.log("Successfully generated dist/sitemap.xml");

  // Also write to public folder so local dev server / vite can serve it if needed
  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
    console.log("Successfully generated public/sitemap.xml");
  }
}

function generateRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://dsa-architects-and-interiors.vercel.app/sitemap.xml`;

  const distDir = path.join(process.cwd(), "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");
  console.log("Successfully generated dist/robots.txt");

  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
    console.log("Successfully generated public/robots.txt");
  }
}

generateSitemap();
generateRobots();
