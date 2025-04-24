const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senhaHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senhaHash' // 👈 necessário se o nome no banco é diferente da chave JS
  },
  perfil: {
    type: DataTypes.STRING,
    defaultValue: 'cliente'
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
