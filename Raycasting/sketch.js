var Canvass;

let b;

function setup() {
    Cannvass = createCanvas(400,400);
    background(51);

    b = new Boundary(200,200, 300,300);
    b.show();
    
}

function draw() {
    
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}

function save() {
    name = 'Sketch'
    saveCanvas(Canvass,name,'jpg');
}


