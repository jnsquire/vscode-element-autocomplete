const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/demo-entry.tsx')],
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
}).catch(() => process.exit(1));
