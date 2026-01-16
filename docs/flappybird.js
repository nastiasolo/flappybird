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
let pipes = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 350;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let jumpStrength = -6;
let velocityY = 0;
let gravity = 0.5;

let gameStarted = false;
let gameOver = false;

//sounds
let jumpSound = new Audio("./sounds/flappy.wav");
let crashSound = new Audio("./sounds/hit.wav");

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
  board.addEventListener("contextmenu", handleRightClick);

  requestAnimationFrame(update);
};

// Function to draw the bird at its current position
function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function createPipe() {
  let gap = 130;
  let topHeight = boardHeight / 2 + (Math.random() - 0.5) * 100 - gap / 2;

  let pipe = {
    x: boardWidth,
    width: pipeWidth,
    topHeight: topHeight,
    gap: gap,
  };

  pipes.push(pipe);
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    context.drawImage(topPipeImg, p.x, 0, p.width, p.topHeight);

    let bottomY = p.topHeight + p.gap;
    let bottomHeight = boardHeight - bottomY;
    context.drawImage(bottomPipeImg, p.x, bottomY, p.width, bottomHeight);
  }
}

// // Draw top pipe
// context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
// // Draw bottom pipe below the top pipe with a gap

// let pipeGap = 75; // vertical gap between top and bottom pipes

// let bottomPipeY = pipeY + pipeHeight + pipeGap;
// context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);

function spawnPipe() {
  if (pipes.length === 0) {
    createPipe();
  } else {
    let lastPipe = pipes[pipes.length - 1];
    if (lastPipe.x < boardWidth - 200) {
      createPipe();
    }
  }
}

function cleanPipes() {
  pipes = pipes.filter((p) => p.x + pipeWidth > 0);
}

// Function to handle keydown events

function handleKeydown(event) {
  if (event.key == " ") {
    if (!gameStarted) {
      gameStarted = true;
      restartGame();
      return;
    }

    if (gameOver) {
      gameStarted = false;
      return;
    }

    velocityY = jumpStrength;
    jumpSound.currentTime = 0;
    jumpSound.play();
  }
}

function handleRightClick(event) {
  event.preventDefault();
  if (gameOver) {
    restartGame();
  }
}

function drawGameOver() {
  context.font = "bold 36px Arial, sans-serif";
  context.textAlign = "center";
  context.lineWidth = 4;
  context.strokeStyle = "black";
  context.strokeText("Game Over", board.width / 2, 80);
  context.fillStyle = "#fff";
  context.fillText("Game Over", board.width / 2, 80);

  context.font = "bold 28px Arial";
  context.lineWidth = 4;
  context.strokeText(
    "Press SPACE to restart",
    board.width / 2,
    board.height / 2 + 20
  );
  context.fillText(
    "Press SPACE to restart",
    board.width / 2,
    board.height / 2 + 20
  );
}

function restartGame() {
  birdY = boardHeight / 2;
  velocityY = 0;
  pipes = [];
  gameOver = false;
  requestAnimationFrame(update);
}

function drawStartScreen() {
  context.font = "bold 32px Arial";
  context.textAlign = "center";

  context.lineWidth = 4;
  context.strokeStyle = "black";
  context.strokeText("Press SPACE to start", board.width / 2, board.height / 2);

  context.fillStyle = "white";
  context.fillText("Press SPACE to start", board.width / 2, board.height / 2);
}

function checkCollusion() {
  for (let p of pipes) {
    let inPipeX = birdX + birdWidth > p.x && birdX < p.x + pipeWidth;

    if (inPipeX) {
      let hitTop = birdY < p.topHeight;
      let hitBottom = birdY + birdHeight > p.topHeight + p.gap;

      if (hitTop || hitBottom) {
        gameOver = true;
        crashSound.play();
      }
    }
  }
}

// Main game loop
function update() {
  // Clears the entire canvas

  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  if (gameOver) {
    drawGameOver();
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  // Updates the bird's position
  velocityY += gravity; // Gravity effect: bird falls down each frame
  birdY += velocityY;

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 1; // Move pipes to the left
  }

  // Draws the bird at its new position
  // Draw pipes and bird
  cleanPipes();
  spawnPipe();
  drawPipes();
  drawBird();
  checkCollusion();

  if (birdY >= boardHeight || birdY < 0) {
    gameOver = true;
  }

  requestAnimationFrame(update);
}
