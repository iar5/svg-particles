(readme.md work in progress)

# SVG Path Particle Animation

## Description

## What

Simple, but nice interactive background animation for some kind of landing or start-page.
Showcase: https://iar5.github.io/svg-path-particles/app/

Features
 - movement based on svg file paths
 - spline/svg path particle movement
 - discretized for performance
 - interpolation between discretized points to compress lower sample rates (to save file size)
 - interactive smooth mouse/touch effects
 - automatically smart resizing 
 - optimised for retine displays

## Why

Since I never worked with SVG before I first tried 
(see previous approaches for older versions)

svg dashed line
- nachteil pfad muss direkt modifiziert werden
- dazu müssten kontrollpunkte gemeinsam gezogen werden, einen alleine sieht komisch aus. könnte man mit mit übergeordnetem kontrollpunlt machen aber scheint aufwändig

webgl shader
- effekt: shader maps
- pfad aus svg? flow field? diskrete werte?
- zeichnen?
- ez and nice interaction with displacement effect based on mouse position

canvas2d
- effekt: circle-point collision
- diskrete werte
- pfad aus svg? diskrete werte?
- zeichnen einfach

diskretisieren + interpolieren
- lookup tabelle mit wert der hinzuaddiert wird, nachteil drift
- lookup table mit neuer pos
- nachteil: speed kann nicht angepasst werden. höchstens beim entwerfen der tabelle

## How

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

And you should see the magic happen. 
