
var Canvass;
var banana;

var pipes = [];

var foods = [];

var score = 0;
var scoreCard;
var scl = 0.5

var wiggleParam = 1;

var soundTrack;
var bing;

var gameOff = true;


function preload(){
    banana = loadImage('./resources/banana.png')
    bgrd = loadImage('./resources/background3.png')   
    poison = loadImage('./resources/poison.png')
    strawberry = loadImage('./resources/strawberry.png')
    apple = loadImage('./resources/apple.png')
    burger = loadImage('./resources/burger.png')
    soundTrack = loadSound('./resources/Rolemusic.mp3');
    bing = loadSound('./resources/cheerful.mp3');
}

function processImages(){
    
    // Background resize
    w =  bgrd.width * height / bgrd.height;
    bgrd.resize(w,height);

    // Banana resize
    w = 60
    h = banana.height * w / banana.width
    banana.resize(w,h)

    // Scale
    w = 40
    h = strawberry.height * w / strawberry.width

    h = strawberry.height * w / strawberry.width
    strawberry.resize(w, h)
    h = poison.height * w / poison.width
    poison.resize(w, h)
    h = apple.height * w / apple.width
    apple.resize(w,h)
    h = burger.height * w / burger.width
    burger.resize(w,h)



    // Collecting in array
    foods[0] = poison
    foods[1] = strawberry
    foods[2] = apple
    foods[3] = burger
}

function startGame(){

    soundTrack.loop();
    bing.play();

    setInterval(function () {
        score -= 1
    }, 1000);

    intervalWig = setInterval(function () {
        wiggleParam += 0.01
        if (wiggleParam > 5) clearInterval(intervalWig);
    }, 100);  

    loop();

    gameOff = false;
}


function setup() {


    Cannvass = createCanvas(1916*scl, 951*scl);
    Cannvass.parent('canvas');

    scoreCard = document.getElementById("score");
    score = 0
    scoreCard.innerHTML = score;
   

    processImages();

    bird = new Bird();
    pipes.push(new Pipe());
    noLoop();
}

function draw(){
    image(bgrd, 0, 0)
    
    for(var i = pipes.length - 1; i >= 0; i--){
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(bird)) {
            bing.play();
            if(pipes[i].foodType == 0)  (score = score -  10)  
            else ( score = score + 20)
            pipes.splice(i, 1)
        }

        if (pipes[i].isOffScreen()){
            pipes.splice(i, 1)
        }
    }
    
    
    bird.show();
    bird.update();


    if( frameCount  % 100 == 0  ){
        pipes.push(new Pipe());
    }


    scoreCard.innerHTML = score;

}




function Bird() {
    this.y = height/2;
    this.x = 80
    this.a = 0.6;
    this.v = 0.0;
    this.r  = banana.height/2;
    this.l = -15;
    this.sc = 4;

    this.height = height - 30;


    this.show = function() {
        push();
            imageMode(CENTER)
            image(banana, this.x , this.y )
        pop(); 
        //ellipse(this.x,this.y,10,10)   
    }

    this.update = function() {
        this.y += this.v;
        this.v *= 0.9
        this.v += this.a;

        if (this.y >= this.height -  this.r) {
            this.y = this.height -  this.r
            this.v = 0.0;
        } else if (this.y <   this.r) {
            this.y =   this.r
            this.v = 0.0;
        }
    }

    this.up = function(){
        this.v += this.l;
    }
}






function Pipe() {

    this.nSeedX = 0;
    this.nSeedY = random(1000);

    this.y = 60 + (height-60-40)*noise(noise(this.nSeedX, this.nSeedY)) //random(60, height - 45);
    this.foodType = int(Math.floor(random(foods.length)))
    this.x = width;

    
 
    this.speed = 2;
    this.highlight = false;

    this.show = function () {
       
        push();
            imageMode(CENTER)
            image(foods[this.foodType], this.x, this.y);
        pop();
        //ellipse(this.x, this.centery, 10)
    }

    this.update = function () {
        this.x -= this.speed;
        let t = this.y + wiggleParam * (noise(this.nSeedX, this.nSeedY) - 0.5);
        this.y = max( 60,  min(height - 40, t)  );
        this.nSeedX += 0.005

    }

    this.isOffScreen = function () {
        if (this.x + this.w <= 0) return true
        else return false;
    }

    this.hits = function (bird) {
        
        if (   (  ((this.x - bird.x)**2 ) +  ((this.y - bird.y)**2)  ) < 400) {
            return true;
        }
        return false;
        
    }
}








function keyPressed() {
    
    if(key == ' '){
        if(gameOff){
            startGame();
        }else{
            bird.up();
        }
        
    }
    
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        soundTrack.stop()
    }


}



