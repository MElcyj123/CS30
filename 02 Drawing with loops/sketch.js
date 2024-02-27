// Drawing with Loops 1
// Melody Chen
// February 27, 2024
// Uasing Loops + Arrays to create some cisualizations


// global variables
let xPos, yPos; // declaration only...


function setup() {
  createCanvas(400, 300);
  xPos = [width*0.05, width*0.95, width*0.05, width*0.95];
  yPos = [height*0.05, height*0.05, height*0.95, height*0.95]
}

function draw() {
  background(220);

  cornersAndMouseLoop();
}

function mousePressed(){
  // this calls automatically on mousePress
  xPos.push(mouseX);
  yPos.push(mouseY);
}

function cornersAndMouseLoop(){
  // a hopefully slightly more elegant version...
   let i = 0;
   while(i < xPos.length){
    let x = xPos[i];
    let y = yPos[i];
    circle(x,y,20);
    line(x,y,mouseX,mouseY);
    i++
   }
   circle(mouseX, mouseY,  20);
}

function cornersAndMouse(){
  // draw some circles near wach  of the four corners
  // and connect some lines from there to the mouse position
  fill(255);
  circle(width*0.05, height*0.05, 20);
  circle(width*0.95, height*0.05, 20);
  circle(width*0.05, height*0.95, 20);
  circle(width*0.95, height*0.95, 20);
  circle(mouseX, mouseY,  20);
  //lines
  line(width*0.05, height*0.05, mouseX,mouseY);
  line(width*0.95, height*0.05, mouseX,mouseY);
  line(width*0.05, height*0.95, mouseX,mouseY);
  line(width*0.95, height*0.95, mouseX,mouseY);
}