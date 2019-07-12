
class Wall{

    constructor(a,b){
        this.a = a;
        this.b = b;
        this.faces = [];
        this.isWall = true;
        this.isChecked = false;
    }

    addFace(face){
        if (this.faces.length < 2) this.faces.push(face);
        else throw "Error: Trying to add more than 2 faces to an edge.";
    }


    // show(){
    //     push();
    //         stroke(200,54,23);
    //         //if(!this.isWall) stroke(20,200,100);
    //         strokeWeight(4);
    //         if(this.isWall) line(this.a.x,this.a.y,this.b.x,this.b.y);
    //     pop();
    // }

    show() {
        stroke(150);
        strokeWeight(5)
        line(this.a.x,this.a.y,this.b.x,this.b.y);
    }

    intersect(p,dir){
        let T2 = (  dir.y*(this.a.x - p.x) - dir.x*(this.a.y - p.y)  ) / (  dir.x*(this.b.y-this.a.y) - dir.y*(this.b.x-this.a.x)  )
        let T1 = (  (this.a.x - p.x) + T2*(this.b.x-this.a.x)  )/(dir.x);

        if(( T1 >= 0) & (T2 >= 0 ) & (T2 <= 1)) return T1
        else return Infinity;
    }

}


class Face{

    constructor(walls){
        this.walls = walls;
        this.isChecked = false;

        let cx = 0;
        let cy = 0
        for (let wall of walls) {
            wall.addFace(this);
            cx += wall.a.x + wall.b.x;
            cy += wall.a.y + wall.b.y;
        }
        cx /= 8;
        cy /= 8;

        this.center = createVector(cx,cy);
    }



    show(){
        
        if( this.isChecked){
            push();
                rectMode(CENTER);
                fill(22,90,31);
                rect(this.center.x,this.center.y, dx,dy);
            pop();
        }
        //for(let wall of this.walls) wall.show();
    }
}


const nx = 7*2;
const ny = 3*2;

let dx;
let dy;

var allVertex = []
var allVWalls = [];
var allHWalls = [];
var allWalls = [];
var allFaces = [];
var checkList = [];

var currentFace;


function generateARandomMaze(){
    

    dx = width / nx;
    dy = height / (2*ny);
    


    createVertex();
    createWalls();
    createFaces();

    currentFace = allFaces[ int(floor(random(0,ny)))   ][   int(floor(random(0,nx)))  ];

    do nextStep(); while(checkList.length > 0);

   


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



function nextStep(){

    currentFace.isChecked = true;
    

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
