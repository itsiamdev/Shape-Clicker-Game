let score = 0;
let missed = 0;
const scoreEl = document.getElementById('score');
const gameArea = document.getElementById('game-area');
const gameOverEl = document.getElementById('game-over');
const shapes = ['circle', 'square', 'triangle'];

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
}

function gameOver() {
    gameOverEl.style.display = 'block';
    clearInterval(spawnInterval);
}

function createShape() {
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const shape = document.createElement('div');
    shape.classList.add('shape', shapeType);
    shape.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    shape.style.top = Math.random() * (gameArea.clientHeight - 50) + 'px';
    let clicked = false;
    shape.addEventListener('click', () => {
        clicked = true;
        score++;
        updateScore();
        shape.remove();
    });
    gameArea.appendChild(shape);
    // Remove after 5 seconds if not clicked
    setTimeout(() => {
        if (!clicked && shape.parentNode) {
            missed++;
            shape.remove();
            if (missed >= 3) {
                gameOver();
            }
        }
    }, 5000);
}

const spawnInterval = setInterval(createShape, 1500);
updateScore();