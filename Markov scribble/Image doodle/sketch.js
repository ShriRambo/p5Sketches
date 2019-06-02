var Canvass;

var scribbles = [];
let nScribbles = 5;
var lkMat = [];
let dr = true;

let img;

function preload() {
    img = loadImage('./batman.png');
   
}

function setup() {
    img.resize(400,0);
    Cannvass = createCanvas(400,img.height);
    background(255);
    //frameRate(20);
   

    processImg2();

    for(let i = 0; i < nScribbles; i++){
        scribbles[i] = new Scribble(lkMat);
       //scribble.show();
    }
    

    //noLoop();
    
   
}


function processImg(){

    img.loadPixels();
    let row = []
    for(let x = 0; x < width; x++){
        let col = []
        for (let y = 0; y < height; y++){
            let pxId = width*y + x;
            let chId = pxId*4;
            let val = 2;
            if (img.pixels[chId + 3] > 200 ) val = 255.1 -  (img.pixels[chId] + img.pixels[chId + 1] + img.pixels[chId + 2])/3;
            col[y] = val;

        }
        row[x] = col
    }

    lkMat = row;

}



function processImg(){

    img.loadPixels();
    let row = []
    for(let x = 0; x < width; x++){
        let col = []
        for (let y = 0; y < height; y++){
            let pxId = width*y + x;
            let chId = pxId*4;
            let val = 2;
            col[y] = val;

        }
        row[x] = col
    }

    lkMat = row;

}








function draw() {

    background(255,255,255,1);

    if(dr){
        for(let scribble of scribbles){
            scribble.update();
            scribble.show();
        }
    }
        




}





function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        //noLoop();
        dr = false;
    }
}



