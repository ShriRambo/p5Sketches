var Canvass;

var scribble;
var lkMat = [];

function preload() {

}

function setup() {
    Canvass = createCanvas(400,400);
    Canvass.position(innerWidth/2 - width/2, innerHeight/2- height/2);
    background(255);
   

    processImg();

    scribble = new Scribble(lkMat);
    scribble.show();

    //noLoop();
    
   
}


function processImg(){

    let row = []
    for(let x = 0; x < width; x++){
        let col = []
        for (let y = 0; y < height; y++){
            let val = 1;
            if (x > width/2 & y > height/2) val = 50;
            col[y] = 1;

        }
        row[x] = col
    }

    lkMat = row;

}








function draw() {

    background(255,255,255,100);

    scribble.update();
    scribble.show();




}





function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



