const Tag = require('../models/Tag');
const Tarefa = require('../models/Tarefa');

module.exports = {
  async listarTags(_, res) {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar tags' });
    }
  },

  async adicionarTag(req, res) {
    const { tarefaId, tagId } = req.body;

    try {
      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

      await tarefa.addTag(tagId);
      res.status(200).json({ msg: 'Tag adicionada à tarefa' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao adicionar tag' });
    }
  },

  async listarPorTarefa(req, res) {
    const { tarefaId } = req.params;

    try {
      const tarefa = await Tarefa.findByPk(tarefaId, {
        include: ['Tags']
      });

      if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

      res.json(tarefa.Tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar tags da tarefa' });
    }
  }
};
