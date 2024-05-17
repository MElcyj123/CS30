// Puzzle Game
// Melody Chen
// 5/14/20

let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridData = [[0,0,0,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,255,255,0,0]];

let overlay;


function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;

  randomizedStartingArrangement();
}

function draw() {
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();                //render the current game board to the screen (and the overlay)
  youWin();
  mouseTrack();
}



function mousePressed(){
  if (keyIsPressed && key === 'Shift') {
    // Calculate the column and row
    let col = int(mouseX / rectWidth);
    let row = int(mouseY / rectHeight);
    flip(col, row);
  } else {
    // cross-shaped pattern flips on a mouse click
    flip(currentCol, currentRow);
    flip(currentCol - 1, currentRow);
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow - 1);
    flip(currentCol, currentRow + 1);
  }
}

function flip(col, row){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}

function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

function youWin(){
  let win = true;
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++){
      if(gridData[y][x] !== gridData[0][0]){
        win = false;
        break;
      }
    }
  }

  if (win) {
    textSize(32);
    fill(103, 52, 242);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function randomizedStartingArrangement() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      gridData[y][x] = int(random(2)) * 255;
    }
  }
}

function mouseTrack(){
  overlay.fill(255,0,0,100);
  // if (keyIsPressed && keyCode === SHIFT) { // Cheater Cheater
  //   overlay.rect(col * 50, row * 50, 50, 50);
  // }

}