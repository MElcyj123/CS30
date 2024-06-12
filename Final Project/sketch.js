let captainCanuck, playing, groundSensor, coins, spikes, door;
let walkable;
let playerImg1, playerImg2, floorTileImg, bgImg, coinsImg, ground, tile1, platformImg, spikesImg, doorImg;
let backgroundMusic, coinSound;
const TILE_SIZE = 100;
let currentLevel = 0;
let score = 0;
let skipButton;

function preload() {
  playerImg1 = loadImage("assets/1.png");
  playerImg2 = loadImage("assets/2.png");
  bgImg = loadImage("assets/avengers-tower.jpg");
  floorTileImg = loadImage("assets/tile1.png");
  platformImg = loadImage("assets/platform.png");
  coinsImg = loadImage("assets/coins.png");
  spikesImg = loadImage("assets/spikes.png");
  doorImg = loadImage("assets/door.png");

  // backgroundMusic = loadSound("assets/background_music.mp3");
  //coinSound = loadSound("assets/coin_sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  captainCanuck = new Player(50, 100, 70, 100);

  groundSensor = createSprite(captainCanuck.x, captainCanuck.y + captainCanuck.height / 2 + 1, captainCanuck.width, 5);
  groundSensor.visible = false;
  groundSensor.mass = 0.1;

  walkableGroupSetUp();
  coins = new Group();
  spikes = new Group(); // Initialize spikes group
  door = new Group(); // Initialize door group
  drawMap();

  // backgroundMusic.loop();

  // Add the platform at the bottom
  // let numberOfPlatforms = ceil(width / platformImg.width);
  // for (let i = 0; i < numberOfPlatforms; i++) {
  //   let platform = createSprite(i * platformImg.width + platformImg.width / 2, height - platformImg.height / 2, platformImg.width, platformImg.height);
  //   platform.addImage(platformImg);
  //   platform.scale = (platformImg.width / platformImg.width);
  //   walkable.add(platform);
  // }

  // Adjust the scale of the last platform to fill any remaining space
  // let lastPlatform = createSprite(numberOfPlatforms * platformImg.width + platformImg.width / 2, height - platformImg.height / 2, platformImg.width, platformImg.height);
  // lastPlatform.addImage(platformImg);
  // lastPlatform.scale = (width - numberOfPlatforms * platformImg.width) / platformImg.width;
  // walkable.add(lastPlatform);

  // // Create a skip button
  // skipButton = createButton('Skip');
  // skipButton.position(10, 10);
  // skipButton.mousePressed(skipLevel);
}

function draw() {
  background(bgImg);
  
  groundSensor.position.x = captainCanuck.x + 35;
  groundSensor.position.y = captainCanuck.y + captainCanuck.height;

  // Check collision with walkable group
  if (groundSensor.overlap(walkable)) {
    captainCanuck.onGround = true;
  } else {
    captainCanuck.onGround = false;
  }

  // Check collision with coins group
  captainCanuck.sprite.overlap(coins, (player, coin) => {
    coin.remove();
    score += 1;
    coinSound.play();
  });

  // Check collision with spikes group
  captainCanuck.sprite.overlap(spikes, (player, spike) => {
    captainCanuck = new Player(50, 100, 70, 100);
  });

  // Check collision with door group
  captainCanuck.sprite.overlap(door, (player, doorSprite) => {
    nextLevel();
  });

  captainCanuck.move();
  captainCanuck.display();
  drawSprites();

  // Display the score
  fill(255);
  textSize(32);
  textAlign(RIGHT, TOP);
  text('Score: ' + score, width - 10, 10);
}

function nextLevel() {
  currentLevel++;
  if (currentLevel >= TILE_MAPS.length) {
    currentLevel = 0; // Restart from the first level if the currentLevel exceeds available levels
  }
  drawMap();
  captainCanuck = new Player(50, 100, 70, 100); // Reset the player position
  score = 0; // Reset score or handle as needed
}

function skipLevel() {
  nextLevel();
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
    this.facingRight = true; 
    this.sprite = createSprite();

    this.sprite.visible = false; 
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
      } else {
        this.player = playerImg1;
      }
      this.speedX *= 0.8;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    // Constrain the player within the canvas boundaries
    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.onGround = true;
      this.player = playerImg1;
    } else {
      this.onGround = false;
    }

    // Ensure the player doesn't move off the left or right side of the canvas
    this.x = constrain(this.x, 0, width - this.width);

    // Update the sprite position
    this.sprite.position.x = this.x + this.player.width / 2;
    this.sprite.position.y = this.y + this.player.height;
  }

  display() {
    let imgWidth = this.player === playerImg2 ? this.width * 1.8 : this.width;
    let imgHeight = this.player === playerImg2 ? this.height * 1.8 : this.height;

    push();
    translate(this.x + imgWidth / 2, this.y + imgHeight / 2);
    if (!this.facingRight) {
      scale(-1, 1);
    }
    imageMode(CENTER);
    image(this.player, 0, 0, imgWidth, imgHeight);
    pop();
  }
}

function walkableGroupSetUp() {
  walkable = new Group();
}

function drawMap() {
  walkable.clear(); 
  coins.clear(); 
  spikes.clear(); 
  door.clear();

  let tileMap = TILE_MAPS[currentLevel];
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      if (tileMap[row][col] === 'f') {
        let floorTile = createSprite(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        floorTile.addImage(floorTileImg); // Set the image for the floor tile
        floorTile.scale = (TILE_SIZE * 2) / floorTileImg.width; 
        // Create a thin top collision sprite
        let topCollision = createSprite(col * TILE_SIZE, row * TILE_SIZE - TILE_SIZE / 2, TILE_SIZE * 2, 10); 
        topCollision.visible = false; // Make it invisible
        walkable.add(topCollision);
      }

      if (tileMap[row][col] === 'c') {
        let coin = createSprite(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        coin.addImage(coinsImg);
        coin.scale = 0.3;
        coins.add(coin);  
      }

      if (tileMap[row][col] === 's') {
        let spike = createSprite(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        spike.addImage(spikesImg);
        spike.scale = 0.3;
        spikes.add(spike); 
      }

      if (tileMap[row][col] === 'd') {
        let doorSprite = createSprite(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        doorSprite.addImage(doorImg);
        doorSprite.scale = 0.3;
        door.add(doorSprite);
      }

      if (tileMap[row][col] === 'p') {
        let platformSprite = createSprite(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        platformSprite.addImage(platformImg);
        walkable.add(platformSprite);
      }
    }
  }
}

const TILE_MAPS = [
  [
    '................',
    '................',
    '..................d',
    '..................f',
    '...............f',
    '.............f..',
    '.....c.f..f.....',
    '...csf..........',
    '...f............',
    'ppppppppppppppppppp',
    '................',
    '.................'
    
  ],

  [// Level 2
    '................',
    '................',
    '..................d',
    '..................f',
    '..........f....f',
    '.......f........',
    '.....c.f..f.....',
    '...csf..........',
    'ffff............',
    '................',
    'pppppppppppppppppp',
    '.................'
    
  ],
];
