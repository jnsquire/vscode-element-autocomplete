#!/usr/bin/env node
import { mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
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

console.log('Site directory prepared at', siteDir);
