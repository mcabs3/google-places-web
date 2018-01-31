import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/google/index.js',
    external: ['axios'],
    output: [
      { file: pkg.main, format: 'cjs', strict: true },
      { file: pkg.module, format: 'es', strict: true },
      { file: pkg.browser, format: 'umd', name: 'google-places-web', strict: true }
    ],
    plugins: [
      resolve(), // so Rollup can find package in node_modules
      commonjs(), // so Rollup can convert npm packages to an ES module
      babel({
        exclude: ['node_modules/**'],
        plugins: ['external-helpers']
      })
    ]
  }
];