function BallManager(world, generator, BallClass) {

    this.start = () => {
        world.addCallback(onTick);
    };

    function onTick(n) {
        if (n < 7) createBall();
    }

    function createBall() {
        const id = getRandomID();
        const expression = generator.getExpression(Math.random() > 0.5);
        const ball = new BallClass(id, expression);
        world.spawn(ball);
    }

    function getRandomID() {
        const letters = '0123456789ABCDEF';
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += letters[Math.floor(Math.random() * 16)];
        }
        return id;
    }
}
