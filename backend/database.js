const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Caminho absoluto do banco
const dbPath = path.resolve(__dirname, "tasks.db");

// Cria o banco e conecta
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erro ao abrir/criar banco:", err.message);
  } else {
    console.log("✅ Banco SQLite conectado em:", dbPath);
  }
});

// Cria a tabela se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL
  )`);
});

module.exports = db;
