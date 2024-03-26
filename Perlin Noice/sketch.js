// Perlin Noise Project
// Melody CHen
// 3/11/2024

//global variables
let rectWidth = 1;
let rectHeight = 1; 
let totalHeight = 0;
let averageHeight = 0; 
let rectCount = 0;
let topX = 0; //highest coordinate
let heightShift = 1;
let heightTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CORNERS);
  generateTerrain();
}

function draw() {
  background(255);
  heightTime = 0 + heightShift; // panning
  heightShift += -0.1;
  generateTerrain();
}


// perlin noise
function generateTerrain() {
  fill(0);
  let topY = 0;
  rectCount = 0;
  totalHeight = 0;
  for (let x = 0; x < width; x += rectWidth) {
    rectHeight = noise(heightTime);
    rectHeight = map(rectHeight, 0, 1, 0, height);
    rect(x, height, x + rectWidth, height - rectHeight);
    heightTime += 0.01;
    totalHeight += rectHeight;
    rectCount ++ ;
    if (topY < rectHeight) {
      topY = rectHeight;
      topX = x;
    }
  }
  drawFlag(topX, height - topY); // whole scene height - yheight
  averageHeight = totalHeight / rectCount; 
  drawAverage();

 
}

// Draw the flag
function drawFlag(x, y) {
  stroke(0);
  fill(0);
  line(x, y, x, y - 30);
  triangle(x, y - 30, x + 10 / 2, y - 30, x, y - 40);
}

// The average line
function drawAverage() {
  fill(255,0,0);
  rect(0, height - averageHeight, width, height - averageHeight + 5);
}

// key pressed increase or decrease
function keyPressed(){
  if(keyCode === LEFT_ARROW){
    if(rectWidth > 1){
      rectWidth -= 1;
      clear();
      generateTerrain();
    }
  }
  else if(keyCode === RIGHT_ARROW){
    rectWidth += 1;
    clear()
    generateTerrain();
  }
}
