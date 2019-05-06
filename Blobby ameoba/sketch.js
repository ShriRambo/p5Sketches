var Canvass;

var ctr;
var rad = 80;
var npts = 10;
var Z0 = 0
var L;
var nrings = 20;
var wiggelParam = 50;


// Colors
var bg = 51
var wh = 225


function setup() {

    Cannvass = createCanvas(400,420);
    noStroke();

}

function draw(){
    background(51);
    translate(width/2,height/2);
    drawRing(rad);
    Z0 = Z0 + 0.01;
    
}


function drawRing(rad){
    var L = 0

    beginShape();
        for(var i=0;i< npts; i++){
            X0 = wiggelParam*(100 + rad*cos(L));
            Y0 = wiggelParam*(100 + rad*sin(L));
            rad_ = rad + 50*noise(X0,Y0,Z0);
            X = rad_*cos(L);
            Y = rad_*sin(L);
            
            vertex(X, Y);
            L = L + TWO_PI/npts;
        }   
    endShape(CLOSE);

   
}



function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');

        noLoop();
        //saveCanvas(Canvass, 'jpg');
    }
}



