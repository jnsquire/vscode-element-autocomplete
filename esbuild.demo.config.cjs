// esbuild.demo.config.cjs
const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/demo.tsx')],
  bundle: true,
  outfile: path.resolve(__dirname, 'dist/demo.js'),
  platform: 'browser',
  format: 'esm',
  target: ['es2020'],
  sourcemap: true,
  minify: true,
  external: [],
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
