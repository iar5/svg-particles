(readme.md work in progress)

# SVG Path Animation

## Description

## What

goal was to animate particles along multiple paths
the final result is based on svg path (spline) discretized particle movement
there are some older approches in this repository included

On top there are some mouse interaction and special particles

smooth mouse/touch effects
interpolatopn between discretized points to compress lower sample rates (to save file size)

performant, smooth, small

Showcase: https://iar5.github.io/svg-particles/app/

## Why

I testes  (see previous approaches for older versions)

svg dashed line
- nachteil pfad muss direkt modifiziert werden
- dazu müssten kontrollpunkte gemeinsam gezogen werden, einen alleine sieht komisch aus. könnte man mit mit übergeordnetem kontrollpunlt machen aber scheint aufwändig


webgl 
- effekt: shader maps
- pfad aus svg? flow field? diskrete werte?
- zeichnen?

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

In `discretizer/discretize.js` set the path to your svg file and adjust `DEC` and `SAMPLESTEP` to your needs and SVG sizing.

``` bash
cd discretizer
http-server
```

and open http://127.0.0.1:8080 in your browser. If everythink worked fine you will see an array of numbers, which is the discretized represenations of your SVG file. Save the output in a way making it accessable for a `app/main.js` (e.g. create a variable or save it in a separate file like I did with `app/svg_desktop.js`).

### 2. Run application

``` bash
cd ..
cd app
http-server
```

And you should see the magic happen. 
