//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass
var capturer
var rendering = false;

var walkers = []
var nwalkers = 50
var bgcol = 20


function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    setupRenderer()
    for(let i = 0; i <nwalkers; i++) walkers[i] = new IsoWalker()
    // noLoop();
    
    
}

function draw() {
    // background(bgcol,5*noise(frameCount))

    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
   for (let walker of walkers){
       walker.show();
       walker.update();
   }
   

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

class IsoWalker{

    constructor(){
        let vmag = 1
        this.unitVs = [
            createVector(vmag, 0).rotate(PI/6),
            createVector(vmag,0).rotate(PI/6).rotate( TWO_PI/3),
            createVector(vmag,0).rotate(PI/6).rotate( 2*TWO_PI/3)
        ]
        
        this.maxD = 200
        this.pos = [ int(this.maxD*random()), int(this.maxD*random()), int(this.maxD*random()) ]
        
        this.setdir()
        this.col = random( ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ])

        this.setStroke()
    }

    setStroke(){
        let w = this.pos[0]**2 + this.pos[1]**2 + this.pos[2]**2
        w = w/((3*this.maxD**2))
        this.stw =3 +  w*20

        this.opaq = (int(255*w)).toString(16)
        if(this.opaq.length == 1) this.opaq = "0" + this.opaq
    }

    setdir(){
        let w = [0, 0, 0]
        w[ int( random()*3 )] = 1;
        this.dir = [  w[0]*random([1,-1]), w[1]*random([1,-1]), w[2]*random([1,-1]) ]
    }

    switchdir(){
        this.dir = [ -this.dir[0], -this.dir[1], -this.dir[2]]
    }

    show(){
        push()
        translate(0.5*width, 0.5*height)
        stroke(this.col+this.opaq);
        
        strokeWeight(this.stw)
        let x1 = this.pos[0]*this.unitVs[0].x +
                 this.pos[1]*this.unitVs[1].x +
                 this.pos[2]*this.unitVs[2].x
        let y1 = this.pos[0]*this.unitVs[0].y + 
                 this.pos[1]*this.unitVs[1].y + 
                 this.pos[2]*this.unitVs[2].y
        let x2 = (this.dir[0] + this.pos[0])*this.unitVs[0].x + 
                 (this.dir[1] + this.pos[1])*this.unitVs[1].x + 
                 (this.dir[2] + this.pos[2])*this.unitVs[2].x
        let y2 = (this.dir[0] + this.pos[0])*this.unitVs[0].y + 
                 (this.dir[1] + this.pos[1])*this.unitVs[1].y + 
                 (this.dir[2] + this.pos[2])*this.unitVs[2].y

        line(x1,y1,x2,y2)
       
        pop()

    }


    update(){
        this.pos[0] += this.dir[0]
        this.pos[1] += this.dir[1]
        this.pos[2] += this.dir[2]

        // if(  (this.pos[0] >= this.maxD) || (this.pos[0] <= 0) ||
        //      (this.pos[1] >= this.maxD) || (this.pos[1] <= 0) ||
        //      (this.pos[2] >= this.maxD) || (this.pos[2] <= 0) ) {
        //          this.switchdir()
        //      }

        this.pos[0] = this.pos[0] % this.maxD
        this.pos[1] = this.pos[1] % this.maxD
        this.pos[2] = this.pos[2] % this.maxD

        if( random() > 0.95 ) this.setdir()
    }


}