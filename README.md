
# Parasol

![logo](https://github.com/ParasolJS/parasol-es/blob/master/img/parasol_icon-black.png)

[https://parasoljs.github.io/](https://parasoljs.github.io/)

Parasol is a JavaScript library for visualization of multi-objective optimization problems. It features interacitve linked plots, a data grid, and an array of clutter reduction techniques allowing for efficient visualization of trade-off in high-dimensional data. Parasol aides decision making by converting the paradox of choice into tangible solutions.

This library is based on D3 V5 API and extends upon [parcoords-es](https://github.com/BigFatDog/parcoords-es).

  <!-- <a href="https://www.npmjs.com/package/rollup">
    <img src="https://img.shields.io/npm/v/rollup.svg"
         alt="npm version">
  </a> -->
  <!-- <a href="https://travis-ci.org/joshhjacobson/parasol">
    <img src="https://api.travis-ci.org/joshhjacobson/parasol.svg?branch=master?style=flat-square"
         alt="build status">
  </a> -->
  <!-- <a href="https://codecov.io/gh/prettier/prettier">
    <img alt="Codecov Coverage Status" src="https://img.shields.io/codecov/c/github/prettier/prettier.svg?style=flat-square">
  </a> -->
  <!-- <a href="https://david-dm.org/rollup/rollup">
    <img src="https://david-dm.org/rollup/rollup/status.svg"
         alt="dependency status">
  </a> -->
  <!-- <a href="https://packagephobia.now.sh/result?p=rollup">
    <img src="https://packagephobia.now.sh/badge?p=rollup"
         alt="install size">
  </a> -->

  [![npm version](https://img.shields.io/npm/v/parasol-es.svg?style=flat-square)](https://www.npmjs.com/package/parasol-es)
  [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Resources

* [API Reference](https://github.com/ParasolJS/parasol-es/wiki/API-Reference)
* [Release Notes](https://github.com/ParasolJS/parasol-es/releases)
* [Getting Started](https://github.com/ParasolJS/parasol-es/wiki/Tutorial-1:-Getting-started)
* [Examples](https://parasoljs.github.io/)
* [Issues](https://github.com/ParasolJS/parasol-es/issues)
* [Wiki](https://github.com/ParasolJS/parasol-es/wiki)

## References
Raseman, W.J., Jacobson, J., Kasprzyk, J.R., 2019. *Parasol: an open source, interactive parallel coordinates library for multi-objective decision making.* Environmental Modelling & Software 116, 153–163. https://doi.org/10.1016/j.envsoft.2019.03.005

## Usage
### Node/ES6
1. Install Parasol in your project:
```
npm install parasol-es --save
```

2. Import the module:

```
import 'parasol-es/parcoords.css';
import Parasol from 'parasol-es';

const ps = Parasol()....
```

### Standalone
_parasol.standalone.js_ contains all dependencies and can be used directly in your html page as seen below. To use standard Parasol formatting and aesthetics, include the Parasol Cascading Style Sheet, <i>parasol.css</i> as well.
```
<link rel="stylesheet" type="text/css" href="./parasol.css">
<script src="./parasol.standalone.js"></script>

var parcoords = Parasol()("#example")
```

## Development
Follow these instructions to setup a development environment for Parasol and play with demo examples:

### Prerequisites
Node package manager ([npm](https://www.npmjs.com/get-npm))

### Installing
```
npm install
```

### Building
```
npm run build
```

### Development
Internal server will be launched, hosting all demos at localhost:3004
```
npm run dev
```

### Testing and Coverage
Run all unit tests and generate test coverage report.
```
npm run test:cover
```

## Built With

* [D3 V5](https://d3js.org/) - D3 modules are used
* [parcoords-es](https://github.com/BigFatDog/parcoords-es) - Parallel Coordinates charts
* [SlickGrid](https://github.com/DimitarChristoff/slickgrid-es6) - Customizable and interactive spreadsheet
* [Rollup](https://github.com/rollup/rollup) - Module bundler

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

The Parasol logo was designed by Bryce Hanson.

## Acknowledgments

This project is supported by the [Kasprzyk Research Group](https://www.colorado.edu/lab/krg/) at the University of Colorado Boulder.

Many thanks to **Xing Yun** for porting the [Parallel Coordinates](https://github.com/syntagmatic/parallel-coordinates) project to D3 V5.

See also the list of [contributors](https://github.com/syntagmatic/parallel-coordinates/graphs/contributors) who created Parallel Coordinates.
