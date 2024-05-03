// Cars! Cars! Cars!
// Melody Chen
// April 16,2024

let height;
let width;
let vehicles = [];
let eastbound = [];
let westbound = [];
let trafficLight;
//global variables above

function setup() {
  createCanvas(windowWidth, windowHeight);
  height = windowHeight;
  width = windowWidth;

  //add new vehicles randomly
  for(let i=0; i<20; i++){
    const y = random(height/2.2, height/3.8);
    eastbound.push(new Vehicle(random(0, width), y, 1));
}
  for(let i=0; i<20; i++){
    const y = random(height/1.89, height/1.4);
    westbound.push(new Vehicle(random(0, width), y, 0));
}
  trafficLight = new Trafficlight();
}

function draw() {
  drawRoad();
  for(let i=0; i<eastbound.length; i++){
    eastbound[i].action();
  }
  for(let i=0; i<westbound.length; i++){
    westbound[i].action();
  }
  trafficLight.display();
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

function mousePressed(){
  if(mouseButton === LEFT){
    if(keyCode === SHIFT){
      const y = random(height/1.89, height/1.4);
      westbound.push(new Vehicle(random(0, width), y, 0));
    }
    else{
      const y = random(height/2.2, height/3.8);
      eastbound.push(new Vehicle(random(0, width), y, 1));
  }
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
    //trafficlight
    if (trafficLight.type ===0){
      this.move();
    }  
    this.display();
    //Highlight 4/29 stop here
    this.speedUp();
    this.speedDown();

    // 1% chance for speedup, speeddown and changecolor
    let chance = int(random(0,100));
    if(chance === 1){
      this.speedUp();
    }
    if(chance === 1){
      this.speedDown();
    }
    if (chance === 1){
      this.changeColor();
    }
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
    this.c = color(random(255), random(255), random(255));
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

// green and red, stop and then start move 
class Trafficlight {
  constructor(){
    this.type = 0;
    this.frame = 0;
  }

  display(){
    this.draw();
    this.switchLight();
  }

  draw() {
    circle(width - 500, height - 100, 30);
    if (this.type === 0) {
      fill(0, 255, 0);//green
    }
    else {
      fill(255, 0, 0);//red
    }
  }

  switchLight(){
    this.draw();
    this.frame ++;
    if(this.frame > 120){ //120 gap
      if (this.type === 0){
        this.type = 1;
      } else {
        this.type = 0;
      }
      this.frame = 0; //reset timer
    }
}
}