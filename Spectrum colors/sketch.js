//    _______ __         __                     __          
//   |   _ ::|  |--.----|__.----.---.-.--------|  |--.-----.
//   |   1___|     |   _|  |   _|  _  |        |  _  |  _  |
//   |____   |__|__|__| |__|__| |___._|__|__|__|_____|_____|
//   |:  1   |.github.io                                    
//   |::.. . |                                             
//   `-------'      


var Canvass;
let nx = 40;
let ny = 40;

let dx

// Some colors with names
// "#282422" Ivory black
// "#4166f5" Ultramarine Blue
// "#2a52be" Cerulean blue
// "#8a3324" Burnt umber
// "#e32636" Alizarin crimson
// "#e30022" Cadmium red
// "#e97451" Burnt Sienna
// "#635147" raw umber
// "#cc7722" Ochre
// "#fff700" Lemon
// "#808000" Olive

// First palette
// ["#96CDBF", "#FED880", "#FF674D", "#3E9EB7", "#96CDBF", "#FED880", "#FF674D", "#3E9EB7", "#3f3f3f"]

// Oil paint colors
// [ "#282422",  "#4166f5", "#2a52be", "#8a3324", "#e32636", "#e30022", "#e97451", "#635147", "#cc7722", "#fff700", "#808000"]

// Some palette on internet
// ["#1A1333", "#262949", "#045459", "#0D7355", "#15C286", "#ABD96D", "#FBBF54", "#EE6B3B", "#EC0F47", "#A02C5D", "#700460", "#022C7A" ]

// Black and red
// ["#660b15", "#ab1323", "#ffffff",  "#1c1c1c"]  "#e1e1e1", <- not so good 

// Piet style
// ["#B30000", "#1F42DA", "#F8C43C", 0]


let ranga = ["#96CDBF", "#FED880", "#FF674D", "#3E9EB7", "#96CDBF", "#FED880", "#FF674D", "#3E9EB7", "#3f3f3f"]





function setup() {
    Canvass = createCanvas(600,600);
    dx= width/(nx+1); 
    randomSeed(99);
    drawIt();
    noLoop();
    
}

function drawIt() {
    background("#f4f4d7");
    push();
    translate(dx/2,dx/2);
    noStroke();
    

    for(let i = 0; i < nx; i++){
        for(let j = 0; j < ny; j++){
            let x = i*dx -1 + 2*random()
            let y = j*dx -1 + 2*random()
            let p = 1
            let wt = (abs((x - 0.5*width)**p) + abs((y - 0.5*height)**p))/((0.5**p)*(width**p + height**p))
            // console.log(wt)
            fill("#00000000");
            if (random() > wt) fill(random(ranga))
            rect(x,y,dx+1,dx+1);
        }
    }
    pop();

}


function keyPressed() {
    
    if(keyCode == DELETE){
       save(Canvass,"sketch")
    }
}

function mousePressed(){
    drawIt();
}



