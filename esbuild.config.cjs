// esbuild.config.cjs
const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/components/index.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, 'dist/vscode-elements-autocomplete.js'),
  platform: 'browser',
  format: 'esm',
  target: ['es2020'],
  sourcemap: true,
  minify: false,
  external: [], // Add external dependencies here if needed
  loader: { '.css': 'css' },
  logLevel: 'info',
}).catch(() => process.exit(1));
