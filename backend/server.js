const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database"); // importa o database.js corrigido

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar tarefa
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Título é obrigatório" });

  db.run("INSERT INTO tasks (title, done) VALUES (?, ?)", [title, 0], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, done: 0 });
  });
});

// Listar tarefas
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Atualizar tarefa (marcar como feita/não feita)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  db.run("UPDATE tasks SET done = ? WHERE id = ?", [done, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Excluir tarefa
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(3000, () => console.log("✅ Backend rodando em http://localhost:3000"));
