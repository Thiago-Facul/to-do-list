const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tyr_platina0202",
  database: "todo_list"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar no MySQL:", err);
  } else {
    console.log("✅ Conectado ao MySQL");
  }
});

module.exports = db;
