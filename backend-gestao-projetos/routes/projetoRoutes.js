const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', projetoController.criar);
router.get('/', projetoController.listar);
router.put('/:id', projetoController.atualizar);
router.delete('/:id', projetoController.deletar);

module.exports = router;
