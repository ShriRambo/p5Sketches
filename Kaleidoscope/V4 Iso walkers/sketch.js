//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;


var symm = 6
let mx = 0, my = 0, pmx, pmy



var clearBtn

var bgcol =  20//"#FFFEEA" //"#161315" // 25

var capturer
var rendering = false

var walkers = []
var nwalkers = 500

function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    angleMode(RADIANS);


    clearBtn = createButton("Clear")
    clearBtn.mousePressed(clearCanvas)
    
    setupRenderer()

    createWalkers()
    

    // the canvas capturer instance
    
    
}

function clearCanvas(){
     background(bgcol)
}

function setupRenderer(){
    capturer = new CCapture({ format: 'webm', framerate: frameRate() });
    capturer.start();
    console.table(capturer);

    rendering = true
}
   
function draw() {

    background(bgcol, 20 * noise(frameCount))
    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));

        translate(width / 2, height / 2)
       
        for(let i = 0; i < symm; i++){
            rotate(2*PI/symm) 
            push()
            translate(-width / 2, -height / 2)
            drawWalkers()
            pop()
            push()
            scale(-1, 1)
            translate(-width / 2, -height / 2)
            drawWalkers()
            pop()
            
        }

       updateWalkers()

    
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        // save(Canvass, "sketch.jpg")
    }
    if(keyCode == ESCAPE){

        // save(Canvass, "sketch.jpg")
        capturer.stop()
        capturer.save()

    }
}



class IsoWalker {

    constructor() {
        this.pos = createVector(width * random(), height * random())
        this.dir = createVector(2, 0).rotate(PI / 6).rotate(random([0, 1, 2]) * TWO_PI / 3)
        this.col = random(["#f3d6e9", "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"])
    }

    show() {

        stroke(this.col);
        strokeWeight(4)
        let x2 = this.pos.x + this.dir.x
        let y2 = this.pos.y + this.dir.y

        line(this.pos.x, this.pos.y, x2, y2)
    }

    update() {
        this.pos.x += this.dir.x
        this.pos.y += this.dir.y

        if (random() > 0.95) {
            this.dir.rotate(random([0, 1, 2]) * TWO_PI / 3)
            this.mode *= -1
        }

        if (this.pos.x > width) this.pos.x -= width
        if (this.pos.y > height) this.pos.y -= height
        if (this.pos.x < 0) this.pos.x += width
        if (this.pos.y < 0) this.pos.y += height


        this.pos.x = (this.pos.x % width)
        this.pos.y = (this.pos.y % height)


    }
}

function createWalkers(){
    for(let i = 0; i < nwalkers; i++){
        walkers[i] = new IsoWalker()
    }
}

function drawWalkers(){
    for(let walker of walkers){
        walker.show()
    }
}

function updateWalkers() {
    for (let walker of walkers) {
        walker.update()
    }
}