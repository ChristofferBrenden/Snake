var myCanvas;
var myCanvasContext;
var mySpriteImage;
var mySnake;
var myApple;
var myAllowInput;
var myHasLost;
var myIsPaused;
var myIsStartScreen;

window.onload = () => {
    myCanvas = document.getElementById("canvas")
    myCanvasContext = myCanvas.getContext('2d');
    mySpriteImage = new Image();
    mySpriteImage.onload = () => {
        startGame();
    }
    mySpriteImage.src = Constants.SPRITE_IMAGE;
}

function startGame() {
    myIsStartScreen = true;
    gameLoop();
}

function newGame() {
    mySnake = new Snake(myCanvas);
    myApple = new Apple(mySnake, myCanvas);
    myAllowInput = true;
    myHasLost = false;
    myIsPaused = false;
}

function gameLoop() {
    setInterval(show, 1000 / Constants.FPS);
}

function show() {
    if (myIsStartScreen) {
        drawStartScreen();
        return;
    }
    if (myHasLost) {
        drawEnd();
        return;
    }
    if (myIsPaused) {
        drawPaused();
        return;
    }
    myAllowInput = true;
    update();
    drawGame();
}

function update() {
    myCanvasContext.clearRect(0, 0, myCanvas.width, myCanvas.height)
    mySnake.move();
    checkHitWall();
    eatApple();
    checkCollision();
}


function checkCollision() {
    if (mySnake.tail.length < 5) { // Can't collision with itself if snake is shorter than 5
        return;
    }
    var head = mySnake.tail[mySnake.tail.length - 1]
    for (var i = 0; i < mySnake.tail.length - 4; i++) { // Can't collision with the first 4 "tails"
        if (head.x == mySnake.tail[i].x && head.y == mySnake.tail[i].y) {
            myHasLost = true;
            return;
        }
    }
}

function checkHitWall() {
    var head = mySnake.tail[mySnake.tail.length - 1]
    if (head.x == -mySnake.size) {
        head.x = myCanvas.width - mySnake.size;
    } else if (head.x == myCanvas.width) {
        head.x = 0;
    } else if (head.y == -mySnake.size) {
        head.y = myCanvas.height - mySnake.size;
    } else if (head.y == myCanvas.height) {
        head.y = 0;
    }
}

function eatApple() {
    if (mySnake.tail[mySnake.tail.length - 1].x == myApple.x && mySnake.tail[mySnake.tail.length - 1].y == myApple.y) {
        mySnake.grow();
        myApple = new Apple(mySnake, myCanvas);
    }
}

function drawApple() {
    drawSprite(0, 3, myApple.x, myApple.y, myApple.size);
}

function drawHead() {
    var posX;
    var posY;
    var current = mySnake.tail[mySnake.tail.length - 1];
    if (mySnake.rotateX == 1) { // Facing right
        posX = 4;
        posY = 0;
    } else if (mySnake.rotateX == -1) { // Facing left
        posX = 3;
        posY = 1;
    } else if (mySnake.rotateY == 1) { // Facing down
        posX = 4;
        posY = 1;
    } else if (mySnake.rotateY == -1) { // Facing up
        posX = 3;
        posY = 0;
    }
    drawSprite(posX, posY, current.x, current.y, mySnake.size);
}

function drawTail() {
    var posX;
    var posY;
    var current = mySnake.tail[0];
    var next = mySnake.tail[1];
    if ((next.x > current.x && !(current.x == 0 && next.x == (myCanvas.width - mySnake.size))) || (next.x == 0 && current.x == (myCanvas.width - mySnake.size))) { // Next tail part is to the right of current, i.e. tail is facing left
        posX = 4;
        posY = 2;
    } else if ((next.x < current.x) || (next.x == (myCanvas.width - mySnake.size) && current.x == 0)) { // Next tail part is to the left of current, i.e. tail is facing right
        posX = 3;
        posY = 3;
    } else if ((next.y > current.y && !(current.y == 0 && next.y == (myCanvas.height - mySnake.size))) || (next.y == 0 && current.y == (myCanvas.height - mySnake.size))) { // Next tail part is below current, i.e. tail is facing up
        posX = 4;
        posY = 3;
    } else if ((next.y < current.y) || (next.y == (myCanvas.height - mySnake.size) && current.y == 0)) { // Next tail part is above current, i.e. tail is facing down
        posX = 3;
        posY = 2;
    }
    drawSprite(posX, posY, current.x, current.y, mySnake.size);
}

