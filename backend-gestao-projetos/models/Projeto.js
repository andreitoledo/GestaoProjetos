const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Projeto = sequelize.define('Projeto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: DataTypes.TEXT,
  dataInicio: DataTypes.DATEONLY,
  dataFim: DataTypes.DATEONLY,
}, {
  tableName: 'Projetos',
  timestamps: false
});

Projeto.belongsTo(Usuario, {
  foreignKey: 'UsuarioResponsavelId',
  as: 'responsavel'
});

module.exports = Projeto;
