// #######################################################################
// ################   GameBoard class    #################################
// #######################################################################
class GameBoard {

  constructor(nx, ny) {
    this.nx = nx; // X grids
    this.ny = ny; // Y grids
    this.w = nx * dxy; // Board width
    this.h = ny * dxy; // Board height
    this.snake = new Snake(this); // The snake

    this.food = new Food(this.snake) // The food

    this.bgCol = '#EFEEF1' // Background color

    this.score = 1; // Count score == number of food items ate.
    this.life = 0; // Count life == number of frames lived.
    this.scoreBoard = document.getElementById('score'); // To display score

    this.gameOver = false;
  }

  show() {
    // Function to display current state of the game
    this.scoreBoard.innerHTML = this.score.toPrecision(5);
    background(this.bgCol);
    strokeWeight(5);
    stroke(0);
    scribble.scribbleRect(width / 2, height / 2, width - 10, height - 10);

    this.snake.show(); // Display snake
    this.food.show(); // Display food
  }

  update() {
    // Function to update the state of the game by one frame

    this.score += lifeUpdate;
    let gotFood = this.checkFood() // Check if food is found
    let hitWall = this.snake.update(gotFood); // Check if hit the wall.

    // If food is found, update the score and create new food.
    if (gotFood) {
      this.food = new Food(this.snake);
      this.score += 1;
    }

    // If snake hit self or the wall, the game is over
    if (this.snake.hitSelf() || hitWall || timer > tmax) { //|| (this.score < 0)
      this.gameOver = true;
      //this.score = this.score + this.life //1 - exp(-this.life);
      console.log('Game Over')
    }
  }


  gameKeyPressed(keyCode) {
    // Action to take when a key is pressed
    if (keyCode == UP_ARROW && this.snake.dir.y == 0) this.snake.dir = {
      x: 0,
      y: -1
    };
    else if (keyCode == DOWN_ARROW && this.snake.dir.y == 0) this.snake.dir = {
      x: 0,
      y: 1
    };
    else if (keyCode == LEFT_ARROW && this.snake.dir.x == 0) this.snake.dir = {
      x: -1,
      y: 0
    };
    else if (keyCode == RIGHT_ARROW && this.snake.dir.x == 0) this.snake.dir = {
      x: 1,
      y: 0
    };
    // else if(keyCode == 32) { // Test part, remove these lines.
    //   this.food.pos.x = this.snake.body[0].x;
    //   this.food.pos.y = this.snake.body[0].y;
    // }
  }


  checkFood() {
    // Function to check is the snake head is on food
    if (this.food.pos.x == this.snake.body[0].x && this.food.pos.y == this.snake.body[0].y) {
      return true
    }
    return false
  }

  reset(mind = false){
    // Function to reset the game
    this.score = 1; // Count score == number of food items ate.
    this.life = 0; // Count life == number of frames lived.

    this.gameOver = false;
    this.snake.reset(mind);
  }

}
