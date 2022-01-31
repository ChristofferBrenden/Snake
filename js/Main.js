window.onload = () => {
    var game = new Game();

    window.addEventListener("keydown", (event) => {
        game.handleInput(event);
    });
};