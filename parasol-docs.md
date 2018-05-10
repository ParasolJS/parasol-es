# From interactive visualization web-application to JavaScript library: a roadmap for parasol.js

Produced by:
Kasprzyk Research Group
Civil, Environmental and Architectural Engineering Dept.
University of Colorado Boulder
**[josephkasprzyk.wordpress.com](https://josephkasprzyk.wordpress.com/group)**

Last updated: May 8, 2018

# Table of contents
- [Introduction](#introduction)
- [Features](#features)
    - [Import data](#import)
    - [K-means clustering](#clustering)
    - [Linked brushing](#brushing)
      - [Reset brushes](#brush-reset)
    - [Marking](#marking)
      - [Clear markings](#clear-markings)
    - [Reorderable axes](#reorder-axes)
    - [Hide and show axes](#hide-show)
    - [Set axes limits](#axes-limits)
    - [Keep and Remove selection](#keep-remove)
    - [Export selection as csv](#export)
    - [Explore selection](#explore)
- [Discussion](#discussion)

## Introduction <a name="introduction"></a>

_parasol_ is a new tool providing interactive visualization and statistical analysis methods for multiobjective optimization problems. _parasol_ is built on D3.js, a JavaScript library for data-driven documents, and the associated parallel coordinates library, d3.parcoords.js. This document describes the current state of _parasol_ as a web-application and provides a comprehensive outline of the mechanics of each feature, including an overview of all associated code and intended functionality.

As a web-application, _parasol_ serves as an approachable and streamlined tool for decision makers to explore many-objective optimizations. However, as a Javascript library, _parasol_ could provide the same functionality in a more versatile manner. Therefore, in addition to describing the functionality of _parasol_, the relevance of each feature to a library implementation and potential course for transition are additionally addressed throughout.

## Features <a name="features"></a>

### Import data <a name="import"></a>
Currently, only .csv file uploads are supported. In the future, this may extend to other file formats and database connections. Once the data has been uploaded, the uploader must be removed due to an issue with re-uploading data without reloading the webpage.

**Note:** If the user is building a personalized tool through the library, they will likely have a specific dataset to automatically import. In this case, functionality is already handled by `d3.csv`.

##### Current implementation details
The current csv uploader functions as a button and is the first thing the user sees when opening the app. They must click the button and select a csv file from their directory before the plots and grid can be produced. Once a file is selected, the app enters the `visualize` function which drives the interactive capabilities, and the uploader is removed.

```javascript
// create button
<input type="file" id="uploader">
```
```javascript
var uploader = document.getElementById("uploader");
var reader = new FileReader();

reader.onload = function(e) {
  var contents = e.target.result;
  var data = d3.csv.parse(contents);

  // visualize data with default to 3 clusters
  visualize(data, n_objs = 3, k = 4);

  // remove uploader button
  uploader.parentNode.removeChild(uploader);
};

uploader.addEventListener("change", handleFiles, false);

function handleFiles() {
  var file = this.files[0];
  reader.readAsText(file);
};
```

##### Proposed library API
This feature is relevant for a two main purposes. It is convenient for those who would like to test their code on multiple files without having to edit the file path, and to those using _parasol_ to develop a web application similar to what we have done here.

In the library, this should be a function that takes no argument, and simply appends the uploader button to the webpage.

```javascript
parasol.import()
```

### K-means clustering <a name="clustering"></a>
K-means clustering partitions the imported data into into k clusters in which each datapoint belongs to the cluster with the nearest mean. In this way, clustering groups the solutions by a measure of statistical similarity. These clusters are denoted by corresponding categorical colors depending on the number of clusters specified. The default value is set to 3 clusters, with a maximum value of 6 clusters. This cap is due in part to the loss of relevance with too many clusters, and to the limited number of catagorical colors in the "Dark2" color pallete. Of course, the latter can be easily remedied should we choose to increase the maximum number of clusters.

##### Current implementation details
Clustering is implemented using the _ML_ library.
```javascript
var kmeans = ML.Clust.kmeans;
```
In a library-like functionality, the web-app developer currently specifies the number of clusters in the call to the `visualize` function.
```javascript
visualize(data, n_objs = 3, k = 4);
```

The first task of the `visualize` function is to setup the clusters. We use the _Underscore_ library to obtain data in the necessary array format for the _ML_ library, preform clustering on the array version of the data, and append clusters id's to the original data.
```javascript
// max clusters = 6
k = (k <= 6) ?  k : 3;

// coerce data to array of arrays for clustering
var clust_form = [];
data.forEach(function(d,i) { clust_form[i] = _.values(d) });

// preform default clustering
var km = kmeans(clust_form, k);
data.forEach(function(d,i) { d.cluster = km.clusters[i]; });
```

We then define a color pallete based on the number of specified clusters.
```javascript
// choose default catagorical color scheme
var color_scheme = d3.scale.ordinal()
  .range(colorbrewer.Dark2[k])

var palette = function(d) {
  return color_scheme(d['cluster']);
};
```

This `palette` variable is then passed to the parallel coordinate plot variables, so that each observation will be colored by its cluster id. For example,
```javascript
// objective space
var pc1 = d3.parcoords()("#plot01")
  .data(data)
  .hideAxis(decision_vars)
  .color(palette)
```

In addition to representing clusters by color, users may also choose to view clusters on an axis for interactive [brushing](#brushing). Because clusters id's are associated with each row of data, an axis is automatically created for them when plotting. By default, the cluster axis is currently hidden to avoid repetetive display of data. However, using the [Hide and Show axes](#hide-show) feature, they can easily be revealed. See the images below for reference.

Default: Clusters hidden on import.
![no_cluser](images/no_cluster.png)

After cluster axis selected in [Hide and Show axes](#hide-show).
![no_cluser](images/cluster.png)

##### Proposed library API
Clustering functionality should be an extension of the main `visualize` function. The user will specify the following:
- k: number of clusters
- type: {"k-means", "spectral"} the type of clustering to be preformed
- group: {"decisions", "objectives", "both"} the group on which clusters will be decided

Defaults are listed below.

```javascript
visualize(data, num_objectives)
  .cluster(k = 3, type="k-means", group="both")
```

### Linked brushing <a name="brushing"></a>
Coming soon.

##### Current implementation details
##### Proposed library api

#### Reset brushes <a name="brush-reset"></a>
Coming soon.

##### Current implementation details
##### Proposed library api

### Marking <a name="markings"></a>
Coming soon.

##### Current implementation details
##### Proposed library api

#### Clear markings <a name="clear-marking"></a>
Coming soon.

##### Current implementation details
##### Proposed library api

### Reorderable axes <a name="reorder-axes"></a>
The reorderable axes functionality is not a novel feature of this project. It is completely implemented in Kai Chang's _parallel-coordinates_ library. Even still, it is included as a feature due to its significance for _parasol_. Whether implemented as a web-application or library, it is critical that the user have the ability to interact with axes of the produced plots in order to overcome the bias of the static relationships between variables. The implementation is simple, one need only extend the plotting variables as follows:

```javascript
// objective space
var pc1 = d3.parcoords()("#plot01")
  .data(data)
  .hideAxis(decision_vars)
  .reorderable()
```

### Hide and Show axis <a name="hide-show"></a>
Coming soon.

##### Current implementation details
##### Proposed library api

### Set axes limits <a name="axes-limits"></a>
Coming soon.

##### Proposed library api

### Keep and Remove selection <a name="keep-remove"></a>
One of the primary methods for quickly identifying relevant solutions is the ability to narrow down the set of visualized data by removing unnecessary data or keeping only a small subset of relevant data.

**Note:** There are three possible fields of data the user may seek to keep (or remove): brushed data, marked data, or the union of both. The current

##### Current implementation details
This feature pair is currently implemented with buttons which we create at the begining of the script in the widgets div.
```javascript
<button id="keep_selected">Keep</button>
<button id="remove_selected">Remove</button>
```

##### Proposed library api

### Export selection as csv <a name="export"></a>
Once the user has identified a set of relevant solutions, they will likely require the access to the solution data for further analysis. Currently, the user can download the data as a csv file, and in future development other formats may be possilbe.

**Note:** There are three possilbe fields of data the user may seek to extract: brushed, marked, or all remaining data. The current default is to export all data since this option is the most intuitive for a one-click button. In a library implementation, it will be straightforward to provide a choice.


##### Current implementation details
The export feature is currently implemented as a button. We must create that at the beginning of the script, inside the widgets div.

```javascript
// create button
<button href='#'id='export_selected'>Export</button>
```

Once clicked, we begin by noting the data field to export and checking that the chosen field in not empty. We strip the irrelevant row id information and use the _d3_ library to format the data as a csv. We create a blob (JavaScript data type) from this csv data and use the `saveAs` function in the _FileSaver_ library to build and initiate the download.
```javascript
d3.select('#export_selected').on('click', function() {

  // export all remaining data to new csv and download
  var data_exp = data;

  if (data_exp == null || !data_exp.length) {
      throw new Error("No data selected.");
      return;
  }

  //remove id column
  data_exp.forEach(function(d) { delete d.id; });

  // format data as csv
  var columns = d3.keys(data_exp[0]);
  var csv = d3.csvFormat(data_exp, columns);

  // create url for download
  var file = new Blob([csv], {type: 'text/csv'});
  saveAs(file, "pareto_solutions.csv");

});
```
##### Proposed library api
The export feature should be a standalone function. The user will specify the following:
- group: {"brushed", "marked", "all"} the data field to be exported
- filename: file name with file type extension

The default implementation is provided below.

```javascript
parasol.export(data, group="all", filename="pareto_solutions.csv")
```

### Explore selection <a name="explore"></a>
Coming soon.

##### Proposed library api

## Discussion <a name="discussion"></a>
Coming soon.