function drawBody(position) {
    const maxX = myCanvas.width - mySnake.size;
    const maxY = myCanvas.height - mySnake.size;
    var posX;
    var posY;
    var current = mySnake.tail[position];
    var next = mySnake.tail[position + 1];
    var previous = mySnake.tail[position - 1];
    if (next.x != current.x && current.x != previous.x) {
        // Horizontal
        posX = 1;
        posY = 0;
    } else if (next.y != current.y && current.y != previous.y) {
        // Vertical
        posX = 2;
        posY = 1;
    } else if ((((next.x > current.x && !(next.x == maxX && current.x == 0)) || (next.x == 0 && current.x == maxX)) && ((previous.y > current.y && !(current.y == 0 && previous.y == maxY)) || (current.y == maxY && previous.y == 0))) || (((previous.x > current.x && !(previous.x == maxX && current.x == 0)) || (current.x == maxX && previous.x == 0)) && ((next.y > current.y && !(next.y == maxY && current.y == 0)) || (next.y == 0 && current.y == maxY)))) {
        // Angle bottom-right
        posX = 0;
        posY = 0;
    } else if ((((next.x > current.x && !(next.x == maxX && current.x == 0)) || (next.x == 0 && current.x == maxX)) && (previous.y < current.y || (current.y == 0 && previous.y == maxY))) || (((previous.x > current.x && !(current.x == 0 && previous.x == maxX)) || (current.x == maxX && previous.x == 0)) && (next.y < current.y || (next.y == maxY && current.y == 0)))) {
        // Angle top-right
        posX = 0;
        posY = 1;
    } else if (((next.x < current.x || (next.x == maxX && current.x == 0)) && ((previous.y > current.y && !(current.y == 0 && previous.y == maxY)) || (current.y == maxY && previous.y == 0))) || ((previous.x < current.x || (previous.x == maxX && current.x == 0)) && ((next.y > current.y && !(next.y == maxY && current.y == 0)) || (next.y == 0 && current.y == maxY)))) {
        // Angle bottom-left
        posX = 2;
        posY = 0;
    } else if (((next.x < current.x || (next.x == maxX && current.x == 0)) && (previous.y < current.y || (previous.y == maxY && current.y == 0))) || ((previous.x < current.x || (previous.x == maxX && current.x == 0)) && (next.y < current.y || (next.y == maxY && current.y == 0)))) {
        // Angle top-left
        posX = 2;
        posY = 2;
    }
    drawSprite(posX, posY, current.x, current.y, mySnake.size);
}

function drawSnake() {
    for (var i = 0; i < mySnake.tail.length; i++) {
        if (i == mySnake.tail.length - 1) {
            drawHead();
        } else if (i == 0) {
            drawTail();
        } else {
            drawBody(i);
        }
    }
}

function drawSprite(spritePosX, spritePosY, posX, posY, size) {
    myCanvasContext.drawImage(mySpriteImage, spritePosX * 64, spritePosY * 64, 64, 64, posX, posY, size, size)
}

