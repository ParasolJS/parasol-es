import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

// Writes to dev-dist/, never dist/. dist/ is committed and published, and the
// livereload plugin injects a client snippet into the bundle, so a dev run that
// shared the production path would leave a modified artifact behind.
export default {
    input: 'src/index.js',
    plugins: [
        json(),
        // relative to the output file's directory, so this lands in dev-dist/
        postcss({ extract: 'parcoords.css' }),
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
            // dev-dist before dist so the demos' ./parasol.standalone.js
            // resolves to the freshly watched build, not the committed one
            contentBase: ['demo', 'dev-dist', 'dist'],
            historyApiFallback: false,
            host: 'localhost',
            port: 3004
        }),
        livereload({
            watch: ['demo', 'dev-dist'],
            verbose: false
        })
    ],
    external: [],
    output: [
        {
            file: 'dev-dist/parasol.standalone.js',
            format: 'umd',
            name: 'Parasol',
            sourcemap: true
        }
    ]
};
