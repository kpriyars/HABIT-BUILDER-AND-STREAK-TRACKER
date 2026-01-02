const habitInput = document.getElementById('habit-name');
const addBtn = document.getElementById('add-habit-btn');
const habitList = document.getElementById('habit-list');

// Load habits from LocalStorage 
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveAndRender() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const card = document.createElement('div');
        card.className = 'habit-card';
        card.innerHTML = `
            <div>
                <h3 style="margin-bottom: 5px;">${habit.name}</h3>
                <span class="streak-badge">${habit.streak} DAY STREAK</span>
            </div>
            <button class="done-btn" onclick="completeHabit(${index})">DONE</button>
        `;
        habitList.appendChild(card);
    });
}

window.completeHabit = function(index) {
    habits[index].streak += 1;
    saveAndRender();
}

addBtn.addEventListener('click', () => {
    const val = habitInput.value.trim();
    if (val) {
        habits.push({ name: val, streak: 0 });
        habitInput.value = '';
        saveAndRender();
    }
});

renderHabits();
