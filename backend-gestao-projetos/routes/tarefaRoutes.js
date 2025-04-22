const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', tarefaController.criar);
router.get('/:projetoId', tarefaController.listarPorProjeto);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.deletar);

module.exports = router;
