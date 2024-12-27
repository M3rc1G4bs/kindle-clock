/* script.js */
const hoursDigits = document.querySelectorAll('#hours .digit');
const minutesDigits = document.querySelectorAll('#minutes .digit');

async function fetchTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        const datetime = data.datetime; // String completa do campo "datetime"

        // Extração direta da hora e minutos a partir da string
        const time = datetime.split('T')[1].split(':'); // Separa a parte do tempo
        const hours = time[0]; // Horas
        const minutes = time[1]; // Minutos

        // Atualiza os dígitos das horas
        hoursDigits[0].textContent = hours[0];
        hoursDigits[1].textContent = hours[1];

        // Atualiza os dígitos dos minutos
        minutesDigits[0].textContent = minutes[0];
        minutesDigits[1].textContent = minutes[1];
    } catch (error) {
        console.error('Erro ao buscar a hora:', error);
    }
}

// Atualiza o relógio a cada minuto
setInterval(fetchTime, 60000);

// Inicializa o relógio na primeira carga
fetchTime();
