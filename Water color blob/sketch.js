//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      

var Canvass;

var hexagon = [ ]

function preload() {

}

function setup() {
    Canvass = createCanvas(400,420);
    background(51);

    ellipse(0.5*width,0.5*height,10)
    let vec = createVector(1,0).setMag(120);
    for (let i = 0; i < 6; i++){
        hexagon.push({x:vec.x + width/2,y:vec.y+height/2})
        vec.rotate(PI/3);
    }
    drawTheShape(hexagon);
    noLoop();
}

function draw() {

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}

function drawTheShape(theShape){

    push()
    stroke(200);
    noFill();
    strokeWeight(3);
    beginShape()
        for (let pt of theShape){
            vertex(pt.x,pt.y)
            ellipse(pt.x, pt.y, 10)
        }
    endShape(CLOSE)

    pop()
}


function getNewShape(){

}

