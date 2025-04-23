const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const autenticar = require('../middlewares/auth'); // ou use auth, mas escolha 1 só
const upload = require('../middlewares/uploadMiddleware');

router.use(autenticar); // aplica a todos

router.get('/resumo', tarefaController.resumo);
router.post('/', tarefaController.criar);
router.get('/:projetoId', tarefaController.listarPorProjeto);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.deletar);

router.post('/:id/upload', upload.single('arquivo'), async (req, res) => {
    try {
      const tarefaId = req.params.id;
      const filePath = req.file.path;
  
      // Aqui você pode salvar no banco se quiser (opcional)
      // await Tarefa.update({ arquivo: filePath }, { where: { id: tarefaId } });
  
      res.status(200).json({ msg: 'Upload realizado com sucesso', path: filePath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao fazer upload' });
    }
  });
  
module.exports = router;
