const API = "http://localhost:3000/tasks";

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  render(tasks);
}

async function filterTasks(done) {
  const res = await fetch(`${API}?done=${done}`);
  const tasks = await res.json();
  render(tasks);
}

async function addTask() {
  const title = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, priority })
  });

  document.getElementById("taskInput").value = "";
  loadTasks();
}

async function toggleTask(id, done) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !done })
  });

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

function render(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${task.done ? "✅" : "⬜"} 
        ${task.title} 
        <small>(${task.priority})</small>
      </span>

      <div>
        <button onclick="toggleTask(${task.id}, ${task.done})">
          ✔
        </button>

        <button onclick="deleteTask(${task.id})">
          🗑
        </button>
      </div>
    `;

    list.appendChild(li);
  });
}

loadTasks();