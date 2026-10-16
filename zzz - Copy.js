const basket = document.getElementById("basket");
const ball = document.getElementById("ball");
const scoreElement = document.getElementById("score");

let score = 0;
let ballFallingInterval;
let ballPosition = { top: 0, left: 200 }; // Initial ball position
let basketPosition = 160; // Basket's initial position

// Move basket using arrow keys
document.addEventListener("keydown", (event) => {
  const step = 20; // How much the basket moves
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= step;
  } else if (event.key === "ArrowRight" && basketPosition < 320) {
    basketPosition += step;
  }
  basket.style.left = `${basketPosition}px`;
});

// Start ball falling
function startBallFall() {
  ballFallingInterval = setInterval(() => {
    ballPosition.top += 5; // Ball falls 5px per interval

    if (ballPosition.top >= 580) {
      // Check if ball hits the basket
      if (
        ballPosition.left >= basketPosition &&
        ballPosition.left <= basketPosition + 80
      ) {
        score++;
        scoreElement.textContent = score;
        resetBall(); // Reset ball position
      } else {
        alert("Game Over! Your score: " + score);
        resetGame();
      }
    }
    ball.style.top = `${ballPosition.top}px`;
  }, 30);
}

// Reset ball to top
function resetBall() {
  ballPosition.top = 0;
  ballPosition.left = Math.random() * 380; // Random x position
  ball.style.left = `${ballPosition.left}px`;
}

// Reset game
function resetGame() {
  clearInterval(ballFallingInterval);
  score = 0;
  scoreElement.textContent = score;
  resetBall();
  startBallFall();
}

// Initialize game
resetBall();
startBallFall();