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
        this.pos = createVector(width/nx ,height/(4*ny) );
        this.rays = [];
        this.Nrays = 400;
        this.omin = -PI/6;
        this.omax =  PI/6;
        this.dir = p5.Vector.fromAngle(0,2);
        this.pRatio = 50000; // Ratio for scaling wall height.
        this.bRatio = 5000000; // Ratio for scaling brightness.
        //this.hRatio = 0.0; // Height of orb compared to the room height.
        
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
                //if(!this.nearWall()){
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
                //}
            }
        }
    }


    nearWall(){
        let mindir = 10000;

        for (let ray of this.rays){
            if (ray.mag < mindir) mindir = ray.mag;
        }

        return (mindir < 5);
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


    drawFloorCeil(){
        push();
        noStroke();
        rectMode(CENTER)
        translate(width/2, 3*height/4);
        colorMode(HSB, 360,100,100);
        //let ht = height/2
        let nr = 50
        for (let i = 0; i < nr ; i++ ){
            fill(360,100, 50+25*(1- i/nr));
            rect(0,0,width, (1 - (i/nr)**2 )*height/2);
        }
        pop();
        
    }
    

    updateScene(){
        //this.drawFloorCeil();
        let dists = [] 
        for (let ray of this.orays) {
            let dp = abs(this.dir.dot(ray.dir));
            //console.log(dp)
            dists.push((ray.mag*dp));
        }
        var nRect = dists.length;
        var w = width/nRect;
        push();
            
            noStroke();
            rectMode(CENTER)
            for (var i = 0; i < nRect;i++){
                var b =  min(51 + 500000/(dists[i]**2),255);
                var h =  min(this.pRatio / dists[i],height/2);  //max(0,map(dists[i],0,dmax,height/2,0));
                //var dh = h*this.hRatio/2
                //console.log(h);
                fill(b);
                rect(i*w+w/2,3*height/4 ,w+1,h);
            }
        pop();

    }

}