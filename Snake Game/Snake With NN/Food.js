// #######################################################################
// #################   Food class    ####################################
// #######################################################################
class Food {

  constructor(snake) {

    let flag = true;

    // Setting the food position which is on the board
    // and not on the snake body.
    let pos;
    while (flag) {
      pos = this.newLoc();
      if (pos.x == snake.body[0].x || pos.y == snake.body[0].y) continue;
      for (let b of snake.body.slice(1)) {
        if (b.x == pos.x && b.y == pos.y) continue;
      }
      flag = false;
    }
    this.pos = pos;

    // Food color, chosen at random from following
    let cols = ['#96CEB4', '#FFEEAD', '#FF6F69', '#FFCC5C', '#88D8B0']
    this.fCol = random(cols);


  }


  newLoc() {
    // Get a new food location atrandom.
    return {
      x: dxy * (1.5 + floor(random(0, nx))),
      y: dxy * (1.5 + floor(random(0, nx)))
    }
  }


  show() {
    // Function to draw the food on canvas

    push();
    // calculate the x and y coordinates for the border points of the hachure
    var xleft = this.pos.x - dxy / 2;
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
