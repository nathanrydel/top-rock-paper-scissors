import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/ui.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({
      exclude: ['**/tests/**','**/*.test.ts']
    }),
    terser(),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'dist' },
        { src: 'public/styles.css', dest: 'dist' },
      ]
    })
  ]
};