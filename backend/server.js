const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testar conexão com o MySQL
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// ROTA GET /usuario
app.get("/usuario", (req, res) => {
  db.query("SELECT * FROM usuario LIMIT 1", (err, results) => {
    console.log("Erro:", err);
    console.log("Resultado:", results);
    if (err) {
      res.status(500).json({ erro: "Erro ao buscar usuário" });
    } else {
      res.json(results[0] || {});
    }
  });
});


// ROTA POST /usuario
app.post("/usuario", (req, res) => {
  console.log("req.body recebido:", req.body)
  const { nome, idade, rua, bairro, estado, biografia, imagemPerfil } = req.body;

  const sql = `
    INSERT INTO usuario (nome, idade, rua, bairro, estado, biografia, imagemPerfil)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      nome = VALUES(nome),
      idade = VALUES(idade),
      rua = VALUES(rua),
      bairro = VALUES(bairro),
      estado = VALUES(estado),
      biografia = VALUES(biografia),
      imagemPerfil = VALUES(imagemPerfil)
  `;

  const values = [nome, idade, rua, bairro, estado, biografia, imagemPerfil];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao salvar usuário:", err);
      res.status(500).json({ erro: "Erro ao salvar dados do usuário" });
    } else {
      res.json({ mensagem: "Usuário salvo com sucesso!" });
    }
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
