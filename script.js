/* script.js */
const hoursDigits = document.querySelectorAll('#hours .digit');
const minutesDigits = document.querySelectorAll('#minutes .digit');

async function fetchTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        const datetime = new Date(data.datetime); // Usa o campo "datetime" do JSON

        const hours = String(datetime.getHours()).padStart(2, '0');
        const minutes = String(datetime.getMinutes()).padStart(2, '0');

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
