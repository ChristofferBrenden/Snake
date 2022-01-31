class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.spriteImage = new Image();
        this.spriteImage.onload = () => {
            this.startGame();
        }
        this.spriteImage.src = Constants.SPRITE_IMAGE;
    }

    startGame() {
        this.isStartScreen = true;
        this.gameLoop();
    }

    newGame() {
        this.snake = new Snake(this.canvas);
        this.apple = new Apple(this.snake, this.canvas);
        this.allowInput = true;
        this.hasLost = false;
        this.sPaused = false;
    }

    gameLoop() {
        setInterval(this.show.bind(this), 1000 / Constants.FPS);
    }

    show() {
        if (this.isStartScreen) {
            this.drawStartScreen();
            return;
        }
        if (this.hasLost) {
            this.drawEnd();
            return;
        }
        if (this.isPaused) {
            this.drawPaused();
            return;
        }
        this.allowInput = true;
        this.update();
        this.drawGame();
    }

    update() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.snake.move();
        this.checkHitWall();
        this.eatApple();
        this.checkCollision();
    }

    checkHitWall() {
        if (this.snake.head.x == -this.snake.size) {
            this.snake.head.x = this.canvas.width - this.snake.size;
            return;
        }
        if (this.snake.head.x == this.canvas.width) {
            this.snake.head.x = 0;
            return;
        }
        if (this.snake.head.y == -this.snake.size) {
            this.snake.head.y = this.canvas.height - this.snake.size;
            return;
        }
        if (this.snake.head.y == this.canvas.height) {
            this.snake.head.y = 0;
            return;
        }
    }

    eatApple() {
        if (this.snake.head.x == this.apple.x && this.snake.head.y == this.apple.y) {
            this.snake.grow();
            this.apple = new Apple(this.snake, this.canvas);
        }
    }

    checkCollision() {
        if (this.snake.length < 5) { // Can't collision with itself if snake is shorter than 5
            return;
        }
        for (var i = 0; i < this.snake.length - 4; i++) { // Can't collision with the first 4 "tails"
            if (this.snake.head.x == this.snake.tail[i].x && this.snake.head.y == this.snake.tail[i].y) {
                this.hasLost = true;
                return;
            }
        }
    }

    drawApple() {
        this.drawSprite(0, 3, this.apple.x, this.apple.y, this.apple.size);
    }

    drawHead() {
        var posX;
        var posY;
        if (this.snake.rotateX == 1) { // Facing right
            posX = 4;
            posY = 0;
        } else if (this.snake.rotateX == -1) { // Facing left
            posX = 3;
            posY = 1;
        } else if (this.snake.rotateY == 1) { // Facing down
            posX = 4;
            posY = 1;
        } else if (this.snake.rotateY == -1) { // Facing up
            posX = 3;
            posY = 0;
        }
        this.drawSprite(posX, posY, this.snake.head.x, this.snake.head.y, this.snake.size);
    }

    drawTail() {
        var posX;
        var posY;
        var current = this.snake.tail[0];
        var next = this.snake.tail[1];
        if (current.isLeftOf(next)) { // Tail is facing left
            posX = 4;
            posY = 2;
        } else if (current.isRightOf(next)) { // Tail is facing right
            posX = 3;
            posY = 3;
        } else if (current.isAbove(next)) { // Tail is facing up
            posX = 4;
            posY = 3;
        } else if (current.isBelow(next)) { // Tail is facing down
            posX = 3;
            posY = 2;
        }
        this.drawSprite(posX, posY, current.x, current.y, this.snake.size);
    }

    drawBody(position) {
        var posX;
        var posY;
        var current = this.snake.tail[position];
        var next = this.snake.tail[position + 1];
        var previous = this.snake.tail[position - 1];
        if (next.x != current.x && current.x != previous.x) { // Horizontal
            posX = 1;
            posY = 0;
        } else if (next.y != current.y && current.y != previous.y) { // Vertical
            posX = 2;
            posY = 1;
        } else if ((current.isAbove(previous) && current.isLeftOf(next)) || (current.isAbove(next) && current.isLeftOf(previous))) { // Angle bottom-right
            posX = 0;
            posY = 0;
        } else if ((current.isBelow(previous) && current.isLeftOf(next)) || (current.isBelow(next) && current.isLeftOf(previous))) { // Angle top-right
            posX = 0;
            posY = 1;
        } else if ((current.isAbove(previous) && current.isRightOf(next)) || (current.isAbove(next) && current.isRightOf(previous))) { // Angle bottom-left
            posX = 2;
            posY = 0;
        } else if ((current.isBelow(previous) && current.isRightOf(next)) || (current.isBelow(next) && current.isRightOf(previous))) { // Angle top-left
            posX = 2;
            posY = 2;
        }
        this.drawSprite(posX, posY, current.x, current.y, this.snake.size);
    }

    drawSnake() {
        for (var i = 0; i < this.snake.length; i++) {
            if (i == this.snake.length - 1) {
                this.drawHead();
            } else if (i == 0) {
                this.drawTail();
            } else {
                this.drawBody(i);
            }
        }
    }

    drawSprite(spritePosX, spritePosY, posX, posY, size) {
        this.canvasContext.drawImage(this.spriteImage, spritePosX * Constants.SPRITE_PIXEL_SIZE, spritePosY * Constants.SPRITE_PIXEL_SIZE, Constants.SPRITE_PIXEL_SIZE, Constants.SPRITE_PIXEL_SIZE, posX, posY, size, size);
    }

    drawStartScreen() {
        this.createRect(0, 0, this.canvas.width, this.canvas.height, 'beige')
        this.canvasContext.font = '20px Arial';
        this.canvasContext.fillStyle = 'Black'
        this.canvasContext.textAlign = 'center';
        this.canvasContext.fillText('Snake', this.canvas.width / 2, this.canvas.height / 2)
        this.canvasContext.fillText('Press any key to start', this.canvas.width / 2, (this.canvas.height / 2) + 25)
        this.canvasContext.fillText('Press Escape or Spacebar to pause', this.canvas.width / 2, (this.canvas.height / 2) + 50)
        this.canvasContext.fillText('Press Enter to restart', this.canvas.width / 2, (this.canvas.height / 2) + 75)
    }

    drawScreen() {
        this.createRect(0, 0, this.canvas.width, this.canvas.height, 'beige')
        this.drawSnake();
        this.drawApple();
        this.canvasContext.font = '20px Arial';
        this.canvasContext.fillStyle = 'Black'
    }

    drawCurrentScore() {
        this.canvasContext.textAlign = 'end';
        this.canvasContext.fillText('Score: ' + this.score, this.canvas.width - 10, 18)
    }

    drawGame() {
        this.drawScreen();
        this.drawCurrentScore();
    }

    drawEnd() {
        this.drawScreen();
        this.canvasContext.textAlign = 'center';
        this.canvasContext.fillText('Game over. Final score: ' + this.score, this.canvas.width / 2, this.canvas.height / 2)
        this.canvasContext.fillText('Press Enter to restart', this.canvas.width / 2, (this.canvas.height / 2) + 25)
    }

    drawPaused() {
        this.drawScreen();
        this.drawCurrentScore();
        this.canvasContext.textAlign = 'center';
        this.canvasContext.fillText('Game paused', this.canvas.width / 2, this.canvas.height / 2)
        this.canvasContext.fillText('Press Escape or Spacebar to resume', this.canvas.width / 2, (this.canvas.height / 2) + 25)
        this.canvasContext.fillText('Press Enter to restart', this.canvas.width / 2, (this.canvas.height / 2) + 50)
    }

    get score() {
        return this.snake.length - 3; // Game starts with length 3
    }

    createRect(x, y, width, height, color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(x, y, width, height);
    }

    handleInput(event) {
        if (this.isStartScreen) {
            this.isStartScreen = false;
            this.newGame();
            return
        }
        if (this.isKeyEnter(event)) {
            this.newGame();
            return
        }
        if (this.hasLost) {
            return
        }
        if (this.isKeyEscape(event) || this.isKeySpace(event)) {
            this.isPaused = !this.isPaused;
            return;
        }
        if (!this.allowInput || this.isPaused) {
            return;
        }
        if (this.isKeyLeft(event) && this.snake.rotateX == 0) {
            this.snake.moveLeft();
            this.allowInput = false;
            return;
        }
        if (this.isKeyRight(event) && this.snake.rotateX == 0) {
            this.snake.moveRight();
            this.allowInput = false;
            return;
        }
        if (this.isKeyUp(event) && this.snake.rotateY == 0) {
            this.snake.moveUp();
            this.allowInput = false;
            return;
        }
        if (this.isKeyDown(event) && this.snake.rotateY == 0) {
            this.snake.moveDown();
            this.allowInput = false;
            return;
        }
    }

    isKeyDown(event) {
        return event.key == 'Down' || event.key == 'ArrowDown';
    }

    isKeyUp(event) {
        return event.key == 'Up' || event.key == 'ArrowUp';
    }

    isKeyLeft(event) {
        return event.key == 'Left' || event.key == 'ArrowLeft';
    }

    isKeyRight(event) {
        return event.key == 'Right' || event.key == 'ArrowRight';
    }

    isKeyEnter(event) {
        return event.key == 'Enter';
    }

    isKeyEscape(event) {
        return event.key == 'Esc' || event.key == 'Escape';
    }

    isKeySpace(event) {
        return event.key == ' ' || event.key == 'Spacebar';
    }
}