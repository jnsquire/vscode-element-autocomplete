// esbuild.config.cjs
const esbuild = require('esbuild');
const path = require('path');

const builds = [
  {
    entryPoints: [path.resolve(__dirname, 'src/index.ts')],
    bundle: true,
    outfile: path.resolve(__dirname, 'dist/vscode-elements-autocomplete.js'),
    platform: 'browser',
    format: 'esm',
    target: ['es2020'],
    sourcemap: true,
    minify: true,
    external: [],
    loader: { '.css': 'css' },
    logLevel: 'info',
  },
  {
    entryPoints: [path.resolve(__dirname, 'src/demo.tsx')],
    bundle: true,
    outfile: path.resolve(__dirname, 'dist/demo.js'),
    platform: 'browser',
    format: 'esm',
    target: ['es2020'],
    sourcemap: true,
    minify: false,
    external: [],
    loader: { '.css': 'css' },
    logLevel: 'info',
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
];

Promise.all(builds.map(opts => esbuild.build(opts))).catch(() => process.exit(1));
