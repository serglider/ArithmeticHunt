const generator = new Generator();
const game = new Game(generator);
const world = new World(game);
const ballManager = new BallManager(world, generator, Ball);
const player = new Player(game, world.centerX, world.centerY);

const scoreText = new Textfield({
    x: world.centerX,
    y: world.height - 30,
    color: '#fff',
    fontSize: 36
});

const toolbar = new Rect({
    x: 0,
    y: world.height - 60,
    w: world.width,
    h: 60,
    color: 'rgba(0,0,0,0.5)'
});

window.onkeypress = e => {
    if (!game.over && e.keyCode !== 32) return;
    init();
};

game.setScoreText(scoreText);
init();

function init() {
    player.reset();
    game.reset();
    world.reset();
    world.spawn(player);
    world.spawn(toolbar);
    world.spawn(scoreText);
    ballManager.start();
}