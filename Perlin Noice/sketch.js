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

}

function generateTerrain(){
  // using a single liip, generate a bunch of side-to-side
  // rectangles of varying height(pattern, random, noise)
  let rectHeight;
  let heightTime = 0;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    rectHeight = noise(heightTime);
    rectHeight = map(rectHeight,0,1,0,height);
    rect(x, height, rectWidth, rectHeight);
    heightTime += 0.01;
  }
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