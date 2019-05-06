var Canvass;

var Xss 
var Yss

var Xs0
var Ys0


var rad = 80;
var npts = 7;
var idx = 0;
var Z0 = 0
var L = 0;
var nrings = 20;
var wiggelParam = 50;


// Colors
var bg = 51
var wh = 225


function setup() {

    Cannvass = createCanvas(400,420);
    noFill();
    stroke(255);
    strokeWeight(4);

}

function draw(){
    background(51);
    translate(width/2,height/2);
    drawLoop(rad);
    Z0 = Z0 + 0.01;

    noLoop();
    
}

function getAPoint(){
    X0 = wiggelParam*(100 + rad*cos(L));
    Y0 = wiggelParam*(100 + rad*sin(L));
    rad_ = rad + 50*noise(X0,Y0,Z0);
    X = rad_*cos(L);
    Y = rad_*sin(L);

    return [X,Y];
}


function add2Points(){
    for(var i=0;i < 2; i++){
        Pt = getAPoint();

        Xss.push(Pt[0]);
        Yss.push(Pt[1]);
        L = L + 2*PI/npts;

        idx += 1;
    }
}

function remove2Points(){
        Xss.shift();
        Xss.shift();
        Yss.shift();
        Yss.shift();
}

function drawACurve(){
    bezier(
        Xss[0],Yss[0],
        Xss[1],Yss[1],
        Xss[2],Yss[2],
        Xss[3],Yss[3],
       ); 
}


function drawLoop(rad){
    Xss = []
    Yss = []

    add2Points()

    while(idx < npts){
        add2Points();
        drawACurve();
        remove2Points();

    }

  

}



function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');

        noLoop();
        //saveCanvas(Canvass, 'jpg');
    }
}



