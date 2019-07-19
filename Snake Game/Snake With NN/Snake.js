// #######################################################################
// #################   Snake class    ####################################
// #######################################################################
class Snake {

  constructor(parent) {
    // Parent is the gameboard object where the snake lives.
    this.parent = parent;

    // Choosing a position of the snake head
    let x0 = dxy * (1.5 + floor(random(5, nx - 5)));
    let y0 = dxy * (1.5 + floor(random(5, nx - 5)));

    // Snake Body of 2 cells
    this.body = [{ x: x0, y: y0 },   { x: x0 - dxy,y: y0 } ];
    this.dir = random([{
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 0,
      y: -1
    }]); // The direction along which the snaki is initially moving # Chosen at random

    this.fCol = '#e0267d' // Face color
    this.bcol = '#8FABA6' // Body color

    // Snake eyes
    this.eyes = new Vision(this);
    this.eyes.see(this.body);

    // Snake mind
    this.mind = new Mind(this);


  }

  show() {
    // Function to draw snake body on canvas

    // Showing view lines
    strokeWeight(1);
    this.eyes.show(this.body[0]);

    rectMode(CENTER)
    strokeWeight(2);

    stroke(this.fCol);
    this.drawScribbleRect(this.body[0]) // Deawing head
    stroke(this.bcol);
    for (let b of this.body.slice(1)) { // Drawing rest of the body
      this.drawScribbleRect(b)
    }

   
  }

  drawScribbleRect(b) {
    // Function to set and draw the rectangles in scribble style 

    // calculate the x and y coordinates for the border points of the hachure
    var xleft = b.x - dxy / 2;
    var xright = b.x + dxy / 2;
    var ytop = b.y - dxy / 2;
    var ybottom = b.y + dxy / 2;

    // the x coordinates of the border points of the hachure
    var xCoords = [xleft, xright, xright, xleft];
    // the y coordinates of the border points of the hachure
    var yCoords = [ytop, ytop, ybottom, ybottom];
    // the gap between two hachure lines
    var gap = 3.5;
    // the angle of the hachure in degrees
    var angle = 315;

    // fill the rect with a hachure
    scribble.scribbleFilling(xCoords, yCoords, gap, angle);
  }

  update(gotFood) {
    // Update the snake state

    // Thinking what key to press and sending 
    // that choice to the gameKeyPressed function
    this.parent.gameKeyPressed(this.mind.think());

    // Movinf by one step
    let sd = {}
    let x = this.body[0].x + this.dir.x * dxy;
    let y = this.body[0].y + this.dir.y * dxy;

    // Wall hit die
    // if (x > width - dxy) return true;
    // if (x < dxy) return true;
    // if (y > height - dxy) return true;
    // if (y < dxy) return true;

    // Wall hit loop
    if (x > width - dxy) x = 3*dxy/2;
    if (x < dxy) x = width - 3*dxy/2;
    if (y > height - dxy) y = 3*dxy/2;
    if (y < dxy) y = height - 3*dxy/2;

    // Set position
    sd.x = x;
    sd.y = y;

    // Update snake body
    this.body.unshift(sd);
    if (!gotFood) this.body.pop(); // If no food, then keep the body size same
    this.eyes.see(this.body, this.parent.food); // See the environment i.e. body and food

    return false; // Return hit wall state
  }


  hitSelf() {
    return false;
    // Function to check if the snake hit itself
    let head = this.body[0];

    // Check head with rest of the body
    for (let b of this.body.slice(1)) {
      if (b.x == head.x && b.y == head.y) return true;
    }
    return false;
  }


  reset(mind = false){
    // Function to reset the snake. 
    // If mind is passed, mind is also reset.
    let x0 = dxy * (1.5 + floor(random(5, nx - 5)));
    let y0 = dxy * (1.5 + floor(random(5, nx - 5)));

    // Snake Body
    this.body = [{
      x: x0,
      y: y0
    }, {
      x: x0 - dxy,
      y: y0
    }];
    this.dir = {
      x: 1,
      y: 0
    };

    // See the environment
    this.eyes.see(this.body);

    if(mind) {
      this.mind = mind;
      this.mind.parent = this;
    } 

  }
}



// #######################################################################
// #################   Vision class    ###################################
// #######################################################################
class Vision{
  // A class for snake to see the environment
  constructor(parent){
    // Parent  is the snake object which the eyes are seeing for
    this.parent = parent;
    this.view = [0,0,0,0,0,0,0,0];
    // View vector explained
    // +---+---+---+
    // | 3 | 2 | 1 |
    // +---+---+---+
    // | 4 | H | 0 |
    // +---+---+---+
    // | 5 | 6 | 7 |
    // +---+---+---+
    // H is head and number stands for the indexes


    this.seeFood = [0,0] // =[ food.x - head.x, food.y - head.y]

  }

