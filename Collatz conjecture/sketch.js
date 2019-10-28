//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
const angle = 0.04;
const len = 5;


var cols

var colsAll =[ 
    // ["#F2DCF2", "#D2A0CF", "#3A424F", "#EFABA0", "#FFE8CC", "#FFE6C8"],
    ["#A7E4CD", "#DCEDC1", "#EFC6AB", "#FFAAA5", "#FF8B94"]
];


var drawing;

function preload() {

}

function setup() {
    Canvass = createCanvas(1500,1000);
    drawing = createGraphics(width,height);
    background(245);

    cols = random(colsAll);

    drawing.translate(0, 0.5 *height);
    // drawing.rotate(-1)
    drawSketch(3653432)

    

    noLoop();
    
}

function drawSketch(nstart){
    var nums;

    for (let kk = nstart; kk < nstart + 500; kk++) {
        // drawing.push();
        // drawing.translate(0.5 * width + 20*(2*random() -1) , height);
        nums = collatzList(kk);
        // if (nums.length > 200) nums = nums.slice(nums.length - int(100 * random()), nums.length);
        drawABranch(nums)
        // drawing.pop();
    }
}



function collatz(n){
    if(n % 2 == 0) return n/2
    else return (3*n +1)/2
}

function collatzList(n){
    let nums = [n];

    do {
        n = collatz(n);
        nums.push(n);
    } while (n != 1)

    return nums;
}

function drawABranch(nums){
    drawing.push();

    


    // Shadow
    drawing.stroke(0);
    drawing.strokeWeight(8);
    for(let i = nums.length-1; i >= 0; i--){

        let m =  noise(nums[i], i)
        m=1;


        if(nums[i] % 2 == 0 ){
            drawing.rotate(angle*m);
        }else{
            drawing.rotate(-angle * m);
        }
        drawing.line(0, 0, len, 0);
        drawing.translate(len, 0);


       
    }
    drawing.pop();
    drawing.filter(BLUR,1);
    drawing.tint(255,100);


    // Actual reef
    drawing.push();
    drawing.stroke(random(cols));
    drawing.strokeWeight(7);
    for (let i = nums.length - 1; i >= 0; i--) {

        let m = noise(nums[i], i);
        m=1;
        
        if (nums[i] % 2 == 0) {
            drawing.rotate(angle * m);
        } else {
            drawing.rotate(-angle * m);
        }
        drawing.line(0, 0, len, 0);
        drawing.translate(len, 0);
    }

    image(drawing,0,0)
    drawing.clear()

    drawing.pop();
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
        save(Canvass,"sketch")
    }
}



