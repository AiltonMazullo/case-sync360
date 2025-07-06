const db = require('../models/db');

exports.getUsuario = (req, res) => {
  const sql = 'SELECT * FROM usuario LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.salvarUsuario = (req, res) => {
  const { nome, idade, rua, bairro, estado, biografia, imagemPerfil } = req.body;

  const checkSql = 'SELECT * FROM usuario LIMIT 1';
  db.query(checkSql, (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      const insertSql = 'INSERT INTO usuario (nome, idade, rua, bairro, estado, biografia, imagemPerfil) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(insertSql, [nome, idade, rua, bairro, estado, biografia, imagemPerfil], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Usuário criado com sucesso!');
      });
      
    } else {
      const updateSql = 'UPDATE usuario SET nome = ?, idade = ?, rua = ?, bairro = ?, estado = ?, biografia = ?, imagemPerfil = ? WHERE id = ?';
      db.query(updateSql, [nome, idade, rua, bairro, estado, biografia, imagemPerfil, result[0].id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Usuário atualizado com sucesso!');
      });
    }
  });
};
