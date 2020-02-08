//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
let inCanvas = true

var symm = 32
let mx = 0, my = 0, pmx, pmy

let n1 = 0
let n2 = 0

var slider

var clearBtn

var autoDraw 
var spoiroVec

var bgcol =  "#F0F0F0"//"#FFFEEA" //"#161315" // 25

var cpickFn

var palette = ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6", "#FFEAD0"]
//Lemon 2 ["#FB6435", "#FFA723", "#BDE500", "#5EBC03", "#078266"]
//["#FB6435", "#fd2bff", "#c202d3", "#5e0fff", "#1905d9"]


// Lemon ["#D19402", "#FFE245", "#FFEAA4", "#80A300", "#2D3F01"]

// Lemon

// Neon 1  ["#f3d6e9" , "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]
// p1  ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ]


// GOld :   ['#b39700','#ccac00','#e6c200','#ffd700','#ffdb1a','#ffdf33','#ffe34d']



function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    colorMode(HSB, 255,255,255, 255)
    angleMode(RADIANS);

    slider = createSlider(1, 30, 8, 0.1)
    clearBtn = createButton("Clear")
    clearBtn.mousePressed(clearCanvas)
    autoDraw = createCheckbox('Autodraw', false);

    cpickFn = chroma.scale(palette);
    spoiroVec = createVector(50,0);

    
}

function clearCanvas(){
     background(bgcol)
}
   
function draw() {

    
    // console.log(inCanvas)
    setDrawLocation()
    // background("#ffffff")
    // background(25,50)

    if ( inCanvas) {
        translate(width / 2, height / 2)
        let col = 51 //pickCol(n1)
        let bsz = slider.value()  //15 + 25 * noise(n2) //slider.value()  //
        // console.log(hu)
        
        n1 += 0.05
        n2 += 0.05
        stroke(col)
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

        mspd = 0.001

        // Moving points with perlin noise
        mx = 1.5 * width * (noise(frameCount * mspd) - 0.5)
        my = 1.5 * height * (noise(1000, frameCount * mspd) - 0.5)

        // Circle with moving center
        // mx= mx + spoiroVec.x
        // my = my + spoiroVec.y

        spoiroVec.rotate(0.1)


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
    if(keyCode == ESCAPE){

        save(Canvass, "sketch.jpg")

    }
}



function pickCol(x) {

    // let hu = 360 * (1 + sin(x)) / 2
    x = noise(x)
    let chs = cpickFn(x)
    return chs.hex()  //color(chs[0],chs[1],chs[2]);
    
    // return color(hu, 150, 255)

}


