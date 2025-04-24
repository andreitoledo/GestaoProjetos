const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const gerarToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

module.exports = {
  async cadastrar(req, res) {
    const { nome, email, senha, perfil } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10); // ✅ correto

    try {
      const usuario = await Usuario.create({ nome, email, senhaHash, perfil }); // ✅ correto
      return res.status(201).json({
        id: usuario.id,
        nome,
        email,
        perfil
      });
    } catch (err) {
      return res.status(400).json({ erro: 'Erro ao cadastrar usuário', detalhes: err.message });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !await bcrypt.compare(senha, usuario.senhaHash)) // ✅ correto
      return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = gerarToken({
      id: usuario.id,
      perfil: usuario.perfil
    });

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  }
};
