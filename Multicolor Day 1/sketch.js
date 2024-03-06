// Multicolor
// Melody Chen
// March 1, 2024

let squareSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  document.addEventListener("contextmenu", event => event.preventDefault())
}

function draw() {
  squareLoops();

}

function squareLoops(){
  for(let x = 0; x <= width - squareSize; x += squareSize){
    for(let y=0; y <= height - squareSize; y += squareSize){
      stroke(0);
      square(x,y,squareSize);
      fill(random(250), 0, random(250));
    }
  }
}

function mousePressed(){
  if(20 - squareSize >= 5){
    if(mouseButton === LEFT){
      squareSize = squareSize + 5;
    }
    if(mouseButton === RIGHT){
      squareSize = squareSize - 0.005;
    }
    clear();
  }
  else{
    if(mouseButton === LEFT){
      squareSize = squareSize + 5;
    }
    if(mouseButton === RIGHT){
      squareSize = squareSize - 5;
    }
    clear();
  }
  
  squareLoops();
}

function keyPressed(){
  if(key === "a"){
    squareLoops();
  }
}