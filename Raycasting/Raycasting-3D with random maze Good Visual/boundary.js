class Boundary {

    constructor(seg){
        this.a = createVector(seg.a.x,seg.a.y);
        this.b = createVector(seg.b.x,seg.b.y);
    }

    show() {
        stroke(150);
        strokeWeight(5)
        line(this.a.x,this.a.y,this.b.x,this.b.y);
    }

    intersect(p,dir){
        let T2 = (  dir.y*(this.a.x - p.x) - dir.x*(this.a.y - p.y)  ) / (  dir.x*(this.b.y-this.a.y) - dir.y*(this.b.x-this.a.x)  )
        let T1 = (  (this.a.x - p.x) + T2*(this.b.x-this.a.x)  )/(dir.x);

        if(( T1 >= 0) & (T2 >= 0 ) & (T2 <= 1)) return T1
        else return Infinity;
    }
}


function initBiundaries(){

     generateARandomMaze();

    
    for (let seg of allWalls){
        if(seg.isWall) bounds.push(seg);
    }

    
    }