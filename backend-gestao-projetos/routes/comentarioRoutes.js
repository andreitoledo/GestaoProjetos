const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const autenticar = require('../middlewares/auth');

router.use(autenticar);

// GET /comentarios/:id → lista comentários da tarefa
router.get('/:id', comentarioController.listar);

// POST /comentarios/:id → adiciona comentário à tarefa
router.post('/:id', comentarioController.criar);

module.exports = router;
