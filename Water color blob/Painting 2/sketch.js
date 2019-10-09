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


var shapeSTR = [ 
    '{"data":[{"x":454,"y":63},{"x":543,"y":98},{"x":537,"y":192},{"x":450,"y":240},{"x":379,"y":198},{"x":376,"y":127}],"wtss":[20,25,30,20,25,25],"col":"#ffec4712"}',

    '{"data":[{"x":454,"y":81},{"x":525,"y":109},{"x":520,"y":184},{"x":450,"y":222},{"x":394,"y":189},{"x":392,"y":131}],"wtss":[20,20,20,20,20,20],"col":"#ff570a12"}',
]
// var xval, yval;

// var roughSketch;

// var shp = []

// function preload(){
//     roughSketch = loadImage("./roughSketch.png")
// }

// function mouseClicked(){
//     let pt = { x: mouseX, y: mouseY }
//     console.log(pt);
//     shp.push(pt)
// }

function setup() {
    Canvass = createCanvas(600,900);
    let d = window.pixelDensity();
    paint = createGraphics(d*width, d*height);
    background(240);

    // xval = document.getElementById("#X");
    // yval = document.getElementById("#Y");
    // roughSketch.resize(width,height)
    // image(roughSketch,0,0);

    createBasicShapes();

    // for(let blob of blobs) blob.showShape();
    // drawPainting();
    noLoop();
}

// function draw(){
//     // xval.innerHTML = mouseX;
//     // yval.innerHTML = mouseY;
// }


function createBasicShapes(){

    for(let shp of shapeSTR){
        let theShp = JSON.parse(shp);
        let blob = new ABlob(theShp.data, theShp.wtss, theShp.col)
        blobs.push(blob)
    }

    let mt = createAMountain();
    let blob = new ABlob(mt.data,mt.wtss,mt.col);
    blobs.push(blob);

}


function createAMountain(){

    let mts = []
    let wtss = []

    //  Upper part of mountain
    for(let i = 0; i < 20; i++){
        mts[i] = {
            x: i*width/18 + random(-20,20),
            y: 200 + i*15 + random(-10,10)
        }
        wtss[i] = 5;
    }

    // Lower part of mountain
    let clen =  mts.length
    for(let i = clen-1; i >= 0; i--){
        mts.push( {
            x: mts[i].x + random(-10,10),
            y: mts[i].y + 20 +  random(-5, 5)
        });
        wtss.push( random(20,80));
    }

    return  {data:mts, wtss:wtss, col:"#00000012"}
}

function drawPainting(ibl){

    paint.clear();
    let drawBlobs 
    if (typeof  ibl != "undefined"){
        drawBlobs =[blobs[ibl]]
    }else{
        drawBlobs = blobs
    }
   

    for (let i = 0; i < 10; i++) {
        for (let blob of drawBlobs) {
            blob.resetShape();
            for (let j = 0; j < random(3, 20); j++) {
                blob.nextLevel();
            }
            blob.drawTheShape();
            
        }


    }

    image(paint,0,0);   


}

// function drawLayer() {
    

    
// }
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
        this.nCurves = 0.5 * coord.length - 1 // Number of curves

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
        this.nCurves = 0.5 * this.coord.length - 1 // Number of curves
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
        this.nCurves = 0.5 * this.coord.length - 1 // Number of curves

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

    drawSmoothShape(){

        let curvcord = []
        let nloops = 6
        for(let i = 0; i < nloops; i++){
            this.resetShape()
            this.nextLevel()
            curvcord = curvcord.concat(this.coord.slice())
        }
        let nCurves = 0.5 * curvcord.length - 1 // Number of curves
         // Drawing continuous bezier curves with shape
         push();
         stroke(255,200);
         strokeWeight(1);
         noFill();

         beginShape();
        vertex(0.5 * (curvcord[0].x + curvcord[1].x),
            0.5 * (curvcord[0].y + curvcord[1].y), );

         for (let i = 0; i < nCurves; i++) {
             let idx = i * 2;
             bezierVertex(
                 curvcord[idx + 1].x, curvcord[idx + 1].y,
                 curvcord[idx + 2].x, curvcord[idx + 2].y,
                 0.5 * (curvcord[idx + 2].x + curvcord[idx + 3].x), 0.5 * (curvcord[idx + 2].y + curvcord[idx + 3].y)
             );
         }
         endShape();
         pop();
    }
}

