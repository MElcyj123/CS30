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


let pattern = 'cross'; // set the initial pattern to cross
let overlay;
let col, row;


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
  drawOverlay();
}






function mousePressed(){
  if (keyIsPressed && key === 'Shift') {
    // Calculate the column and row
    let col = int(mouseX / rectWidth);
    let row = int(mouseY / rectHeight);
    flip(col, row);
  } else {
    // cross-shaped pattern flips on a mouse click
    if(pattern === 'cross'){
      flip(currentCol, currentRow); // same direction with drawCrossOverlay
      flip(currentCol - 1, currentRow);
      flip(currentCol + 1, currentRow);
      flip(currentCol, currentRow - 1);
      flip(currentCol, currentRow + 1);
    }
    else if(pattern === 'square'){ // same direction with drawSquareOverlay
      flip(currentCol, currentRow);
      flip(currentCol - 1, currentRow);
      flip(currentCol - 1, currentRow - 1);
      flip(currentCol, currentRow - 1);
    }
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


//Win Condition
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


//Randomized Starting Arrangement
function randomizedStartingArrangement() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      gridData[y][x] = int(random(2)) * 255;
    }
  }
}


//overlay
function drawOverlay() {
  fill(0, 255, 0, 100); // green
  if (keyIsPressed && keyCode === SHIFT) { // Cheater Cheater
    drawOverlayRect(currentCol, currentRow);
  }
  //flipping in cross and square
  else if (pattern === 'cross') {
    drawCrossOverlay(currentCol, currentRow);
  }
  else if (pattern === 'square') {
    drawSquareOverlay(currentCol, currentRow);
  }
}


function drawCrossOverlay(col,row){
  drawOverlayRect(col, row); // center(where the mouse is pointed)
  drawOverlayRect(col - 1, row); // left
  drawOverlayRect(col + 1, row); // right
  drawOverlayRect(col, row - 1); // down
  drawOverlayRect(col, row + 1); // up
}


function drawSquareOverlay(col,row){
  drawOverlayRect(col, row);
  drawOverlayRect(col - 1, row);
  drawOverlayRect(col - 1, row - 1);
  drawOverlayRect(col, row - 1);
}


function drawOverlayRect(col, row) {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      if (x === col && y === row) {
        rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
      }
    }
  }
}


function keyPressed(){
  if(key === " "){
    if(pattern === 'cross'){
      pattern = 'square';
    }
    else if(pattern === 'square'){
      pattern = 'cross'
    }
  }
}

