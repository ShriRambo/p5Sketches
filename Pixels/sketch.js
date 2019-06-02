var Canvass;

var img;
var img2;


function preload() {
    img = loadImage('rose.jpg');
   // img2 = createImage(width,height);
}

function setup() {
    //img.resize(100,100);
    Canvass = createCanvas(img.width,img.height);
    img2 = createImage(width,height);

    //getEdges();
    background(51);
    
    image(img,0,0)

    noLoop();
    
}

function getEdges(){

    img.loadPixels();
    img2.loadPixels();

    console.log('Getting edges')

    for (let x = 1; x < img2.width; x++) {
        for (let y = 1; y < img2.height; y++) {
         //console.log(x,y);
             let c1 = img.get(x-1,y);
             let c2 = img.get(x,y);
             let c = abs(brightness(c1) - brightness(c2)  );   
             img2.set(x, y, color(c));
        }
    }
   img2.updatePixels();

   console.log('Got edges')

}

function draw() {

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



