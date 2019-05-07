var Canvass;


const TOTAL  = 500;
var birds = [];
var savedBirds = [];
var pipes = [];
var counter=0;


let slider;





function setup() {
    Cannvass = createCanvas(600,400);
    background(51);
    slider = createSlider(1,100,1);
    for (var i=0; i < TOTAL; i++){
        birds[i] = new Bird();
    }
}


function draw(){
    background(51);

    for(let n= 0; n< slider.value();n++){
        if( (counter  % 100 ) == 0  ){
            pipes.push(new Pipe());
        }  

        
        for(var i = pipes.length - 1; i >= 0; i--){
            pipes[i].update();

            for (j= birds.length -1; j >= 0; j--){
                if(pipes[i].hits(birds[j])) {
                    savedBirds.push(birds.splice(j,1)[0]);
                }
            }

            //if (pipes[i].hits(bird)) {
            //    pipes[i].highlight = true;
            //    console.log("Hit");
            //}

            if (pipes[i].isOffScreen()){
                pipes.splice(i, 1)
            }
        }



        for (let bird of birds){
            bird.think(pipes);
            bird.update();
        }
        counter++;

        if(birds.length == 0){
            counter = 0;
            nextGeneration();
            pipes = [];
        }
    }


    for (let bird of birds) bird.show();

    for (let pipe of pipes) pipe.show();



}




class Bird{

    constructor(brain){
        this.y = height/2;
        this.x = 64
        this.a = 0.8;
        this.v = 0.0;
        this.d  = 24;
        this.col = '#ffffff'
        this.l = -16;
        
        this.score = 0;
        this.fitness = 0;
        if(brain){
            this.brain = brain.copy();
        }
        else{
            this.brain = new NeuralNetwork(5,8,2);
        }
    }


    show() {
        fill(255,100);
        stroke(255);
        ellipse(this.x,this.y,this.d,this.d);
    }

    think(pipes) {

        let closest = null;
        let closestD = Infinity
        for (let i= 0; i < pipes.length;i++) {
            let d =  pipes[i].x + pipes[i].w - this.x;
            if (d < closestD && d > 0){
                closestD = d;
                closest = pipes[i];
            }
        }

        let inputs = []
        inputs[0] = this.y / height;
        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.v / 20 ;

        let output = this.brain.predict(inputs);
        if(output[0] > output[1]) this.up()
    }



    update() {
        
        this.v += this.a;
        this.v *= 0.9
        this.y += this.v;

        this.score++;

        if(this.y >= height - 0.5*this.d){
            this.y = height - 0.5*this.d
            this.v = 0.0;
            //this.v = - 0.7*this.v;
        }

        if(this.y <=  0.5*this.d){
            this.y = 0.5*this.d
            //this.v = 0.0;
            //this.v = - 0.7*this.v;
        }
    }

    up(){
        this.v += this.l;
    }

    mutate(){
        this.brain.mutate(0.1)
    }


}




function Pipe() {
    this.spacing = 100 - random(40);
    this.centery = random(this.spacing, height - this.spacing);

    this.top = this.centery - this.spacing / 2;
    this.bottom = height - (this.centery + this.spacing / 2);
    this.x = width;
    this.w = 30;
    this.col = 255;
    this.colH =  '#901012'
    this.x = width;
    this.speed = 2;
    this.highlight = false;

    this.show = function(){
        fill(this.col);
        if (this.highlight) fill(this.colH);
        rect(this.x,0,this.w,this.top);
        rect(this.x,height - this.bottom,this.w,this.bottom);
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
    
     //if(key = ' '){
    //bird.up();
    //}
    
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = ''
        //saveCanvas(Cannvass, name, 'jpg');
    }


}



