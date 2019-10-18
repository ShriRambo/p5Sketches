//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var img 
var dimg
var wt = 0.01
var pdist = 100

var slider1


function preload() {

    img=loadImage('img1.jpg')

    // createGraphicsImageThing()

}

function createGraphicsImageThing(){

    // Verticle lines
    // {
    //     img = createGraphics(800,800);
    //     let nlin = 50;
    //     let dw = img.width/nlin;

    //     img.fill("#000000");
    //     img.background("#F20028");
    //     img.noStroke();

    //     for (let i = 0; i < nlin; i++){
    //         img.rect(i*dw,0,0.5*dw, img.height);
    //     }
    // }

    // {
    //     img = createGraphics(800, 800);
    //     let nlin = 10;
    //     let dw = img.width / nlin;

    //     img.stroke("#03A6ED");
    //     img.strokeWeight(1)
    //     img.background("#FEF201");
    //     img.noFill();

    //     for (let i = 0; i < nlin; i++) {
    //         img.ellipse(img.width/2, img.height/2,width-i*dw);
    //     }
    // }

}

function setup() {
    Canvass = createCanvas(img.width,img.height);
    dimg = createImage(img.width,img.height);
    dimg.loadPixels();
    img.loadPixels();
    background(51);

    slider1 = createSlider(0,200,100,1);

    computeMap();
    image(dimg,0,0)
    noLoop();
    
}

function drawIT() {

    pdist = slider1.value();
    computeMap();
    image(dimg,0,0)

}

function computeMap(){

    for (let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            
          

            let X2 = distortMap(i,j)
            let k = 4*(i+j*width);
            let k2 = 4*(X2[0] + X2[1]*width );

            // if((k2> 4*360000) || (k2< 0)) console.error("K2 excedeed")

            for (let l = 0; l < 4; l++){
                dimg.pixels[k+l] = img.pixels[k2+l];
            }
            
        }
    }

    dimg.updatePixels();

    console.log("Map updated")
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        save(Canvass,"sketch")
    }
    if(keyCode == ENTER){
        drawIT();
    }
}


function distortMap(x,y){

    let x_ = x + int(  pdist*(   2*noise(x*wt,y*wt,100) - 1 )  )
    x_ = max(0,min(width-1,x_));
    let y_ = y + int(  pdist*(   2*noise(x*wt,y*wt,10000) - 1 )  )
    y_ = max(0,min(height-1,y_));

    return [x_,y_]
}



