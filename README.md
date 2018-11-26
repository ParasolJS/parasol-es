
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
## Styling
To use our standard Parasol formatting and aesthetics, simply include the Parasol Cascading Style Sheet, <i>parasol.css</i>, in your HTML document:
```html
<link rel="stylesheet" type="text/css" href="parasol.css">
```

## Library Dependencies
If using Parasol as a standalone library (as opposed to a node package), include the following JavaScript libraries in your HTML document:
```html
<script src="./lib/d3.v5.min.js"></script>
<script src="./parasol.standalone.js"></script>
```
To enable [bundling](http://syntagmatic.github.io/parallel-coordinates/#bundling) methods, also include slyverster.js:
```html
<script src="./lib/slyvester.js"></script>
```

## API

The API documentation below is meant to give the user an idea of the features available in Parasol. For additional detail about API arguments, see [this documentation](TODO: add link to JSDoc verion) generated using [JSDoc](http://usejsdoc.org/).

<a name="parasol" href="#parasol">#</a> <b>Parasol</b>(<i>data</i>, <i>config</i>)(<i>selector</i>)

Set up a new Parasol object. The selector can also be a [d3 selection](https://github.com/d3/d3/wiki).

In an HTML script, create charts that we want to link together.
```html
// make a couple empty parallel coordinate charts of class "parcoords"
<body>
<div id="plot0" class="parcoords" style="height:200px; width:800px;"></div>
<div id="plot1" class="parcoords" style="height:200px; width:800px;"></div>
</body>
```
Then, use the following form to import data and bind the charts together into a Parasol object.
```javascript
d3.csv('data/cars.csv').then(function(data) {
  // create Parasol object
  var ps = Parasol(data)('.parcoords')
	  // can chain Parasol API here:
	  // for example,
	  .linked()
  )
```
The methods described below can be chained to a Parasol object in this manner.

<a name="attach_grid" href="#attach_grid">#</a> Parasol.<b>attachGrid</b>(<i>container</i>, <i>columns</i>, <i>options</i>)

To attach an interactive data table using <b>attachGrid()</b>, we  need to include the table in the HTML body:
```html
// allocate space for parallel coordinates and SlickGrid data table
<body>
<div id="plot0" class="parcoords" style="height:200px; width:800px;"></div>
<div id="plot1" class="parcoords" style="height:200px; width:800px;"></div>
<div id="grid" class="slickgrid-container" style="width:100%;height:500px;"> </div>
</body>
```
Like before, import the data, create Parasol object, and implement the Parasol API. Here, we demonstrate attaching the data table and linking it with the plots:
```javascript
d3.csv('data/cars.csv').then(function(data) {
  var ps = Parasol(data)('.parcoords')
	  .attachGrid({container: '#grid'})
	  .linked()
  )
```
<a name="cluster" href="#cluster">#</a> Parasol.<b>cluster</b>(<i>k</i>, <i>displayIDs</i>, <i>palette</i>, <i>vars</i>, <i>options</i>, <i>std</i>, <i>hidden</i>)

Use <i>k</i>-means clustering to partition similar groups of data.

The <i>palette</i> argument defaults to d3.schemeCategory10. For other color options, see the [Categorical](https://github.com/d3/d3-scale-chromatic#categorical) palettes from [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

Example usage:  
```javascript
// specify three clusters, display on first and second plots (zero-indexed)
Parasol.cluster({k: 3, displayIDs[0,1]});

// note, that if there are only two parallel coordinates plots, the follow code will be equivalent
Parasol.cluster({k: 3});
```
<a name="export_data" href="#export_data">#</a> Parasol.<b>exportData</b>(<i>selection</i>, <i>filename</i>)

Export selected data to new csv and download. If no filename is specified, the name will default to "parasol_data.csv".

<u>Note</u>: in Parasol, we used the word <i>selection</i> to any user action which selects a subset of the dataset, such as brushing and marking. This is not to be confused with a [d3 selection](https://github.com/d3/d3/wiki).

Example usage:  
```javascript
// export only brushed data
Parasol.exportData(selection = 'brushed', filename = 'filename1.csv');

// export only marked data
Parasol.exportData(selection = 'marked');  // filename will be 'parasol_data.csv'

// export both brushed and marked data
Parasol.exportData(selection = 'selected', filename = 'filename2.csv');

// export all data
Parasol.exportData(selection = 'all');  // filename will be 'parasol_data.csv'
```
<a name="update_grid" href="#update_grid">#</a> Parasol.<b>updateGrid</b>(<i>data</i>, <i>columns</i>)

Update data displayed in grid.

<a name="hide_axes" href="#hide_axes">#</a> Parasol.<b>hideAxes</b>(<i>partition</i>)

Hide a set of axes globally or from specific charts. See related <a href="#show_axes">Parasol.showAxes</a>.

```javascript
// hide the an axis called 'name' from all charts
Parasol.hideAxes(['name']);

// hide certain axes on specific charts using cars.csv data
var partition = {
    0: ['displacement (cc)'],  // hide one axis from the first chart
    1: ['cylinders', 'power (hp)']  // hide two axes from the second chart
}
Parasol.hideAxes(partition);
```
<a name="keep_data" href="#keep_data">#</a> Parasol.<b>keepData</b>(<i>selection</i>)

Keep only selected data on charts. See related <a href="#remove_data">Parasol.removeData</a>.

<a name="linked" href="#linked">#</a> Parasol.<b>linked</b>(<i>chartIDs</i>)

Link brush activity between user-specified charts and grid, if it exists. Defaults to linking all charts and grid.

<a name="remove_data" href="#remove_data">#</a> Parasol.<b>removeData</b>(<i>selection</i>)

Remove selected data on charts. See related <a href="#keep_data">Parasol.keepData</a>.

<a name="reset_selections" href="#reset_selections">#</a> Parasol.<b>resetSelections</b>(<i>selection</i>)

Reset selections (i.e. brushed or marked data).

<a name="set_axes_layout" href="#set_axes_layout">#</a> Parasol.<b>setAxesLayout</b>(<i>layout</i>)

Specify the structure (or layout) of the parallel coordinates plots.  
```javascript
// specify which variables (from cars.csv) appear on which chart
Parasol.setAxesLayout({
  0: ['displacement (cc)', 'power (hp)','0-60 mph (s)'],
  1: ['economy (mpg)', 'cylinders','weight (lb)']
})
```

<a name="show_axes" href="#show_axes">#</a> Parasol.<b>showAxes</b>(<i>partition</i>)

Show a set of axes once they have been hidden. See related <a href="#hide_axes">Parasol.hideAxes</a>.

<a name="weighted_sums" href="#weighted_sums">#</a> Parasol.<b>weightedSums</b>(<i>weights</i>, <i>displayIDs</i>, <i>norm</i>)

Compute individual aggregate scores for each solution based on user specified weights.

Example usage:
```javascript
  // setup weights (unspecified vars given weight = 0) for cars.csv data
  var weights = {
    "power (hp)": 0.8,
    "weight (lb)": 0.4,
    "0-60 mph (s)": 1
  };

  Parasol.weightedSums({ weights: weights })
```

### Using the Parcoords API
Parasol builds off the work of [Syntagmatic's Parcoords library](https://github.com/syntagmatic/parallel-coordinates) and [BigFatDog's ES6 module of Parcoords](https://github.com/BigFatDog/parcoords-es). To allow users to fine tune their parallel coordinates plots with the Parcoords API the same way the Parasol API is implemented. For details about these methods, see the Parcoords libraries listed above.

To alter all charts simultaneously, simply chain the Parcoords API to a Parasol object:
```javascript
Parasol.alpha(0.2)  // alter transparency
	.reorderable()  // make axes dynamically reorderable
    .color('#03719c')  // specify color
    .shadows()  // add white shadows so text is more readable
    .brushedColor('#fc5a50')  // color when brushed
    .render();  // render plot
```
You can also access each chart of a Parasol object individually using <b>charts</b>. For instance:
```javascript
Parasol.charts[0]  // expose the first Parcoords chart within the Parasol object (zero-indexed)
  .reorderable().shadows().render();  // make chart reorderable with shadows
Parasol.charts[1]  // expose the second Parcoords chart
  .color("rgba(128,0,128,0.3)").alpha(0.6).render();  // make plot transparent purple
```
To use the <i>bundling</i> features of Parcoords, you must also include slyvester.js in your HTML document. For instance, by using the file structure in this repo...
```html
<script src="./lib/slyvester.js"></script>
```
After including slyvester.js, you can bundle away!
```javascript
Parasol.bundleDimension('cylinders')  // bundle based on number of cylinders (cars.csv)
    .bundlingStrength(0.4)  // strength of bundles
    .smoothness(0.2)  // using Bezier curvers instead of linear polylines
```
Here is the full list of Parcoords API supported by Parasol objects:
-   alpha
-   alphaOnBrushed
-   brushedColor
-   brushReset
-   bundleDimension
-   bundlingStrength
-   color
-   composite
-   dimensions
-   flipAxes
-   render
-   reoderable
-   scale
-   shadows
-   smoothness
-   unhighlight
-   unmark

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
