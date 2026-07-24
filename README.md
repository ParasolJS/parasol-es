
# Parasol

![logo](https://raw.githubusercontent.com/ParasolJS/parasol-es/master/img/parasol_icon-black.png)

[https://parasoljs.github.io/](https://parasoljs.github.io/)

Parasol is a JavaScript library for visualization of multi-objective optimization problems. It features interactive linked plots, a data grid, and an array of clutter reduction techniques allowing for efficient visualization of trade-off in high-dimensional data. Parasol aides decision making by converting the paradox of choice into tangible solutions.

This library is based on the D3 v7 API and extends upon [parcoords-es](https://github.com/BigFatDog/parcoords-es) via the modernized fork [@jrkasprzyk/parcoord-es](https://www.npmjs.com/package/@jrkasprzyk/parcoord-es).

  [![npm version](https://img.shields.io/npm/v/parasol-es.svg?style=flat-square)](https://www.npmjs.com/package/parasol-es)
  [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## What's new in v2.0.0

Version 2.0.0 modernizes the entire toolchain and dependency stack:

* **D3 upgraded from v5 to v7** — breaking for consumers that share a D3 instance with Parasol.
* **Node.js >= 18 required** for development and installation.
* **Parallel coordinates dependency** moved from `parcoord-es` to the actively maintained fork [`@jrkasprzyk/parcoord-es`](https://www.npmjs.com/package/@jrkasprzyk/parcoord-es) (D3 v7 compatible).
* **Build toolchain rebuilt**: Rollup 4, Babel 7, ESLint 8; the standalone bundle (stale since 2019) is regenerated from current source.
* **Zero `npm audit` vulnerabilities** at release time — see [vulnerability-fixes.md](vulnerability-fixes.md).
* **Continuous integration** via GitHub Actions (lint + build on Node 18, 20, and 22).

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

2. Import the module and stylesheet:

```js
import 'parasol-es/dist/parcoords.css';
import Parasol from 'parasol-es';

const ps = Parasol(data)('.parcoords');
```

### Standalone
_dist/parasol.standalone.js_ bundles all dependencies and can be used directly in your html page as seen below. To use standard Parasol formatting and aesthetics, include the Parasol stylesheet, _dist/parcoords.css_, as well.
```html
<link rel="stylesheet" type="text/css" href="./parcoords.css">
<script src="./parasol.standalone.js"></script>

<script>
var ps = Parasol(data)('.parcoords');
</script>
```

## Development
Follow these instructions to setup a development environment for Parasol and play with demo examples:

### Prerequisites
[Node.js](https://nodejs.org/) >= 18 (includes npm)

### Installing
```
npm install
```

### Building
Builds all three bundles to `dist/`: `parasol.js` (UMD, dependencies external), `parasol.esm.js` (ES module), and `parasol.standalone.js` (UMD with all dependencies bundled), plus the extracted stylesheet `parcoords.css`.
```
npm run build
```

### Development server
Internal server will be launched, hosting all demos at localhost:3004
```
npm run dev
```

### Linting
```
npm run lint
```

Linting and the build also run in CI on every pull request (Node 18, 20, and 22).

## Built With

* [D3 v7](https://d3js.org/) - D3 modules are used
* [@jrkasprzyk/parcoord-es](https://github.com/jrkasprzyk/parcoords-es) - Parallel Coordinates charts (modernized fork of [parcoords-es](https://github.com/BigFatDog/parcoords-es))
* [SlickGrid](https://github.com/DimitarChristoff/slickgrid-es6) - Customizable and interactive spreadsheet
* [Rollup](https://github.com/rollup/rollup) - Module bundler

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

The Parasol logo was designed by Bryce Hanson.

## Acknowledgments

This project is supported by the [Kasprzyk Research Group](https://www.colorado.edu/lab/krg/) at the University of Colorado Boulder.

Many thanks to **Xing Yun** for porting the [Parallel Coordinates](https://github.com/syntagmatic/parallel-coordinates) project to D3 V5.

See also the list of [contributors](https://github.com/syntagmatic/parallel-coordinates/graphs/contributors) who created Parallel Coordinates.
