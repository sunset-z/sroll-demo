import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import _ from 'lodash';
import pkg from './package.json' assert { type: 'json' };

const isDev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/main.js',
  external: ['lodash'],
  globals: {
    lodash: '_',
  },
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    { file: pkg.browser, format: 'umd', name: 'myBundle' },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: 'src/**',
      exclude: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    !isDev && terser(),
  ],
};
