// Gradient Background + Nested Loops
// Melody Chen
// Feb 29th, 2024
// Creating a gradient + drawing with nested loops

let rectHeight = 40;
let circleSize = 20;
let spacing = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //noLoop(); // stop at the end of draw();
  gradientBackground();
  nestedLoops();
}

function mousePressed(){
  //draw();
  gradientBackground();
  nestedLoops();
}

function draw() {

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

function circleDistance(x1, y1, x2, y2){
  // given two points (x1,y1), (x2,y2), return the 
  // straightline distance between.  // manhatten???
  let a = abs(x1-x2);
  let b = abs(y1-y2);
  let c = sqrt(pow(a,2) + pow(b,2));
  return c;
  // dist();
}

function nestedLoops(){
  // using a loop within a loop, generate a grid arragement
  // for some circles
  for(let x = 0; x < width; x+= spacing){ // COLUMN0 20 40 60 80
    for(let y = 0; y < height; y += spacing){ //ROWS 0 20 40 60 80
      let d = round(circleDistance(x,y,mouseX,mouseY));
      // close circles: different color
      let currentSize = circleSize ;
      if(d>100){
        fill(0);
      }
      else{
        fill(255,0,0);
        currentSize = circleSize *1.2;
      }

      circle(x,y,circleSize);
      fill(255);
      textAlign(CENTER,CENTER);

      text(d, x, y);
    }
  }
}