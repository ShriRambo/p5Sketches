var Canvass;

const nx = 4*2;
const ny = 3*2;

let dx ;
let dy;

var allVertex = []
var allVWalls = [];
var allHWalls = [];
var allWalls = [];
var allFaces = [];
var checkList = [];

var currentFace;




function setup() {
    Cannvass = createCanvas(800,600);
    background(51);

    dx = width / nx;
    dy = height / ny;


    createVertex();
    createWalls();
    createFaces();
    drawWalls();

 
    currentFace = allFaces[ int(floor(random(0,ny)))   ][   int(floor(random(0,nx)))  ];
    //noLoop();
   
    
}


function draw() {
    background(51);


    nextStep();
    
    //let ix = int(floor(ny*min(abs(mouseY),height-1)/height));
    //let iy = int(floor(nx*min(abs(mouseX),width-1)/width));

    //drawWalls();
    
    //allFaces[ix][iy].show();

    



}


function createVertex(){
    // Creating vertices
    for(let i = 0; i < ny +1; i++){
        let aRow = [];
        for(let j = 0; j < nx+1; j++){
            aRow.push(createVector(j*dx,i*dy))
        }
        allVertex.push(aRow);
    }

}



function createWalls(){

    // Creating vertical walls duh! 
    for(let i = 0; i < ny ; i++){
        let aRow = [];
        for(let j = 0; j < nx + 1; j++){
            let awall = new Wall( allVertex[i][j],  allVertex[i+1][j]) ;
            aRow.push( awall );
            allWalls.push( awall );
        }
        allVWalls.push(aRow);
    }


    // Creating Horizontal walls duh! 
    for(let i = 0; i < ny + 1 ; i++){
        let aRow = [];
        for(let j = 0; j < nx; j++){
            let awall = new Wall(allVertex[i][j],  allVertex[i][j+1])
            aRow.push( awall );
            allWalls.push( awall );
        }
        allHWalls.push(aRow);
    }


}


function createFaces(){

    //Creating rooms of the maze
    for(let i = 0; i < ny; i++){
        let aRow = [];
        for(let j = 0; j < nx; j++){
            aRow.push(new Face([  allHWalls[i][j], allHWalls[i+1][j], allVWalls[i][j], allVWalls[i][j+1]  ]))
        }
        allFaces.push(aRow);
    }

}


function drawWalls(){

    
    for(let type of [allHWalls, allVWalls]){
        for(let rows of type){
            for (let wall of rows){
               wall.show();
            }
        }
    }
}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }else if(key == ' '){
        nextStep();
    }
}


function nextStep(){

    drawWalls();
    currentFace.isChecked = true;
    currentFace.show();
    

    for(let wall of currentFace.walls){
        if( (!wall.isChecked) & (wall.faces.length == 2)) {
            checkList.push(wall);
        }
    }

    if(checkList.length > 0){
        while( checkList.length > 0){
            checkList = shuffle(checkList);
            tempWall = checkList.pop();
            tempWall.isChecked = true;
            if(  ! (tempWall.faces[0].isChecked & tempWall.faces[1].isChecked) ){
                tempWall.isWall = false;
                //tempWall.show();
                break;
            }
        
        }

        for(let face of tempWall.faces) {
            if(!face.isChecked) currentFace = face;
        }

        
    }
}
