const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuario', usuarioController.getUsuario);
router.post('/usuario', usuarioController.salvarUsuario);

module.exports = router;
