// app.js

// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const toggleMode = document.getElementById('toggleMode');
const clearAll = document.getElementById('clearAll');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTaskToUI(task);
  });
});

// Add event listener to form submit
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName) {
    const task = {
      name: taskName,
      completed: false,
    };
    addTaskToUI(task);
    taskInput.value = '';
  }
});

// Add event listener to task items
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('toggle')) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
    const taskName = taskItem.textContent.trim();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find((t) => t.name === taskName);
    if (task) {
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
});

// Add event listener to clear all button
clearAll.addEventListener('click', () => {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
});

// Add event listener to toggle mode button
toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Function to add task to UI and localStorage
function addTaskToUI(task) {
  const li = document.createElement('li');
  li.textContent = task.name;
  li.classList.add('list-item');
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('toggle');
  toggleButton.textContent = 'Toggle';
  li.appendChild(toggleButton);
  taskList.appendChild(li);
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}