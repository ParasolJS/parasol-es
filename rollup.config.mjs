import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const external = Object.keys(pkg.dependencies);

export default {
    input: 'src/index.js',
    plugins: [
        json(),
        postcss({ extract: 'dist/parcoords.css' }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
        }),
        resolve({
            browser: true,
            extensions: ['.js', '.ts']
        }),
        commonjs(),
    ],
    external,
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'Parasol',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ]
};
