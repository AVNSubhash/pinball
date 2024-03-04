document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById('ball');
    const paddle = document.getElementById('paddle');
    const welcomePage = document.getElementById('welcome-page');
    const gameContainer = document.getElementById('game-container');
    const gameOverPopup = document.getElementById('game-over-popup');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const scoreDisplay = document.getElementById('score');

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 4; // Reduce ball speed
    let ballSpeedY = 4; // Reduce ball speed
    let gameRunning = false;
    let startTime, endTime, score;

    function startGame() {
        welcomePage.style.display = 'none';
        gameContainer.style.display = 'block';
        startTime = new Date().getTime(); // Record start time
        setTimeout(() => {
            gameRunning = true;
            update();
        }, 2000); // Wait for 2 seconds before starting the game
    }

    function resetGame() {
        ballX = 300;
        ballY = 200;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        gameRunning = false;
        gameOverPopup.style.display = 'none';
        welcomePage.style.display = 'block';
        gameContainer.style.display = 'none';
    }

    function endGame() {
        gameRunning = false;
        endTime = new Date().getTime(); // Record end time
        score = endTime - startTime; // Calculate score (1 unit per millisecond)
        scoreDisplay.textContent = score;
        gameContainer.style.display = 'none';
        gameOverPopup.style.display = 'block';
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', resetGame);

    document.addEventListener('mousemove', function(event) {
        const containerRect = gameContainer.getBoundingClientRect();

        let newX = event.clientX - containerRect.left - paddle.offsetWidth / 2;
        newX = Math.min(containerRect.width - paddle.offsetWidth, Math.max(0, newX));

        paddle.style.left = newX + 'px';
    });

    function update() {
        if (!gameRunning) return;

        // Update ball position
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Check collision with walls
        if (ballX >= 580 || ballX <= 20) {
            ballSpeedX *= -1;
        }
        if (ballY <= 20) {
            ballSpeedY *= -1;
        }

        // Check collision with paddle
        if (ballY >= paddle.offsetTop - 20 && ballX >= paddle.offsetLeft && ballX <= paddle.offsetLeft + paddle.offsetWidth) {
            ballSpeedY *= -1;
        }

        // Check if ball goes below paddle
        if (ballY > paddle.offsetTop + paddle.offsetHeight) {
            endGame();
        }

        // Update ball position
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(update);
    }
});
