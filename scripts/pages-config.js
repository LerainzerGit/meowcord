#!/usr/bin/env bun

import fs from "fs";
import path from "path";

/**
 * GitHub Pages Configuration Helper
 * 
 * This script prepares the meowcord web client for GitHub Pages deployment.
 * It ensures proper configuration and asset handling for a static site deployment.
 */

const PAGES_OUTPUT_DIR = path.join(process.cwd(), "assets/public");
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/meowcord";

console.log("🐱 Configuring meowcord for GitHub Pages deployment...");
console.log(`📦 Output directory: ${PAGES_OUTPUT_DIR}`);
console.log(`🌐 Public path: ${PUBLIC_PATH}`);

// Ensure output directory exists
if (!fs.existsSync(PAGES_OUTPUT_DIR)) {
  console.log(`📁 Creating output directory...`);
  fs.mkdirSync(PAGES_OUTPUT_DIR, { recursive: true });
}

// Create .nojekyll to disable Jekyll processing
const nojekyllPath = path.join(PAGES_OUTPUT_DIR, ".nojekyll");
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, "");
  console.log("✓ Created .nojekyll file (Jekyll disabled)");
}

// Create a basic index.html if it doesn't exist
const indexPath = path.join(PAGES_OUTPUT_DIR, "index.html");
if (!fs.existsSync(indexPath)) {
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>meowcord</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            text-align: center;
            color: white;
            padding: 2rem;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .status {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 12px;
            margin: 2rem auto;
            max-width: 400px;
        }
        
        .status h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .info {
            text-align: left;
            font-size: 0.9rem;
            line-height: 1.8;
            font-family: "Courier New", monospace;
        }
        
        .info div {
            margin: 0.5rem 0;
        }
        
        .label {
            font-weight: bold;
            color: #a0c4ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐱 meowcord</h1>
        <p>Self-hosted Discord clone with feature parity and message encryption</p>
        
        <div class="status">
            <h2>Deployment Info</h2>
            <div class="info">
                <div><span class="label">Status:</span> ✓ Web client deployed</div>
                <div><span class="label">Build Date:</span> <time id="buildDate"></time></div>
                <div><span class="label">Version:</span> 0.1.0-alpha.1</div>
                <div><span class="label">Public Path:</span> ${PUBLIC_PATH}</div>
            </div>
        </div>
        
        <p style="font-size: 1rem; margin-top: 2rem;">
            For the full meowcord experience, deploy the backend server separately.
        </p>
    </div>
    
    <script>
        // Set build date
        document.getElementById('buildDate').textContent = new Date().toLocaleString();
    </script>
</body>
</html>`;

  fs.writeFileSync(indexPath, indexHtml);
  console.log("✓ Created index.html");
}

console.log("\n✅ GitHub Pages configuration complete!");
console.log("🚀 Ready for deployment!");
