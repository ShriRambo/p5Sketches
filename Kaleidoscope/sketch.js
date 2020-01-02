//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
let inCanvas = true

var symm = 6
let mx = 0, my = 0, pmx, pmy

let n1 = 0
let n2 = 0

var slider

var clearBtn

var autoDraw 

var bgcol = 25



function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    colorMode(HSB, 360,255,255, 255)
    angleMode(RADIANS);

    // slider = createSlider(8, 30, 8, 0.1)
    clearBtn = createButton("Clear")
    clearBtn.mousePressed(clearCanvas)
    autoDraw = createCheckbox('Autodraw', false);

    
}

function clearCanvas(){
     background(bgcol)
}
   
function draw() {

    
    // console.log(inCanvas)
    setDrawLocation()
    // background("#ffffff")

    if ( inCanvas) {
        translate(width / 2, height / 2)
        let hu = 360*(1 + sin(n1) )/2
       let bsz = 15 + 25*noise(n2) //slider.value()
        // console.log(hu)
        n1 += 0.05
        n2 += 0.05
        stroke(hu, 150, 255)
        strokeWeight(bsz)
        for(let i = 0; i < symm; i++){
            rotate(2*PI/symm)
            push()
            line(mx, my, pmx, pmy)
            pop()
            push()
            scale(-1,1)
            line(mx, my, pmx, pmy)
            pop()
        }

    }
}

function setDrawLocation(){

    if(autoDraw.checked()){
        pmx = mx
        pmy = my
        mx = 1.5* width * ( noise(frameCount/50) - 0.5 )
        my = 1.5 * height * (noise(1000, frameCount / 50) - 0.5)

        inCanvas = true

    }else{
        mx = mouseX - width / 2
        my = mouseY - height / 2
        pmx = pmouseX - width / 2
        pmy = pmouseY - height / 2

        inCanvas = mouseIsPressed && (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
    }
}

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        // save(Canvass, "sketch.jpg")
    }
}



