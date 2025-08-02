import { build, context } from 'esbuild';

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: {
    'vanilla': 'src/index.ts',
    'react': 'src/react-demo.tsx'
  },
  bundle: true,
  outdir: 'dist',
  platform: 'browser',
  target: 'es2020',
  format: 'esm',
  minify: isProduction,
  sourcemap: !isProduction,
  external: [],
  loader: {
    '.css': 'css'
  }
};

if (isWatch) {
  // Use context for watch mode
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  // Regular build
  build(buildOptions).then(() => {
    console.log('Build completed successfully!');
  }).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  });
}
