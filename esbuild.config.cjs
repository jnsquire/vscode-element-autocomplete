// esbuild.config.cjs
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'));
}

// Copy CSS file to dist
const cssDir = path.resolve(__dirname, 'src/css');
const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
cssFiles.forEach(file => {
  fs.copyFileSync(
    path.resolve(cssDir, file),
    path.resolve(__dirname, 'dist', 'vscode-elements-react-extras.css')
  );
});

const builds = [
  // ESM build
  {
    entryPoints: [path.resolve(__dirname, 'src/index.ts')],
    bundle: true,
    outfile: path.resolve(__dirname, 'dist/vscode-elements-react-extras.js'),
    platform: 'browser',
    format: 'esm',
    target: ['es2020'],
    sourcemap: true,
    minify: true,
    external: ['react', 'react-dom', '@vscode-elements/react-elements', '@vscode-elements/elements'],
    loader: { '.css': 'css' },
    logLevel: 'info',
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  // CommonJS build
  {
    entryPoints: [path.resolve(__dirname, 'src/index.ts')],
    bundle: true,
    outfile: path.resolve(__dirname, 'dist/vscode-elements-react-extras.cjs'),
    platform: 'browser',
    format: 'cjs',
    target: ['es2020'],
    sourcemap: true,
    minify: true,
    external: ['react', 'react-dom', '@vscode-elements/react-elements', '@vscode-elements/elements'],
    loader: { '.css': 'css' },
    logLevel: 'info',
    jsx: 'automatic',
    jsxImportSource: 'react',
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
