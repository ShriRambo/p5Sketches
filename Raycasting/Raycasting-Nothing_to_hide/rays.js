class Ray {

    constructor(pos,epos,off){

        this.pos = pos;
        this.epos = epos;
        this.off = off;
        this.dir = (createVector(epos.x-pos.x,epos.y-pos.y)).setMag(1);
        this.mag = 100;
    }

    show(){
        if(this.mag < Infinity){
            
            // Draw lines
            push();
                strokeWeight(1);
                stroke(10);
                line(this.pos.x,this.pos.y,this.pos.x + this.mag*this.dir.x,this.pos.y + this.mag*this.dir.y);
            pop();

            // Draw end ellipsis
            push();
                strokeWeight(0.1);
                fill(44)
                ellipse(this.pos.x + this.mag*this.dir.x,this.pos.y + this.mag*this.dir.y,10)
            pop();
        }
    }

    update(pos){
        this.pos = pos;
        this.dir.x  = this.epos.x-pos.x
        this.dir.y =  this.epos.y-pos.y
        this.dir = this.dir.setMag(1);
        this.dir.rotate(this.off);
    }

}


class Orb {

    constructor(offset){
        this.offset = offset.copy();
        this.pos = createVector(width/2 + this.offset.x,height/2 + this.offset.y);
        this.rays = [];
        
        // Adding all rays
        for(var bound of bounds){
            // First point
            this.rays.push( new Ray(this.pos,bound.a,0) );
            this.rays.push( new Ray(this.pos,bound.a, 0.0001) );
            this.rays.push( new Ray(this.pos,bound.a,-0.0001) );


            // Second point
            this.rays.push( new Ray(this.pos,bound.b,0) );
            this.rays.push( new Ray(this.pos,bound.b, 0.0001) );
            this.rays.push( new Ray(this.pos,bound.b,-0.0001) );
        
        }
       
    }


    drawLight(){

        this.rays.sort(this.raySort);
        push()
            noStroke();
            fill(255,50);
            beginShape()
            for (let ray of this.rays){
                vertex(ray.pos.x + ray.mag*ray.dir.x,ray.pos.y + ray.mag*ray.dir.y)
            }
            endShape(CLOSE)
        pop();
    }
 

    show(){

        this.drawLight();

        push();
            fill(255);
            noStroke();
            ellipse(this.pos.x,this.pos.y,5)
        pop();

        //for (var ray of this.rays) ray.show();
    }

    update(x,y){

        if (x > 0 & x < width){
            if(y > 0 & y < height){
                this.pos.x=this.offset.x + x;
                this.pos.y=this.offset.y + y;
                for (var i = 0; i < this.rays.length;i++) {
                    this.rays[i].update(this.pos)
                    let rmagold = Infinity;
                    for(let bound of bounds){
                        let rmag = bound.intersect(this.rays[i].pos,this.rays[i].dir);
                        if(rmag < rmagold) rmagold = rmag;
                    }
                    this.rays[i].mag = rmagold;
                }
            }
        }
    }


    raySort(a,b){
        return a.dir.heading() - b.dir.heading();
    }
}