  see(body, food=false){
    // Function to see the environment, body and food

    let head = body[0];

    // See Food
    if (food) this.seeFood = [food.pos.x - head.x, food.pos.y - head.y];

    // See walls
    this.view[0] = width - head.x - dxy;
    this.view[2] = head.y - dxy;
    this.view[4] = head.x - dxy;
    this.view[6] = height - head.y - dxy;

    this.view[1] = sqrt(2) * min(this.view[0], this.view[2]);
    this.view[3] = sqrt(2) * min(this.view[2], this.view[4]);
    this.view[5] = sqrt(2) * min(this.view[4], this.view[6]);
    this.view[7] = sqrt(2) * min(this.view[6], this.view[0]);

    // See body
    for(let b of body.slice(1)){

      let dx = b.x - head.x;
      let dy = b.y - head.y;

      // Checking Horizontal: line 0 and 4
      if(dy == 0){
        if( dx > 0){
          this.view[0] = min(dx, this.view[0]);
        }else{
          this.view[4] = min(-dx, this.view[4]);
        }
      } 
      // Checking Vertical: line 2 and 6
      else if(dx == 0){
        if (dy > 0) {
          this.view[6] = min(dy, this.view[6]);
        } else {
          this.view[2] = min(-dy, this.view[2]);
        }
      }
      // Checking Diagonal: 3 and 7
      else if (dx == dy) {
        if (dy > 0) {
          this.view[7] = min(sqrt(2)*dy, this.view[7]);
        } else {
          this.view[3] = min(-dy*sqrt(2), this.view[3]);
        }
      }
      // Checking Diagonal: 1 and 5
      else if (dx == -dy) {
        if (dx > 0) {
          this.view[1] = min(sqrt(2) * dx, this.view[1]);
        } else {
          this.view[5] = min(-dx * sqrt(2), this.view[5]);
        }
      }


    }
  }

  show(head){
    // Function to display what eyes are seeing as lines from the head

    // Draw 0,2,4,6
    scribble.scribbleLine(head.x, head.y, head.x + this.view[0], head.y); // Line 0
    scribble.scribbleLine(head.x, head.y, head.x - this.view[4], head.y); // Line 2
    scribble.scribbleLine(head.x, head.y, head.x, head.y - this.view[2]); // Line 4
    scribble.scribbleLine(head.x, head.y, head.x, head.y + this.view[6]); // Line 6
    // Draw 1,3,5,7
    let l = this.view[1]/sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x + l, head.y - l); // Line 1
    l = this.view[3] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x - l, head.y - l); // Line 3
    l = this.view[5] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x - l, head.y + l); // Line 5
    l = this.view[7] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x + l, head.y + l); // Line 7

    // Draw food
    scribble.scribbleLine(head.x, head.y, head.x + this.seeFood[0], head.y + +this.seeFood[1]);
  }

  getVector(){
    // Get a scaled vector of the total view to be passed to the snake brain.
    let vec = this.view.concat(this.seeFood);
    
    vec[0] /= width;
    vec[2] /= height;
    vec[4] /= width;
    vec[6] /= height;

    let d = sqrt(width*width + height*height);
    vec[1] /= d;
    vec[3] /= d;
    vec[5] /= d;
    vec[7] /= d;

    vec[8] = (vec[8] + width) /2;
    vec[9] = (vec[9] + height) / 2;

    return vec;


  }
}




// #######################################################################
// #################    Mind  class    ###################################
// #######################################################################
class Mind {
  // A class to interprete what snake is seeing and decied what to de
  constructor(parent=false,brain=false){

    // Parent is the snake object whose mind is this.
    this.parent = parent;

    // The brain is a neural network object.
    if(brain) this.brain = brain.copy();
    else this.brain = new NeuralNetwork(2, 8, 4);


  }

  think(){

    // Function to think, to pass what eyes are seeing,
    // Parse the output into an key pressing action and
    // return that action.
    let vec = this.parent.eyes.getVector()
    let output = this.brain.predict(vec.slice(8));
    //console.log(output)
    
    let idx = 0;

    let keys = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];
    
    // Arg max output
    let maxVal = 0;
    for(let i = 0; i < 4; i++) {
      if (output[i] >=  maxVal) {
        maxVal = output[i];
        idx = i;
      }
    }

    // Stochastic output
    // let r  = random();
    // while(r > 0){
    //   r = r - output[idx]
    //   idx++
    // }
    // idx--
  
    return keys[idx];

  }

  mutate(){
    // Mutate the neural network a little
    this.brain.mutate(0.1);
  }

  copy(){
    // Create a copy of the mind object
    let mind = new Mind();
    mind.brain = this.brain.copy();

    return mind
  }


}