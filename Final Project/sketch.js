// Final Project
// Melody Chen and Nancy Yang
// May 24th, 2024

let captainCanuck;
let playerImg1;
let playerImg2;
let bgImg;
let coins, ground, tile1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  captainCanuck = new Player(50, 100, 100, 150); 
}

function draw() {
  background(bgImg);
  captainCanuck.move(); 
  captainCanuck.display();
}

function preload() {
  playerImg1 = loadImage("assets/1.png"); 
  playerImg2 = loadImage("assets/2.png");
  bgImg = loadImage("assets/avengers-tower.jpg");
  coins = loadImage("assets/coins.png");
  ground = loadImage("assets/ground.png");
  tile1 = loadImage("");
}

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.onGround = false;
    this.jump = false;
    this.player = playerImg1;
  }

  move() {
    if (!this.onGround) {
      this.speedY += 0.3;
      if (keyIsDown(LEFT_ARROW)) {
        this.speedX -= 0.3;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.speedX += 0.3;
      }
    } else {
      this.speedY = 0;
      if (keyIsDown(LEFT_ARROW)) {
        this.speedX -= 1.2;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.speedX += 1.2;
      }
      if (keyIsDown(UP_ARROW) && this.onGround) {
        this.jump = true;
      }
      if (this.jump) {
        this.speedY = -10;
        this.speedX *= 0.8;
        this.jump = false;
        this.onGround = false;
        this.player = playerImg2;
      } else {
        this.player = playerImg1;
      }
      this.speedX *= 0.8;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }

  display() {
    if (this.player === playerImg2) {
      image(this.player, this.x, this.y, this.width*1.8, this.height*1.8);
    } 
    else {
      image(this.player, this.x, this.y, this.width, this.height);
    }
  }
}