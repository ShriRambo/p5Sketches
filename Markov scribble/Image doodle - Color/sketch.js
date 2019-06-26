var Canvass;

var scribbles_R = [];
var scribbles_G = [];
var scribbles_B = [];
let nScribbles = 5;

var lkMat_R = [];
var lkMat_G = [];
var lkMat_B = [];

let img;

function preload() {
    img = loadImage('./rose.jpg');
   
}

function setup() {
    img.resize(400,0);
    Cannvass = createCanvas(400,img.height);
    background(0);
   

    processImg();

    for(let i = 0; i < nScribbles; i++){
        scribbles_R[i] = new Scribble(lkMat_R,'#FF0000');
        scribbles_G[i] = new Scribble(lkMat_G,'#00FF00');
        scribbles_B[i] = new Scribble(lkMat_B,'#0000FF');
       //scribble.show();
    }
    

    //noLoop();
    
   
}


function processImg(){

    img.loadPixels();
    let row_r = [];
    let row_g = []
    let row_b = []
    for(let x = 0; x < width; x++){
        let col_r = [];
        let col_g = [];
        let col_b = [];
        for (let y = 0; y < height; y++){
            let pxId = width*y + x;
            let chId = pxId*4;
            let del = 0.1;
            col_r[y] = del + img.pixels[chId] ;
            col_g[y] = del + img.pixels[chId + 1] ;
            col_b[y] = del + img.pixels[chId + 2] ;

        }
        row_r[x] = col_r;
        row_g[x] = col_g;
        row_b[x] = col_b;
    }

    lkMat_R = row_r;
    lkMat_G = row_g;
    lkMat_B = row_b;

}








function draw() {

    //background(255,255,255,2);

    for(let scribbles of [scribbles_R, scribbles_G, scribbles_B]){
        for(let scribble of scribbles){
            scribble.update();
            scribble.show();
        }
    }
    




}





function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



