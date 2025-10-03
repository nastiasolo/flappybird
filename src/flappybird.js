//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

//pipes
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

window.onload = function() {
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
    birdImg.onload = function() {
      // Feel free to first experiment with some numbers: context.drawImage(birdImg, 100, 100, 30, 50) before using variables
        context.drawImage(birdImg, 25, 250, 50, 50);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    topPipeImg.onload = function() {
        context.drawImage(topPipeImg, 250, 0, 70, 300)
    }

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
    bottomPipeImg.onload = function() {
        context.drawImage(bottomPipeImg, 250, 450, 70, 200)
    }
}