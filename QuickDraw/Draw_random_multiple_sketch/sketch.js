var Cannvass;
//
const key = "AIzaSyBRVlmQqKM_1eWsDcaz2vUMmtx-pHe5BZ0";//"AIzaSyCy6EDCZBsYMyPxx1sGkkRxFoipUx4jHoc";

var sketches = [];

var nx = 15;
var ny = 10;
var nsketches = nx*ny;
var sca = 0.5; 

function preload(){
    for (let i = 0; i < nsketches; i++){
        category = random(categories).category;
        catLink = getLink(category,id = false,isAnimated=false);
        loadJSON(catLink,processDat);
    }
}

function processDat(data){
    sketches.push(data);
}


function getLink(category, id=false, isAnimated=false){

    if (id){
        idLink = "?id=" + id;
    }else{
        idLink = "";
    }

    datLink = "https://quickdrawfiles.appspot.com/drawing/" + category + idLink +  "?&key=" + key +  "&isAnimated=" + isAnimated + "&format=json";
    return datLink;
}
   


function setup() {
    Cannvass = createCanvas(255*sca*nx,sca*ny*255);
    background(255);
    frameRate(3); 
    for (i = 0; i < sketches.length; i++){
        push();
        translate(sca*255*( i % nx), sca*255*(Math.floor(i/nx)));
        gotData(sketches[i]);
        pop();
    }
   
}

function gotData(data){
    let drawing = data.drawing;
 
   
    for (let path of drawing){
        // noFill();
        rColor  = color(random(255),random(255),random(255),random(0,100));
        fill(rColor);
        strokeWeight(3);
        stroke(0);
        beginShape();
        for (let i = 0; i < path[0].length; i++){
            let x = sca*path[0][i];
            let y = sca*path[1][i];
            vertex(x,y);
        }
        endShape();
    }
}



function draw() {
   //background(255);
    //category = random(categories).category;
    //catLink = getLink(category,id = 10,isAnimated=false);
    //console.log(catLink);
   // data = loadJSON(catLink,gotData);
   // console.log(data);
   noLoop();
  
}




function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = 'Quickdraw_';
        saveCanvas(Cannvass, name, 'jpg');
    }
}



