//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var capturer
// var rendering = false;


function preload() {

}

function setup() {
    Canvass = createCanvas(400,420);
    background(51);
    // setupRenderer()
    noLoop();
    
}

function draw() {

    // if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));

}

function setupRenderer() {
    capturer = new CCapture({ format: 'webm', framerate: frameRate() });
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



