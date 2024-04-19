// Cars! Cars! Cars!
// Melody Chen
// April 16,2024

let height;
let width;
let vehicles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  height = windowHeight;
  width = windowWidth;
  myCar = new Vehicle(0, color(255, 0, 0), 50, 100, 0, 1);
}

function draw() {
  background(220);
  drawRoad();
  myCar.display();
}

function drawRoad(){
  // the black rectangle(road)
  fill(0);
  let roadX = 0;
  let roadY = windowHeight/2 - 250;
  let roadWidth = windowWidth;
  let roadHeight = 500;
  rect(roadX, roadY, roadWidth, roadHeight);

  // white dashed line
  fill(255);
  for (let i = 0; i < width; i += 60){
    rect(i, height/2, 30, 3);
  }
  
}

class Vehicle {
  constructor(type, color, x, y, direction, xSpeed){
    this.type = type; // 0-a car 1-a truck/van
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed;
  }
  display(){
    fill(this.color);
    noStroke;
    
    if (this.y >= (windowHeight/2 - 250) && this.y <= (windowHeight/2 + 250)) {
      rect(this.x, this.y + 10, 40, 10);
  }
}
}