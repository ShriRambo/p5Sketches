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
var brush

var bgcol =  "#F0F0F0"//"#FFFEEA" //"#161315" // 25

var capturer
var rendering = false

function setup() {
    Canvass = createCanvas(800,800);
    background(bgcol);
    colorMode(HSB, 255,255,255, 255)
    angleMode(RADIANS);

    brush = new Brush()
   
    clearBtn = createButton("Clear")
    clearBtn.mousePressed(clearCanvas)
    
    setupRenderer()
    

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

    // background(bgcol + "08")
    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));

        translate(width / 2, height / 2)
       
        for(let i = 0; i < symm; i++){
            rotate(2*PI/symm) 
            push()
            brush.show()
            pop()
            // push()
            // scale(-1,1)
            // brush.show()
            // pop()
        }

        brush.move()

    
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






class Brush {

    constructor() {

        this.nx = 1000 * random()
        this.xfac = 3
        this.rfac = 0.1
        this.cfac = 10
        this.pos = createVector(
            width * (noise(this.xfac * this.nx, 100) - 0.5),
            height * (noise(this.xfac * this.nx, 2000)-0.5)
            );
        this.dir = createVector(30, 0).rotate(2 * PI * random())

        var palette =[ "#f3d6e9", "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]
        this.col = palette[0]
        //["#FB6435", "#fd2bff", "#c202d3", "#5e0fff", "#1905d9"]
        
        // Flower dark   ["#9C8383", "#66082D", "#C52A52", "#DD7576", "#F6D7D4"]
        // Lemon ["#D19402", "#FFE245", "#FFEAA4", "#80A300", "#2D3F01"]

        // Lemon

        // Neon 1  ["#f3d6e9" , "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]
        // p1  ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ]


        // GOld :   ['#b39700','#ccac00','#e6c200','#ffd700','#ffdb1a','#ffdf33','#ffe34d']

        this.cpickFn = chroma.scale(palette)

    }

    show() {

        this.pickCol();
        stroke(this.col);
        strokeWeight(5);

        line(this.pos.x + this.dir.x, this.pos.y + this.dir.y, this.pos.x - this.dir.x, this.pos.y - this.dir.y)

    }

    move() {

        this.nx -= - 0.001
        this.pos.x =  width *( noise(this.xfac*this.nx, 100) - 0.5)
        this.pos.y = height *( noise(this.xfac*this.nx, 2000) - 0.5 )
        this.dir.rotate(0.01 * PI * ( noise(this.rfac * this.nx, 300) - 0.5) )

    }

    pickCol() {
        this.col = this.cpickFn(noise(1000, this.cfac*this.nx)).hex()
    }
}

