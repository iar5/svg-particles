// example with svg border

queue().defer(d3.xml, "assets/KV.svg", "image/svg+xml").await(ready);

function ready(error, xml) {
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("body").node().appendChild(importedNode);

    var svg = d3.select("svg");
}



var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = `
    path {
        animation: dash 70s linear;
        stroke-linecap: "round";
        stroke-width: 5;
        stroke-dasharray: 0.002 10
      }
      
      @keyframes dash {
        to {
          stroke-dashoffset: 1000;
        }
      }`
document.head.appendChild(styleSheet)