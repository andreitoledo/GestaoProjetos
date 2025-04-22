const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  senhaHash: DataTypes.STRING,
  role: DataTypes.STRING, // 'admin', 'cliente'
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
