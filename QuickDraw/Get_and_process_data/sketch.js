var Cannvass;
//
const key = "AIzaSyDJNxFUxe_ekrn0pF00WUqNKNwumsCn24g";

var sketches = [];
var nx = 10;
var ny = 6;
var nsketches = nx*ny;
var sca = 0.5; 

let x,y;
let strokeIndex = 0;
let penIndex = 0;
let sketchIndex = 0;
let prevx,prevy;
let sketchIndexes = [];
let ncoutn = 0;


function preload(){
    for (let i = 0; i < nsketches; i++){
        category =  random(categories).category;
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
    Cannvass = createCanvas(20 + 255*sca*nx,20 + 255*sca*ny);
    background(255);
    //colorMode(HSB);
noLoop();
    for (var i=0; i<sketches.length; i++){
        sketchIndexes.push(i);
    }

    sketchIndexes = shuffle(sketchIndexes);
    sketchIndex = sketchIndexes.pop();
    //ncoutn++;
    
   
}


function gotData(data){

cat = data.drawing;

    // let drawing = data.drawing;
    // //bezier([0,0,10,20],[50,21,90,80]);
    // for (let path of drawing){
    //     //noFill();
    //     rColor  = color(random(255),random(100),random(150,255),random(200,255));
    //     fill(rColor);
    //     strokeWeight(3);
    //     stroke(0);
    //     beginShape();
    //     for (let i = 0; i < path[0].length; i++){
    //         let x = path[0][i];
    //         let y = path[1][i];
    //         vertex(x,y);
    //     }
    //     endShape();
    // }




}



function draw() {
   // background(255);
   // noLoop();

    if(ncoutn < sketches.length ) {

        //randomSeed(sketchIndex);
        //translate(random(0,width-sca*255), random(0,height-sca*255));
        translate(10 + sca*255*( sketchIndex % nx),10 + sca*255*(Math.floor(sketchIndex / nx)) );

        cat = sketches[sketchIndex].drawing;

       let x = sca*cat[strokeIndex][0][penIndex];
       let y = sca*cat[strokeIndex][1][penIndex];
       stroke(0)
       strokeWeight(5);
       if(prevx !== undefined){
            //line(prevx,prevy,x,y);
           // rColor  = color(random(255),random(255),random(255),random(0,100));
            //fill(rColor);
            noFill();
            strokeWeight(3);
            stroke(0);
            beginShape();
                for (let icu = 0; icu <= penIndex; icu++){
                    let x = sca*cat[strokeIndex][0][icu];
                    let y = sca*cat[strokeIndex][1][icu];
                    vertex(x,y);
                }
            endShape();
       }


       
       penIndex++;
       

        if(penIndex == cat[strokeIndex][0].length){
           
            rColor  = color(random(255),random(255),random(255),random(0,100));
            fill(rColor);
            strokeWeight(3);
            stroke(0);
            beginShape();
                for (let icu = 0; icu <= penIndex; icu++){
                    let x = sca*cat[strokeIndex][0][icu];
                    let y = sca*cat[strokeIndex][1][icu];
                    vertex(x,y);
                }
            endShape();

           strokeIndex++
           penIndex = 0;
           prevx = undefined;
           prevy = undefined;

           
           

           if(strokeIndex == cat.length){
                sketchIndex = sketchIndexes.pop();
                ncoutn++;
                penIndex = 0;
                strokeIndex = 0;
                //console.log(sketchIndex);
            }
       }else{
            prevx = x;
            prevy = y;
       }


       
    }

   
  
}




function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        name = 'Quickdraw';
        saveCanvas(Cannvass, name, 'jpg');
    }
}



