//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var kite



function setup() {
    Canvass = createCanvas(windowWidth, windowHeight);
    // Canvass = createCanvas(900,500);
    Canvass.parent("canvas")
    
    kite = new Kite()
    kite.show();
    // noLoop();
    
}

function draw() {
    background(245);
   
    kite.update();
    kite.show();

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    } 
    
    kite.keyPressed(keyCode)
    
}

function keyReleased(){
    // if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        kite.keyReleased();
    // }
}

class Kite{
    constructor(){

        // Position and directions
        this.center = createVector(width * 0.5, height * 0.5);
        this.pos = createVector(width * 0.5, height * 0.5); 
        this.dir = createVector(0,-1);
        
        //  Kite dimensions Front Back and Left Right
        this.f = 50;
        this.b = 80;
        this.lr = 50;


        // Noise for making motion realistic
        this.zwt = 1; // Weight for z location
        this.xynoise = createVector(0,0); // Noise for xy location
        this.yawNoise = 0;
        this.rollNoise = 0;

        // Rolling motion
        this.roll = 0;
        this.rollForce = 0;

        // Shift motion
        this.xForce = 0;
        this.yForce = 0

        //Yaw motion
        this.yaw = 0;
        this.yawForce = 0;

        // Kite Tail
        this.ncurves = 2;
        this.createTail();

        // Clouds
        this.nclds = 10;
        this.createClouds();
        this.cldSpeed = createVector(0,1);
        this.cldForce = createVector(0,1);
    }

    createClouds(){
        let clds = [];

        for(let i = 0; i < this.nclds; i++){
            clds[i] = createVector(width*(random()), height*random());
        }

        this.clds = clds;
    
    }

    createTail(){
        let tail = []
        let tailBase = []
        let npts = 2*this.ncurves + 2
        for(let i = 0; i < npts; i++){
            tail[i] = createVector(0,i*20);
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
            this.tail[i].x = this.tailBase[i].x + 30 * (2 * noise(100 + 100*this.tailBase[i].x, 100*this.tailBase[i].y, 0.01*frameCount) - 1);
            this.tail[i].y = this.tailBase[i].y + 10 * (2 * noise(200 + 100*this.tailBase[i].x, 200*this.tailBase[i].y, 0.01*frameCount) - 1);
        }
        // Centering first control point
        this.tail[0].x = -this.tail[1].x;
        this.tail[0].y = -this.tail[1].y;
    }

    update(){

        // Rolling kite
        let netF = this.rollForce - this.roll;
        this.roll = this.roll + netF*0.5;

        // Shifting X
        netF = this.xForce - (this.center.x - 0.5*width);
        this.center.x = this.center.x + netF*0.5;

        // Shifting Y
        netF = this.yForce - (this.center.y - 0.5 * height);
        this.center.y = this.center.y + netF * 0.5;

        // Yawing
        netF = this.yawForce - this.yaw
        this.yaw = this.yaw + netF*0.5;

        // Cloud speed y
        netF = this.cldForce.y - this.cldSpeed.y
        this.cldSpeed.y = this.cldSpeed.y + netF*0.5

        netF = this.cldForce.x - this.cldSpeed.x
        this.cldSpeed.x = this.cldSpeed.x + netF * 0.3
        

        this.zwt = 0.7 + 0.3 * noise(0,0.01 * frameCount);
        this.yawNoise = 0.2*noise(100,0.01*frameCount) - 0.1;
        this.rollNoise = 0.2 * noise(200,0.01 * frameCount, 400) - 0.1;
        this.pos.x = this.center.x + 10 * (2 * noise(300, 0.01 * frameCount) - 1);
        this.pos.y = this.center.y + 10 * (2 * noise(400, 0.01 * frameCount) - 1);

        // Tail flutter
        this.flutterTail();

        for(let cl of this.clds) {
            cl.x += this.cldSpeed.x;
            cl.y += this.cldSpeed.y;

            if(cl.y > height){
                cl.x = width*random();
                cl.y = 0
            }
            if(cl.x > width){
                cl.x -= width;
                cl.y = height*random();
            }
            if(cl.x < 0){
                cl.x += width;
                cl.y = height*random()
            }

        }

       
    }

