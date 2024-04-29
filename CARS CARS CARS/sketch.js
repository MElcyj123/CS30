// Cars! Cars! Cars!
// Melody Chen
// April 16,2024

let height;
let width;
let vehicles = [];
let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  height = windowHeight;
  width = windowWidth;
  for(let i=0; i<20; i++){
    const y = random(height/2.2, height/3.8);
    eastbound.push(new Vehicle(random(0, width), y, 1));
}
  for(let i=0; i<20; i++){
    const y = random(height/1.89, height/1.4);
    westbound.push(new Vehicle(random(0, width), y, 0));
}
}

function draw() {
  drawRoad();
  for(let i=0; i<eastbound.length; i++){
    eastbound[i].action();
  }
  for(let i=0; i<westbound.length; i++){
    westbound[i].action();
  }
}

// function mouseClicked(){
//   eastbound.push(new Vehicle(mouseX,mouseY,1));
// }

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
  //Constructor
  constructor(x,y,dir){
    this.x = x; this.y = y;
    this.dir = dir;
    this.c = color(random(255), random(255), random(255));
    this.type = int(random(2));
    if(this.dir === 1){
      this.xSpeed = random(1,15);
    }else if(this.dir === 0){
      this.xSpeed = random(-15,-1);
    }
  }
  //Class Method
  action(){
    this.display();
    this.move();
    //Highlight 4/29 stop here
    this.speedUp();
    this.speedDown();
  }

  move(){
    this.x += this.xSpeed;
    if (this.dir === 0) {
      if (this.x <= 0) {
        this.x = width;
      }
    }
    else {
      if (this.x > width) {
        this.x = 0;
      }
    }
  }

  speedUp(){
    if(this.dir === 0){
      if(this.xSpeed > -15){
        this.xSpeed -= 1;
      }
    }
    if (this.dir === 1){
      if(this.xSpeed < 15){
        this.xSpeed += 1;
      }
    }
  }

  speedDown(){
    if (this.dir === 0){
      if (this.xSpeed < 0 && this.xSpeed > -15){
        this.xSpeed += 1;
      }
    }
    else if (this.dir === 1){
      if (this.xSpeed > 0 && this.xSpeed < 15){
        this.xSpeed -= 1;
      }
    }
  }

  changeColor(){

  }
  display(){
    if(this.type===0){
      this.drawCar();
    }
    else if (this.type===1){
      this.drawTruck();
    }
  }

  drawCar(){
    fill(this.c);
    rect(this.x,this.y,50,20);
    rect(this.x,this.y - 5,10,5);
    rect(this.x,this.y + 20,10,5);
    rect(this.x + 40,this.y - 5,10,5);
    rect(this.x + 40,this.y + 20,10,5);
  }

  drawTruck(){
    fill(this.c);
    rect(this.x,this.y,40,20);
    rect(this.x + 10,this.y,40,20);
  }
}

function mousePressed(){
  
}