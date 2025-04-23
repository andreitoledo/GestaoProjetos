const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentario = sequelize.define('Comentario', {
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  TarefaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Comentarios',
  timestamps: false
});

module.exports = Comentario;
