const SVG_PATH = "./kv_desktop.svg"
const DEC = 1 // decimal 
const STEPSIZE = 2 // in pixels, corresponding to your svg path. the higher the number the less samples

queue().defer(d3.xml, SVG_PATH, "image/svg+xml").await(ready);

function ready(error, xml) {
    const svg = document.importNode(xml.documentElement, true);
    const paths = svg.getElementsByTagNameNS("http://www.w3.org/2000/svg", "path")
    
    var result = "["

    for(let i=0; i<paths.length; i++){
        let path = paths[i]
        let totalLength = path.getTotalLength()
        if(totalLength == 0) continue // idk why but happens sometimes

        result += "["
        for(let l=0; l<totalLength; l+=STEPSIZE){
            let pos = path.getPointAtLength(l)
            result += "["+Number(pos.x).toFixed(DEC) + "," + Number(pos.y).toFixed(DEC)+"],"
        }
        result = removeLastChar(result)
        result += "],"    
    }

    result = removeLastChar(result)
    result += "]"

    console.log(result)
    document.body.innerHTML = result
}

function removeLastChar(str){
    return str = str.slice(0, -1); 
}
