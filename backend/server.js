const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar tarefa
app.post("/tasks", (req, res) => {
  const { title, priority } = req.body;

  db.query(
    "INSERT INTO tasks (title, done, priority) VALUES (?, ?, ?)",
    [title, false, priority || "media"],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: result.insertId,
        title,
        done: false,
        priority
      });
    }
  );
});

// Listar tarefas (com filtro)
app.get("/tasks", (req, res) => {
  const { done } = req.query;

  let query = "SELECT * FROM tasks";

  if (done !== undefined) {
    query += " WHERE done = ?";
  }

  db.query(query, done !== undefined ? [done] : [], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Atualizar status
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  db.query(
    "UPDATE tasks SET done = ? WHERE id = ?",
    [done, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id, done });
    }
  );
});

// Deletar tarefa
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id });
  });
});

app.listen(3000, () => {
  console.log("🚀 Backend rodando em http://localhost:3000");
});