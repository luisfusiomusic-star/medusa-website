import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages — emits a self-contained `out/` folder.
  output: "export",
  // Required for `output: export` (the site uses plain <img>, so no loss here).
  images: { unoptimized: true },
  // Pin the workspace root — a stray lockfile in the home directory would
  // otherwise make Next.js infer the wrong root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
