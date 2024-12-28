/* script.js */
const hoursDigits = document.querySelectorAll('#hours .digit');
const minutesDigits = document.querySelectorAll('#minutes .digit');
const flipClock = document.querySelector('.flip-clock');

function updateClock() {
    const now = new Date();
    let hours = now.getHours() - 3; // Subtrai 3 horas
    let minutes = now.getMinutes();

    // Ajusta as horas se forem negativas
    if (hours < 0) {
        hours += 24;
    }

    // Formata as horas e minutos para ter sempre dois dígitos
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Atualiza os dígitos das horas
    hoursDigits[0].textContent = formattedHours[0];
    hoursDigits[1].textContent = formattedHours[1];

    // Atualiza os dígitos dos minutos
    minutesDigits[0].textContent = formattedMinutes[0];
    minutesDigits[1].textContent = formattedMinutes[1];
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

function preventScreenOff() {
    const dummyElement = document.createElement('div');
    dummyElement.style.position = 'absolute';
    dummyElement.style.width = '1px';
    dummyElement.style.height = '1px';
    dummyElement.style.opacity = '0';
    document.body.appendChild(dummyElement);

    setInterval(() => {
        dummyElement.textContent = new Date().getTime(); // Atualiza o conteúdo periodicamente
    }, 30000); // Intervalo de 30 segundos
}

function simulateInteraction() {
    const clockContainer = document.querySelector('.container');
    let isDimmed = false;

    setInterval(() => {
        clockContainer.style.opacity = isDimmed ? '1' : '0.99';
        isDimmed = !isDimmed;
    }, 10000); // Alterna opacidade a cada 10 segundos
}

function keepScreenAwake() {
    setInterval(() => {
        fetch('https://www.google.com/'); // Substitua por uma URL válida, se necessário
    }, 10000); // Requisição a cada 10 segundos
}

updateClock();
preventScreenOff();
simulateInteraction();
//keepScreenAwake();