function drawStartScreen() {
    createRect(0, 0, myCanvas.width, myCanvas.height, "beige")
    myCanvasContext.font = "20px Arial";
    myCanvasContext.fillStyle = "Black"
    myCanvasContext.textAlign = 'center';
    myCanvasContext.fillText("Snake", myCanvas.width / 2, myCanvas.height / 2)
    myCanvasContext.fillText("Press any key to start", myCanvas.width / 2, (myCanvas.height / 2) + 25)
    myCanvasContext.fillText("Press Escape or Spacebar to pause", myCanvas.width / 2, (myCanvas.height / 2) + 50)
    myCanvasContext.fillText("Press Enter to restart", myCanvas.width / 2, (myCanvas.height / 2) + 75)
}

function drawScreen() {
    createRect(0, 0, myCanvas.width, myCanvas.height, "beige")
    drawSnake();
    drawApple();
    myCanvasContext.font = "20px Arial";
    myCanvasContext.fillStyle = "Black"
}

function drawCurrentScore() {
    myCanvasContext.textAlign = 'end';
    myCanvasContext.fillText("Score: " + calculateScore(), myCanvas.width - 10, 18)
}

function drawGame() {
    drawScreen();
    drawCurrentScore();
}

function drawEnd() {
    drawScreen();
    myCanvasContext.textAlign = 'center';
    myCanvasContext.fillText("Game over. Final score: " + calculateScore(), myCanvas.width / 2, myCanvas.height / 2)
    myCanvasContext.fillText("Press Enter to restart", myCanvas.width / 2, (myCanvas.height / 2) + 25)
}

function drawPaused() {
    drawScreen();
    drawCurrentScore();
    myCanvasContext.textAlign = 'center';
    myCanvasContext.fillText("Game paused", myCanvas.width / 2, myCanvas.height / 2)
    myCanvasContext.fillText("Press Escape or Spacebar to resume", myCanvas.width / 2, (myCanvas.height / 2) + 25)
    myCanvasContext.fillText("Press Enter to restart", myCanvas.width / 2, (myCanvas.height / 2) + 50)
}

function calculateScore() {
    return mySnake.tail.length - 3;
}

function createRect(x, y, width, height, color) {
    myCanvasContext.fillStyle = color;
    myCanvasContext.fillRect(x, y, width, height);
}

function isKeyDown(event) {
    return event.key == 'Down' || event.key == 'ArrowDown';
}

function isKeyUp(event) {
    return event.key == 'Up' || event.key == 'ArrowUp';
}

function isKeyLeft(event) {
    return event.key == 'Left' || event.key == 'ArrowLeft';
}

function isKeyRight(event) {
    return event.key == 'Right' || event.key == 'ArrowRight';
}

function isKeyEnter(event) {
    return event.key == 'Enter';
}

function isKeyEscape(event) {
    return event.key == 'Esc' || event.key == 'Escape';
}

function isKeySpace(event) {
    return event.key == ' ' || event.key == 'Spacebar';
}

window.addEventListener("keydown", (event) => {
    if (myIsStartScreen) {
        myIsStartScreen = false;
        newGame();
        return
    }
    if (isKeyEnter(event)) {
        newGame();
        return
    }
    if (myHasLost) {
        return
    }
    if (isKeyEscape(event) || isKeySpace(event)) {
        myIsPaused = !myIsPaused;
        return;
    }
    if (!myAllowInput || myIsPaused) {
        return;
    }
    if (isKeyLeft(event) && mySnake.rotateX == 0) {
        mySnake.rotateX = -1;
        mySnake.rotateY = 0;
        myAllowInput = false;
    } else if (isKeyUp(event) && mySnake.rotateY == 0) {
        mySnake.rotateX = 0;
        mySnake.rotateY = -1;
        myAllowInput = false;
    } else if (isKeyRight(event) && mySnake.rotateX == 0) {
        mySnake.rotateX = 1;
        mySnake.rotateY = 0;
        myAllowInput = false;
    } else if (isKeyDown(event) && mySnake.rotateY == 0) {
        mySnake.rotateX = 0;
        mySnake.rotateY = 1;
        myAllowInput = false;
    }
})