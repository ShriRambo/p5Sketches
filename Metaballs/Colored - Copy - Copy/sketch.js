//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var capturer
var rendering = false;

var metaR 

function setup() {
    Canvass = createCanvas(400,400);
    background(200);
    metaR = new MetaBallRender()
    // setupRenderer()

}

function draw() {

    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    // background(200,20)
    metaR.update()
    metaR.show()
    
    noLoop();
    // console.log(frameRate())
}

function setupRenderer() {
    capturer = new CCapture({ format: 'webm', framerate: 40 });
    capturer.start();
    

    rendering = true
}

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
    if ((keyCode == ESCAPE) & rendering) {

        // save(Canvass, "sketch.jpg")
        capturer.stop()
        capturer.save()

    }
}


class Ball{

    constructor(){
       
        this.pos = createVector(1,0).rotate(random()*TWO_PI)
        this.mag = random()*0.4*width
        this.dir = random([1,-1])
        this.dtheta = random()*0.1
        this.r = 10 + 5*random()
        this.x = 0
        this.y = 0
        this.col = random( ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ])

        this.pseed = 10000*random()

    }

    drawO(){
        noFill();
        stroke(255)
        strokeWeight(4)
        ellipse(this.x,this.y,this.r*2)
    }

    update(){
        // let rate = 0.005
        // this.x = width*noise(100,rate*frameCount + this.pseed, this.pseed)
        // this.y = height*noise(rate*frameCount,100 + this.pseed, this.pseed)

        this.pos.normalize()
        this.pos.rotate(this.dir*this.dtheta)
        this.pos.setMag( 5 + noise(frameCount*0.01, this.speed)*width*0.4)

        this.x = this.pos.x + 0.5*width
        this.y = this.pos.y + 0.5*height


    }
}


class MetaBallRender{
    constructor(){

        this.nballs = 3
        this.balls = []
        for(let i = 0; i < this.nballs; i++){
            this.balls[i] = new Ball()
            this.balls[i].update()
        }
        this.mul = 0.05;
        this.bgcol = "#F3ECDD"
        this.ink = "#282828"

        this.cpickFn =  chroma.scale([this.bgcol, this.ink]);

    }

    show(){
        loadPixels();
        for (let x = 0; x < width; x++){
            for (let y = 0; y < height; y++){
                // let c = color(255,0,0)
                let c = this.getCol(x,y)
                // c = 255*(c > (180 + 40*random()))
                set(x,y,c);
            }
        }
        updatePixels();




    }

    getCol(x,y){
        let va = 0;
        for(let ball of this.balls){
            va += ball.r/dist(x,y,ball.x,ball.y)
        }

        if(va < 0.5 + 0.2*random() ) va = 0 
        else va = 1
        let co = this.cpickFn(va)
        return color(co.hex())

    }

    update(){
        for(let ball of this.balls){
            ball.update()
            // ball.drawO()
        }

    }
}

