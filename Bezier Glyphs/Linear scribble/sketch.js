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
    background(255);
    
    npts = nCurves*2  + 2;

   

    // Adding first curve i.e. first 4 points
    pts.push(createVector(random(0,width),random(0,height)))
    for(let i = 0; i < npts-1; i++){
        let v = getValidPoint(pts[i]);
        pts.push(v)
        theta += 3/TWO_PI;
    }
    //Last tow points are same as first two points to close the curve. 
    //pts.push(pts[0]);
    //pts.push(pts[1]);

  

    stroke(51);
    strokeWeight(2);
    strokeWeight(2);
    noFill();
    //translate(width/2,height/2);

    drawCurve2();

   // noLoop();
}


function getValidPoint(v){

    
    let flag = true;
    let foo = 0;
    let X; 
    let Y;
    while(flag & foo < 100){
        X = v.x + randomGaussian(0,60);
        Y = v.y + randomGaussian(0,60); 
        if((X > 10) & (X < width - 10) & (Y > 10) & (Y < height - 10) ) flag = false;
        foo++;
    }

    return createVector(X,Y)
}



function draw() {

    background(255,150);
    push();

        stroke(51);
        strokeWeight(2);
        noFill();
        //translate(width/2,height/2);
        drawCurve2();
        
        // Removing and adding 2 points.
        for(let k = 0; k < 2; k++){
            pts.shift();
            let v = getValidPoint(pts[pts.length - 1]);
            pts.push(v)
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
    //console.log('Drawing curve')
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



