class Apple {
    constructor(snake, canvas) {
        this.size = snake.size;
        var hasFoundEmptySpace = false
        while(!hasFoundEmptySpace) {
            hasFoundEmptySpace = this.findEmptySpace(snake, canvas);
        }
    }

    // TODO Refactor this, very slow when snake grows (and infinite loop once snake fills screen)
    findEmptySpace(snake, canvas) {
        this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
        this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
        for (var i = 0; i < snake.tail.length; i++) {
            if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                return false;
            }
        }
        return true;
    }
}