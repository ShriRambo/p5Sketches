var Canvass;

var sal


function preload() {

}

function setup() {
    Canvass = createCanvas(600,600);
    background(51);

    sal = new Salamandar()

    sal.show();
    
}

function draw() {

    background(51);
    sal.show()
    sal.update();
    


}


class Salamandar{

    constructor(){
        this.pos = {x:random(width/4,3*width/4), y:random(height/4,3*height/4)}
        this.rad = 100;
        this.npart = 20;

        this.createBody();
    }

    createBody(){
        this.body = []
        this.body[0] = {x:this.pos.x, y:this.pos.y}
        for (let i = 1; i < this.npart; i++){
            this.body[i] = this.nextpos(this.body[i-1]);
        }

    }

    nextpos(pos){

        return {
            x: pos.x + 10*noise(pos.x,pos.y,10),
            y: pos.y + 10*noise(pos.x,pos.y,100)
        };

    }

    show(){
        noFill()
        stroke(230)
        strokeWeight(4)

        let r = 1
        for(let b of this.body){
            ellipse(b.x, b.y, this.rad*r);
            r = r*0.9;
        }
        
    }

    update(){

        let npos = {
            x: this.body[0].x + 20*noise(frameCount * 0.001) -10,
            y: this.body[0].y + 20*noise(100 + frameCount * 0.001) -10
        }

        this.body.unshift(npos);
        this.body.pop();

        this.pos.x = npos.x;
        this.pos.y = npos.y;
      

    }
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



