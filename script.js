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

// Inicializa o relógio na primeira carga
updateClock();