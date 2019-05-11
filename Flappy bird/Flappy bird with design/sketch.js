
var Canvass;
var bird;

var pipes = [];


function preload(){
    img = loadImage('./resources/bird.png')
    bgrd = loadImage('./resources/background.png')   
    pip = loadImage('./resources/pipe.png')
}

function processImages(){
    w =  bgrd.width * height / bgrd.height;
    bgrd.resize(w,height);
    pip.resize(30,7000*20/2600);
}


function setup() {
    Cannvass = createCanvas(400,600);
    background(0);  

    processImages();
    

    bird = new Bird();
    pipes.push(new Pipe());
}


function draw(){
    image(bgrd,0,0)
    
    for(var i = pipes.length - 1; i >= 0; i--){
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
            pipes[i].highlight = true;
            console.log("Hit");
        }

        if (pipes[i].isOffScreen()){
            pipes.splice(i, 1)
        }
    }
    
    
    bird.show();
    bird.update();


    if( frameCount  % 60 == 0  ){
        pipes.push(new Pipe());
    }



}




function Bird() {
    this.y = height/2;
    this.x = 65
    this.a = 0.6;
    this.v = 0.0;
    this.d  = 30;
    this.col = '#ffffff'
    this.l = -15;
    this.sc = 4;

    this.show = function() {
        fill(this.col);
        ellipse(this.x,this.y,this.d,this.d);
        push();
            translate(this.x - this.sc*0.5*this.d, this.y -  this.sc*0.5*this.d);
            //rotate(Math.sign(this.v)*0.1);
           // image(img, 0, 0 , this.sc*this.d,this.sc*this.d);
        pop();
    }

    this.update = function() {
        this.y += this.v;
        this.v *= 0.9
        this.v += this.a;

        if(this.y >= height - 0.5*this.d){
            this.y = height - 0.5*this.d
            this.v = 0.0;
            //this.v = - 0.7*this.v;
        }
    }

    this.up = function(){
        this.v += this.l;
    }
}




function Pipe() {
    this.top = random(height/2);
    this.bottom = random(height/2);
    this.x = width;
    this.w = 20;
    this.col = 255;
    this.colH =  '#901012'
    this.x = width;
    this.speed = 2;
    this.highlight = false;

    this.show = function(){
        fill(this.col);
        if (this.highlight) fill(this.colH);
        rect(this.x,0,this.w,this.top);
        image(pip,this.x,height - this.bottom);
        //rect(this.x,height - this.bottom,this.w,this.bottom);
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.isOffScreen = function() {
        if (this.x + this.w <= 0) return true
        else return false;
    }

    this.hits = function(bird){
        if(bird.x > this.x && bird.x < this.x + this.w){
            if(bird.y < this.top || bird.y > height - this.bottom){
                return true;
            }
        }
        this.highlight = false;
        return false;
    }
}







function keyPressed() {
    
    if(key = ' '){
        bird.up();
    }
    
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = ''
        //saveCanvas(Cannvass, name, 'jpg');
    }


}



