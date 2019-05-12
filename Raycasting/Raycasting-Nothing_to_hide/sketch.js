var Canvass;

let bounds = [];
var orbs = [];



function setup() {
    Cannvass = createCanvas(840,360);
    background(51);

    initBiundaries();

    orb = new Orb(createVector(0,0));
    orb.update(width/2,height/2);
    orbs.push(orb);

    var dirn; 
    let N = 13;
    dirn = createVector(10,0);
    for(var i = 0; i < N; i++){
        orb = new Orb(dirn);
        orb.update(width/2, height/2);
        dirn.rotate(TWO_PI/N)
        orbs.push(orb);
    }
    
}

function draw() {
    background(51);

    // for(bound of bounds){
    //     bound.show();
    // }

    for(var orb of orbs){
        orb.show();
        orb.update(mouseX,mouseY);
    }



   
    
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



