const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('Tag', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Tags',
  timestamps: false
});

module.exports = Tag;
