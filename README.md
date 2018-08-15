# parasol

<p align="center">
  <!-- <a href="https://www.npmjs.com/package/rollup">
    <img src="https://img.shields.io/npm/v/rollup.svg"
         alt="npm version">
  </a> -->
  <a href="https://travis-ci.org/joshhjacobson/parasol">
    <img src="https://api.travis-ci.org/joshhjacobson/parasol.svg?branch=master?style=flat-square"
         alt="build status">
  </a>
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
  <a href="https://github.com/joshhjacobson/parasol/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/parasol.svg?style=flat-square"
         alt="license">
  </a>
  <a href="#badge">
   <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
 </a>
</p>

## Overview
ES6 module for visualization of multiobjective optimization problems. Parasol aides decision making by turning the _paradox_ of choice into tangible _solutions_.

This library is based on D3 V5 API and extends upon [parcoords-es](https://github.com/BigFatDog/parcoords-es).


## Usage
Parasol is currently in a prerelease state but should be available on NPM by Fall 2018.

## Development
Follow these instructions to setup a development environment for parasol and play with demo examples:

### Prerequisites
Node package manager ([npm](https://www.npmjs.com/get-npm))

### Clone and Build
1. Clone this git repo
```
git clone git@github.com:joshhjacobson/parasol.git
```
2. Establish npm environment and dependencies
```
npm install
```
3. Compile any changes to source (src) files
```
npm run build
```
4. Test code and view demos in live browser (internal server will be launched, hosting all demos at localhost:3004)
```
npm run dev
```

## Built With

* [D3 V5](https://d3js.org/) - D3 modules are used
* [parcoords-es](https://github.com/BigFatDog/parcoords-es) - Parallel Coordinates charts
* [SlickGrid](https://github.com/DimitarChristoff/slickgrid-es6) - Customizable and interactive spreadsheet
* [Rollup](https://github.com/rollup/rollup) - Module bundler

## Authors

* **Josh Jacobson** - *University of Colorado Boulder*
* **William Raseman** - *University of Colorado Boulder*
* **Joseph Kasprzyk** - *University of Colorado Boulder*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

This project is supported by the [Kasprzyk Research Group](https://josephkasprzyk.wordpress.com) at the University of Colorado Boulder.

Many thanks to **Xing Yun** for porting the [Parallel Coordinates](https://github.com/syntagmatic/parallel-coordinates) project to D3 V5.

See also the list of [contributors](https://github.com/syntagmatic/parallel-coordinates/graphs/contributors) who created Parallel Coordinates.
