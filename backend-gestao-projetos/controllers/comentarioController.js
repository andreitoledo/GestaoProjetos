const Comentario = require('../models/Comentario');
const Tarefa = require('../models/Tarefa');

module.exports = {
  // Listar comentários de uma tarefa
  async listar(req, res) {
    const tarefaId = req.params.id;

    try {
      const comentarios = await Comentario.findAll({
        where: { TarefaId: tarefaId },
        order: [['data', 'DESC']]
      });
      res.json(comentarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar comentários' });
    }
  },

  // Criar novo comentário
  async criar(req, res) {
    const tarefaId = req.params.id;
    const { mensagem } = req.body;
    const usuarioId = req.usuario.id;

    try {
      // ✅ Verifica se a tarefa existe
      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(400).json({ erro: 'Tarefa não encontrada' });
      }

      const novoComentario = await Comentario.create({
        mensagem,
        TarefaId: tarefaId,
        UsuarioId: usuarioId
      });

      res.status(201).json(novoComentario);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao criar comentário' });
    }
  }
};
