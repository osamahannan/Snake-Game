let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Music/food.mp3');
const gameOverSound = new Audio('Music/gameover.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/music.mp3');
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let foodItem = { x: 6, y: 7 };
let scorePoint = 0;
let f = 1;

// Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {

    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // if you bump into wall
    if (snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // part 1: updating the snake array & food 

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game Over. Press any key to play again!');
        snakeArr = [{
            x: 13, y: 15
        }];
        scorePoint = 0;
        speed = 4;
        f = 1;
        score.innerHTML = "Score :" + 0;
    }

    // if you have eaten the the food, increment the score and regenerate the food

    if (snakeArr[0].y === foodItem.y && snakeArr[0].x === foodItem.x) {
        scorePoint += 10;
        score.innerHTML = "Score :" + scorePoint;
        if (scorePoint >= f * 50) {
            speed += 2;
            f++;
        }
        // if (scorePoint > hiscoreval) {
        //     // console.log("hello high score");
        //     hiscoreval = scorePoint;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
        // }
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        foodItem = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snakeArr

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: display the snake and food

    // displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // part 2: displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodItem.y;
    foodElement.style.gridColumnStart = foodItem.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// let hiscore = localStorage.getItem("hiscoreval");
// let hiscoreval;
// if (hiscore === null) {
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
//     localStorage.setItem("hiscoreval", JSON.stringify(hiscoreval));
// }
// else{
//     console.log("hello high score");
//     // hiscoreval = localStorage.getItem("hiscoreval"); 
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
// }

// Main logic starts here 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})