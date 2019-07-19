var Canvass;

var nx = 10;
var ny = 10;
var dxy = 20;

var scribble

var games = [];
var savedGames = [];
var ngames = 2000;

var timer = 0;
var tmax = 300;
var timer_div;

var lifeUpdate = 0.000;
var genOver

var dispGame = false

// #######################################################################
// #################   P5.JS SKETCH   ####################################
// #######################################################################
function setup() {
    Canvass = createCanvas((nx+2)*dxy,(ny+2)*dxy);
    Canvass.position(window.innerWidth/2 - width/2, window.innerHeight/2 - height/2)
    scribble = new Scribble();
    scribble.bowing = 0.1;
    scribble.roughness = 1.5;

    timer_div = document.getElementById("timer")
    // //scribble.scribbleRect(200, 200, 500, 500)
    // game = new GameBoard(nx,ny);
    // game.show();
    // //noLoop();
    for(let i = 0; i < ngames; i++){
        games.push(new GameBoard(nx, ny));
    }

    //frameRate(1);
}

function draw() {
    timer_div.innerHTML = timer++;
    genOver = true;
    for(let game of games) {
        if(!game.gameOver) {
            game.update();
            genOver *= game.gameOver
        }
    }
    
    // for(let game of games){
    //     if(!game.gameOver) {
    //         game.show();
    //         break;
    //     }
    // }

    if(dispGame) games[0].show()
    
    if(genOver) genIsOver();
}




function keyPressed() {

    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
    games[0].gameKeyPressed(keyCode)

}

