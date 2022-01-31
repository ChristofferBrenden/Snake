var myGame;

window.onload = () => {
    myGame = new Game();
};

window.addEventListener("keydown", (event) => {
    myGame.handleInput(event);
});