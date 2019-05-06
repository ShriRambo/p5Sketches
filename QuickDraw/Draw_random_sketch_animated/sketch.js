var Cannvass;
//
const key =  "AIzaSyBRVlmQqKM_1eWsDcaz2vUMmtx-pHe5BZ0";// "AIzaSyCy6EDCZBsYMyPxx1sGkkRxFoipUx4jHoc";

var sketches = [];
var circles = [];
var maxNC = 200;



function preload(){
    for (let i = 0; i < maxNC; i++){
        category = random(categories).category;
        catLink = getLink(category,id = false,isAnimated=false);
        loadJSON(catLink,processDat);
    }
}

function processDat(data){
    sketches.push(data);
}



function getLink(category, id=false, isAnimated=false){
    //console.log(id);
    if (id){
        idLink = "?id=" + id;
    }else{
        idLink = "";
    }

    datLink = "https://quickdrawfiles.appspot.com/drawing/" + category + idLink +  "?&key=" + key +  "&isAnimated=" + isAnimated + "&format=json";
    return datLink;
}
   



function setup() {
    Cannvass = createCanvas(1100,600);
    background(255);
   
}

function draw() {
    background(200);
    // noLoop();
    if(frameCount % 10 == 0 ){
        if(circles.length < maxNC){
            circles.push(getCircle());
        }
    }

    for(let i = 0; i < circles.length; i++){
        circles[i].grow();
        circles[i].show();
    }

    //gotData(cat);

}

function getCircle(){
    isValid = false;
    startRad  = 3;
    while(!isValid){
        //console.log("Not found");
        var x = random(10,width-10);
        var y = random(10,height-10);
        
        var i;
        for (i = 0; i < circles.length; i++ ){
            circ = circles[i];
            if(dist(x,y,circ.x,circ.y)   - 5 < circ.radius + startRad){
                break;
            }
        }
        if(i == circles.length) { isValid = true; }
        
    }



    return new Circle(x,y,sketches[circles.length]);
}

function Circle(x,y,data){
    this.x = x;//random(10,width-10);
    this.y = y;//random(10,height-10);
    this.radius = 2;
    this.growing = true;
    this.data = data;
    this.seed = random(999);


    this.grow = function(){
       if(this.growing){
            minx = min(this.x, width - this.x)
            miny = min(this.y,height-this.y);
            
            // Check if touching boundary
            if( minx -5 <= this.radius || miny -5 <= this.radius){
                this.growing = false;
                //console.log("Touched boundary");
                //break;
            }else {
                // Check the distance 
                for(let i = 0; i < circles.length;i++){
                    circ = circles[i];
                    if(this == circ){continue;}
                    if(dist(this.x,this.y,circ.x,circ.y) - 3 <= this.radius + circ.radius ){
                       // console.log("Touched a circle");
                        this.growing = false;
                        break;
                    }
                }
            }

        }


        if(this.growing) { this.radius += 2; }
    }


    this.show = function(){
        noFill();
        stroke(0);
        strokeWeight(3);
        //ellipse(this.x,this.y,2*this.radius,2*this.radius);
        push();
            translate(this.x-this.radius,this.y-this.radius);
            gotData(this.data,this.radius,this.seed);
        pop();
    }

}



function gotData(data,radius,seed){
    
    
    let drawing = data.drawing;
    let scale = 3*radius / 255;
    randomSeed(seed);
    
   // let scale = 1 // 2* radius / 255;
    //bezier([0,0,10,20],[50,21,90,80]);
    for (let path of drawing){
        //noFill();
        rColor  = color(random(255),random(255),random(255),random(0,100));
        fill(rColor);
        strokeWeight(3);
        stroke(0);
        beginShape();
        // let xo = path[0][0];
        // let yo = path[1][0];
            for (let i = 0; i < path[0].length; i++){
                let x = scale * path[0][i];
                let y = scale * path[1][i];
                vertex(x,y);
                //line(x,y,xo,yo);
                // xo = x;
                // yo = y;
            }
        endShape();
    }
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
       // name = 'Spiro' + ang;
        //saveCanvas(Cannvass, name, 'jpg');
    }
}





// function getData(){
//     flag = true;
    
//    // while(flag){
//         catLink = getLink(category,id = false,isAnimated=true);
//         loadJSON(catLink);
//        // flag = ! data.recognized;
//    // }
//     return data;
// }

