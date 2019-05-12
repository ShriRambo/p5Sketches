class Ray {

    constructor(pos,dir){

        this.pos = pos;
        this.dir = dir.setMag(1);
        this.mag = 100;
    }

    show(){
        if(this.mag < Infinity){
            
            // Draw lines
            push();
                strokeWeight(1);
                stroke(10);
                smooth();
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
    }

}


class Orb {

    constructor(){
        this.pos = createVector(width/2 ,height/4 );
        this.rays = [];
        this.Nrays = 400;
        this.omin = -PI/3;
        this.omax =  PI/3;
        this.dir = p5.Vector.fromAngle(0,2);
        
        // Adding all rays irrespective of boundaries
        
        for(var i = 0; i < this.Nrays; i++){
            this.rays.push( new Ray(this.pos,p5.Vector.fromAngle(this.omin + i*(this.omax - this.omin)/(this.Nrays))  ) );
        
        }

        this.orays = []
        for(var i =0; i<this.rays.length; i++) this.orays[i] = this.rays[i];
       
    }


    drawLight(){

        this.rays.sort(this.raySort);
        push()
            noStroke();
            fill(255,50);
            let flag = true;
            let jump = 0;
            beginShape()
            let ray = this.rays[0];
            vertex(ray.pos.x + ray.mag*ray.dir.x,ray.pos.y + ray.mag*ray.dir.y)
            for (let i = 1; i < this.rays.length; i++){
                ray = this.rays[i];
                jump = this.rays[i-1].dir.heading() - ray.dir.heading();
                if(abs(jump) > PI){
                    vertex(this.pos.x,this.pos.y);
                    flag = false;
                }
                vertex(ray.pos.x + ray.mag*ray.dir.x,ray.pos.y + ray.mag*ray.dir.y)
            }
            if(flag) vertex(this.pos.x,this.pos.y);
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

        // Showing rays
        //for (var ray of this.rays) ray.show();
    }


    // Function to update orbs position and calculate intersection points for all rays
    update(x,y){

        if (x > 0 & x < width){
            if(y > 0 & y < height/2){
                this.pos.x= x;
                this.pos.y= y;
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




    // Function to order ray object
    raySort(a,b){
        return a.dir.heading() - b.dir.heading();
    }


    // Function to rotate camera angle
    rotateCamera(d){
        this.dir.rotate(d*0.1);
        for (let ray of this.rays) ray.dir.rotate(d*0.1);
        this.update(this.pos.x,this.pos.y);
        
    }

    move(d){
        this.update(this.pos.x + d*this.dir.x,this.pos.y+d*this.dir.y)
    }
    

    updateScene(){
        let dists = [] 
        for (let ray of this.orays) {
            let dp = abs(this.dir.dot(ray.dir));
            //console.log(dp)
            dists.push((ray.mag*dp));
        }
        var nRect = dists.length;
        var w = width/nRect
        var dmax = sqrt(width**2 + (height**2)/4);
        push();
            
            noStroke();
            rectMode(CENTER)
            for (var i = 0; i < nRect;i++){
                var b = map(dists[i]**2,0,dmax**2,255,51);
                var h = max(0,map(dists[i],0,dmax,height/2,0));
                //console.log(h);
                fill(b);
                rect(i*w+w/2,3*height/4,w+1,h);
            }
        pop();

    }

}
