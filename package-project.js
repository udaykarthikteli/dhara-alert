import { execSync } from 'child_process';
import fs from 'fs';

console.log("Creating dhara-alert.zip...");

try {
  // Use PowerShell Compress-Archive for reliable Windows zip generation
  const psCommand = `powershell -Command "Compress-Archive -Path 'package.json', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'index.html', 'vercel.json', 'public', 'src', 'README.md' -DestinationPath 'dhara-alert.zip' -Force; Copy-Item 'dhara-alert.zip' 'landslide-guard-ner.zip' -Force"`;
  execSync(psCommand, { stdio: 'inherit' });
  console.log("Successfully created dhara-alert.zip archive!");
} catch (err) {
  console.error("Failed to create zip:", err);
}
