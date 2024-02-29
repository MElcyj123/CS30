// Gradient Background + Nested Loops
// Melody Chen
// Feb 29th, 2024
// Creating a gradient + drawing with nested loops

let rectHeight = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  gradientBackground();
}

function gradientBackground(){
  // use a single loop to draw several rectangles
  // then color them into a gradient
  let y = 0;
  while(y < height){
    let c = color(mouseX, map(y,0,height,255,0),map(y,0,height,0,255));
    fill(c); 
    rect(0,y,width,rectHeight);
    y += rectHeight;
  }
}

function nestedLoops(){
  // using a loop within a loop, generate a grid arragement
  // for some circles
  for(let x = 0; x < 100; x+= spacing){ // 0 20 40 60 80
    for(let y = 0; y < 100; y += spacing){ //0 20 40 60 80
        circle(x,y,10);
    }
  }
}