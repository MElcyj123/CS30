// Perlin Noise Project
// Melody CHen
// 3/11/2024

let rectWidth, rectHeight = 1;
let totalHeight, averageHeight;
let rectCount;
let topX, topY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  rectMode(CORNERS); //CHANGE THIS!!!
  generateTerrain();
}

function draw() {
  drawFlag();
}

function generateTerrain(){
  // using a single liip, generate a bunch of side-to-side
  // rectangles of varying height(pattern, random, noise)
  let topX = 0;
  let topY = 0;
  let totalHeight = 0;
  let heightTime = 0;
  let noiseShift = 0.01;
  let rectCount = 0;
  fill(0);
  for(let x = 0; x < width; x += rectWidth){
    rectHeight = noise(heightTime);
    rectHeight = map(rectHeight,0,1,0,height);
    rect(x, height, x + rectWidth, height - rectHeight);
    heightTime += noiseShift;
    totalHeight += rectHeight;
    rectCount += 1;
    if(topY < rectHeight){
      topY = rectHeight; 
      topX = x;
    }
    // averageHeight = totalHeight / rectCount;
    // drawAverage();
    drawFlag(topX, height - topY);
  }

}

// function keyPressed(){
//   if(keyCode === LEFT_ARROW){
//     if(rectWidth > 1){
//       rectWidth = rectWidth -1;
//       clear();
//     }
//     else (rectWidth = rectWidth - 0.001);
//   }
//   generateTerrain();
//   if(keyCode === RIGHT_ARROW){
//       rectWidth = rectWidth +1;
//       clear();
//   }
//   generateTerrain();
// }

// function drawAverage() {
//   fill(0, 0, 255);
//   rect(0, height - averageHeight, width, height - averageHeight + 5);
// }

// Draw the flag
function drawFlag(x, y) {
  stroke(0);
  fill(0);
  line(x, y, x, y - 30);
  triangle(x, y - 30, x - 10 / 2, y - 30, x, y - 30 - 10);
}
