const hoursDigits = document.querySelectorAll('#hours .digit');
const minutesDigits = document.querySelectorAll('#minutes .digit');
const flipClock = document.querySelector('.flip-clock');
let use24HourClock = true;

// Função para obter o fuso horário com base no IP do usuário
async function getCurrentTimezoneByIp() {
    const api = "https://worldtimeapi.org/api/ip";
    let timezone;
    try {
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const jsonData = await response.json();
        timezone = jsonData.timezone;
    } catch (error) {
        console.error("Error fetching time:", error);
    }
    return timezone;
}

// Função para ajustar o fuso horário
function changeTimezone(date, ianatz) {
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    var diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
}

// Função para formatar a hora com dois dígitos
function padClock(p, n) {
    return p + ('0' + n).slice(-2);
}

// Função para atualizar o relógio
async function updateClock() {
    const timezone = await getCurrentTimezoneByIp();
    const now = new Date();
    const adjustedDate = changeTimezone(now, timezone);

    let hours = adjustedDate.getHours();
    if (!use24HourClock) {
        hours = hours % 12 || 12; // Converte para formato 12h
    }

    const minutes = adjustedDate.getMinutes();

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
updateClock();

// Adiciona suporte para alternar entre 12h e 24h
const toggle12h24h = document.getElementById("toggle12h");
if (toggle12h24h) {
    toggle12h24h.addEventListener("click", () => {
        use24HourClock = !use24HourClock;
        toggle12h24h.innerHTML = use24HourClock ? "Toggle 24h" : "Toggle 12h";
        updateClock();
    });
}