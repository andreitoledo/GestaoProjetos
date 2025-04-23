const Tarefa = require('../models/Tarefa');
const Projeto = require('../models/Projeto');

module.exports = {
  async criar(req, res) {
    try {
      const { titulo, descricao, status, ProjetoId } = req.body;

      // 🔐 Validação do Projeto
      const projeto = await Projeto.findByPk(ProjetoId);
      if (!projeto) {
        return res.status(400).json({ erro: 'Projeto informado não existe' });
      }

      const nova = await Tarefa.create({
        titulo,
        descricao,
        status,
        ProjetoId,
        UsuarioId: req.usuario.id
      });

      res.status(201).json(nova);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar tarefa', detalhes: err.message });
    }
  },

  async listarPorProjeto(req, res) {
    try {
      const { projetoId } = req.params;

      const tarefas = await Tarefa.findAll({
        where: { ProjetoId: projetoId }
      });

      res.json(tarefas);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, status } = req.body;

      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa || tarefa.UsuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Tarefa não encontrada ou sem permissão' });
      }

      await tarefa.update({ titulo, descricao, status });
      res.json(tarefa);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa || tarefa.UsuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Tarefa não encontrada ou sem permissão' });
      }

      await tarefa.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
  },

  async resumo(req, res) {
    try {
      const usuarioId = req.usuario.id;
  
      const total = await Tarefa.count({ where: { UsuarioId: usuarioId } });
      const concluido = await Tarefa.count({ where: { UsuarioId: usuarioId, status: 'concluido' } });
      const andamento = await Tarefa.count({ where: { UsuarioId: usuarioId, status: 'em_andamento' } });
      const afazer = await Tarefa.count({ where: { UsuarioId: usuarioId, status: 'todo' } });
  
      return res.json({ total, concluido, andamento, afazer });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar resumo' });
    }
  } 


};
