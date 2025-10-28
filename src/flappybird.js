//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//pipes
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 350;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); //used for drawing on the board

  /*     //draw flappy bird
    context.fillStyle = "green";
    // Replace these with sensible numbers and experiment! :) e.g. context.fillRect(100, 100, 30, 50);
    context.fillRect(250, 450, 60, 200);  */

  //load images
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  //NEW: Start the game loop
  // Add the keydown listener once (not every frame)
  document.addEventListener("keydown", handleKeydown);

  requestAnimationFrame(update);
};

// Function to draw the bird at its current position
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function drawPipes() {
  // Draw top pipe
  context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
  // Draw bottom pipe below the top pipe with a gap
  let pipeGap = 75; // vertical gap between top and bottom pipes
  let bottomPipeY = pipeY + pipeHeight + pipeGap;
  context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);
}

// Function to handle keydown events

function handleKeydown(event) {
  console.log(event.key);
  if (event.key == " ") {
    birdY -= 30;
  }
}

// Main game loop
function update() {
  console.log("Game updating...");

  // Clears the entire canvas
  context.clearRect(0, 0, board.width, board.height);

  // Updates the bird's position
  birdY = birdY + 1; // Gravity effect: bird falls down each frame
  pipeX = pipeX - 1; // Move pipes to the left

  // Draws the bird at its new position
  // Draw pipes and bird
  drawPipes();
  drawBird();

  if (birdY >= boardHeight) {
    context.font = "bold 36px Arial, sans-serif";
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.fillText("Game Over", board.width / 2, 80);
  }

  requestAnimationFrame(update);
}
