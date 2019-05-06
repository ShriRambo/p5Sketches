var Canvass;

var ctr;
var npts = 1000;
var Z0 = 0
var L;
var nrings = 25;
var wiggelParam = 0.02;
var sc = 2;
var rad = sc*160;


// Colors
var bg = "#fffdf2"
var ri = "#262626"

// Grunge texture
var tex;


function preload(){
    tex = loadImage('texture.png'); // Load the image
}

function setup() {
    pixelDensity(1);
    Cannvass = createCanvas(sc*400,sc*400);
    Treerings = createGraphics(sc*400, sc*400);
    drawRings();


    noLoop();
    
}
/*
function draw(){
    background(51);
    translate(width/2,height/2);
    drawRing(rad);
    Z0 = Z0 + 0.01;
    
}





for(var i = 0; i < nrings; i++){
        drawRing(rad+i*4)
        Z0 = Z0 + 0.03;
    }


*/

function drawRings(){
    Treerings.translate(width/2,height/2);
    background(bg);

   

    // Outer Ring
        //randomSeed(12345);
        Treerings.noStroke();
        Treerings.fill(ri)
        //wiggelParam = 0.03;
        drawRing(rad);
    //Second outer ring
        rad = rad - sc*10;
        //randomSeed(12345);
        //wiggelParam = 0.02;
        Treerings.fill(bg)
        drawRing(rad);
    
    // Inner rings
        
        Treerings.noFill();
        Treerings.stroke(ri)
        for(var i = 0; i < nrings; i++){
            rad = rad - sc*4 - sc*randomGaussian()
            Treerings.strokeWeight(sc*(0.4+random()))
            drawRing(rad)
            Z0 = Z0 + 0.03;
        }

    // Second inner rings
        rad = rad - 20;
        for(var i = 0; i < nrings/2; i++){
            rad = rad - sc*4 - sc*randomGaussian()
            if(rad<0){break;}
            Treerings.strokeWeight(sc*(0.4+random()))
            drawRing(rad)
            Z0 = Z0 + 0.03;
        }



    // MAsking Grunge effect 
        processMask()   
        Trr = Treerings.get();
        Trr.mask(tex);
        //image(Trr,0,0); 
        
        push();
           translate(width/2,height/2);
           rotate(random(0,TWO_PI));
           imageMode(CENTER);
           image(Trr,0,0); 
        pop();
        

}

function drawRing(rad){
    var L = 0
        Treerings.beginShape();
        for(var i=0;i<= npts; i++){
            X0 = wiggelParam*(100 + rad*cos(L));
            Y0 = wiggelParam*(100 + rad*sin(L));
            rad_ = rad + 50*noise(X0,Y0,Z0);
            X = rad_*cos(L);
            Y = rad_*sin(L);
            
            vertex(X, Y);
            L = L + TWO_PI/npts;
        }   
        Treerings.endShape();

   
}



function processMask(){
    // Temporary fix until https://github.com/lmccart/p5.js/pull/533
    tex.loadPixels();
    for (var i = 0; i < tex.pixels.length; i+=4) {
     tex.pixels[i] = 255;
     tex.pixels[i+1] = 255;
     tex.pixels[i+2] = 255;
     tex.pixels[i+3] = 255-tex.pixels[i+3]+50;
  }
  tex.updatePixels();
  
}



function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');

        noLoop();
        saveCanvas(Canvass, 'jpg');
    }
}



