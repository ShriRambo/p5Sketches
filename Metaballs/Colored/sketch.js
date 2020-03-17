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

// var balls = []
// var nballs = 5

var metaR 

function setup() {
    Canvass = createCanvas(400,400);
    background(200);
    metaR = new MetaBallRender()
    // setupRenderer()
    // noLoop();
    // for (let i = 0; i < nballs; i++){
    //     balls[i] = new Ball()    
    // }
   
    
}

function draw() {

    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    // background(200,20)
    metaR.show()
    metaR.update()
    noLoop();

    // for(let ball of balls){
    //     ball.update();
    //     ball.drawO();
    // }
    

}

function setupRenderer() {
    capturer = new CCapture({ format: 'webm', framerate: frameRate() });
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
        this.x = 0
        this.y = 0
        this.r = 10 + 5*random()
        this.col = random( ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ])

        this.pseed = 10000*random()

    }

    drawO(){
        noFill();
        stroke(0)
        strokeWeight(4)
        ellipse(this.x,this.y,this.r*2)
    }

    update(){
        let rate = 0.005
        this.x = width*noise(100,rate*frameCount + this.pseed, this.pseed)
        this.y = height*noise(rate*frameCount,100 + this.pseed, this.pseed)
    }
}


class MetaBallRender{
    constructor(){

        this.nballs = 20
        this.balls = []
        for(let i = 0; i < this.nballs; i++){
            this.balls[i] = new Ball()
            this.balls[i].update()
        }
        this.mul = 0.5;
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
        va *= this.mul
        

        va = Math.tanh(va)
        if(va < 0.3) va = 0 
        let cl = this.cpickFn(va)
        // console.log(cl.hex())
        return color(cl.hex())

    // let hu = 360 * (1 + sin(x)) / 2
    // x = noise(x)
    // let chs = cpickFn(x)
    // return chs.hex()  //color(chs[0],chs[1],chs[2]);
    
    // return color(hu, 150, 255)




        // return this.mul*va
    }

    update(){
        for(let ball of this.balls){
            ball.update()
            // ball.drawO()
        }

    }
}

