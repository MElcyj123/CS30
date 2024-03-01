// Multicolor
// Melody Chen
// March 1, 2024

let squareSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  squareLoops();
}

function squareLoops(){
  for(let x = 0; x < width; x += squareSize){
    for(let y=0; y < height; y += squareSize){
      stroke(0);
      square(x,y,squareSize);
    }
  }
}