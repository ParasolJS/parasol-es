import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.js',
    plugins: [
        json(),
        postcss({ extract: 'dist/parcoords.css' }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**'
        }),
        resolve({
            browser: true,
            extensions: ['.js', '.ts']
        }),
        commonjs({
            include: ['node_modules/**'],
            exclude: ['node_modules/lodash-es/**']
        }),
        serve({
            open: true,
            verbose: true,
            contentBase: ['demo', 'dist'],
            historyApiFallback: false,
            host: 'localhost',
            port: 3004
        }),
        livereload({
            watch: ['demo', 'dist'],
            verbose: false
        })
    ],
    external: [],
    output: [
        {
            file: 'dist/parasol.standalone.js',
            format: 'umd',
            name: 'Parasol',
            sourcemap: true
        }
    ]
};
