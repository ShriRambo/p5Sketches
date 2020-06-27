//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      
 

var Canvass;
var capturer
var rendering = false;

const nx = 100
const ny = 100
const dxy = 10
const rxy  = 7

const sprate = 0.01
const trate = 0.1
const dn = 500

var xs = []
var ys = []

var bgcol = "#000117"
var dcol = "#D8F426"


function setup() {
    Canvass = createCanvas(nx*dxy,ny*dxy);

    for(let i = 0; i < nx; i++){
        xs[i] = []
        ys[i] = []
        for (let j = 0; j  < ny; j++){
            xs[i][j] = i*dxy + 0.5*dxy 
            ys[i][j] = j*dxy + 0.5*dxy 
        }
    }

    
    background(bgcol);
    plotGrid()
    // frameRate(5)
    setupRenderer()
    // noLoop();
    
}

function draw() {

    background(bgcol);
    plotGrid()
    if (rendering) {
        capturer.capture(document.getElementById('defaultCanvas0'));
        if (frameCount % 30 == 0){
            console.log("seconds")
        }
    }

}

function plotGrid(){
    fill(dcol);
    noStroke();
    ellipseMode(CENTER)
    for(let i = 0; i < nx; i++){
        for (let j = 0; j  < ny; j++){

            let x = xs[i][j] + 2*noise(xs[i][j]*sprate  + 100, ys[i][j]*sprate ,  (frameCount)*trate)     - 1  +   0.00151*(i*dxy + 0.5*dxy - xs[i][j])**3
            let y = ys[i][j] + 2*noise(ys[i][j]*sprate + 999  , xs[i][j]*sprate ,  (frameCount+999)*trate) - 1 +   0.001051*(j*dxy + 0.5*dxy - ys[i][j])**3

            xs[i][j] = x
            ys[i][j] = y
           

            ellipse(x,y, rxy)
        }
    }
}

function setupRenderer() {
    capturer = new CCapture({ format: 'png'});
    capturer.start();
    

    rendering = true
}

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
    if ((keyCode == ESCAPE) & rendering) {

        // save(Canvass, "sketch.jpg")
        capturer.stop()
        capturer.save()

    }
}



