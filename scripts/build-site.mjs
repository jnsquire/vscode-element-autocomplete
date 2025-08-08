#!/usr/bin/env node
import { mkdirSync, rmSync, cpSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');
const siteDir = resolve(root, 'site');

if (existsSync(siteDir)) {
  rmSync(siteDir, { recursive: true, force: true });
}
mkdirSync(siteDir, { recursive: true });

// Copy index.html and dist assets
cpSync(resolve(root, 'index.html'), resolve(siteDir, 'index.html'));
cpSync(resolve(root, 'dist'), resolve(siteDir, 'dist'), { recursive: true });

// Ensure GitHub Pages doesn't run Jekyll (which can skip some files)
writeFileSync(resolve(siteDir, '.nojekyll'), '');

// Basic verification output
try {
  const distFiles = readdirSync(resolve(siteDir, 'dist'));
  console.log('Site dist file count:', distFiles.length);
  console.log('Includes demo.js?', distFiles.includes('demo.js'));
} catch (e) {
  console.warn('Could not list dist files:', e);
}

console.log('Site directory prepared at', siteDir);
