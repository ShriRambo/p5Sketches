var Canvass;

var video;
var myFrames = [];
var nFrames = 50;



function setup() {
createCanvas(320,240);
background(51);
video = createCapture(VIDEO)
video.size(320,240);

noLoop();


}

function getFrames(){
    for (var i =0; i < nFrames; i++){
        myFrames.push(video.get());
    }

    loop();
}



function draw(){
    
    for (var i =0; i < myFrames.length; i++){
        dheight =  i*height/nFrames
        image(myFrames[i], 0, dheight, width, dheight, 0, dheight, width, dheight);
    }

    myFrames.shift();
    myFrames.push(video.get());

    
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');

        noLoop();
        //saveCanvas(Canvass, 'jpg');
    }
}



