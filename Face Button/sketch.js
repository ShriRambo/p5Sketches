var Canvass;

var isFaceInAnim = false;

function setup() {
    Cannvass = createCanvas(400,400);
    //pixelDensity(1) Use when background face is an image.
    smiley = new Smiley();
    //background(51);
    //noLoop();
    
}

function draw() {
    background("#FBF6E6");
    
    smiley.show();
    if(!isFaceInAnim) smiley.update();
}




function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}



class Smiley{

    constructor(){
       
        this.dimeter = 100;    
        this.center = createVector(0,0);
        this.isEngaged = false;
        this.wasEngaged = false;

        this.mouthCenter = createVector(0,15);
        this.eyeScale = 1;


        //this.FaceImg = createGraphics(width,height);
        //this.createFace();
        //this.corner = createVector(0,0);
        //this.center = createVector(width/2,height/2);
    }

    update(){

        let d = dist(mouseX,mouseY,width/2,height/2);

        if(d < this.dimeter/2) {
            this.isEngaged = true;
            if(!this.wasEngaged){
                isFaceInAnim = true;
                this.animFace();
                this.wasEngaged = true;
                return;
            }
        }

        if( (d < this.dimeter) & this.isEngaged){
            
            // Update face center
            this.center.x = (mouseX - width/2)/2;
            this.center.y = (mouseY - height/2)/2;

             // Update mouth center
             this.mouthCenter.x = (mouseX - width/2)/1.5;
             this.mouthCenter.y = (mouseY - height/2 + 30)/1.5;
        }
        else{
            this.isEngaged = false;
            if(this.wasEngaged){
                isFaceInAnim = true;
                this.animFace();
                this.wasEngaged = false;
                return;
            }
            this.center.x = 0;
            this.center.y = 0;

            this.mouthCenter.x = 0;
            this.mouthCenter.y = 15;
        }
        
        this.wasEngaged = this.isEngaged;
    }


    show(){
        //image(this.FaceImg, this.corner.x, this.corner.y);
        this.drawFace()
        this.drawMouth()
        this.drawEyes()
        if(frameCount % 200 == 0) this.animEye();
    }


    drawFace(){
        let cin = color("#FDDA5F");
        let cout = color("#e8a012");
        
        push();
            translate(width/2,height/2);
            noStroke();
            smooth();
            for(let i = 0; i < 20; i++){
                fill( lerpColor(cout,cin,i/20) );
                ellipse(this.center.x,this.center.y,this.dimeter-i*i/4,this.dimeter-i*i/4);
            }
            //filter(BLUR, 5);
        pop();
    }


 

    drawMouth(){
        

        if(this.isEngaged){
            push();
                let d = 12;
                translate(width/2,height/2);
                noStroke();
                fill(0);
                arc(this.mouthCenter.x,this.mouthCenter.y,d,d,PI,0);
                rectMode(CENTER)
                rect(this.mouthCenter.x,this.mouthCenter.y+1.9,d,4)
                line(this.mouthCenter.x-8,this.mouthCenter.y,this.mouthCenter.x + 8, this.mouthCenter.y );
            pop();
        }
        else{
            push();
                translate(width/2,height/2);
                strokeWeight(3);
                strokeCap(SQUARE);
                line(this.mouthCenter.x-10,this.mouthCenter.y,this.mouthCenter.x + 10, this.mouthCenter.y );
            pop();
        }

    }




    drawEyes(){

        let d = 8;
        let dx = 15;
        let dy = 20;
        if(this.isEngaged){
            push();
                d = 12;
                translate(width/2,height/2);
                fill(255);
                noStroke();
                ellipse(this.mouthCenter.x-dx,this.mouthCenter.y - dy,d,d*this.eyeScale );
                ellipse(this.mouthCenter.x+dx,this.mouthCenter.y - dy,d, d*this.eyeScale );
                d = 5;
                fill(0)
                ellipse(this.mouthCenter.x-dx,this.mouthCenter.y - dy,d, d*this.eyeScale );
                ellipse(this.mouthCenter.x+dx,this.mouthCenter.y - dy,d, d*this.eyeScale );
            pop();
        }
        else{
            push();
                translate(width/2,height/2);
                noStroke();
                fill(0);
                ellipse(this.mouthCenter.x-dx,this.mouthCenter.y - dy,d, d*this.eyeScale );
                ellipse(this.mouthCenter.x+dx,this.mouthCenter.y - dy,d, d*this.eyeScale );
            pop();
        }

    }

    async animEye(){

        var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

        // Close eye
        for(let i = 0; i< 20; i++){
            this.eyeScale -=  1/21;
            await wait(0.1);
        }

        await wait(20);

        // Open eye
        for(let i = 0; i< 20; i++){
            this.eyeScale +=  1/21;
            await wait(0.1);
        }


    }



    async animFace(){
        var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

        let dir = 0;
        let x = mouseX;
        let y = mouseY;
        if(this.wasEngaged) dir = 1;
        for (let i = 1; i <= 10; i++){
            // Update face center
            let t = abs(dir - i/10);
            this.center.x = (1-t)*0  +  t*(x - width/2)/2;
            this.center.y =  t*(y - height/2)/2;

             // Update mouth center
             this.mouthCenter.x = t*(x - width/2)/1.5;
             this.mouthCenter.y = 15*(1 - t) + t*(y - height/2 + 30)/1.5;

            await wait(0.01);

        } 

        isFaceInAnim = false;


    }



    
    // Creating face as an image. Not using this because of rendering quality.
    // createFace(){
    //     this.FaceImg.pixelDensity(1);
    //     this.FaceImg.translate(width/2,height/2);

    //     let cin = color("#FDDA5F");
    //     let cout = color("#e8a012");
    //     this.FaceImg.noStroke();
        
    //     for(let i = 0; i < 20; i++){
    //         this.FaceImg.fill( lerpColor(cout,cin,i/20) );
    //         this.FaceImg.ellipse(0,0,this.dimeter-i*i/4,this.dimeter-i*i/4);
    //     }
    // }
    

}


