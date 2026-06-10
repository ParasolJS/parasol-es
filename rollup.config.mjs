import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const external = Object.keys(pkg.dependencies);

// browser globals for the UMD build's external imports
const globals = {
    d3: 'd3',
    'd3-dsv': 'd3',
    'file-saver': 'fileSaver',
    flatpickr: 'flatpickr',
    jquery: '$',
    'lodash-es': '_',
    'ml-distance-euclidean': 'mlDistanceEuclidean',
    'ml-kmeans': 'mlKmeans',
    'ml-xsadd': 'mlXsadd',
    'parcoord-es': 'ParCoords',
    random: 'random',
    'slickgrid-es6': 'SlickGrid'
};

const basePlugins = () => [
    json(),
    postcss({ extract: 'parcoords.css' }),
    babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
    }),
    resolve({
        browser: true,
        extensions: ['.js', '.ts']
    }),
    commonjs({
        include: ['node_modules/**'],
        exclude: ['node_modules/lodash-es/**']
    }),
];

export default [
    // library builds: dependencies stay external
    {
        input: 'src/index.js',
        plugins: basePlugins(),
        external,
        output: [
            {
                file: pkg.main,
                format: 'umd',
                name: 'Parasol',
                globals,
                sourcemap: true
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true
            }
        ]
    },
    // standalone build: all dependencies bundled, for direct <script> use
    {
        input: 'src/index.js',
        plugins: basePlugins(),
        external: [],
        output: [
            {
                file: 'dist/parasol.standalone.js',
                format: 'umd',
                name: 'Parasol',
                sourcemap: true
            }
        ]
    }
];
