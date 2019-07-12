class Wall{

    constructor(a,b){
        this.a = a;
        this.b = b;
        this.faces = [];
        this.isWall = true;
        this.isChecked = false;
    }

    addFace(face){
        if (this.faces.length < 2) this.faces.push(face);
        else throw "Error: Trying to add more than 2 faces to an edge.";
    }


    show(){
        push();
            stroke(200,54,23);
            //if(!this.isWall) stroke(20,200,100);
            strokeWeight(4);
            if(this.isWall) line(this.a.x,this.a.y,this.b.x,this.b.y);
        pop();
    }

}


class Face{

    constructor(walls){
        this.walls = walls;
        this.isChecked = false;

        let cx = 0;
        let cy = 0
        for (let wall of walls) {
            wall.addFace(this);
            cx += wall.a.x + wall.b.x;
            cy += wall.a.y + wall.b.y;
        }
        cx /= 8;
        cy /= 8;

        this.center = createVector(cx,cy);
    }



    show(){
        
        if( this.isChecked){
            push();
                rectMode(CENTER);
                fill(22,90,31);
                rect(this.center.x,this.center.y, dx,dy);
            pop();
        }
        //for(let wall of this.walls) wall.show();
    }
}
