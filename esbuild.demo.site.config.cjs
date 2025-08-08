// Optimized demo build for GitHub Pages: externalize heavy libs (react, react-dom) loaded via CDN.
const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/demo.tsx')],
  bundle: true,
  outdir: path.resolve(__dirname, 'dist'),
  platform: 'browser',
  format: 'esm',
  target: ['es2020'],
  sourcemap: false,
  minify: true,
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  external: ['react', 'react-dom', 'react-dom/client'],
  loader: {
    '.css': 'css',
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  logLevel: 'info',
  define: {
    'process.env.NODE_ENV': '"production"'
  },
}).catch(() => process.exit(1));
