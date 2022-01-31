class Snake {
    constructor(canvas) {
        this.size = canvas.width / 20;
        this.x = Math.floor(Math.random() * canvas.width / this.size) * this.size;
        this.y = Math.floor(Math.random() * canvas.height / this.size) * this.size;
        this.tail = [{
            x: this.x + this.size * 2,
            y: this.y,
        }, {
            x: this.x + this.size,
            y: this.y,
        }, {
            x: this.x,
            y: this.y
        }]
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        const newRect = {};
        if (this.rotateX == 1) {
            newRect.x = this.tail[this.tail.length - 1].x + this.size
            newRect.y = this.tail[this.tail.length - 1].y
        } else if (this.rotateX == -1) {
            newRect.x = this.tail[this.tail.length - 1].x - this.size
            newRect.y = this.tail[this.tail.length - 1].y
        } else if (this.rotateY == 1) {
            newRect.x = this.tail[this.tail.length - 1].x
            newRect.y = this.tail[this.tail.length - 1].y + this.size
        } else if (this.rotateY == -1) {
            newRect.x = this.tail[this.tail.length - 1].x
            newRect.y = this.tail[this.tail.length - 1].y - this.size
        }

        if (!this.shouldGrow) {
            this.tail.shift();
        }
        this.shouldGrow = false;
        this.tail.push(newRect);
    }

    grow() {
        this.shouldGrow = true;
    }
}