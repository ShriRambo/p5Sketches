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
    '{"name":"sun","data":[{"x":454,"y":63},{"x":543,"y":98},{"x":537,"y":192},{"x":450,"y":240},{"x":379,"y":198},{"x":376,"y":127}],"wtss":[20,25,30,20,25,25],"col":"#ffec4712"}',

    '{"name":"sun2","data":[{"x":454,"y":81},{"x":525,"y":109},{"x":520,"y":184},{"x":450,"y":222},{"x":394,"y":189},{"x":392,"y":131}],"wtss":[20,20,20,20,20,20],"col":"#ff570a12"}',

    '{ "name": "mt1", "data": [{ "x": -5, "y": 406 }, { "x": 92, "y": 172 }, { "x": 229, "y": 403 }, { "x": 342, "y": 258 }, { "x": 497, "y": 470 }, { "x": 601, "y": 329 }, { "x": 626, "y": 887 }, { "x": -6, "y": 893 }], "wtss": [25, 20, 19, 20, 26, 20, 23, 25], "col": "#A1A7A612" }',

    '{ "name": "mt1", "data": [{ "x": -5, "y": 426 }, { "x": 92, "y": 192 }, { "x": 229, "y": 463 }, { "x": 342, "y": 268 }, { "x": 497, "y": 510 }, { "x": 601, "y": 369 }, { "x": 626, "y": 897 }, { "x": -6, "y": 903 }], "wtss": [20, 10, 13, 16, 21, 18, 20, 20], "col": "#A1A7A632" }',

    '{"name":"mt2","data":[{"x":-6,"y":523},{"x":87,"y":389},{"x":218,"y":697},{"x":274,"y":584},{"x":309,"y":636},{"x":406,"y":474},{"x":610,"y":585},{"x":610,"y":889},{"x":-3,"y":899}],"wtss":[20,30,20,20,20,20,20,20,20],"col":"#6b788212"}',

    '{"name":"mt3","data":[{"x":-5,"y":832},{"x":124,"y":777},{"x":294,"y":865},{"x":440,"y":603},{"x":598,"y":780},{"x":613,"y":904},{"x":-7,"y":903}],"wtss":[30,25,20,28,30,30,30],"col":"#3c485112"}',

    '{"name":"mt3","data":[{"x":60,"y":850},{"x":20,"y":850},{"x":40,"y":700}],"wtss":[5,15,15],"col":"#39890012"}',

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
            for (let j = 0; j < random(10, 20); j++) {
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

function drawTrees(){
    let treeCols = ["#39890012", "#a9c60012", "#80931012", "#6a931012", "#bfce1a12"]
    push()
     translate(random(-20,width/2), random(-10,10))
     blobs[6].col = random(treeCols);
     drawPainting(6);
    pop()
}


function draw10Print(){

    let dw = 20
    let nx = width/dw
    let ny = height/dw

    paint.clear()

    push()
    paint.push()
    for (let i = 0; i < nx; i++){
        for (let j = 0; j < ny; j++){
            paint.strokeWeight(2);
            paint.stroke(0);
            let x1 = i*dw;
            let x2 = (i+1)*dw

            let rn = round(random())
            let y1 =  (j + rn) * dw;
            let y2 = (j+1-rn) * dw;
            paint.line(  x1, y1, x2, y2 );
        }
    }
    let p10 = paint.get()
    tint(255, 20)
    image(p10, 0, 0);   
    paint.pop()
    pop();
    

}