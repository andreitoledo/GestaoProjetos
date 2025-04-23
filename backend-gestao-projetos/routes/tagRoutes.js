const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const autenticar = require('../middlewares/auth');

router.use(autenticar);

router.get('/', tagController.listarTags);
router.get('/:tarefaId', tagController.listarPorTarefa);
router.post('/associar', tagController.adicionarTag);

module.exports = router;
