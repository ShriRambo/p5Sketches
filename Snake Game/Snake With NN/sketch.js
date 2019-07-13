var Canvass;

var nx = 40;
var ny = 40;
var dxy = 20;

var scribble
var game

// #######################################################################
// #################   P5.JS SKETCH   ####################################
// #######################################################################
function setup() {
    Canvass = createCanvas((nx+2)*dxy,(ny+2)*dxy);
    Canvass.position(window.innerWidth/2 - width/2, window.innerHeight/2 - height/2)
    scribble = new Scribble();
    scribble.bowing = 0.1;
    scribble.roughness = 1.5;

    //scribble.scribbleRect(200, 200, 500, 500)
    game = new GameBoard(nx,ny);
    game.show();
    //noLoop();
    frameRate(10);
}

function draw() {

    game.update();
    game.show();
    //scribble.scribbleRect(200,200,500,500)
}


function keyPressed() {

    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }

    game.gameKeyPressed(keyCode)
}



// #######################################################################
// #################   Food class    ####################################
// #######################################################################
class Food {

    constructor(snake) {
        
        let flag = true;
        // Setting the food position
        let pos;
        while (flag){
            pos = this.newLoc();
            for(let b of snake.body){
                if (b.x == pos.x & b.y == pos.y) continue;
            }
            flag = false;
        }
        this.pos = pos;

        let cols = ['#96CEB4', '#FFEEAD', '#FF6F69', '#FFCC5C',  '#88D8B0' ]
        this.fCol = random(cols);


    }


    newLoc(){
        return {
            x: dxy * (1.5 + floor(random(0, nx))),
            y: dxy * (1.5 + floor(random(0, nx)))
        }
    }


    show(){
        push();
            // calculate the x and y coordinates for the border points of the hachure
            var xleft = this.pos.x - dxy/2;
            var xright = this.pos.x + dxy / 2;
            var ytop = this.pos.y - dxy / 2;
            var ybottom = this.pos.y + dxy / 2;
           
            // the x coordinates of the border points of the hachure
            var xCoords = [xleft, xright, xright, xleft];
            // the y coordinates of the border points of the hachure
            var yCoords = [ytop, ytop, ybottom, ybottom];
            // the gap between two hachure lines
            var gap = 3.5;
            // the angle of the hachure in degrees
            var angle = 315;
            // set the thikness of our hachure lines
            strokeWeight(2);
            //set the color of the hachure to a nice blue
            stroke(this.fCol);
            // fill the rect with a hachure
            scribble.scribbleFilling(xCoords, yCoords, gap, angle);

            rectMode(CENTER)
            strokeWeight(1);
            stroke(0);       
            scribble.scribbleRect(this.pos.x, this.pos.y, dxy, dxy);

        pop();
    }


}



// #######################################################################
// ################   GameBoard class    #################################
// #######################################################################
class GameBoard {

    constructor(nx, ny) {
        this.nx = nx;
        this.ny = ny;
        this.w = nx*dxy;
        this.h = ny*dxy;
        this.snake = new Snake();

        this.food = new Food(this.snake)

        this.bgCol = '#EFEEF1'

        this.score = 0;
        this.scoreBoard = document.getElementById('score');
    }

    show(){
        background(this.bgCol);
        strokeWeight(5);
        stroke(0);
        scribble.scribbleRect(width/2,height/2, width-10, height-10);
        
        this.snake.show();
        this.food.show();
    }

    update(){
        let gotFood = this.checkFood()
        let hitWall = this.snake.update( gotFood );

        if(gotFood) {
            this.food = new Food(this.snake);
            this.score += 1;
            this.scoreBoard.innerHTML = this.score;
        }

        if(this.snake.hitSelf() || hitWall){
            noLoop();
            console.log('Game Over')
        }
    }

    gameKeyPressed(keyCode){

        if      (keyCode == UP_ARROW    && this.snake.dir.y == 0)  this.snake.dir = {x: 0,  y:-1};
        else if (keyCode == DOWN_ARROW  && this.snake.dir.y == 0)  this.snake.dir = {x: 0,  y: 1};
        else if (keyCode == LEFT_ARROW  && this.snake.dir.x == 0)  this.snake.dir = {x: -1, y: 0};
        else if (keyCode == RIGHT_ARROW && this.snake.dir.x == 0)  this.snake.dir = {x: 1,  y: 0};
    }

    checkFood(){
        if (this.food.pos.x == this.snake.body[0].x && this.food.pos.y == this.snake.body[0].y ){
            return true
        }
        return false
    }

}
