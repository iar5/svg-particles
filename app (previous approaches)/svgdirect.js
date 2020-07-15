// <script src="https://d3js.org/d3.v3.min.js"></script>
// <script src="https://d3js.org/queue.v1.min.js"></script>

queue().defer(d3.xml, "assets/kv.svg", "image/svg+xml").await(ready);

const speed = 1
const particles_distance_between = 10 // normalized on path length

function ready(error, xml) {
    var svg = document.importNode(xml.documentElement, true);
    //d3.select("body").node().appendChild(svg);

    var paths = svg.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path")
    console.log(paths)
    
    var canvas = document.getElementById("canvas");
    var w = canvas.width = svg.getAttribute("width") // internal width, this property needs to be set in the svg file
    var h = canvas.height = svg.getAttribute("height")
    var ctx = canvas.getContext("2d");

    var mousepos = {x: undefined, y: undefined}; // in svg element coord space
    ['mousemove', 'touchmove'].forEach(function(t) {
        window.addEventListener(t, e => {
            let pos = getMousePosInCanvas(canvas, e)
            mousepos.x = pos.x * w/canvas.clientWidth 
            mousepos.y = pos.y * h/canvas.clientHeight 
        });
    });

    let t = 0;
    var lastCalledTime = Date.now();
    var fpsElem = document.createElement("p")
    fpsElem.style.position = "fixed"
    fpsElem.style.top = 0
    document.body.appendChild(fpsElem)

    draw()
    function draw(){
        window.requestAnimationFrame(draw)
        ctx.clearRect(0, 0, w, h);

        let delta = (Date.now() - lastCalledTime)/1000;
        lastCalledTime = Date.now();
        fpsElem.innerHTML = 1/delta;

        t++
        for(let i=0; i<paths.length; i++){
            drawPath(paths[i])
        }  
    }

    function drawPath(path){
        let totalLength = path.getTotalLength()
        let amount = Math.floor(totalLength/particles_distance_between)
        let o = totalLength/amount

        for(let i=0; i<amount; i++){
            let l = t*speed + o*i
            l = l % totalLength
            let pos = path.getPointAtLength(l)
            drawCircle(pos)
        }
    }

    function drawCircle(pos){

        let size = 2
        let radius = 150
        let a = pos.x-mousepos.x 
        let b = pos.y-mousepos.y
        let dist = Math.sqrt(a*a + b*b);
        if(dist < radius)
            size*= 1+(1-dist/radius)*5

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI<<2);
        ctx.stroke(); 
    }
}


// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePosInCanvas(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}