    keyPressed(key){
        if(key === LEFT_ARROW){
            this.rollForce = 0.7;
            this.xForce = -50;
            this.yForce = -20
            this.yawForce = -1;
            this.cldForce.x = 2;
        }else if(key === RIGHT_ARROW){
            this.yForce = -20;
            this.rollForce = -0.7;
            this.xForce = 50
            this.yawForce = 1
            this.cldForce.x = -2;
        }else if (key === UP_ARROW){
            this.yForce = -30;
            this.cldForce.y = 4;
        }else if(key === DOWN_ARROW){
            this.yForce = 15;
            this.cldForce.y = 1;
        }
    }

    keyReleased(){
            this.rollForce = 0;
            this.xForce = 0;
            this.yForce = 0
            this.yawForce = 0;
            this.cldForce.y = 2;
            this.cldForce.x = 0;
    }

    showClds(){
        for(let cl of this.clds){
            push();
            fill(51);
            ellipse(cl.x,cl.y,4);
        }
    }

    show(){

        let f = this.f*this.zwt;
        let b = this.b*this.zwt;
        let lr = this.lr*cos(this.roll + this.rollNoise)*this.zwt;

        this.showClds();

        push()


        noFill();
        stroke(51);
        strokeWeight(4);
        translate(this.pos.x,this.pos.y);

        beginShape();

        // Front
        let v = p5.Vector.mult(this.dir,f).rotate(this.yaw + this.yawNoise);       
        let cTop = createVector(v.x,v.y);
        vertex(v.x, v.y);

        // Right
        v.rotate(HALF_PI); v.setMag(lr);
        let cRight = createVector(v.x, v.y);
        vertex(v.x,  v.y);

        // Back
        v.rotate(HALF_PI); v.setMag(b);
        let cBack = createVector(v.x, v.y);
        vertex(+ v.x, v.y);

        // Left
        v.rotate(HALF_PI); v.setMag(lr);
        let cLeft = createVector(v.x, v.y);
        vertex( v.x, v.y);

        endShape(CLOSE);

        // Crossing lines
        line(cTop.x, cTop.y, cBack.x, cBack.y);
        line(cLeft.x, cLeft.y, cRight.x, cRight.y);

        

        // Tail and bottom triangle
        push();
        translate(cBack.x,cBack.y);
        rotate(this.yaw + 0.5*this.yawNoise);
        this.drawTail();
        pop();


        pop();


    }

    drawTail(){
        // for(let i =0; i< this.ncurves;i++){
        //     let id = i*2;

        //     // ellipse(0.5 * (this.tail[id].x + this.tail[id + 1].x), 0.5 * (this.tail[id].y + this.tail[id + 1].y),20);
        //     // ellipse(this.tail[id + 1].x, this.tail[id + 1].y, 20);
        //     // ellipse(this.tail[id + 2].x, this.tail[id + 2].y, 20);
        //     // ellipse(0.5 * (this.tail[id + 2].x + this.tail[id + 3].x), 0.5 * (this.tail[id + 2].y + this.tail[id + 3].y), 20)

        //     bezier(
        //         0.5 * (this.tail[id].x + this.tail[id + 1].x), 0.5 * (this.tail[id].y + this.tail[id + 1].y),
        //         this.tail[id + 1].x, this.tail[id + 1].y,
        //         this.tail[id + 2].x, this.tail[id + 2].y,
        //         0.5 * (this.tail[id + 2].x + this.tail[id + 3].x), 0.5 * (this.tail[id + 2].y + this.tail[id + 3].y)
        //     )
        // }

        let ve = createVector(0,-20);

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


// window.onload = function(e){
//     window.alert("Press 👆 👇 👈 👉  to controle the kite!!");
// }


  
