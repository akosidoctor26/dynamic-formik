import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import packageJSON from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJSON.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJSON.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve({ extensions: ['.jsx', '.js'] }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react']
    }),
    commonjs()
  ]
};
