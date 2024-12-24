const daysContainer = document.getElementById("days");
const monthYearDisplay = document.getElementById("monthYear");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Recupera os dias marcados do LocalStorage
function getMarkedDays(year, month) {
  const savedDays = JSON.parse(localStorage.getItem("markedDays")) || {};
  const key = `${year}-${month}`;
  return savedDays[key] || [];
}

// Salva os dias marcados no LocalStorage
function saveMarkedDays(year, month, markedDays) {
  const savedDays = JSON.parse(localStorage.getItem("markedDays")) || {};
  const key = `${year}-${month}`;
  savedDays[key] = markedDays;
  localStorage.setItem("markedDays", JSON.stringify(savedDays));
}

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Atualiza o título com o mês e o ano
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  monthYearDisplay.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

  // Limpa os dias anteriores
  daysContainer.innerHTML = "";

  // Carrega os dias marcados para o mês atual
  const markedDays = getMarkedDays(year, month);

  // Adiciona espaços vazios para os dias antes do primeiro dia do mês
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  // Adiciona os dias do mês
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.classList.add("day");

    // Marca os dias já salvos no LocalStorage
    if (markedDays.includes(i)) {
      dayDiv.classList.add("marked");
    }

    // Marca ou desmarca o dia quando clicado
    dayDiv.addEventListener("click", () => {
      dayDiv.classList.toggle("marked");

      // Atualiza os dias marcados no LocalStorage
      const updatedMarkedDays = Array.from(document.querySelectorAll(".day.marked")).map((d) =>
        parseInt(d.textContent)
      );
      saveMarkedDays(year, month, updatedMarkedDays);
    });

    daysContainer.appendChild(dayDiv);
  }
}

// Navega para o mês anterior
prevButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

// Navega para o próximo mês
nextButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Renderiza o calendário inicial
renderCalendar(currentMonth, currentYear);