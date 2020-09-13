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


function preload() {

}

function setup() {
    Canvass = createCanvas(windowWidth,windowHeight);
    // background(51);
    // setupRenderer()
    // noLoop();
    
    f = 0
    k = 0.1
    vx = vy = 0
    fric = 0.8
    r0 = 25
    ro = 0

    nsteps = 30
    
    d1 = 8*noise(0,1)
    d2 = -5*noise(1,0)

    radMult = 0.3 + noise(99,0)
    
}

function draw() {

    // if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    // background(243,10)
    
    if(mouseIsPressed) {
        mx = mouseX
        my = mouseY
        if (!f){
            f = 1
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
            strokeWeight(rs);
            line(xo, yo, x,y);

            strokeWeight(rs*1.2);
            line(xo + d1, yo + d1, x + d1, y + d1);

            strokeWeight(rs*0.7);
            line(xo + d2, yo + d2 , x + d2, y + d2);
        }
        ro = rn

        // strokeWeight(5);
        // fill(255);
        // stroke(0)
        // ellipse(x,y, 20)

        d1 = 8*noise(frameCount*0.001,1)
        d2 = -5*noise(1,frameCount*0.001)

        radMult = 0.3 + noise(99,frameCount*0.001)
      
    } else if(f) {
      f = 0
      vx = vy = f = ro =0
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



