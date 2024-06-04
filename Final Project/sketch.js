// Final Project
// Melody Chen and Nancy Yang
// May 24th, 2024

let captainCanuck, playing, groundSensor;
let walkable;
let playerImg1;
let playerImg2;
let floorTileImg;
let bgImg;
let coins, ground, tile1, platformImg;
const TILE_SIZE = 100;
const currentLevel = 0;

function preload() {
  playerImg1 = loadImage("assets/1.png"); 
  playerImg2 = loadImage("assets/2.png");
  bgImg = loadImage("assets/avengers-tower.jpg");
  floorTileImg = loadImage("assets/tile1.png");
  platformImg = loadImage("assets/platform.png");
  // coins = loadImage("assets/coins.png");
  // ground = loadImage("assets/ground.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  captainCanuck = new Player(50, height - 150, 100, 150); 

  groundSensor = createSprite(captainCanuck.x, captainCanuck.y + captainCanuck.height / 2, captainCanuck.width, 12);
  groundSensor.visible = false;
  groundSensor.mass = 0.1;

  walkableGroupSetUp();
  drawMap();

  // Add the platform at the bottom
  let platform = createSprite(width / 2, height - platformImg.height / 2, width, platformImg.height);
  platform.addImage(platformImg);
  platform.scale = (width / platformImg.width) * 1.1; // Adjust the scale to fit the width
  walkable.add(platform);
}

function draw() {
  background(bgImg);

  groundSensor.position.x = captainCanuck.x;
  groundSensor.position.y = captainCanuck.y + captainCanuck.height / 2;

  // Check collision with walkable group
  if (groundSensor.overlap(walkable)) {
    captainCanuck.onGround = true;
  } else {
    captainCanuck.onGround = false;
  }

  captainCanuck.move(); 
  captainCanuck.display();
  drawSprites();
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
    this.facingRight = true; // Keep track of which direction the player is facing
  }

  move() {
    if (!this.onGround) {
      this.speedY += 0.3;
      if (keyIsDown(LEFT_ARROW)) {
        this.speedX -= 0.3;
        this.facingRight = false;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.speedX += 0.3;
        this.facingRight = true;
      }
    } else {
      this.speedY = 0;
      if (keyIsDown(LEFT_ARROW)) {
        this.speedX -= 1.2;
        this.facingRight = false;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.speedX += 1.2;
        this.facingRight = true;
      }
      if (keyIsDown(UP_ARROW) && this.onGround) {
        this.jump = true;
      }
      if (this.jump) {
        this.speedY = -10;
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

    // Constrain the player within the canvas boundaries
    if (this.y >= height - this.height) {
      this.y = height - this.height;
      this.onGround = true;
      this.player = playerImg1;
    } else {
      this.onGround = false;
    }

    // Ensure the player doesn't move off the left or right side of the canvas
    this.x = constrain(this.x, 0, width - this.width);
  }

  display() {
    let imgWidth = this.player === playerImg2 ? this.width * 1.8 : this.width;
    let imgHeight = this.player === playerImg2 ? this.height * 1.8 : this.height;

    push();
    translate(this.x + imgWidth / 2, this.y + imgHeight / 2); // Translate to the center of the player
    if (!this.facingRight) {
      scale(-1, 1); // Flip the image horizontally if facing left
    }
    imageMode(CENTER);
    image(this.player, 0, 0, imgWidth, imgHeight); // Draw the image at the new position
    pop();
  }
}

function walkableGroupSetUp() {
  walkable = new Group();
}

function drawMap() {
  let tileMap = TILE_MAPS[currentLevel];
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      if (tileMap[row][col] === 'f') {
        let floorTile = createSprite(col * TILE_SIZE + TILE_SIZE / 2, row * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        floorTile.addImage(floorTileImg); // Set the image for the floor tile
        floorTile.scale = (TILE_SIZE *2) / floorTileImg.width; // Adjust the scale to make it larger (1.5x the normal size)
        walkable.add(floorTile);
      }
    }
  }
}

const TILE_MAPS = [
  [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.........f......',
    '...f............',
  ],
];

