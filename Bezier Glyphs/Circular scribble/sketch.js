var Canvass;

const R = 70;
let theta = 0;

let pts = [];
let nCurves = 50;
let npts;


function preload() {

}

function setup() {
    Cannvass = createCanvas(400,400);
    background(51);
    
    npts = nCurves*2  + 2;

    stroke(255);
    strokeWeight(2);

    // Adding first curve i.e. first 4 points
    for(let i = 0; i < npts; i++){
        let v = p5.Vector.fromAngle(theta, R + randomGaussian(0,50));
        pts.push(v)
        theta += 3/TWO_PI;
    }
    //Last tow points are same as first two points to close the curve. 
    //pts.push(pts[0]);
    //pts.push(pts[1]);

  

    background(51);

    stroke(255);
    strokeWeight(2);
    noFill();
    translate(width/2,height/2);

    drawCurve2();

   // noLoop();
}



function draw() {

    background(51);
    push();

        stroke(255);
        strokeWeight(2);
        noFill();
        translate(width/2,height/2);
        drawCurve2();
        
        // Removing and adding 2 points.
        for(let k = 0; k < 2; k++){
            pts.shift();
            let v = p5.Vector.fromAngle(theta, R + randomGaussian(40,20));
            pts.push(v)
            theta += 3/TWO_PI;
        }
        

    pop();



}


function drawCurve1(){
    
    // Drawing continuous bezier curve with multiple bezier curves.
    for(let i = 0; i < nCurves; i++){
        let idx = i*2;
        bezier(
            0.5 * (pts[idx].x +pts[idx+1].x), 0.5 * (pts[idx].y +pts[idx+1].y),
            pts[idx+1].x,  pts[idx+1].y,
            pts[idx+2].x,  pts[idx+2].y,      
            0.5 * (pts[idx+2].x +pts[idx+3].x), 0.5 * (pts[idx+2].y +pts[idx+3].y)
        );
    }
}


function drawCurve2(){

    
    // Drawing continuous bezier curves with shape
    beginShape();
        vertex(
            0.5 * (pts[0].x +pts[1].x), 0.5 * (pts[0].y +pts[1].y),
            );
            for(let i = 0; i < nCurves; i++){
                let idx = i*2;
            bezierVertex(
                pts[idx+1].x,  pts[idx+1].y,
                pts[idx+2].x,  pts[idx+2].y,      
                0.5 * (pts[idx+2].x +pts[idx+3].x), 0.5 * (pts[idx+2].y +pts[idx+3].y)
            );
        }
    endShape();
}



function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



