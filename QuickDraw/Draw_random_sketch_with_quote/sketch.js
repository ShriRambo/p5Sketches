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
   
function drawBoundary(){
    var x = 20;
    var y = 20;
    var ix = 10;
    var iy = 10;


    // Top
    for (;ix < width-20; ix++){
        var yn = (noise(0.1*ix,0.1*iy) - 0.5);
        strokeWeight(3);
        line(x,y,x+1,y+yn);
        x++ ;
        y += yn;
    }
    fill(0);
    ellipse(x - 20,y + 20,10,10);

    //Right
    for (;iy < height-20; iy++){
        var xn = (noise(0.1*ix,0.1*iy) - 0.5) ;
        strokeWeight(3);
        line(x,y,x+xn,y);
        y++ ;
        x += xn;
    }
    fill(0);
    ellipse(x- 20,y - 20,10,10);

    //Bottom
    for (;ix > 20; ix--){
        var yn = (noise(0.1*ix,0.1*iy) - 0.5) ;
        strokeWeight(3);
        line(x,y,x-1,y+ yn);
        x-- ;
        y += yn;
    }
    fill(0);
    ellipse(x+ 20,y - 20,10,10);

    //Left
    for (;iy > 20; iy--){ 
        var xn = (noise(0.1*ix,0.1*iy) - 0.5) ;
        strokeWeight(3);
        line(x,y,x+xn,y-1);
        y-- ;
        x += xn;
    }
    fill(0);
    ellipse(x+ 20,y + 20,10,10);

}



function setup() {
    Cannvass = createCanvas(255*3,255*2);
    background(255);
    colorMode(HSB);
    drawBoundary();
    category = random(categories).category;
    catLink = getLink(category,id = 10,isAnimated=false);
    
    data = loadJSON(catLink,gotData);
    var Qlink = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
    quote = loadJSON(Qlink,gotQuote);
    
   
}

function gotQuote(quote){
    console.log(quote["content"]);
    console.log(quote["title"]);
}

function gotData(data){

    let drawing = data.drawing;
    push();
    translate(40,255*0.8);
    //bezier([0,0,10,20],[50,21,90,80]);
    for (let path of drawing){
        //noFill();
        rColor  = color(random(255),random(100),random(150,255),random());
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

    pop();
}



function draw() {
    //background(255);
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



