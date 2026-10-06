let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Get elements

const addTaskBtn = document.getElementById("addTaskBtn");
const modal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");


// Open Add Task popup

addTaskBtn.addEventListener("click", function () {

    modal.style.display = "flex";

});


// Close popup

closeModal.addEventListener("click", function () {

    modal.style.display = "none";

});


// Close popup when clicking outside

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


// Add new task

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const title =
        document.getElementById("taskTitle").value;

    const member =
        document.getElementById("taskMember").value;

    const priority =
        document.getElementById("taskPriority").value;

    const status =
        document.getElementById("taskStatus").value;


    const task = {

        id: Date.now(),

        title: title,

        member: member,

        priority: priority,

        status: status

    };


    tasks.push(task);


    saveTasks();


    taskForm.reset();


    modal.style.display = "none";


    displayTasks();

});


// Save tasks in browser

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Display tasks

function displayTasks() {

    const todoList =
        document.getElementById("todoList");

    const progressList =
        document.getElementById("progressList");

    const completedList =
        document.getElementById("completedList");


    todoList.innerHTML = "";

    progressList.innerHTML = "";

    completedList.innerHTML = "";


    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const memberFilter =
        document.getElementById("filterMember").value;


    const filteredTasks = tasks.filter(function (task) {

        const matchesSearch =
            task.title
            .toLowerCase()
            .includes(search);


        const matchesMember =
            memberFilter === "all" ||
            task.member === memberFilter;


        return matchesSearch && matchesMember;

    });


    filteredTasks.forEach(function (task) {

        const taskElement =
            document.createElement("div");


        taskElement.className = "task";


        taskElement.innerHTML = `

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">
                ✕
            </button>

            <h3>${task.title}</h3>

            <p class="task-info">
                👤 ${task.member}
            </p>

            <span class="priority ${task.priority.toLowerCase()}">
                ${task.priority}
            </span>

        `;


        if (task.status === "todo") {

            todoList.appendChild(taskElement);

        }

        else if (task.status === "progress") {

            progressList.appendChild(taskElement);

        }

        else if (task.status === "completed") {

            completedList.appendChild(taskElement);

        }

    });


    updateCounts();

}


// Update task counts

function updateCounts() {

    const todo =
        tasks.filter(
            task => task.status === "todo"
        ).length;


    const progress =
        tasks.filter(
            task => task.status === "progress"
        ).length;


    const completed =
        tasks.filter(
            task => task.status === "completed"
        ).length;


    document.getElementById("totalTasks").textContent =
        tasks.length;


    document.getElementById("todoTasks").textContent =
        todo;


    document.getElementById("progressTasks").textContent =
        progress;


    document.getElementById("completedTasks").textContent =
        completed;


    document.getElementById("todoCount").textContent =
        todo;


    document.getElementById("progressCount").textContent =
        progress;


    document.getElementById("completedCount").textContent =
        completed;

}


// Search tasks

document
    .getElementById("searchInput")
    .addEventListener("input", displayTasks);


// Filter by member

document
    .getElementById("filterMember")
    .addEventListener("change", displayTasks);


// Display tasks when page loads

displayTasks();s