var canvas, ctx, interval, x, y;
var ballRadius = 12;

var dx = 2;
var dy = 2;
var paddleHeight = 100;
var paddleWidth = 12;
var paddleY;
var downPressed = false;
var upPressed = false;
var brickRowCount = 5;
var brickColumnCount = 4;
var brickCount = brickRowCount * brickColumnCount;
var brickWidth = 25;
var score = 0;
var brickHeight = 60;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 400;
var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      visible: 1
    };
  }
}

function keyDownHandler(e) {
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(0, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  var brickColor = ["#0095dd", "#0088bb", "#007799", "#006677"]
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].visible == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor[c];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.visible == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.visible = 0;
          score += c + 1;
          if (score == 50) {
            alert("Congrat, you win!\n Score: " + score);
            document.location.reload();
            //clearInterval(interval);
          } else if (brickCount == 0) {
            alert("Congrat, you win!\n Score: " + score);
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0077bb";
  ctx.fillText("Score: " + score, 20, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

  if (x + dx > canvas.width - ballRadius) {
    dx = -dx;
  } else if (x + dx < ballRadius) {
    if (y > paddleY && y < paddleY + paddleHeight) {
      dx = -dx;
    } else {
      alert("GAME OVER");
      document.location.reload();
      //clearInterval(interval);
    }
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 4;
  } else if (upPressed && paddleY > 4) {
    paddleY -= 4;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", function (event) {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  paddleY = (canvas.height - paddleHeight) / 2
  x = ballRadius;
  y = Math.random() + (canvas.height - 2 * ballRadius) + ballRadius;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  //interval = setInterval(draw, 10);
  draw();
})