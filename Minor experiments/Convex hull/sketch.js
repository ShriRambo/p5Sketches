var Canvass;

let points = [
	[239, 191],
	[377, 102],
	[177, 46],
	[214, 203],
	[224, 126],
	[202, 323],
	[54, 171],
	[187, 107],
	[195, 57],
	[81, 219],
	[215, 238],
	[208, 124],
	[270, 104],
	[204, 83],
	[56, 280],
	[43, 59],
	[57, 344],
	[106, 111],
	[384, 257],
	[127, 255],
	[393, 260]
]

function setup() {
	createCanvas(400, 400)
	background('black')
	stroke('white')
	strokeWeight(3)
	noFill()
	// for (let x = 0; x <= 20; x++) {
	// 	points.push([Math.floor(Math.random()*400), Math.floor(Math.random()*400)])
	// }

	big = {
		top: [400],
		right: [0],
		bottom: [0],
		left: [400]
	}

	for (let [x, y] of points) {
		if (y < big.top[0]) {
			big.top = [y, [x, y]]
		}
		if (y > big.bottom[0]) {
			big.bottom = [y, [x, y]]
		}
		if (x < big.left[0]) {
			big.left = [x, [x, y]]
		}
		if (x > big.right[0]) {
			big.right = [x, [x, y]]
		}
		point(x, y)
	}
	strokeWeight(1)
	stroke('yellow')
	print(big)
	beginShape()
	for(let bound in big) {
    vertex(big[bound][1][0], big[bound][1][1])
  }
	endShape(CLOSE)
}

function draw() {

}


function keyPressed() {
    
    if(keyCode == DELETE){
        console.log('Animation Stopped');
        noLoop();
    }
}


