const generator = new Generator();
const game = new Game(generator, Ball);
const world = new World();
const player = new Player(game, world.centerX, world.centerY);

const scoreText = new Textfield({
    x: world.centerX,
    y: world.height - 30,
    color: '#fff',
    fontSize: 36
});
const timerText = new Textfield({
    x: world.width - 30,
    y: world.height - 30,
    color: '#fff',
    fontSize: 36,
    text: '12'
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

game.setTextfields(scoreText, timerText);
game.start(world);
init();

function init() {
    generator.reset();
    player.reset();
    game.reset();
    world.reset();
    world.spawn(player);
    world.spawn(toolbar);
    world.spawn(scoreText);
    world.spawn(timerText);
}
