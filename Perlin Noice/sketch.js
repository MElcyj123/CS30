// Perlin Noise Project
// Melody CHen
// 3/11/2024

let rectWidth = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CENTER); //CHANGE THIS!!!
  generateTerrain();
}

function draw() {
  drawFlag();
}

function generateTerrain(){
  // using a single liip, generate a bunch of side-to-side
  // rectangles of varying height(pattern, random, noise)
  let rectHeight;
  let highestTop = 0;
  let flagHeight = 0;
  let heightTime = 0;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    rectHeight = noise(heightTime);
    rectHeight = map(rectHeight,0,1,0,height);
    rect(x, height, rectWidth, rectHeight);
    heightTime += 0.01;
  }
  if(rectHeight > highestTop){
    highestTop = rectHeight; 
    flagHeight = height - rectHeight / 2
  }
  drawFlag(flagHeight, height - highestTop);
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    if(rectWidth > 1){
      rectWidth = rectWidth -1;
      clear();
    }
    else (rectWidth = rectWidth - 0.001);
  }
  generateTerrain();
  if(keyCode === RIGHT_ARROW){
      rectWidth = rectWidth +1;
      clear();
  }
  generateTerrain();
}

function drawFlag(x, y) {
  // Draw flag
  fill(0);
  triangle(x, y, x, y - 30, x + 10, y);
  fill(0);
  rect(x, y, 3, 30);
}