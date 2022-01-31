function runTestDrawBody() {
    // Horizontal
    console.log(testDrawBody(20, 100, 40, 100, 60, 100) == 1);
    console.log(testDrawBody(60, 100, 40, 100, 20, 100) == 1);

    console.log(testDrawBody(40, 100, 20, 100, 0, 100) == 1);
    console.log(testDrawBody(20, 100, 0, 100, 380, 100) == 1);

    console.log(testDrawBody(360, 100, 380, 100, 0, 100) == 1);
    console.log(testDrawBody(380, 100, 0, 100, 20, 100) == 1);

    // Vertical
    console.log(testDrawBody(100, 20, 100, 40, 100, 60) == 2);
    console.log(testDrawBody(100, 60, 100, 40, 100, 20) == 2);

    console.log(testDrawBody(100, 40, 100, 20, 100, 0) == 2);
    console.log(testDrawBody(100, 20, 100, 0, 100, 380) == 2);

    console.log(testDrawBody(100, 360, 100, 380, 100, 0) == 2);
    console.log(testDrawBody(100, 380, 100, 0, 100, 20) == 2);

    // Angle bottom-right
    console.log(testDrawBody(40, 100, 20, 100, 20, 120) == 3);
    console.log(testDrawBody(20, 120, 20, 100, 40, 100) == 3);

    console.log(testDrawBody(20, 0, 20, 380, 40, 380) == 3);
    console.log(testDrawBody(0, 20, 380, 20, 380, 40) == 3);

    console.log(testDrawBody(120, 380, 100, 380, 100, 0) == 3); // ??

    console.log(testDrawBody(380, 0, 380, 380, 0, 380) == 3);
    console.log(testDrawBody(0, 380, 380, 380, 380, 0) == 3);

    // Angle top-right
    console.log(testDrawBody(20, 100, 20, 120, 40, 120) == 4);
    console.log(testDrawBody(40, 120, 20, 120, 20, 100) == 4);

    console.log(testDrawBody(20, 380, 20, 0, 40, 0) == 4);
    console.log(testDrawBody(0, 40, 380, 40, 380, 20) == 4);

    console.log(testDrawBody(120, 0, 100, 0, 100, 380) == 4); // TODO edge

    console.log(testDrawBody(380, 380, 380, 0, 0, 0) == 4);
    console.log(testDrawBody(0, 0, 380, 0, 380, 380) == 4);

    // Angle bottom-left
    console.log(testDrawBody(20, 100, 40, 100, 40, 120) == 5);
    console.log(testDrawBody(40, 120, 40, 100, 20, 100) == 5);

    console.log(testDrawBody(40, 0, 40, 380, 20, 380) == 5);
    console.log(testDrawBody(380, 20, 0, 20, 0, 40) == 5);

    console.log(testDrawBody(380, 380, 0, 380, 0, 0) == 5);
    console.log(testDrawBody(0, 0, 0, 380, 380, 380) == 5);

    // Angle top-left
    console.log(testDrawBody(40, 100, 40, 120, 20, 120) == 6);
    console.log(testDrawBody(20, 120, 40, 120, 40, 100) == 6);

    console.log(testDrawBody(40, 380, 40, 0, 20, 0) == 6);
    console.log(testDrawBody(380, 40, 0, 40, 0, 20) == 6);

    console.log(testDrawBody(100, 0, 120, 0, 120, 380) == 6);

    console.log(testDrawBody(380, 0, 0, 0, 0, 380) == 6);
    console.log(testDrawBody(0, 380, 0, 0, 380, 0) == 6);
}

function testDrawBody(prevX, prevY, currX, currY, nextX, nextY) {
    const maxX = 380;
    const maxY = 380;
    if (nextX != currX && currX != prevX) { // Horizontal
        return 1
    } else if (nextY != currY && currY != prevY) { // Vertical
        return 2
    } else if ((((nextX > currX && !(nextX == maxX && currX == 0)) || (nextX == 0 && currX == maxX)) && ((prevY > currY && !(currY == 0 && prevY == maxY)) || (currY == maxY && prevY == 0))) || (((prevX > currX && !(prevX == maxX && currX == 0)) || (currX == maxX && prevX == 0)) && ((nextY > currY && !(nextY == maxY && currY == 0)) || (nextY == 0 && currY == maxY)))) { // Angle bottom-right
        return 3
    } else if ((((nextX > currX && !(nextX == maxX && currX == 0)) || (nextX == 0 && currX == maxX)) && (prevY < currY || (currY == 0 && prevY == maxY))) || (((prevX > currX && !(currX == 0 && prevX == maxX)) || (currX == maxX && prevX == 0)) && (nextY < currY || (nextY == maxY && currY == 0)))) { // Angle top-right
        return 4
    } else if (((nextX < currX || (nextX == maxX && currX == 0)) && ((prevY > currY && !(currY == 0 && prevY == maxY)) || (currY == maxY && prevY == 0))) || ((prevX < currX || (prevX == maxX && currX == 0)) && ((nextY > currY && !(nextY == maxY && currY == 0)) || (nextY == 0 && currY == maxY)))) { // Angle bottom-left
        return 5
    } else if (((nextX < currX || (nextX == maxX && currX == 0)) && (prevY < currY || (prevY == maxY && currY == 0))) || ((prevX < currX || (prevX == maxX && currX == 0)) && (nextY < currY || (nextY == maxY && currY == 0)))) { // Angle top-left
        return 6
    }
}