const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middlewares/auth'); // ou use auth, mas escolha 1 só

router.use(autenticar); // aplica a todos

router.get('/resumo', tarefaController.resumo);
router.post('/', tarefaController.criar);
router.get('/:projetoId', tarefaController.listarPorProjeto);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.deletar);

module.exports = router;
