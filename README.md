
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

## API

The API documentation below is meant to give the user an idea of the features available in Parasol. For additional detail about API arguments, see [this documentation](TODO: add link to JSDoc verion) generated using [JSDoc](http://usejsdoc.org/).

Note: in Parasol, we used the word <i>selection</i> to any user action which selects a subset of the dataset, such as brushing and marking. This is not to be confused with a [d3 selection](https://github.com/d3/d3/wiki).

<a name="parasol" href="#parasol">#</a> <b>Parasol</b>(<i>data</i>, <i>config</i>)(<i>selector</i>)

Set up a new Parasol object. The selector can also be a d3 selection.

In an HTML script, create charts that we want to link together.
```html
// make a couple empty parallel coordinate charts
<body>
<div id="plot01" class="parcoords" style="height:200px; width:800px;"></div>
<div id="plot02" class="parcoords" style="height:200px; width:800px;"></div>
</body>
```
Then, use the following form to import data and bind the charts together into a Parasol object.
```javascript
d3.csv('data/cars.csv').then(function(data) {
  // create Parasol object
  var ps = Parasol(data)('.parcoords')
	  // can chain Parasol API here:
	  // for example,
	  // .cluster()
  )
```

<a name="aggregate_score" href="#aggregate_score">#</a> Parasol.<b>aggregateScore</b>(<i>weights</i>, <i>chartIDs</i>, <i>norm</i>)

Compute individual aggregate scores for each solution based on user specified weights.

<a name="cluster" href="#cluster">#</a> Parasol.<b>cluster</b>(<i>k</i>, <i>chartIDs</i>, palette=d3.schemeCategory10, vars=null, std=true, options=..., boolean=true)

Partition data into k clusters in which each data element belongs to the cluster with the nearest mean.

The <i>palette</i> argument defaults to d3.schemeCategory10. For other color options, see the [Categorical](https://github.com/d3/d3-scale-chromatic#categorical) palettes from [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

<a name="export_data" href="#export_data">#</a> Parasol.<b>exportData</b>(<i>selection</i>, <i>filename</i>)

Export selected data to new csv and download.

TODO: change from selection to type
```javascript
// export only brushed data
Parasol.exportData(type = 'brushed', filename = 'filename1.csv');

// export only marked data
Parasol.exportData(type = 'marked', filename = 'filename2.csv');

// export both brushed and marked data
Parasol.exportData(type = 'selected', filename = 'filename3.csv');

// export all data
Parasol.exportData(type = 'all', filename = 'filename4.csv');
```
<a name="hide_axes" href="#hide_axes">#</a> Parasol.<b>hideAxes</b>(<i>partition</i>)

Hide a set of axes globally or from specific charts. See related <a href="#show_axes">Parasol.showAxes</a>.

```javascript
// hide the an axis called 'name' from all charts
Parasol.hideAxes(['name']);

// hide certain axes on specific charts
var partition = {
    0: ['displacement (cc)'],  // hide one axis from the first chart
    1: ['cylinders', 'power (hp)']  // hide two axes from the second chart
}
Parasol.hideAxes(partition);
```

TODO: change to keepData

<a name="keep_selection" href="#keep_selection">#</a> Parasol.<b>keepSelection</b>(<i>selection</i>)

Keep only selected data on charts. See related <a href="#remove_selection">Parasol.removeSelection</a>.

<a name="linked" href="#linked">#</a> Parasol.<b>linked</b>(<i>chartIDs</i>)

Link brush activity between user-specified charts and grid, if it exists.

TODO: change to removeData

<a name="remove_selection" href="#remove_selection">#</a> Parasol.<b>removeSelection</b>(<i>selection</i>)

Remove selected data on charts. See related <a href="#keep_selection">Parasol.keepSelection</a>.

<a name="remove_selection" href="#remove_selection">#</a> Parasol.<b>resetSelections</b>(<i>selection</i>)

Reset selections (i.e. brushed or marked data).

<a name="show_axes" href="#show_axes">#</a> Parasol.<b>showAxes</b>(<i>partition</i>)

Show a set of axes globally or from specific charts. See related <a href="#hide_axes">Parasol.hideAxes</a>.

### Using the Parcoords API
Parasol builds off the work of [Syntagmatic's Parcoords library](https://github.com/syntagmatic/parallel-coordinates) and [BigFatDog's ES6 module of Parcoords](https://github.com/BigFatDog/parcoords-es). To allow users to fine tune their parallel coordinate plots with the Parcoords API, users can use the following syntax:

```javascript
// alter charts individually using Parcoords API
Parasol.charts[0]  // expose the first Parcoords chart within the Parasol object (zero-indexed)
  .reorderable().shadows().render();  // make chart reorderable with shadows
Parasol.charts[1]  // expose the second Parcoords chart
  .color("rgba(128,0,128,0.3)").alpha(0.6).render();  //make plot transparent purple

// ...or alter all charts at the same time
Parasol.charts.forEach(
  (pc) => {
    pc
      .color("rgba(128,0,128,0.3)")
      .alpha(0.6)
      .reorderable()  
      .render()       
      .updateAxes(0);
  }
);
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
