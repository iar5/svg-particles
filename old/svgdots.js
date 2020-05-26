// example with svg dots

queue().defer(d3.xml, "assets/KV.svg", "image/svg+xml").await(ready);

function ready(error, xml) {
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("body").node().appendChild(importedNode);

    var svg = d3.select("svg");

    var paths = svg.selectAll("path"); 
    paths[0].forEach((path, i) => {
        createAnimation(svg, paths[0][i])        
    });
}

function createAnimation(svg, path){

    const circles_count = 10
    for(let i=0; i<=circles_count; i++){
        let marker = svg.append("circle");
        marker.style("fill", "#69b3a2");
        marker.attr("r", 7).attr("transform", "translate(0, 0)");
        transition(marker, path, i/circles_count)
    }
}

function transition(marker, path, offset) {
    marker.transition()
        .duration(40000)
        .ease("easeLinear")
        .attrTween("transform", translateAlong(path, offset))
        .each("end", () => transition(marker, path, offset)); // infinite loop
}

/**
 * 
 * @param {*} path 
 * @param {number} offset offset percentage as float in range [0;1]
 */
function translateAlong(path, offset) {
    let l = path.getTotalLength();
    return function (i) {
        return function (t) {
            let progress = t+offset
            if(progress>1) progress -= 1 // because getPointAtLength only working in range [0;1]
            let pos = path.getPointAtLength(progress*l);            
            return "translate(" + pos.x + "," + pos.y + ")"; // Move marker
        }
    }
}