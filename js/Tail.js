class Tail {
    constructor(x, y, size, canvas) {
        this.x = x; // 260
        this.y = y; // 120
        this.maxX = canvas.width - size; // 380
        this.maxY = canvas.height - size; // 380
    }

    isLeftOf(other) {
        if (this.x == 0 && other.x == this.maxX) {
            return false;
        }
        if (this.x == this.maxX && other.x == 0) {
            return true;
        }
        return this.x < other.x;
    }

    isRightOf(other) {
        if (this.x == this.maxX && other.x == 0) {
            return false;
        }
        if (this.x == 0 && other.x == this.maxX) {
            return true;
        }
        return this.x > other.x;
    }

    isAbove(other) {
        if (this.y == 0 && other.y == this.maxY) {
            return false;
        }
        if (this.y == this.maxY && other.y == 0) {
            return true;
        }
        return this.y < other.y;
    }

    isBelow(other) {
        if (this.y == this.maxY && other.y == 0) {
            return false;
        }
        if (this.y == 0 && other.y == this.maxY) {
            return true;
        }
        return this.y > other.y;
    }
}