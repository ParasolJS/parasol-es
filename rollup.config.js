import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import localResolve from 'rollup-plugin-local-resolve';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
    input: 'src/index.js',
    plugins: [
        json({
            exclude: [ 'node_modules' ],
            preferConst: true,
        }),
        localResolve(),
        postcss({ extract: 'dist/parcoords.css' }),
        babel(babelrc()),
        resolve({
            module: true,
            jsnext: true,
            main: true,
            browser: true,
            extensions: ['.js']
        }),
        commonjs(),
        eslint({
            exclude: [
              '*.css',
            ]
        }),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
    external: external,
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'parasol',
            sourcemap: 'inline'
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: 'inline'
        }
    ]
};
