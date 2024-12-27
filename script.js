/* script.js */
const hoursDigits = document.querySelectorAll('#hours .digit');
const minutesDigits = document.querySelectorAll('#minutes .digit');

async function fetchTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
        const data = await response.json();
        
        const utcDatetime = data.utc_datetime; // UTC datetime como base
        const utcOffset = data.utc_offset; // Deslocamento UTC no formato "+HH:MM" ou "-HH:MM"

        // Converte UTC datetime para um objeto Date
        const utcDate = new Date(utcDatetime);

        // Extrai o deslocamento em horas e minutos
        const offsetSign = utcOffset[0]; // "+" ou "-"
        const offsetHours = parseInt(utcOffset.slice(1, 3), 10); // HH
        const offsetMinutes = parseInt(utcOffset.slice(4, 6), 10); // MM

        // Calcula o deslocamento total em milissegundos
        const totalOffsetMs = (offsetHours * 60 + offsetMinutes) * 60 * 1000;
        const adjustedTime = offsetSign === "+" ? utcDate.getTime() + totalOffsetMs : utcDate.getTime() - totalOffsetMs;

        // Cria um novo objeto Date ajustado
        const localDate = new Date(adjustedTime);

        // Extrai horas e minutos do horário local ajustado
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');

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
