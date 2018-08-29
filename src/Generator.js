function Generator() {

    const actions = {
        add,
        substract,
        addSign: '+',
        substractSign: '-'
    };
    const complexityLevels = [
        [1, 1],
        [2, 1],
        [2, 2],
    ];
    let complexity = 0;
    let currentLevels = [complexityLevels[complexity]];

    this.getExpression = isCorrect => {
        const arr = getRandomItem(currentLevels);
        return generateExpression(arr, isCorrect);
    };

    this.levelUp = () => {
        complexity++;
        if (complexityLevels[complexity]) {
            currentLevels.push(complexityLevels[complexity]);
        }
    };

    this.reset = () => {
        complexity = 0;
        currentLevels = [complexityLevels[complexity]];
    };

    function generateExpression(arr, isCorrect) {
        const a = generateNumber(arr[0]);
        const b = generateNumber(arr[1]);

        const action = generateAction();
        const actionSign = actions[`${action}Sign`];
        const actual = actions[action](+a, +b);
        const shown = isCorrect ? actual : getWrong(actual);
        const expression = `${a} ${actionSign} ${b} = ${shown}`;
        return {
            complexity,
            isCorrect,
            actual,
            expression
        };
    }

    function getWrong(base) {
        let result;
        const up = Math.round(Math.random());
        if (base < 10) {
            result = up ? base + 1 : base - 1;
        } else {
            result = up ? Math.ceil(base * 1.04) : Math.floor(base * .98);
        }
        return result;
    }

    function generateAction() {
        return Math.random() > 0.5 ? 'add' : 'substract';
    }

    function generateNumber(length = 1) {
        return Array.from({length}, (_, i) => !i ? random(i) : random()).join('');
    }

    function random(zero) {
        let n = Math.floor(Math.random() * 10);
        while (n === zero) n = Math.floor(Math.random() * 10);
        return n.toString();
    }

    function add(a, b) {
        return a + b;
    }

    function substract(a, b) {
        return a - b;
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

}