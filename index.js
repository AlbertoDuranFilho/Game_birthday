const chefinha = document.querySelector('.chefinha');
const barrel = document.querySelector('.barrel');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const timerDisplay = document.getElementById('timer');
const bgMusic = document.getElementById('bgMusic');

let gameStarted = false;
let timer = 0;
let interval;
let loop;
let barrelSpeed = 2.5;
 
const startGame = () => {
    if (gameStarted) return;

    gameStarted = true;
    startBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');
    barrel.style.animation = `barrel-animation ${barrelSpeed}s linear infinite`; // Barril só se move após começar
    bgMusic.play();

    timer = 0;
    timerDisplay.innerText = timer;
    barrelSpeed = 2.5;


    clearInterval(interval);
    clearInterval(loop);

    interval = setInterval(() => {
        timer++;
        timerDisplay.innerText = timer;

        // if (timer % 5 === 0 && barrelSpeed > 1) {
        //     barrelSpeed -= 0.2; // Diminui o tempo da animação (mais rápido)
        //     barrel.style.animation = `barrel-animation ${barrelSpeed}s linear infinite`;
        // }
    }, 1000);

    loop = setInterval(() => {
        const barrelPosition = barrel.offsetLeft;
        const chefinhaPosition = parseInt(window.getComputedStyle(chefinha).bottom.replace('px', ''));

        if (barrelPosition <= 160 && barrelPosition > 0 && chefinhaPosition < 50) {
            gameOver();
        }

        if ( barrelPosition <= 0) {
            console.log(barrelSpeed)

            increaseSpeed();
        }
    }, 10);
}

const increaseSpeed = () => {
    if (barrelSpeed > 1) {
        barrelSpeed -= 0.2; // Reduz a duração da animação para acelerar

        barrel.style.animation = 'none'; // Reseta a animação para evitar travamentos
        setTimeout(() => {
            barrel.style.animation = `barrel-animation ${barrelSpeed}s linear infinite`;
        }, 50);
    }
}

const gameOver = () => {
    clearInterval(loop);
    clearInterval(interval);
    barrel.style.animation = 'none'; // Para o barril
    barrel.style.right = '-30px'; // Reseta posição do barril
    
    gameStarted = false;
    bgMusic.pause();
    bgMusic.currentTime = 0;
    restartBtn.classList.remove('hidden');

    if (timer > 5) {
        showPDF();
    }
}

const restartGame = () => {
    gameStarted = false;
    timer = 0;
    timerDisplay.innerText = '0';
    startBtn.classList.remove('hidden');
    restartBtn.classList.add('hidden');
}


const showPDF = () => {
    document.getElementById("pdfModal").classList.remove("hidden");
}

const closePDF = () => {
    document.getElementById("pdfModal").classList.add("hidden");
}


const jump = () => {
    if(chefinha.classList != 'jump') {
        chefinha.classList.add('jump');
    }
    setTimeout(() => {
        chefinha.classList.remove('jump');
    }, 500);
}


document.addEventListener('keydown', jump);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);