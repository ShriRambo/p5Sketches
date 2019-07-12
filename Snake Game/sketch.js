var Canvass;


function preload() {

}

function setup() {
    Canvass = createCanvas(400,420);
    background(51);
    
}

function draw() {

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



