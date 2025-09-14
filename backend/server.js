const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar tarefa
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  db.query(
    "INSERT INTO tasks (title, done) VALUES (?, ?)",
    [title, false],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, done: false });
    }
  );
});

// Listar tarefas
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Atualizar tarefa
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  db.query(
    "UPDATE tasks SET done = ? WHERE id = ?",
    [done, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, done });
    }
  );
});

// Deletar tarefa
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id });
  });
});

app.listen(3000, () => {
  console.log("✅ Backend rodando em http://localhost:3000");
});
