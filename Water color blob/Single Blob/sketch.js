//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      

var Canvass;

var hexagon = [ ]
var stdev = 20;

function preload() {

}

function setup() {
    Canvass = createCanvas(600,600);
    background(240);

   createBasicShape();
   drawBlob();
   
  
 
  
    noLoop();
}

function createBasicShape(){
    let vec = createVector(1, 0).setMag(120);
    for (let i = 0; i < 6; i++) {
        hexagon.push({ x: vec.x + width / 2, y: vec.y + height / 2 })
        vec.rotate(PI / 3);
    }
}

function drawBlob(){
    for (let k = 0; k < 30; k++) {
        drawLayer();
        stdev = 20;
    }
}
function drawLayer() {
    
    let shp = hexagon
    for (let i = 0; i < random(10,20); i++) {
         shp = getNewShape(shp);
         stdev *= 0.8
    }
    drawTheShape(shp)
}
// #2A509D12  #F5675712  #EB1B2012 #44B04912 #EECD0D12 #93D7F112

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}

function drawTheShape(theShape){

    push()
    noStroke();
    // stroke(0);
    // strokeWeight(2)
    fill("#00000012")
    beginShape()
        for (let pt of theShape){
            vertex(pt.x,pt.y)
            // ellipse(pt.x, pt.y, 10)
        }
    endShape(CLOSE)

    pop()
}


function getNewShape(theShape){

    newShape = []

    newShape[0] = theShape[0]
    for (let i = 1; i < theShape.length; i++){
        newShape.push(get1Point(theShape[i - 1], theShape[i], stdev));
        newShape.push(theShape[i]);
    }
    newShape.push(get1Point(theShape[theShape.length - 1], theShape[0], stdev));

    return newShape

}

function get1Point(P1,P2,std){
    let wt = random(0.2,0.8)
    let nor = createVector(P2.x - P1.x, P2.y - P1.y).rotate(-PI / 2).setMag(abs(4*std *noise(0.01*P1.x, 0.01*P1.y)* randomGaussian()));
    let newPt = {
        x: P1.x * wt + P2.x * (1 - wt) + nor.x,
        y: P1.y * wt + P2.y * (1 - wt) + nor.y
    };

    return newPt

}


function keyPressed(){
    if(keyCode === BACKSPACE){
        save(Canvass,"blob")
    }
}