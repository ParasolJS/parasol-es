import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import localResolve from 'rollup-plugin-local-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import json from 'rollup-plugin-json';

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
        // commonjs({
        //   include: 'node_modules/slickgrid-es6/**',
        //   namedExports: {
        //     // left-hand side can be an absolute path, a path
        //     // relative to the current directory, or the name
        //     // of a module in node_modules
        //     'node_modules/slickgrid-es6/src/': [ 'Grid', 'Data', 'Plugins' ]
        //   }
        // }),
        commonjs({
          exclude: ['node_modules/lodash-es/**'],
          namedExports: {
            'node_modules/ml-distance-euclidean/euclidean.js': ['squared'],
            // 'node_modules/slickgrid-es6/dist/slick.es6.min.js': ['Slickgrid']
            //   'Slick', 'Grid', 'FrozenGrid', 'Data', 'Plugins', 'Editors', 'Formatters'
            // ]
          }
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
    // external: external,
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
