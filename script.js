document.addEventListener('DOMContentLoaded', function () {
    // Laad opgeslagen taken bij het laden van de pagina
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var task = taskInput.value.trim();

    if (task !== '') {
        // Haal de bestaande taken op
        var tasks = getTasks();

        // Voeg de nieuwe taak toe aan de lijst
        tasks.push(task);

        // Bewaar de taken in de lokale opslag
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Laad de taken opnieuw in
        loadTasks();

        // Wis het invoerveld
        taskInput.value = '';
    }
}

function loadTasks() {
    var tasks = getTasks();
    var tasksList = document.getElementById('tasks');

    // Wis de huidige takenlijst
    tasksList.innerHTML = '';

    // Voeg elke taak toe aan de lijst
    tasks.forEach(function (task, index) {
        var li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(${index})">Verwijder</button>
        `;
        tasksList.appendChild(li);
    });
}

function removeTask(index) {
    var tasks = getTasks();

    // Verwijder de geselecteerde taak
    tasks.splice(index, 1);

    // Bewaar de bijgewerkte takenlijst in de lokale opslag
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Laad de takenlijst opnieuw in
    loadTasks();
}

function getTasks() {
    // Haal de opgeslagen taken op uit de lokale opslag
    var tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}
