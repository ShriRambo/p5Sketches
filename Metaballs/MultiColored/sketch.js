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
    Canvass = createCanvas(400,500);
    background(200);
    
    metaR = new MetaBallRender()
    // setupRenderer()
    noLoop()

}

function draw() {

    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    // background(200,20)
    metaR.show()
    metaR.update()
    if(frameCount % 30 == 0) console.log("sec")
    
    // noLoop();
    // console.log(frameRate())
}

function setupRenderer() {
    capturer = new CCapture({ format: 'webm', framerate: 30 });
    capturer.start();
    rendering = true
}

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        save(Canvass, "sketch.jpg")
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
        this.mag = random()*(0.5*random() + 0.1)*width
        this.dir = random([1,-1])
        this.dtheta = random()*0.1
        this.r = 4 + 10*random()
        this.dy = 100*(2*random() - 1)
        this.x = 0
        this.y = 0
        this.frr = 0.03

        this.mult = 1// random([1,1,1,-1])
        // this.col = random( ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ])

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
        this.r = 1 + 10*noise(frameCount*this.frr, this.pseed+ 100, this.pseed)
        this.dy = 100*( Math.sin(frameCount*this.frr + this.pseed) +  0.2*noise(1, frameCount*this.frr, this.pseed+ 1010) )

        this.pos.normalize()
        this.pos.rotate(this.dtheta*(2*noise(frameCount*this.frr + 100, this.pseed*2, 99 ) -1 ))
        this.pos.setMag( 5 + noise(frameCount*this.frr, this.pseed)*width*0.4)

        this.x = this.pos.x + 0.5*width
        this.y = this.pos.y + 0.5*height + this.dy


    }
}


class MetaBallRender{
    constructor(){

        this.mul = 4;
        this.cols = ["#E3E3E3", "#282828", "#6CC2BD", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0"]

        // Balls
        this.nballs = 40
        this.balls = []
        for(let i = 0; i < this.nballs; i++){
            this.balls[i] = new Ball()
            this.balls[i].cid = int((this.cols.length )*random())
            this.balls[i].update()
        }


    }

    show(){
        loadPixels();
        for (let x = 0; x < width; x++){
            for (let y = 0; y < height; y++){
                let c = this.getCol(x,y)
                set(x,y,c);
            }
        }
        updatePixels();




    }

    getCol(x,y){
        let va = [];
        let nballs_ = [];
        for(let i = 0; i < this.cols.length; i++) {
            va[i] = 0
            nballs_[i] = 1
        }


        // Original balls
        for(let ball of this.balls){
            va[ball.cid]  += (ball.mult*( ball.r/dist(x,y,ball.x,ball.y)) )
            nballs_[ball.cid ] += 1
            va[ball.cid]  += ( ball.mult*(ball.r/ dist(x,y, width-ball.x, ball.y)))
        }

        let p1 = min(x,  (width - x))
        let nor = 0
        for(let i = 0; i < va.length; i++) {
            va[i] = this.mul*va[i]/(2*nballs_[i])
            nor += va[i]**2
        }

        nor = sqrt(nor)
        for(let i = 0; i < va.length; i++) {
            va[i] = va[i]/nor
            va[i] +=  0.1*( 2*noise(p1*0.1, y*0.1, frameCount*0.001 + 100*i) - 1)  
        }
       
        let va_ = max(va)
        let va_id = va.indexOf(va_)
        va = va_

        
        if(va < 0.5  ) va = 0  //  + 0.0*noise(frameCount*0.001, p1*0.1, y*0.1)
        else va = va_id

        return color(this.cols[va])

    }

    update(){
        for(let ball of this.balls){
            ball.update()
            // ball.drawO()
        }

    }
}

