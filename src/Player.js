function Player(game, x, y) {

    this.x = x;
    this.y = y;
    this.r = 50;
    this.id = 'player';
    this.c1 = 'red';
    this.c2 = 'green';
    this.isAlive = true;
    let isInit = false;
    this.data = {
      isCorrect: null
    };
    let ctx = null;
    let bounds = null;
    const PI2 = 2 * Math.PI;

    this.render = () => {
        if (!isInit) return;
        ctx.fillStyle = this.c1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, PI2);
        ctx.fill();
        ctx.fillStyle = this.c2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.9, 0, PI2);
        ctx.fill();
    };

    this.reset = () => {
        this.c1 = 'red';
        this.c2 = 'green';
        this.isAlive = true;
        let isInit = false;
    };

    this.bump = (a, b, c, isCorrect) => {
        if (isCorrect) {
            this.c1 = 'green';
            game.onCorrect();
            setTimeout(() => {
                this.c1 = 'red';
            }, 500);
        }else {
            this.c2 = 'red';
            game.onFail();
        }
    };

    this.setData = data => {
        ctx = data.ctx;
        bounds = data.bounds;
        ctx.canvas.addEventListener('mousemove', e => {
            if (game.over) return;
            isInit = true;
            const {x, y} = getMousePosition(ctx.canvas, e);
            this.x = x;
            this.y = y;
        });
    };

    function getMousePosition(c, e) {
        const bcr = c.getBoundingClientRect();
        return {
            x: e.pageX - bcr.left,
            y: e.pageY - bcr.top
        };
    }

    this.update = () => {
    };

    this.intersects = other => {
        if (!isInit) return false;
        const d = dist(this, other);
        return d < this.r + other.r;
    };

    function dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
}