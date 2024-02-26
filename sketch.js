// State Variable Challenge
// Melody C and Nancy Y
// 2/26/2024
//
// Extra for Experts:


let x = 0; 
let sideLength = 50; 
let state = 1; 

function setup() {
  createCanvas(400, 400);
  // set the start point
  y = height - sideLength;
}

function draw() {
  background(220);

// draw the rectangle
  fill(255, 255, 255);
  square(x, y, sideLength);

  // animation main code
  if (state === 1) {
    x += 5;
    if (x + sideLength > width) {
      state = 2;
    }
  } else if (state === 2) {
    y -= 5;
    if (y < 0) {
      y = 0;
      state = 3;
    }
  } else if (state === 3) {
    x -= 5;
    if (x < 0) {
      x = 0;
      state = 4;
    }
  } else if (state === 4) {
    y += 5;
    if (y + sideLength > height) {
      state = 1;
    }
  }
}
