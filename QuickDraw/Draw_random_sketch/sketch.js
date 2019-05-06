var Cannvass;
//
const key = "AIzaSyCy6EDCZBsYMyPxx1sGkkRxFoipUx4jHoc";

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
    colorMode(HSB);
    category = random(categories).category;
    catLink = getLink(category,id = 10,isAnimated=false);
    //console.log(catLink);
    data = loadJSON(catLink,gotData);
    console.log(data);

    //frameRate(3); 
   
}

function gotData(data){

    let drawing = data.drawing;
 
    //bezier([0,0,10,20],[50,21,90,80]);
    for (let path of drawing){
        //noFill();
        rColor  = color(random(255),random(100),random(150,255),random(200,255));
        fill(rColor);
        strokeWeight(3);
        stroke(0);
        beginShape();
        for (let i = 0; i < path[0].length; i++){
            let x = path[0][i];
            let y = path[1][i];
            vertex(x,y);
        }
        endShape();
    }
}



function draw() {
    background(255);
    noLoop();
   
  
}




function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
       // name = 'Spiro' + ang;
        //saveCanvas(Cannvass, name, 'jpg');
    }
}



