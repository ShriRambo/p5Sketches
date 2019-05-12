var Canvass;

let bounds = [];
let orb;



function setup() {
    Canvass = createCanvas(840,360*2);
    background(51);

    initBiundaries();

    orb = new Orb();
    orb.update(width/2,height/4);

    
}

function draw() {
    background(51);

    for(bound of bounds){
        bound.show();
    }

    orb.show();
    orb.updateScene();
    //orb.update(mouseX,mouseY);

    if(keyIsDown(LEFT_ARROW)){
        orb.rotateCamera(-1);
    }else if(keyIsDown(RIGHT_ARROW)){
        orb.rotateCamera(1);
    }else if(keyIsDown(UP_ARROW)){
        orb.move(1);
    }else if(keyIsDown(DOWN_ARROW)){
        orb.move(-1);
    }
    

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }

}



