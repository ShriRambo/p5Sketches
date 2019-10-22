//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var kites = []
var nkites = 100;



function setup() {
    Canvass = createCanvas(windowWidth, windowHeight);
    // Canvass = createCanvas(900,500);
    Canvass.parent("canvas")
    
    for(let i = 0; i < nkites; i++) kites[i] = new Kite();
    for(let kite of kites)  kite.show();
    // noLoop();
    
}

function draw() {
    background(245,240);
    for (let kite of kites) {
        kite.update();
        kite.show();
    }
    

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        save(Canvass,"sketch")
    } 
    
    // kite.keyPressed(keyCode)
    
}

// function keyReleased(){
//     // if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
//         kite.keyReleased();
//     // }
// }

class Kite{
    constructor(){


        //  Kite dimensions Front Back and Left Right
        this.f = 50;
        this.b = 80;
        this.lr = 50;

        this.sc = 0.5;

        this.kiteInit();

    }

    kiteInit(){
        // Position and directions
        let r1 = (random() > 0.5);

        let x = (1 - r1) * random(-200, width + 200) + r1 * random([-200, width + 200]);
        let y = r1 * random(-200, height + 200) + (1 - r1) * random([-200, height + 200]);

        this.center = createVector(x, y);
        this.pos = createVector(x, y);
        this.dir = createVector(0.5 * width - x, 0.5 * height - y).setMag(1);
        this.dir.rotate(random(-PI / 6, PI / 6));
        this.speed = random(1, 6)*this.sc;

        



        // Noise for making motion realistic
        this.zwt = 1; // Weight for z location
        this.xynoise = createVector(0, 0); // Noise for xy location
        this.yawNoise = 0;
        this.rollNoise = 0;

        // Kite Tail
        this.ncurves = 2;
        this.createTail();


        // Colors
        let cols = ["#1A1333", "#262949", "#045459", "#0D7355", "#15C286", "#ABD96D", "#FBBF54", "#EE6B3B", "#EC0F47", "#A02C5D", "#700460", "#022C7A", "#96CDBF", "#FED880", "#FF674D", "#3E9EB7",]
        this.c1 = random(cols);
        this.c2 = random(cols);
    }

    

    createTail(){
        let tail = []
        let tailBase = []
        let npts = 2*this.ncurves + 2
        for(let i = 0; i < npts; i++){
            tail[i] = createVector(0,i*20*this.sc);
        }

        // Centering first control point
        tail[0].x = -tail[1].x;
        tail[0].y = -tail[1].y;

        for(let i = 0; i < npts; i++){
            tailBase[i] = createVector(tail[i].x,tail[i].y);
        }

        this.tail = tail;
        this.tailBase = tailBase;
        
    }

    flutterTail(){

        for(let i = 0; i < this.tail.length; i++){
            this.tail[i].x = this.tailBase[i].x + 30* ( (i+1)/this.tail.length ) * cos(i + this.center.x*0.01 + 0.03 * max(this.speed,2)* frameCount) // (2 * noise(100 + 100*this.tailBase[i].x, 100*this.tailBase[i].y, 0.01*frameCount) - 1);
            this.tail[i].y = this.tailBase[i].y + 10 * (2 * noise(200 + 100*this.tailBase[i].x, 200*this.tailBase[i].y, 0.01*frameCount) - 1);
        }
        // Centering first control point
        this.tail[0].x = -this.tail[1].x;
        this.tail[0].y = -this.tail[1].y;
    }

