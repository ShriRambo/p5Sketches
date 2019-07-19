
function genIsOver() {
    // Calculating fitness of each gameplay based on score and life
    calculateFitness();

    timer = 0;
    // Sorting all games from most fit to least fit
    games.sort((a, b) => a.fitness - b.fitness);
    scoreMax = 0;
    for(let i = 0; i < ngames; i++){
        savedGames[i] = games[i];
        if(games[i].score > scoreMax) scoreMax = games[i].score;
    }
    console.log("Max score: ", scoreMax);


    nextGeneration();
    //noLoop();
}


function nextGeneration(){

    console.log("Next generation")

    games[0] = savedGames[ngames-1]
    games[0].reset();
    for (let i = 1; i < ngames; i++) {
        games[i] = pickOne();
    }
    savedGames = [];
}


function pickOne(){
    var index = 0;
    var r = random(1);

    while(r > 0) {
        r = r - savedGames[index].fitness;
        index++
    }

    index--;

    let mind = savedGames[index].snake.mind.copy();
    let child = new GameBoard(nx,ny);
    child.reset(mind.mutate())

    return child; 
}


function calculateFitness() {

    // Function to calculate the fitness of each simulaton 
    let sum = 0;
    for (let game of games){
        sum += game.score;
    }

    for (let game of games) {
        game.fitness = game.score / sum;
    }

}


