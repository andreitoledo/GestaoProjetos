const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = {
  // Listar todos os usuários (apenas admin)
  async listar(req, res) {
    if (req.usuario.perfil !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email', 'perfil']
      });

      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },

  // Criar novo usuário
  async criar(req, res) {
    if (req.usuario.perfil !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { nome, email, senha, perfil } = req.body;

    try {
      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novo = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        perfil
      });

      res.status(201).json({
        id: novo.id,
        nome: novo.nome,
        email: novo.email,
        perfil: novo.perfil
      });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: err.message });
    }
  },

  // Atualizar usuário
  async atualizar(req, res) {
    if (req.usuario.perfil !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    const { id } = req.params;
    const { nome, email, perfil } = req.body;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await usuario.update({ nome, email, perfil });

      res.json({ msg: 'Usuário atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: err.message });
    }
  }
};
