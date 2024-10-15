# Interactive SVG Animation

- Demo: https://iar5.github.io/svg-path-particles/app/

## Features
 - particle movement along svg spline paths
 - spline discretization (for performance reasons)
 - interpolation between discretized points (to counteract low sample rates and reduce file size)
 - smoothed mouse and touch interactive effects
 - responsive
 - retine display optimisation
 - ES6 modules


## Usage

### 0. Install prerequirements

A simple webserver. I used the npm http-server which can be installed via `npm install -g http-server`.


### 1. Discretize SVG

The first step is to discretized svg file, since this doesn't need to be done in realtime.
In `discretizer/discretize.js` set the path to your svg file and adjust the parameters to your needs and your SVG sizing(**!**).

``` bash
cd discretizer
http-server
```

and open it in your browser. If everythink worked fine you will see an array of numbers, which is the discretized represenations of your SVG file. Save the output in a way making it accessable for the `app/main.js` (e.g. create a variable or save it in a separate file like I did with `app/svg_desktop.js` for example).

### 2. Run application

``` bash
cd ..
cd app
http-server
```
