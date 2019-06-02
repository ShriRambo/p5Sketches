class Scribble{

    constructor(lkMat){

        this.lkMat = lkMat;
        this.nCurves = 4 // Number of curves 
        this.std = random(2,20);
        this.initCurve();

        this.strWt = map(this.std,2,20,0.1,0.01);  // Stroke weight
        this.strCol = 100 // Stroke color

       
    }


    // Function to initialize the curve
    initCurve(){

        let pts = [];
        let npts = 2*this.nCurves + 2;

        // Adding first point
        pts.push(createVector(random(0,width),random(0,height)))
        for(let i = 0; i < npts-1; i++){
            // Adding rest of the points
            let v = this.getValidPoint(pts[pts.length - 1]);
            pts.push(v)
        }
        //Last tow points are same as first two points to close the curve. 
        //pts.push(pts[0]);
        //pts.push(pts[1]);

        this.pts = pts;
    
    
    }

    // Likelihood function, returs likelihood of a point
    likelihood(x,y){
        //console.log(x,y)
        x = int(x);
        y = int(y);
        
        if(  (x <= 0)  ||  (x >= width )  ||  (y <= 0)  ||  (y >= height)  ){
            return 0;
        }else{
            //console.log(x,y)
            return this.lkMat[x][y];
        }

    }


    // Returns a valid point according to MCMC logic
    getValidPoint(v){

        let flag = true;
        let foo = 0;
        
        let X; 
        let Y;

        let lk1 = this.likelihood(v.x,v.y);
        let lk2;
        while(flag & foo < 100){

            // First step of MCMC
            X = v.x + randomGaussian(0,this.std);
            Y = v.y + randomGaussian(0,this.std); 
            lk2 = this.likelihood(X,Y);

            // Second step of MCMC
            if(  random() >= lk1/(lk1 + lk2) ) flag = false;
            foo++;
        }

        this.std = abs(randomGaussian(map(lk2,0,255,20,2),10));
        this.strWt = map(this.std,2,20,0.1,0.01);
        return createVector(X,Y)
    }

    // Update the control points to animate the curve
    update(){

        // Removing and adding 2 points.
        for(let k = 0; k < 2; k++){
            this.pts.shift();
            let v = this.getValidPoint(this.pts[this.pts.length - 1]);
            this.pts.push(v)
        }

        //this.updateLkhd();

    }


    updateLkhd(){

        let row = []
        for(let x = 0; x < width; x++){
            let col = []
            for (let y = 0; y < height; y++){
                let val = 0.1;
                if (  ((x - mouseX)**2 + (y - mouseY)**2)  <   50*50  ) val = 80;
                col[y] = val//sqrt((width**2 + height**2) - ((x - mouseX)**2 + (y - mouseY)**2)) ;
    
            }
            row[x] = col
        }
    
        this.lkMat = row;

    }




    // To draw the curve.
    show(){

        // Drawing continuous bezier curves with shape
        push();
            stroke(this.strCol);
            strokeWeight(this.strWt);
            noFill();
            beginShape();
                vertex( 0.5 * (this.pts[0].x +this.pts[1].x),
                        0.5 * (this.pts[0].y +this.pts[1].y), );
                for(let i = 0; i < this.nCurves; i++){
                    let idx = i*2;
                    bezierVertex(
                        this.pts[idx+1].x,  this.pts[idx+1].y,
                        this.pts[idx+2].x,  this.pts[idx+2].y,
                        0.5 * (this.pts[idx+2].x +this.pts[idx+3].x), 0.5 * (this.pts[idx+2].y +this.pts[idx+3].y)
                    );
                }
            endShape();
        pop();


    }


}