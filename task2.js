document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const span = document.createElement("span");
      span.textContent = task.text;
      span.onclick = () => toggleComplete(index);

      const actions = document.createElement("div");
      actions.className = "actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.title = "Edit task";
      editBtn.onclick = () => editTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.title = "Delete task";
      deleteBtn.onclick = () => deleteTask(index);

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);

      // Animation
      li.style.opacity = 0;
      taskList.appendChild(li);
      setTimeout(() => (li.style.opacity = 1), 0);
    });
  }

  function addTask(text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function editTask(index) {
    const newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
      tasks[index].text = newTask.trim();
      saveTasks();
      renderTasks();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
      addTask(newTask);
      taskInput.value = "";
    }
  });

  // Initial render
  renderTasks();
});
