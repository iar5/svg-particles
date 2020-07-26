import desktopSVG from './svg_desktop.js'
import mobileSVG from './svg_mobile.js'


export default const Stage = (function(canvas, isMobile){
    const PATHS = isMobile ? mobileSVG : desktopSVG

    const SVGwidth = isMobile ? 400 : 1600 // sizes used in the svg file
    const SVGheight = isMobile ? 800 : 800
    const MR = isMobile ? 100 : 150 // mouse radius

    // following values depend on sample size
    const SPEED = 0.1 // float 
    const SPEED_SP = 2 // int only! (for speed particles)
    const PARTICLE_OFFSET = 12 
    
    const S = 2 // canvas scale giving  for retina
    const ctx = canvas.getContext("2d");
    ctx.scale(S, S)
    var drawOffset = []

    resize()

    var touching = false
    var touch_visibility = 1

    var mousepos = []; // in svg/canvas coord space
    var mousePosTemp = [];
    ['mousemove', 'touchmove'].forEach(function(t) {
        window.addEventListener(t, e => { 
            if(paused) return

            touching = true
            touch_visibility = 1

            if(e.touches) 
                getMousePosInCanvas(canvas, e.touches[0], mousePosTemp)
            else 
                getMousePosInCanvas(canvas, e, mousePosTemp)
            mousepos[0] = mousePosTemp[0] * (canvas.width/canvas.clientWidth)/S - drawOffset[0]
            mousepos[1] = mousePosTemp[1] * (canvas.height/canvas.clientHeight)/S - drawOffset[1]
        });
    });
    ['touchstart', 'mousemove', 'touchmove'].forEach(function(t) {
        window.addEventListener(t, e => { 
            touching = false
        })
    })


    var paused = false
    var t = 0
    var speedparticles = []
    var posTemp = [] 

    draw()    
    function draw(){
        window.requestAnimationFrame(draw)
        if(paused) return

        ctx.fillStyle ="#1C1F40"
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        touch_visibility += touching? 0.01 : -0.01
        touch_visibility = Math.min(Math.max(touch_visibility, 0), 1);

        t++
        let o = (t*SPEED)%PARTICLE_OFFSET  
        for(let i=0; i<PATHS.length; i++){
            let path = PATHS[i]

            for(let i=PARTICLE_OFFSET; i<path.length-1; i+=PARTICLE_OFFSET){
                let s = i-o
                let j = s%1      
                s=Math.floor(s)
                interpolate(path[s], path[s+1], j, posTemp)
                drawCircle(posTemp)
            }       
        }  

        // SPEED PARTICLES
        // spawn 
        if(Math.random()>0.99){
            let id = Math.floor(Math.random()*PATHS.length)
            speedparticles.push({
                pathId: id,
                progress: PATHS[id].length-1
            })
        }
        // delete 
        speedparticles = speedparticles.filter(p => {
            return p.progress >= 0
        })
        // update and draw
        for(let i=0; i<speedparticles.length; i++){
            let p = speedparticles[i]
            let pos = PATHS[p.pathId][p.progress];
            
            drawCircle(pos, true);
            p.progress-=SPEED_SP
        }  
    }

    function drawCircle(pos, isSpeedDot){
        let size
        if(isSpeedDot){
            size = 4*S
            ctx.fillStyle = '#F2D956';
        } else {
            size = 3*S
            ctx.fillStyle = '#6A51E1';
        }

        let dist = distance(pos, mousepos)
        if(dist < MR)
            size *= 1+((1-dist/MR)*5)*touch_visibility

        ctx.beginPath();
        ctx.arc((pos[0]+drawOffset[0])*S, (pos[1]+drawOffset[1])*S, size, 0, Math.PI<<2);
        ctx.fill()
        ctx.stroke(); 
    }


    window.addEventListener("resize", resize)

    function resize(){   
        canvas.width = SVGwidth*S
        canvas.height = SVGheight*S
        let svgRatio = SVGwidth/SVGheight        

        let parentElement = canvas.parentElement        
        let pw = parentElement.clientWidth
        let ph = parentElement.clientHeight
        let parRatio = pw/ph

        drawOffset = [0, 0]
        if(svgRatio < parRatio){            
            canvas.style.height = "unset"
            canvas.style.width = "100%"
            drawOffset[0] = 0
            drawOffset[1] = (SVGheight*(ph/pw-SVGheight/SVGwidth))/2
        } else {
            canvas.style.height = "100%"
            canvas.style.width = "unset"
            drawOffset[0] = (SVGwidth*(parRatio-svgRatio))/4
            drawOffset[1] = 0
        }
        parentElement.style.overflow = "hidden"
    }


    /**
     _____       _     _ _          __                  _   _                 
    |  __ \     | |   | (_)        / _|                | | (_)                
    | |__) |   _| |__ | |_  ___   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    |  ___/ | | | '_ \| | |/ __|  |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    | |   | |_| | |_) | | | (__   | | | |_| | | | | (__| |_| | (_) | | | \__ \
    |_|    \__,_|_.__/|_|_|\___|  |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/      
        */
    return {
        play(){
            paused = false
        },
        pause(){
            paused = true
        },
        isPlaying(){
            return !paused
        }
    }
})



// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePosInCanvas(canvas, event, result=[]) {
    var rect = canvas.getBoundingClientRect();    
    result[0] = event.clientX - rect.left
    result[1] =  event.clientY - rect.top
    return result
}

function distance(pos1, pos2){
    let a = pos1[0]-pos2[0]
    let b = pos1[1]-pos2[1]
    return Math.sqrt(a*a + b*b);
}

function interpolate(pos1, pos2, t, result=[]){
    result[0] = (1-t)*pos1[0] + t*pos2[0]
    result[1] = (1-t)*pos1[1] + t*pos2[1]
    return result
}
