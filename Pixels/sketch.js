var Canvass;

var img;
var img2;


function preload() {
    img = loadImage('hc2.jpg');
    img2 = loadImage('hc2.jpg');
}

function setup() {
    //img.resize(200,200);
    Canvass = createCanvas(img.width,img.height);
    //img2 = createImage(width,height);

    img.filter(BLUR,3);

    //getEdges();
    background(51);
    
    image(img,0,0)

    blendMode(DIFFERENCE)
    image(img2,0,0)

    filter(THRESHOLD,0.05);

    noLoop();
    
}

function getEdges(){

    //img.loadPixels();
    img2.loadPixels();

    console.log('Getting edges')

    for (let x = 0; x < img2.width; x++) {
        for (let y = 0; y < img2.height; y++) {
         //console.log(x,y);
             //let c1 = img.get(x-1,y);
             //let c2 = img.get(x,y);
             //let c = abs(brightness(c1) - brightness(c2)  );   
             img2.set(x, y, color([255*noise(x*0.01,y*0.01,100) , 255*noise(x*0.01,y*0.01,200) , 255*noise(x*0.01,y*0.01,300)]));
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



