const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const autenticar = require('../middlewares/auth');

router.use(autenticar);

router.get('/usuarios', usuarioController.listar); // ✅
router.post('/usuarios', usuarioController.criar); // ✅

module.exports = router;
