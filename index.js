// toogle heading on screen center to current time
const heading = document.getElementById("container-heading");
const originalText = heading.textContent;
let showingTime = false;

heading.addEventListener("click", () => {
    if (showingTime) {
        heading.textContent = originalText;
    } else {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
        const time = `${hours}:${minutes} ${ampm}`;
        heading.textContent = time;
    }
    showingTime = !showingTime;
});

// show date on header left corner
const dateElement = document.getElementById("header-date");
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = now.toLocaleDateString('en-US', options);
dateElement.textContent = formattedDate;

// searchbar search on google
const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const query = searchbar.value.trim();
        if (query !== "") {
            const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(url, '_blank'); // open in new tab
            searchbar.value = ""; // clear input
        }
    }
});




const input = document.getElementById("todo-list-input");
const list = document.getElementById("todo-list");

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

// Add new task on Enter
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText, false);
            saveTasksToStorage();
            input.value = "";
        }
    }
});

// Add task to DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;
    li.style.cursor = "pointer";
    if (completed) {
        li.style.textDecoration = "line-through";
    }

    // Toggle line-through on click
    li.addEventListener("click", () => {
        li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
        saveTasksToStorage();
    });

    // Remove on double-click
    li.addEventListener("dblclick", () => {
        li.remove();
        saveTasksToStorage();
    });

    list.appendChild(li);
}

// Save current tasks to localStorage
function saveTasksToStorage() {
    const tasks = [];
    list.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
