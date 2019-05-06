var Cannvass;
//
const key = "AIzaSyCy6EDCZBsYMyPxx1sGkkRxFoipUx4jHoc";

var sketches = [];
var sketch;
var cat;
var word;

let x,y;
let strokeIndex = 0;
let penIndex = 0;
let prevx,prevy;

var sca = 1;

function preload(){
    category = random(categories).category;
    catLink = getLink(category,id = false,isAnimated=false);
    data = loadJSON(catLink,prep);
    console.log("Got the data.....");
}

function prep(data){
    sketch = data;
    cat = data.drawing;
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
    Cannvass = createCanvas(255,255);
    background(255);
    //colorMode(HSB);
    
   
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

    


    if(cat ) {
        // textSize(20);
        // //noFill();
        // fill(0);
        // //strokeWeight(0.1);
        // noStroke();
        // text(sketch.word,20,height - 20);
       let x = cat[strokeIndex][0][penIndex];
       let y = cat[strokeIndex][1][penIndex];
       stroke(0)
       strokeWeight(5);
       if(prevx !== undefined){
            //line(prevx,prevy,x,y);
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
                cat = null;
                penIndex = 0;
                strokeIndex = 0;
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
       // name = 'Spiro' + ang;
        //saveCanvas(Cannvass, name, 'jpg');
    }
}



