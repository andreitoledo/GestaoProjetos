const Tarefa = require('../models/Tarefa');
const Projeto = require('../models/Projeto');
const sequelize = require('../config/database');

module.exports = {
  async criar(req, res) {
    try {
      const { titulo, descricao, status, ProjetoId } = req.body;

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
      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }

      // Permite apenas o dono ou admins
      if (tarefa.UsuarioId !== req.usuario.id && req.usuario.perfil !== 'admin') {
        return res.status(403).json({ erro: 'Sem permissão para atualizar esta tarefa' });
      }

      await tarefa.update({ titulo, descricao, status });
      res.json(tarefa);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhes: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }

      // Permite apenas o dono ou admins
      if (tarefa.UsuarioId !== req.usuario.id && req.usuario.perfil !== 'admin') {
        return res.status(403).json({ erro: 'Sem permissão para excluir esta tarefa' });
      }

      await tarefa.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar tarefa', detalhes: err.message });
    }
  },

  async resumo(req, res) {
    try {
      const [resultado] = await sequelize.query(`
        SELECT 
          COUNT(CASE WHEN status = 'todo' THEN 1 END) AS todo,
          COUNT(CASE WHEN status = 'em_andamento' THEN 1 END) AS em_andamento,
          COUNT(CASE WHEN status = 'concluido' THEN 1 END) AS concluido
        FROM Tarefas
      `);

      const r = resultado[0];
      res.json({
        todo: Number(r.todo),
        em_andamento: Number(r.em_andamento),
        concluido: Number(r.concluido)
      });
    } catch (err) {
      console.error('Erro ao gerar resumo de tarefas:', err);
      res.status(500).json({ erro: 'Erro ao gerar resumo' });
    }
  }
};
