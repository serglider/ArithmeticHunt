function Game(generator) {

    let score = 0;
    let scoreText;
    let count = 0;

    this.over = false;

    this.onCorrect = () => {
        score++;
        count = 0;
        scoreText.setText(`SCORE: ${score}`);
        if (score === 20 || score === 30) {
            generator.levelUp();
        }
    };

    this.onFail = () => {
        this.over = true;
        scoreText.setText(`WRONG! SCORE: ${score}`);
    };

    this.reset = () => {
        score = 0;
        count = 0;
        scoreText.setText('SCORE: 0');
        this.over = false;
    };

    this.setScoreText = tf => {
        scoreText = tf;
        scoreText.setText('SCORE: 0');
    };

    this.tick = () => {
        count++;
        if (count === 700) { // 10 -12 seconds
            scoreText.setText(`TIME OUT! SCORE: ${score}`);
        } else if (count > 700) {
            this.over = true;
        }
    };
}
