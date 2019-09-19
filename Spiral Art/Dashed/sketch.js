var Canvass;
let spiro;
let img;
let imMat;

let hwid = 600;

var idd = 2;

function preload() {
    img = loadImage("./pic4.jpg");
    
}

function postProcess(){
    img.resize(hwid, hwid * img.height / img.width)
}

function setup() {
    postProcess();
    Canvass = createCanvas(img.width,img.height);
    background(250);
    loadImgMat();
    // image(img, 0, 0)
    spiro = new Spiro();
    spiro.showShape();
    noLoop();
    
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
        this.createPath();
        
    }



    createPath(){

        let c12 = 0.8;
        let dcon = 3;
        let R = 1
        var dR;
        let T = 0;
        var dT;

        let vec = createVector(1, 1).setMag(R);

        // for (let i = 1; i <= this.npt; i++)
        while (R < 0.5 * sqrt(width ** 2 + height ** 2)) {
            this.Pts.push(vec.copy())

            let xid = Math.max(0, Math.min(width - 1, int(vec.x + 0.5 * width)));
            let yid = Math.max(0, Math.min(height - 1, int(vec.y + 0.5 * height)));

            let wt = 2 * (1.1 - imMat[yid][xid] / 255)
            // 4 * noise(0.01*vec.x, 0.01*vec.y)
            this.PtW.push(wt)
            dR = 2 * dcon * c12 / R;
            dT = 2 * dcon / R;
            R = R + dR
            T = T + dT;
            vec.setMag(R).rotate(dT)


        }
        this.npt = this.PtW.length;
    }


    showShape(){
        push()
        translate(width/2,height/2);
        stroke(51)
        strokeWeight(0.2)
        noFill()
        ellipseMode(CENTER)
        let p1, p2
        for (let i = 0; i < this.npt; i++) {
            // console.log(i)
            
            // let net = int(10 * noise(0.01* (this.Pts[i].x + width) , 0.01*(this.Pts[i].y+height)))

            // Ring part
            let net = int(5 *this.PtW[i])
            for(let k = 0; k < net; k++ ) ellipse(this.Pts[i].x,this.Pts[i].y,10*random(),10*random())
            
            // Dashed part
            // p1 = this.Pts[i].copy()
            // p1.setMag(p1.mag() + this.PtW[i] )
            // p2 = this.Pts[i].copy()
            // p2.setMag(p2.mag() - this.PtW[i] )
            // line(p1.x , p1.y , p2.x , p2.y )
        }
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




