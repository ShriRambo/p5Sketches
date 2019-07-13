// #######################################################################
// #################   Snake class    ####################################
// #######################################################################
class Snake {

  constructor() {

    let x0 = dxy * (3.5 + floor(random(0, nx - 2)));
    let y0 = dxy * (3.5 + floor(random(0, nx - 2)));

    // Snake Body
    this.body = [{ x: x0, y: y0 },   { x: x0 - dxy,y: y0 } ];
    this.dir = {
      x: 1,
      y: 0
    };

    this.fCol = '#e0267d' // Face color
    this.bcol = '#8FABA6' // Body color

    // Snake eyes
    this.eyes = new Vision();
    this.eyes.see(this.body);


  }

  show() {

    // Showing view lines
    strokeWeight(1);
    this.eyes.show(this.body[0]);

    rectMode(CENTER)
    strokeWeight(2);

    stroke(this.fCol);
    this.drawScribbleRect(this.body[0])
    stroke(this.bcol);
    for (let b of this.body.slice(1)) {
      this.drawScribbleRect(b)
    }

   
  }

  drawScribbleRect(b,col) {
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

    let sd = {}
    let x = this.body[0].x + this.dir.x * dxy;
    let y = this.body[0].y + this.dir.y * dxy;

    if (x > width - dxy) return true //x = 3*dxy/2;
    if (x < dxy) return true //x = width - 3*dxy/2;
    if (y > height - dxy) return true //y = 3*dxy/2;
    if (y < dxy) return true //y = height - 3*dxy/2;

    sd.x = x;
    sd.y = y;

    this.body.unshift(sd);
    if (!gotFood) this.body.pop();
    this.eyes.see(this.body);

    return false;
  }


  hitSelf() {
    let head = this.body[0];

    for (let b of this.body.slice(1)) {
      if (b.x == head.x && b.y == head.y) return true;
    }
    return false;
  }
}



// #######################################################################
// #################   Vision class    ###################################
// #######################################################################
class Vision{
  constructor(){
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
    if(food) this.seeFood = [Food.pos.x = body[0].x, Food.pos.y = body[0].y];

    this.view[0] = width - body[0].x - dxy;
    this.view[2] = body[0].y - dxy;
    this.view[4] = body[0].x - dxy;
    this.view[6] = height - body[0].y - dxy;

    this.view[1] = sqrt(2) * min(this.view[0], this.view[2]);
    this.view[3] = sqrt(2) * min(this.view[2], this.view[4]);
    this.view[5] = sqrt(2) * min(this.view[4], this.view[6]);
    this.view[7] = sqrt(2) * min(this.view[6], this.view[0]);
  }

  show(head){
      
    scribble.scribbleLine(head.x, head.y, head.x + this.view[0], head.y); // Line 0
    scribble.scribbleLine(head.x, head.y, head.x - this.view[4], head.y); // Line 2
    scribble.scribbleLine(head.x, head.y, head.x, head.y - this.view[2]); // Line 4
    scribble.scribbleLine(head.x, head.y, head.x, head.y + this.view[6]); // Line 6

    let l = this.view[1]/sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x + l, head.y - l); // Line 1
    l = this.view[3] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x - l, head.y - l); // Line 3
    l = this.view[5] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x - l, head.y + l); // Line 5
    l = this.view[7] / sqrt(2);
    scribble.scribbleLine(head.x, head.y, head.x + l, head.y + l); // Line 7

  }
}