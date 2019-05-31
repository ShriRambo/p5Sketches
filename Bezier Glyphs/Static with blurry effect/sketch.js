var Canvass;

const R = 70;
let theta = 0;

let pts = [];
let nCurves = 20;
let npts = nCurves*2 ; // Add 2 if curve is not closed.


function preload() {

}

function setup() {
    Cannvass = createCanvas(400,400);
    let bgCol = 0;
    background(bgCol);
    generateCpts();

    acurve = new LongCurve(pts);

    translate(width/2,height/2);

    drawArt();
    filter(BLUR,50)
    background(bgCol,40);
    drawArt();
    noLoop();
}



function draw() {

}

function generateCpts(){

     // Adding first curve i.e. first 4 points
     for(let i = 0; i < npts; i++){
        let v = p5.Vector.fromAngle(theta, R + randomGaussian(40,20));
        pts.push(v)
        theta += 3/TWO_PI;
    }
    //Last tow points are same as first two points to close the curve. 
    pts.push(pts[0]);
    pts.push(pts[1]);

}


function drawArt(){
    for(let k = 0; k < 100; k++){
        acurve.show();
        acurve.perturb();
        acurve.strWt = 0.1;
    }
    //acurve.show();

}





function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}

