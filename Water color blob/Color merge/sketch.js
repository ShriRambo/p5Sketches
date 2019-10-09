//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      

var Canvass;
var blobs = [];
var paint;

function preload() {

}

function setup() {
    Canvass = createCanvas(600,500);
    let d = window.pixelDensity();
    paint = createGraphics(d*width, d*height);
    background(240);

    createBasicShapes();
    drawPainting();
    noLoop();
}


function createBasicShapes(){

    createShape1();
    createShape2();
}

function createShape1(){
    let shape1 = [];
    let vec = createVector(1, 0).setMag(90).rotate(-PI/3);
    for (let i = 0; i < 6; i++) {
        shape1.push({
            x: vec.x + width / 4,
            y: vec.y + height / 2
        })
        vec.rotate(PI / 3);
    }
    // for(let i = 0; i < 4; i++) shape1 = getNewShape(shape1) fff60012

    let wtss = [80,70,60,50,40,50];

    blobs.push(new ABlob(shape1, wtss, "#da32fc32"));
}

function createShape2(){
    let shape1 = [];
    let vec = createVector(1, 0).setMag(90).rotate(-PI / 3).rotate(PI);
    for (let i = 0; i < 6; i++) {
        shape1.push({
            x: vec.x + 3* width / 4,
            y: vec.y + height / 2
        })
        vec.rotate(PI / 3);
    }
    // for(let i = 0; i < 4; i++) shape1 = getNewShape(shape1) ff50001A

    let wtss = [80, 70, 60, 50, 40, 50];

  blobs.push(new ABlob(shape1, wtss, "#d108084A"));

}

function drawPainting(){

    for (let i = 0; i < 10; i++) {
        for (let blob of blobs) {
            for (let j = 0; j < random(10, 25); j++) {
                blob.nextLevel();
            }
            blob.drawTheShape();
            blob.resetShape();
        }


    }

    image(paint,0,0);   


}

function drawLayer() {
    

    
}
// #2A509D12  #F5675712  #EB1B2012 #44B04912 #EECD0D12 #93D7F112



function keyPressed(){
    if(keyCode === BACKSPACE){
        save(Canvass,"blob");
    }
}



class ABlob{

    constructor(coord, wts, col){

        this.base = coord;
        this.coord = coord;
        this.wts = wts;
        this.col = col;
        this.level = 1;
        this.decay = 0.7;

    };

    showShape(){
        push();
        noFill();
        stroke(0);
        strokeWeight(3);
        beginShape();
        for(let pt of this.coord) vertex(pt.x,pt.y);
        endShape();
        pop();
    };

    resetShape(){
        this.coord = this.base;
        this.level = 1;
    };

    get1Point(P1, P2, std) {
        let wt = random(0.2, 0.8);
        let nor = createVector(P2.x - P1.x, P2.y - P1.y).rotate(-PI / 2).setMag(abs(std * randomGaussian()));
        let newPt = {
            x: P1.x * wt + P2.x * (1 - wt) + nor.x,
            y: P1.y * wt + P2.y * (1 - wt) + nor.y
        };

        return newPt;

    };

    nextLevel() {

        let newShape = [];

        newShape[0] = this.coord[0];
        for (let i = 1; i < this.coord.length; i++) {
            let stdev = this.wts[int(floor(i / (2 ** (this.level-1))))] * (this.decay ** this.level);
            let newPt = this.get1Point(this.coord[i - 1], this.coord[i], stdev);
            newShape.push(newPt);
            newShape.push(this.coord[i]);
        }
        let newPt = this.get1Point(
            this.coord[this.coord.length - 1], 
            this.coord[0], 
            this.wts[this.wts.length - 1] * (this.decay ** this.level)
            );
        newShape.push(newPt);

        this.coord = newShape;
        this.level += 1;

    };

    drawTheShape() {
        paint.push();
        paint.noStroke();
        // stroke(0);
        // strokeWeight(2)
        paint.fill(this.col);

        // Screen works better but without any background
        // paint.blendMode(SCREEN)
        paint.beginShape();
        for (let pt of this.coord) {
            paint.vertex(pt.x, pt.y);
            // ellipse(pt.x, pt.y, 10)
        }
        paint.endShape(CLOSE);
        paint.pop();
    };
}