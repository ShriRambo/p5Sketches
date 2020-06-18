//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
var capturer
// var rendering = false;

const dx = 30
const nx = 11
const ny  = 10

var stat

const dat = {
    "template": [
        "ITLISASAMPM",
        "ACQUARTERDC",
        "TWENTYFIVEX",
        "HALFSTENFTO",
        "PASTERUNINE",
        "ONESIXTHREE", 
        "FOURFIVETWO", 
        "EIGHTELEVEN", 
        "SEVENTWELVE", 
        "TENSEOCLOCK"],

    "standards":{
        "it":[0,0,1],
        "is":[0,3,4],
        "am":[0,7,8],
        "pm":[0,9,10],
        "to":[3,9,10],
        "past":[4,0,3]},

    "hours":{
        "1":[5,0,2],
        "2":[6,8,10], 
        "3":[5,6,10], 
        "4":[6,0,3],
        "5":[6,4,7],
        "6":[5,3,5],
        "7":[8,0,4],
        "8":[7,0,4],
        "9":[4,7,10],
        "10":[9,0,2],
        "11":[7,5,10],
        "12":[8,5,10]},

    "minutes":{
        "oclock":[9,5,10],
        "five":[2,6,9],
        "ten":[3,5,7],
        "quarter":[1,2,8],
        "twenty":[2,0,5],
        "twentyfive":[2,0,9],
        "half":[3,0,3]}
}

const cols = [100, 255]


function setup() {
    Canvass = createCanvas(dx*12,dx*11);
    resetStat()
    frameRate(1)
    // setupRenderer()
    // noLoop();
    
}

function showClk(){
    textAlign(CENTER, CENTER);
    for (let i = 0; i < ny; i++){
        for (let j = 0; j < nx; j++){
            fill(cols[stat[i][j]])
            text(dat.template[i][j],  (j+1)*dx, (i+1)*dx)
        }
    }
}

function resetStat(){
    stat = []
    for (let i = 0; i < ny; i++){
        stat[i] = []
        for (let j = 0; j < nx; j++){
            stat[i][j] = 0
        }
    }

}

function updateClk(){
    


    resetStat()

    var h = hour()
    var m = minute()
    
    let idxs

    // It Is
    idxs = dat.standards.it
    changeAState(idxs)

    idxs = dat.standards.is
    changeAState(idxs)

    // AM PM
    if(h < 12){
        idxs = dat.standards.am
    }else{
        idxs = dat.standards.pm
    }
    changeAState(idxs)

    h = h % 12
    
    // Set  hour
    if(m <= 30){
        //Past
        if(m > 5){
            idxs = dat.standards.past
            changeAState(idxs)
        }
    
        // Hour 
        idxs= dat.hours["" + (h - 1)]
        changeAState(idxs)

    }else if(m > 30){
        // To
        idxs = dat.standards.to
        changeAState(idxs)

        // Hour 
        idxs= dat.hours["" + h]
        changeAState(idxs)
    }


    // Set minute
    let minKeys = ["oclock",  "five",    "ten",    "quarter",    "twenty",    "twentyfive", "half"]
    let m5 = int(m / 5)
    m5 = min(m5, 12-m5)

    idxs = dat.minutes[minKeys[m5]]
    changeAState(idxs)

   


}

function changeAState(arr){
    for (let i = arr[1]; i <= arr[2]; i++ ){
        stat[arr[0]][i] = 1
    }
}

function draw() {
    background(51);
    // if (rendering) capturer.capture(document.getElementById('defaultCanvas0'));
    showClk();
    updateClk();

}

function setupRenderer() {
    capturer = new CCapture({ format: 'webm', framerate: frameRate() });
    capturer.start();
    

    rendering = true
}

function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
    if ((keyCode == ESCAPE) & rendering) {

        // save(Canvass, "sketch.jpg")
        capturer.stop()
        capturer.save()

    }
}