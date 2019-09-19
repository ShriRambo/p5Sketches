var Canvass;
let spiro;
let img;
let imMat;

let hwid = 600;

var idd = 2;

function preload() {
    img = loadImage("./pic6.jpg");
    
}

function postProcess(){
    img.resize(hwid, hwid * img.height / img.width)
}

function setup() {
    postProcess();
    Canvass = createCanvas(img.width,img.height);
    background(240);
    loadImgMat();
    // image(img, 0, 0)
    spiro = new Spiro();
    spiro.showShape();
    noLoop();
    
}

function draw() {
    // background(220);
    spiro.showShape(idd);
    idd++

    if(idd > spiro.npt) noLoop();

}

function loadImgMat(){

    imMat = [];
    img.loadPixels();
    for(let y = 0; y < height; y++ ){
        imMat[y] = [];
        for (let x = 0; x < width; x++){
            var index = (x + y*width)*4
            let br = ( img.pixels[index + 0] + img.pixels[index + 0] + img.pixels[index + 0] ) / 3
            imMat[y][x] = br
        }
    }
}


class Spiro{

    constructor(){
        
        this.dcon = 5;
        this.dr = 0.1;
        


        this.Pts = []
        this.PtW = []
        
        let c12 = 0.8;
        let dcon = 3;
        let R = 1
        var dR;
        let T = 0;
        var dT;

        let vec = createVector(1, 1).setMag(R);

        // for (let i = 1; i <= this.npt; i++)
        while(R < 0.5*sqrt(width**2 + height**2)){
            this.Pts.push(vec.copy())

            let xid = Math.max(0, Math.min(width -1, int(vec.x + 0.5 * width)));
            let yid = Math.max(0,Math.min(height -1, int(vec.y + 0.5 * height)));
            
            let wt = 2 * (1.1- imMat[yid][xid]/255) 
            // 4 * noise(0.01*vec.x, 0.01*vec.y)
            this.PtW.push(wt)
            dR = 2 * dcon * c12 / R;
            dT = 2 * dcon / R;
            R = R + dR
            T = T + dT;
            vec.setMag(R).rotate(dT)

            // Adding some noise to make it look like hand drawn
            // vec.x = vec.x + 1*noise(0.1*vec.x,0.1*vec.y)
            // vec.y = vec.y + 1*noise(0.1*vec.x, 0.1*vec.y)
        }
        this.npt = this.PtW.length;

    }

    show(){
        strokeWeight(1);
        stroke(220);
        push();
            translate(width/2,height/2);
            for(let i = 0; i < this.npt-1; i++) {
                line(this.Pts[i].x, this.Pts[i].y, this.Pts[i+1].x, this.Pts[i+1].y)
            }
        pop();
    }

    showShape(inp){
        let iddd
        let iod
        if(inp){
            iddd = inp;
            iod = inp - 2;
        }else{
            iddd = this.npt - 1
            iod = 0;
        }
        
        push()
        translate(width/2,height/2);
        noStroke()
        fill(51);
        let p
        beginShape();
        for (let i = iod; i <= iddd; i++) {
            // console.log(i)
            p = this.Pts[i].copy()
            p.setMag(p.mag() + this.PtW[i])
            vertex(p.x, p.y)
        }

        for (let i = iddd ; i >= iod; i--) {
            p = this.Pts[i].copy()
            p.setMag(p.mag() - this.PtW[i])
            vertex(p.x, p.y)
        }
        endShape(CLOSE);
        pop();
    }
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
     else if(keyCode == BACKSPACE){
        save(Canvass, "sketch")
    }
}