    update(){

        // Rolling kite
        // let netF = this.rollForce - this.roll;
        // this.roll = this.roll + netF*0.5;

        if(this.isOut()) this.kiteInit();

        this.center.x = this.center.x + this.speed*this.dir.x;
        this.center.y = this.center.y + this.speed*this.dir.y;

        // Shifting X
        // netF = this.xForce - (this.center.x - 0.5*width);
        // this.center.x = this.center.x + netF*0.5;

        // Shifting Y
        // netF = this.yForce - (this.center.y - 0.5 * height);
        // this.center.y = this.center.y + netF * 0.5;

        // Yawing
        // netF = this.yawForce - this.yaw
        // this.yaw = this.yaw + netF*0.5;

        this.zwt = 0.7 + 0.3 * noise(0,0.01 * frameCount);
        this.yawNoise = 0.6*(2*noise(100,0.01*frameCount) - 1);
        this.rollNoise = 0.5 * (noise(200,0.01 * frameCount, 400) - 1);
        this.pos.x = this.center.x + 10 * (2 * noise(300, 0.01 * frameCount) - 1);
        this.pos.y = this.center.y + 10 * (2 * noise(400, 0.01 * frameCount) - 1);

        // Tail flutter
        this.flutterTail();



    }

    isOut(){
        if( // Conditions
            (this.center.x > width + 200 )||
            (this.center.x < -200) || 
            (this.center.y > height + 200) ||
            (this.center.y < -200)){
                // let ang = this.dir.angleBetween(createVector(0.5*width-this.center.x,0.5*height-this.center.y))

                // if( ang <-3 || ang > 3) return true;
                return true;
            }
    }

 
    show(){

        let f = this.f*this.zwt*this.sc;
        let b = this.b * this.zwt * this.sc;
        let lr = this.lr * cos(this.rollNoise) * this.zwt * this.sc;


        push()

        // Computing kite coordinates
        
        // Front
        let v = p5.Vector.mult(this.dir, f).rotate( this.yawNoise);
        let cTop = createVector(v.x, v.y);
        
        // Right
        v.rotate(HALF_PI);
        v.setMag(lr);
        let cRight = createVector(v.x, v.y);

        // Back
        v.rotate(HALF_PI);
        v.setMag(b);
        let cBack = createVector(v.x, v.y);

         // Left
         v.rotate(HALF_PI);
         v.setMag(lr);
         let cLeft = createVector(v.x, v.y);

        translate(this.pos.x, this.pos.y);

        push()
        noStroke();
        fill(this.c1)
        triangle(cLeft.x,cLeft.y, cTop.x,cTop.y,cRight.x,cRight.y);
        fill(this.c2)
        triangle(cLeft.x, cLeft.y, cBack.x, cBack.y, cRight.x, cRight.y);
        pop()


        noFill();
        stroke(51);
        strokeWeight(4*this.sc);
       

        // Kite sticke
        beginShape();
            vertex(cTop.x, cTop.y);
            vertex(cRight.x,  cRight.y);
            vertex(cBack.x, cBack.y);
            vertex(cLeft.x, cLeft.y);
        endShape(CLOSE);

        // Crossing lines
        line(cTop.x, cTop.y, cBack.x, cBack.y);
        line(cLeft.x, cLeft.y, cRight.x, cRight.y);

        

        // Tail and bottom triangle
        push();
        translate(cBack.x,cBack.y);
        rotate( this.yawNoise )
        rotate(  Math.sign(this.dir.x)*this.dir.angleBetween( createVector(0,-1) ) );
        this.drawTail();
        pop();

        pop();
    }

    drawTail(){
        for(let i =0; i< this.ncurves;i++){
            let id = i*2;
            bezier(
                0.5 * (this.tail[id].x + this.tail[id + 1].x), 0.5 * (this.tail[id].y + this.tail[id + 1].y),
                this.tail[id + 1].x, this.tail[id + 1].y,
                this.tail[id + 2].x, this.tail[id + 2].y,
                0.5 * (this.tail[id + 2].x + this.tail[id + 3].x), 0.5 * (this.tail[id + 2].y + this.tail[id + 3].y)
            )
        }

        let ve = createVector(0,-20*this.zwt*this.sc);

        push()
        fill(51);
        beginShape()
        for (let i = 0; i < 3; i++){
            vertex(ve.x,ve.y);
            ve.rotate(TWO_PI/3);
        }
        endShape(CLOSE)
        pop();
    }

    
}



