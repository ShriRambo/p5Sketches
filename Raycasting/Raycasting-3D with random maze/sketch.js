var Canvass;

let bounds = [];
let orb;



function setup() {
    Canvass = createCanvas(840,360*2);
    background(51);

    initBiundaries();

    orb = new Orb();
    orb.update(width/nx,height/(4*ny));

    
}

function draw() {
    background(51);

    for(bound of bounds){
        bound.show();
    }

    orb.show();
    orb.updateScene();
    //orb.update(mouseX,mouseY);

    if(keyIsDown(65)){ //a
        orb.rotateCamera(-1);
    }else if(keyIsDown(68)){ //d
        orb.rotateCamera(1);
    }else if(keyIsDown(87)){//w
        orb.move(1);
    }else if(keyIsDown(83)){ //s
        orb.move(-1);
    }
    

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }

}



