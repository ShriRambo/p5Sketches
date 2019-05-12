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

    let segments = [
    
        // Border
        {a:{x:0,y:0}, b:{x:840,y:0}},
        {a:{x:840,y:0}, b:{x:840,y:360}},
        {a:{x:840,y:360}, b:{x:0,y:360}},
        {a:{x:0,y:360}, b:{x:0,y:0}},
        // Polygon #1
        {a:{x:100,y:150}, b:{x:120,y:50}},
        {a:{x:120,y:50}, b:{x:200,y:80}},
        {a:{x:200,y:80}, b:{x:140,y:210}},
        {a:{x:140,y:210}, b:{x:100,y:150}},
        // Polygon #2
        {a:{x:100,y:200}, b:{x:120,y:250}},
        {a:{x:120,y:250}, b:{x:60,y:300}},
        {a:{x:60,y:300}, b:{x:100,y:200}},
        // Polygon #3
        {a:{x:200,y:260}, b:{x:220,y:150}},
        {a:{x:220,y:150}, b:{x:300,y:200}},
        {a:{x:300,y:200}, b:{x:350,y:320}},
        {a:{x:350,y:320}, b:{x:200,y:260}},
        // Polygon #4
        {a:{x:540,y:60}, b:{x:560,y:40}},
        {a:{x:560,y:40}, b:{x:570,y:70}},
        {a:{x:570,y:70}, b:{x:540,y:60}},
        // Polygon #5
        {a:{x:650,y:190}, b:{x:760,y:170}},
        {a:{x:760,y:170}, b:{x:740,y:270}},
        {a:{x:740,y:270}, b:{x:630,y:290}},
        {a:{x:630,y:290}, b:{x:650,y:190}},
        // Polygon #6
        {a:{x:600,y:95}, b:{x:780,y:50}},
        {a:{x:780,y:50}, b:{x:680,y:150}},
        {a:{x:680,y:150}, b:{x:600,y:95}}]
        
        for (seg of segments){
            bounds.push(new Boundary(seg));
        }
    
    }