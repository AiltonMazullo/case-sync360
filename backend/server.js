const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// GET /usuario
app.get("/usuario", (req, res) => {
  db.query("SELECT * FROM usuario LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar usuário" });
    res.json(results[0] || {});
  });
});

// POST /usuario 
app.post("/usuario", upload.single("imagemPerfil"), (req, res) => {
  const { nome, idade, rua, bairro, estado, biografia, imagemPerfilUrl } = req.body;
  const imagemPerfil = req.file ? req.file.filename : imagemPerfilUrl || null;

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

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Erro ao salvar usuário:", err);
      return res.status(500).json({ erro: "Erro ao salvar dados do usuário" });
    }
    res.json({ mensagem: "Usuário salvo com sucesso!" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
