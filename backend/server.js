const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar tarefa
app.post("/tasks", (req, res) => {
  const { title, priority, category } = req.body;

  db.query(
    "INSERT INTO tasks (title, done, priority, category) VALUES (?, ?, ?, ?)",
    [title, false, priority || "media", category || "Pessoal"],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        title,
        done: false,
        priority,
        category
      });
    }
  );
});

// Listar tarefas (com filtro)
app.get("/tasks", (req, res) => {
  const { done, search, category } = req.query;

  let query = "SELECT * FROM tasks WHERE 1=1";
  let values = [];

  if (done !== undefined) {
    query += " AND done = ?";
    values.push(done);
  }

  if (search) {
    query += " AND title LIKE ?";
    values.push(`%${search}%`);
  }

  if (category) {
    query += " AND category = ?";
    values.push(category);
  }

  db.query(query, values, (err, results) => {
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

  db.query(
    "DELETE FROM tasks WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ id });
    }
  );
});

app.listen(3000, () => {
  console.log("🚀 Backend rodando em http://localhost:3000");
});