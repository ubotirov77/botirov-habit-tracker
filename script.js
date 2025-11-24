// Init 21 days
const totalDays = 21;
let completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];
let habits = JSON.parse(localStorage.getItem("habits21")) || [];
let reflections = JSON.parse(localStorage.getItem("reflections21")) || {};

const daysContainer = document.getElementById("days");
const habitsContainer = document.getElementById("habits");

/* -------------------------------
   RENDER 21 DAYS
--------------------------------*/
function renderDays() {
    daysContainer.innerHTML = "";

    for (let i = 1; i <= totalDays; i++) {
        const box = document.createElement("div");
        box.classList.add("day-box");
        box.textContent = "Day " + i;

        if (completedDays.includes(i)) {
            box.classList.add("completed");
        }

        box.onclick = () => toggleDay(i);

        daysContainer.appendChild(box);
    }

    updateProgress();
}

function toggleDay(i) {
    if (completedDays.includes(i)) {
        completedDays = completedDays.filter(d => d !== i);
    } else {
        completedDays.push(i);
    }

    localStorage.setItem("completedDays", JSON.stringify(completedDays));
    renderDays();
}

/* -------------------------------
   HABITS
--------------------------------*/
function renderHabits() {
    habitsContainer.innerHTML = "";

    habits.forEach((habit, index) => {
        const item = document.createElement("div");
        item.classList.add("habit-item");

        item.innerHTML = `
            <span>${habit}</span>
            <button onclick="deleteHabit(${index})">✕</button>
        `;

        habitsContainer.appendChild(item);
    });

    localStorage.setItem("habits21", JSON.stringify(habits));
}

function addHabit() {
    const input = document.getElementById("habit-input");
    const value = input.value.trim();
    if (!value) return;

    habits.push(value);
    input.value = "";
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    renderHabits();
}

/* -------------------------------
   REFLECTION
--------------------------------*/
function saveReflection() {
    const today = new Date().toLocaleDateString();
    const text = document.getElementById("reflection").value;

    reflections[today] = text;
    localStorage.setItem("reflections21", JSON.stringify(reflections));

    alert("Reflection saved.");
}

/* -------------------------------
   PROGRESS BAR
--------------------------------*/
function updateProgress() {
    const percent = Math.floor((completedDays.length / totalDays) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").textContent = percent + "% Done";
}

/* -------------------------------
   AI SUGGESTION (OFFLINE)
--------------------------------*/
function generateAISuggestion() {
    const messages = [
        "Discipline isn't a mood. It's a choice. Make it again today.",
        "You want a different life? Then stop acting like the old version.",
        "If you're tired, do it tired. Weakness hates action.",
        "Today is a brick. Lay it clean. Lay it strong.",
        "Don't aim for motivation. Aim for execution."
    ];

    const output = document.getElementById("ai-output");
    output.textContent = messages[Math.floor(Math.random() * messages.length)];
}

/* -------------------------------
   INIT
--------------------------------*/
renderDays();
renderHabits();
generateAISuggestion();