class LongCurve{

    constructor(cpts){

        this.cpts = cpts; // Points to draw
        this.basePts = [] // Basic points of the curve
        for(let i = 0; i < cpts.length; i++) this.basePts[i] = cpts[i].copy();
        
    
        this.nCurves = 0.5*cpts.length - 1 // Number of curves
        this.Len  = this.totalLength();   // Total approx length 
        this.sCon = 2*(this.Len**0.4);
        this.strWt = 2;  // Stroke weight
        this.strCol = '#cff7f6' // Stroke color
    }


    resetBasePoints(){
        this.cpts = []; // Original points
        for(let i = 0; i < basePts.length; i++){
            this.cpts[i] = basePts[i].copy();
        }
    }


    // FUnction to calculat the total length of the contnuous curve. If needed
    totalLength(){

        let clen = 0;
        let pts;

        for(let i = 0; i < this.nCurves; i++){
            let idx = i*2;
            pts = [ p5.Vector.add(this.cpts[idx], this.cpts[idx+1]).mult(0.5),
                    this.cpts[idx+1],
                    this.cpts[idx+2],
                    p5.Vector.add(this.cpts[idx+2], this.cpts[idx+3]).mult(0.5)
                ];
            
            clen += this.segmentLength(pts);
        }

        return clen;

    }

    segmentLength(cpts){
        // Approx length of a cubic bezier curve
        let l1 = p5.Vector.dist(cpts[0],cpts[3]);
        let l2 = p5.Vector.dist(cpts[0], cpts[1]) +  p5.Vector.dist(cpts[1], cpts[2]) +  p5.Vector.dist(cpts[2], cpts[3]) 

        return (l1 + l2) / 2;

    }



    show(){

        // Drawing continuous bezier curves with shape
        push();
            stroke(this.strCol);
            strokeWeight(this.strWt);
            noFill();
            
            beginShape();
            vertex( 0.5 * (this.cpts[0].x +this.cpts[1].x),
                    0.5 * (this.cpts[0].y +this.cpts[1].y), );

                for(let i = 0; i < nCurves; i++){
                    let idx = i*2;
                    bezierVertex(
                        pts[idx+1].x,  pts[idx+1].y,
                        pts[idx+2].x,  pts[idx+2].y,
                        0.5 * (pts[idx+2].x +pts[idx+3].x), 0.5 * (pts[idx+2].y +pts[idx+3].y)
                    );
                }
            endShape();
        pop();


    }



    perturb(){

        for(let i = 0; i < this.cpts.length; i++){
            this.cpts[i].x = this.basePts[i].x  + i*(this.cpts.length - 1)*(1/(this.cpts.length*this.cpts.length))*randomGaussian(0,5);
            this.cpts[i].y = this.basePts[i].y  + randomGaussian(0,0);
        }

        this.Len = this.totalLength();
        this.strWt = this.sCon/(this.Len**0.4);
    }

}