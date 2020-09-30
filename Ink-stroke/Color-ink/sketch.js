//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var capturer
// var rendering = false;

var cpickFn

var palette =  ["#f3d6e9" , "#fdaf2c", "#ff483e", "#e705be", "#03a4ff"]

var gx 
var gy


function preload() {

}

function setup() {
    Canvass = createCanvas(windowWidth,windowHeight);
    background(255);
    // setupRenderer()
    // noLoop();
    
    aStroke = 0

    // Chroma.js params
    cpickFn = chroma.scale(palette);

    // Brush Physics parameters
    k = 0.1
    vx = vy = 0
    fric = 0.8
    
    nsteps = 60

    // Brush param
    nbr = 5
    d = []
    w = []
    r0 = 60
    ro = 0
    for(let i = 0; i < nbr; i++){
        d[i] = random(-r0*0.1,r0*0.1)
        w[i] = random(0,1.5)
    }
    
    

    col =  100 

    counterr = 0


    radMult = 0.3 //+ noise(99,0)

    gx = width*noise(21, 0)
    gy = 0.5*height*noise(0, 45)
    
}

function draw() {

    // if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    // background(255,10 + 5*noise(frameCount))
    
    if(mouseIsPressed) {
        mx = gx //mouseX
        my = gy //mouseY
        if (!aStroke){
            aStroke = 1
            x = mx;
            y = my;
        }

        fx = (mx - x)*k
        fy = (my - y)*k

        vx += fx
        vy += fy

        vx *= fric
        vy *= fric 

        v = sqrt(vx**2 + vy**2 )*radMult;
        rn = max(3, r0 - v )
        // x += vx
        // y += vy

        for (let i = 0; i < nsteps; i++){
            xo = x;
            yo = y;
            x += vx/nsteps;
            y += vy/nsteps;
            
            rs = ro + (rn - ro)*i/nsteps
            
            // col = 50 - 50*noise(32, 0.01*counterr )
            for(let j = 0; j < nbr; j++){
                let dd =  d[j] + 4*noise(j, 0.01*counterr) - 2;
                strokeWeight(rs*w[j]);
                col = pickCol(  noise(j, d[j], counterr*0.001)  )
                stroke(0);
                line(xo + dd, yo + dd, x + dd, y + dd);
            }

            counterr -=- 1;
        }
        ro = rn

        // strokeWeight(5);
        // fill(255);
        // stroke(0)
        // ellipse(x,y, 20)

        // d1 = 8*noise(frameCount*0.001,1)
        // d2 = -5*noise(1,frameCount*0.001)

        radMult = 0.3 + noise(99,frameCount*0.001)
      
    } else if(aStroke) {
      aStroke = 0
      vx = vy = aStroke = ro =0
    }

    
    gx = width*noise(21, frameCount*0.1)
    gy = 0.5*height*noise(frameCount*0.1, 45)



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
        saveCanvas(Canvass, "sketch.jpg")
    }
    if ((keyCode == ESCAPE) & rendering) {

        // save(Canvass, "sketch.jpg")
        capturer.stop()
        capturer.save()

    }
}


function pickCol(x) {

    // let hu = 360 * (1 + sin(x)) / 2
    // x = noise(x)
    let chs = cpickFn(x)
    return chs.hex()  //color(chs[0],chs[1],chs[2]);
    
    // return color(hu, 150, 255)

}

