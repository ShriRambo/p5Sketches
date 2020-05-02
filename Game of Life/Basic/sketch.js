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

var board


function setup() {

    let nd = 50
    let dx = ceil(920/nd)

    Canvass = createCanvas(nd*dx,nd*dx);
    

    board = new GameBoard(nd, dx)

    
    // frameRate(16)

   
    
    setupRenderer()
    // noLoop();
    
}

function draw() {

   
    board.show()
    board.update()
    if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));



}

function setupRenderer() {
    capturer = new CCapture({ format: 'png' });
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



class GameBoard{

    constructor(n, dx){
        this.n = n;
        this.dx = dx

        this.initBoard()

        this.cols =      ['#350138',   '#F83990' , '#A1F628',]
        // [ '#ffd55a','#293250', '#6dd47e'] //
    }

    initBoard(){
       
        let mat = []
        let nmat = []
        for (let i = 0; i < this.n; i++){
            mat[i] = []
            nmat[i] = []
            for (let j = 0; j < this.n; j++){
                mat[i][j] = 1*(   noise(  10*min(i,this.n - i-1) , 10*min(j,this.n - j-1) ) < 0.3)
                nmat[i][j] = 0
            }
        }

        this.mat = mat
        this.nmat = nmat

        this.computeNeigh()


    }

    show(){
        background(this.cols[0] )
        noStroke()
        for (let i = 0; i < this.n; i++){
            for (let j = 0; j < this.n; j++){
                if(this.nmat[i][j] != 0){
                    fill(  this.cols[2])
                    rect(i*this.dx, j*this.dx, this.dx, this.dx )
                }
                if(this.mat[i][j] == 1){ // If cell alive
                    fill(  this.cols[1])
                    rect(i*this.dx, j*this.dx, this.dx, this.dx )

                }
                
            }
        }

    }

    update(){

        
        for (let i = 0; i < this.n; i++){
            for (let j = 0; j < this.n; j++){
                let ngs = this.nmat[i][j]
                if( (ngs < 2) || (ngs > 3)){
                    this.mat[i][j] = 0
                }else if(ngs == 3){
                    this.mat[i][j] = 1
                }

                // if( ( noise( min(i,this.n - i-1) , j, j**2 ) < 0.1)){  this.mat[i][j] = 1 }
            }
        }
        this.computeNeigh()


    }

    computeNeigh(){

         // Matrix to store neigbours

         
         // Reset matrix
         for (let i = 0; i < this.n; i++){
            for (let j = 0; j < this.n; j++){
                this.nmat[i][j] = 0
            }
        }
        
        // Compute neighbours
        
        for (let i = 0; i < this.n; i++){
            for (let j = 0; j < this.n; j++){
                for (let k = -1; k <= 1; k++){
                    for (let l = -1; l <= 1; l++){
                        let vb = this.mat[i][j]
                        if( 
                            ((i + k) >= 0) &&
                            ((i + k) < this.n) && 
                            ((j + l) >= 0) && 
                            ((j + l) < this.n) &&
                            ( (k!= 0 )  || (l != 0)) ){
                            this.nmat[i+k][j+l] += vb
                        }
                    }
                }
            }
          }
          
          }


}