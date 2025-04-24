const Projeto = require('../models/Projeto');

module.exports = {
  async criar(req, res) {
    try {
      const { nome, descricao, dataInicio, dataFim } = req.body;

      const novoProjeto = await Projeto.create({
        nome,
        descricao,
        dataInicio,
        dataFim,
        UsuarioResponsavelId: req.usuario.id
      });

      return res.status(201).json(novoProjeto);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao criar projeto', detalhes: err.message });
    }
  },

  async listar(req, res) {
    try {
      const projetos = await Projeto.findAll({
        where: { UsuarioResponsavelId: req.usuario.id }
      });

      return res.json(projetos);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao buscar projetos' });
    }
  },

  async detalhar(req, res) {
    try {
      const { id } = req.params;

      const projeto = await Projeto.findByPk(id);
      if (!projeto || projeto.UsuarioResponsavelId !== req.usuario.id) {
        return res.status(404).json({ erro: 'Projeto não encontrado ou sem permissão' });
      }

      return res.json(projeto);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao buscar projeto', detalhes: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, dataInicio, dataFim } = req.body;

      const projeto = await Projeto.findByPk(id);
      if (!projeto || projeto.UsuarioResponsavelId !== req.usuario.id) {
        return res.status(404).json({ erro: 'Projeto não encontrado ou sem permissão' });
      }

      await projeto.update({ nome, descricao, dataInicio, dataFim });

      return res.json(projeto);
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao atualizar projeto' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const projeto = await Projeto.findByPk(id);
      if (!projeto || projeto.UsuarioResponsavelId !== req.usuario.id) {
        return res.status(404).json({ erro: 'Projeto não encontrado ou sem permissão' });
      }

      await projeto.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao deletar projeto' });
    }
  }
};
