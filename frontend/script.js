const API = "http://localhost:3000/tasks";

// Carregar todas tarefas
async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();

  render(tasks);
}

// Filtrar concluídas/pendentes
async function filterTasks(done) {
  const res = await fetch(`${API}?done=${done}`);
  const tasks = await res.json();

  render(tasks);
}

// Buscar tarefas
async function searchTasks() {
  const search = document.getElementById("searchInput").value;
  const category = document.getElementById("filterCategory").value;

  let url = API + "?";

  if (search) {
    url += `search=${search}&`;
  }

  if (category) {
    url += `category=${category}`;
  }

  const res = await fetch(url);
  const tasks = await res.json();

  render(tasks);
}

// Adicionar tarefa
async function addTask() {
  const title = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title,
      priority,
      category
    })
  });

  document.getElementById("taskInput").value = "";

  loadTasks();
}

// Atualizar status
async function toggleTask(id, done) {
  await fetch(`${API}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      done: !done
    })
  });

  loadTasks();
}

// Deletar tarefa
async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Renderizar tarefas
function render(tasks) {
  const list = document.getElementById("taskList");

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${task.done ? "✅" : "⬜"} 
        ${task.title}

        <small>
          [${task.priority}] - ${task.category}
        </small>
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

// Inicializar
loadTasks();