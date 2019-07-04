var Canvass;

let bounds = [];
let orbs = [];



function setup() {
    Canvass = createCanvas(840,360*2);
    //Canvass.position(window.innerWidth / 2 - width / 2, window.innerHeight / 2 - height / 2);
    Canvass.parent('canvas')
    background(51);

    initBiundaries();

    var orb = new Orb();
    orb.update(width / nx, height / (4 * ny));
    orbs.push(orb)
    var p = createVector(10,0)
    for(let i = 0; i < 10; i++){
       orb = new Orb();
       orb.update(width / nx + p.x, height / (4 * ny) + p.y);
       orb.Nrays = 100
       p = p.rotate(2*PI/10);
       orbs.push(orb)
    }
    
    
}

function draw() {
    background(51);

    for(let orb of orbs){
        // Drawing walls of the maze
        for (bound of bounds) {
            bound.show();
        }

        orb.show();
        
        //orb.update(mouseX,mouseY);

        if (keyIsDown(65)) { //a
            orb.rotateCamera(-1);
        } else if (keyIsDown(68)) { //d
            orb.rotateCamera(1);
        } else if (keyIsDown(87)) { //w
            orb.move(1);
        } else if (keyIsDown(83)) { //s
            orb.move(-1);
        }
    }
    orbs[0].updateScene();
    
    

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }

}



