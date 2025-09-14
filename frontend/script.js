const API_URL = "http://localhost:3000/tasks";

async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.done ? "done" : ""}" onclick="toggleTask(${task.id}, ${task.done})">
          ${task.title}
        </span>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    input.value = "";
    loadTasks();
  } catch (err) {
    console.error("Erro ao adicionar tarefa:", err);
  }
}

async function toggleTask(id, done) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: done ? 0 : 1 })
    });
    loadTasks();
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
  }
}

// Carrega tarefas assim que abre a página
loadTasks();

