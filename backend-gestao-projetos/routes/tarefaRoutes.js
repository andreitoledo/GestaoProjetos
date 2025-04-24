const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');
const Tarefa = require('../models/Tarefa'); // ❗ necessário aqui

router.use(autenticar);

// Rotas principais
router.get('/resumo', tarefaController.resumo);
router.post('/', tarefaController.criar);
router.get('/:projetoId', tarefaController.listarPorProjeto);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.deletar);
router.get('/projeto/:projetoId', tarefaController.listarPorProjeto);

// Upload de arquivo por tarefa
router.post('/:id/upload', upload.single('arquivo'), async (req, res) => {
  try {
    const tarefaId = req.params.id;

    // ✅ validação: nenhum arquivo enviado
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo foi enviado.' });
    }

    const filePath = req.file.path;

    const tarefa = await Tarefa.findByPk(tarefaId);
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    tarefa.arquivo = filePath;
    await tarefa.save();

    res.status(200).json({ msg: 'Upload salvo com sucesso', path: filePath });
  } catch (err) {
    console.error('Erro ao fazer upload:', err);
    res.status(500).json({ erro: 'Erro interno ao fazer upload' });
  }
});

module.exports = router;
