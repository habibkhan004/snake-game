// Defining Constants and variables
let inputDir = { x: 0, y: 0 }
let foodSound = new Audio('../music/food.mp3')
let gameOver = new Audio("../music/gameover.mp3")
let moveSound = new Audio("../music/move.mp3")
let music = new Audio("../music/music.mp3")
let board = document.getElementById('game-board')
let scoreBox = document.getElementById('score-box');
let highScoreBox = document.getElementById('hiscore-box');
let lastPaintTime = 0;
let snakeArr = [
    { x: 12, y: 13 }
];
let food = {
    x: 10,
    y: 10
}
let speed = 5;
let score = 0;

// music.play()
//Game Fuctions

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime)
    gameEngine();
}

function gameEngine() {
    // if snake collide
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        moveSound.pause()
        gameOver.play()
        alert("GameOver! Press any key to play again")
        snakeArr = [
            { x: 12, y: 13 }
        ];
        // music.play()
        score = 0;
        scoreBox.innerHTML = "Score: " + score;

    }
    // if snake eat the food 
    if ((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)) {
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()), }
        score += 1;
        if(score> hiScoreVal){
            hiScoreVal=score
            localStorage.setItem("hiscore", hiScoreVal)
            highScoreBox.innerHTML="High Score : " +hiScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
    }
    // moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    //if snake collide with itselt and with boarder
    function isCollide(snake) {
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true
            }
        }
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true
        }

    }

    // Displaying the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake')
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }

        board.appendChild(snakeElement)
    });

    // Displaying The food Element
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}


let hiScoreVal=0; 
let hiscore= localStorage.getItem("hiscore")
if (hiscore === null) {
     hiScoreVal=0;
    localStorage.setItem("hiscore", hiScoreVal)
}
else{
    hiScoreVal=hiscore;
    highScoreBox.innerHTML="High Score :" + hiscore;
}




//Main logic
window.requestAnimationFrame(main)

window.addEventListener('keydown', e => {
    moveSound.play()
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})