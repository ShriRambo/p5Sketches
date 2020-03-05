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
var nwalkers = 500   
var bgcol = 20


function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    // setupRenderer()
    for(let i = 0; i <nwalkers; i++) walkers[i] = new IsoWalker()
    // noLoop();
    
}

function draw() {
    background(bgcol,20*noise(frameCount))

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
        let vmag = 2
        this.unitVs = [
            createVector(vmag, 0).rotate(PI/6),
            createVector(vmag,0).rotate(PI/6).rotate( TWO_PI/3),
            createVector(vmag,0).rotate(PI/6).rotate( 2*TWO_PI/3)
        ]
        this.face = random([0,1,2])
        this.faceUnit = [ this.unitVs[ this.face % 3], this.unitVs[( this.face+1)%3] ]
        this.pos = [ int(100*random()), int(100*random())]
        this.maxD = 150
        this.setdir()
        this.col = 255//random(["#f3d6e9", "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"])
    }

    setdir(){
        let d = random() > 0.5
        this.dir = [  d*random([1,-1]), !d*random([1,-1]) ]
    }

    show(){
        push()
        translate(0.5*width, 0.5*height)
        stroke(this.col);
        strokeWeight(3)
        let x1 = this.pos[0]*this.faceUnit[0].x + this.pos[1]*this.faceUnit[1].x
        let y1 = this.pos[0]*this.faceUnit[0].y + this.pos[1]*this.faceUnit[1].y 
        let x2 = (this.dir[0] + this.pos[0])*this.faceUnit[0].x + (this.dir[1] + this.pos[1])*this.faceUnit[1].x
        let y2 = (this.dir[0] + this.pos[0])*this.faceUnit[0].y + (this.dir[1] + this.pos[1])*this.faceUnit[1].y

        line(x1,y1,x2,y2)
        // this.drawEdge()
        pop()

    }

    update(){
        this.pos[0] += this.dir[0]
        this.pos[1] += this.dir[1]

        this.pos[0] = this.pos[0] % this.maxD
        this.pos[1] = this.pos[1] % this.maxD

        if (this.pos[0] < 0) {
            this.face += 1
            this.face = this.face % 3

            this.faceUnit = [ this.unitVs[ this.face % 3], this.unitVs[( this.face+1)%3] ]
            this.pos[0]= this.pos[1];
            this.pos[1]=0
        }else if(this.pos[1] < 0 ) {
            this.face += 2
            this.face = this.face % 3

            this.faceUnit = [ this.unitVs[ this.face % 3], this.unitVs[( this.face+1)%3] ]
            this.pos[1]= this.pos[0];
            this.pos[0]=0
        }

        if( random() > 0.9 ) this.setdir()
    }

    drawEdge(){
        for(let uv of this.unitVs){
            line(0,0,uv.x*100,uv.y*100)
        }
        
    }
}