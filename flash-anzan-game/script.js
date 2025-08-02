document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('number-display');
    const startButton = document.getElementById('start-button');
    const resultElement = document.getElementById('result');
    const nextButton = document.getElementById('next-button');
    const inputArea = document.getElementById('input-area');
    const answerDisplay = document.getElementById('answer-display');
    const keypad = document.getElementById('keypad');

    let sum = 0;
    let numbers = [];
    let userAnswer = '';
    const numberOfDigits = 3; // 表示する数字の個数
    const intervalTime = 1000; // 数字が切り替わる間隔（ミリ秒）
    const displayTime = 700; // 数字が表示されている時間（ミリ秒）

    function startGame() {
        startButton.style.display = 'none';
        resultElement.textContent = '';
        nextButton.style.display = 'none';
        sum = 0;
        numbers = [];
        userAnswer = '';
        answerDisplay.textContent = '';

        // Generate numbers
        for (let i = 0; i < numberOfDigits; i++) {
            const num = Math.floor(Math.random() * 9) + 1; // 1-9の数字
            numbers.push(num);
            sum += num;
        }

        // Display numbers with a blink effect
        function displaySequentially(index) {
            if (index >= numbers.length) {
                inputArea.style.display = 'flex';
                return;
            }

            // Show number
            numberDisplay.textContent = numbers[index];

            // Hide number after displayTime
            setTimeout(() => {
                numberDisplay.textContent = '';
                
                // Call next number after the rest of the interval
                setTimeout(() => {
                    displaySequentially(index + 1);
                }, intervalTime - displayTime);

            }, displayTime);
        }

        displaySequentially(0);
    }

    function checkAnswer() {
        const userAnswerInt = parseInt(userAnswer, 10);
        if (userAnswerInt === sum) {
            resultElement.textContent = 'せいかい！';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = `まちがい... こたえは ${sum}`;
            resultElement.style.color = 'red';
        }
        inputArea.style.display = 'none';
        nextButton.style.display = 'block';
    }

    function handleKeyPress(e) {
        if (e.target.matches('.number')) {
            userAnswer += e.target.textContent;
            answerDisplay.textContent = userAnswer;
        } else if (e.target.matches('.clear')) {
            userAnswer = '';
            answerDisplay.textContent = userAnswer;
        } else if (e.target.matches('.check')) {
            if (userAnswer !== '') {
                checkAnswer();
            }
        }
    }

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        startGame();
    });
    keypad.addEventListener('click', handleKeyPress);
});
