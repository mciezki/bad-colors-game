//BUTTONS:
const startBtn = document.querySelector('.playbtn');
const manualBtn = document.querySelector('.manualbtn');
const exit = document.querySelector('.minside .exit');
const summaryExit = document.querySelector('.sinside .exit');

//SECTIONS:
const header = document.querySelector('.header');
const start = document.querySelector('.start');
const manual = document.querySelector('.manual');
const counterStart = document.querySelector('.counter');
const counterCounting = document.querySelector('.counting');
const gamePlace = document.querySelector('.game');
const summaryPlace = document.querySelector('.summary');

//GAME PANEL:
const squares = document.querySelectorAll('.container div');
const firstSquare = document.querySelector('#one');
const secondSquare = document.querySelector('#two');
const colorText = document.querySelector('#colortext');

//SUMMARY TEXT:
const win = document.querySelector('.wins span');
const loose = document.querySelector('.looses span');
const avoid = document.querySelector('.avoid span');
const point = document.querySelector('.points span');



//MANUAL:
manualBtn.addEventListener('click', () => {
    header.classList.add('blur');
    start.classList.add('blur');
    manual.style.display = 'block';
})

exit.addEventListener('click', () => {
    header.classList.remove('blur');
    start.classList.remove('blur');
    manual.style.display = 'none';
})

//GAME:
//GAME CLASSES:
class Colors {
    constructor(good, bad, subtitle) {
        this.good = good;
        this.bad = bad;
        this.subtitle = subtitle;
    }
    appendColors = () => {
        const colorContent = [firstSquare, secondSquare];
        const index = Math.floor(Math.random() * colorContent.length);
        colorContent[index].style.backgroundColor = this.good;
        colorContent[index].className = this.good;
        colorContent.splice(index, 1);
        colorContent[0].style.backgroundColor = this.bad;
        colorText.textContent = this.subtitle;
        colorText.className = this.good;
        colorText.style.color = this.bad;
    }
}

//COLOR OBJECTS:
const red = new Colors('red', 'purple', 'czerwony');
const purple = new Colors('purple', 'pink', 'fioletowy');
const yellow = new Colors('yellow', 'green', 'żółty');
const green = new Colors('green', 'yellow', 'zielony');
const blue = new Colors('blue', 'purple', 'niebieski');
const pink = new Colors('pink', 'yellow', 'różowy');
const black = new Colors('orange', 'yellow', 'pomarańczowy');
const orange = new Colors('orange', 'red', 'pomarańczowy');
const gray = new Colors('blue', 'green', 'niebieski');
const brown = new Colors('brown', 'purple', 'brązowy');

//VARIABLES:
let blockade = 0;

//SUMMARY OBJECTS:
const summary = {
    wins: 0,
    looses: 0,
    points: 0,
}

//GAME FUNCTIONS:
//COUNTING TO START:
const startCounting = () => {
    start.style.display = 'none';
    counterStart.style.display = 'block';
    let startCounter = 5;
    counterCounting.textContent = startCounter;
    let interval = setInterval(() => {
        startCounter--;
        if (startCounter === 0) {
            clearInterval(interval);
        }
        counterCounting.textContent = startCounter;
    }, 1000);

}

//CLEANING SHADOWBOX:
const cleanShadowBox = () => {
    squares.forEach(square => {
        square.style.boxShadow = '';
    })
}

//RANDOM SQUARES:
const randomSquare = () => {
    const listOfColors = [red, purple, yellow, green, blue, pink, black, orange, gray, brown];
    let checker = 0;
    counterStart.style.display = 'none';
    gamePlace.style.display = 'block';
    const index = Math.floor(Math.random() * listOfColors.length)
    listOfColors[index].appendColors();
    listOfColors.splice(index, 1);
    ++checker;
    blockade = 0;
    setInterval(() => {
        if (checker === 10) return;
        cleanShadowBox()
        const index = Math.floor(Math.random() * listOfColors.length)
        listOfColors[index].appendColors();
        listOfColors.splice(index, 1);
        ++checker;
        blockade = 0;
    }, 2000);
}

//PLAYER SELECT:
const playerChoice = (e) => {
    cleanShadowBox();
    e.target.style.boxShadow = '0 0 2px 4px silver';
    if (blockade === 0) {
        if (e.target.className === colorText.className) {
            ++summary.wins;
            ++summary.points;
        } else {
            ++summary.looses;
            --summary.points;
        }
    }
    ++blockade;
}

//SUMMARY PANEL:
const showSummary = () => {
    header.classList.add('blur');
    gamePlace.classList.add('blur');
    summaryPlace.style.display = 'block';
    win.textContent = summary.wins;
    loose.textContent = summary.looses;
    avoid.textContent = `${10 - (summary.wins + summary.looses)}`;
    point.textContent = summary.points;
}

//GAME RUNNER:
const gameRunner = () => {
    startCounting();
    setTimeout(randomSquare, 5000);
    setTimeout(showSummary, 26000);
}

//RESET TO DEFAULT
const resetGame = () => {
    header.classList.remove('blur');
    gamePlace.classList.remove('blur');
    summaryPlace.style.display = 'none';
    gamePlace.style.display = 'none';
    start.style.display = 'block';
    blockade = 0;
    checker = 0;
    summary.wins = 0;
    summary.looses = 0;
    summary.points = 0;
    colorText.className = '';
    colorText.textContent = '';
    firstSquare.className = '';
    secondSquare.className = '';
    firstSquare.style.backgroundColor = 'transparent';
    secondSquare.style.backgroundColor = 'transparent';
    cleanShadowBox();
}

//GAME ADDEVENTLISTENER:
startBtn.addEventListener('click', gameRunner);

//COLOR SELECT LISTENER:
squares.forEach(square => square.addEventListener('click', playerChoice));

//SUMMARY EXIT:
summaryExit.addEventListener('click', resetGame);