//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;

var brushes = []
var nbrush = 1

function setup() {
    Canvass = createCanvas(400,420);
    background(220);

    for (let i = 0; i < nbrush; i++) {
        brushes[i] = new Brush();
    }
    
   
   // noLoop();
    
}

function draw() {

    // background(51,20);

    for (let brush of brushes){
        brush.show()
        brush.move()

    }
    
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}


class Brush{

    constructor(){

        this.nx = 1000*random()
        this.pos = createVector(width*noise(this.nx,100),height*noise(this.nx,2000))
        this.dir = createVector(20,0).rotate(2*PI*random())

        var palette = ["#f3d6e9", "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]
        this.col = palette[0]
        //["#FB6435", "#fd2bff", "#c202d3", "#5e0fff", "#1905d9"]


        // Lemon ["#D19402", "#FFE245", "#FFEAA4", "#80A300", "#2D3F01"]

        // Lemon

        // Neon 1  ["#f3d6e9" , "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]
        // p1  ["#6CC2BD", "#5A819E", "#5A819E", "#F67E7D", "#FABFA6",  "#FFEAD0" ]


        // GOld :   ['#b39700','#ccac00','#e6c200','#ffd700','#ffdb1a','#ffdf33','#ffe34d']

        this.cpickFn = chroma.scale(palette)

    }

    show(){

        this.pickCol();
        stroke(this.col);
        strokeWeight(5);

        line(this.pos.x + this.dir.x, this.pos.y + this.dir.y, this.pos.x - this.dir.x, this.pos.y - this.dir.y )

    }

    move(){

        this.nx -=- 0.01
        this.pos.x = width * noise(this.nx, 100)
        this.pos.y =  height * noise(this.nx, 2000)
        this.dir.rotate(  0.01*PI*  (  noise(100*this.nx,300) - 0.5  ))

    }

    pickCol(){
         this.col = this.cpickFn(noise(1000,this.nx)).hex()
    }
}

