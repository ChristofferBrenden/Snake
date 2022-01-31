class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.size = this.canvas.width / 20;
        this.x = Math.floor(Math.random() * this.canvas.width / this.size) * this.size;
        this.y = Math.floor(Math.random() * this.canvas.height / this.size) * this.size;
        this.tail = [
            this.createTail((this.x + this.size * 2), this.y),
            this.createTail((this.x + this.size), this.y),
            this.createTail(this.x, this.y),
        ];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        let x = this.head.x + (this.rotateX * this.size);
        let y = this.head.y + (this.rotateY * this.size);

        if (!this.shouldGrow) {
            this.tail.shift();
        }
        this.shouldGrow = false;
        this.tail.push(this.createTail(x, y));
    }

    createTail(x, y) {
        return new Tail(x, y, this.size, this.canvas);
    }

    get head() {
        return this.tail[this.tail.length - 1];
    }

    get length() {
        return this.tail.length;
    }

    grow() {
        this.shouldGrow = true;
    }

    moveLeft() {
        this.rotateX = -1;
        this.rotateY = 0;
    }

    moveRight() {
        this.rotateX = 1;
        this.rotateY = 0;
    }

    moveUp() {
        this.rotateX = 0;
        this.rotateY = -1;
    }

    moveDown() {
        this.rotateX = 0;
        this.rotateY = 1;
    }
}