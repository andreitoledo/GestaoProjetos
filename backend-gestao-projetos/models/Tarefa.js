const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Projeto = require('./Projeto');
const Usuario = require('./Usuario');

const Tarefa = sequelize.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'todo' // 'todo', 'em_andamento', 'concluido'
  },
  dataCriacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  arquivo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Tarefas',
  timestamps: false
});

Tarefa.belongsTo(Projeto, {
  foreignKey: 'ProjetoId',
  as: 'projeto'
});

Tarefa.belongsTo(Usuario, {
  foreignKey: 'UsuarioId',
  as: 'responsavel'
});

const Tag = require('./Tag');

Tarefa.belongsToMany(Tag, {
  through: 'TarefaTags',
  foreignKey: 'TarefaId',
  otherKey: 'TagId',
  timestamps: false 
});

Tag.belongsToMany(Tarefa, {
  through: 'TarefaTags',
  foreignKey: 'TagId',
  otherKey: 'TarefaId',
  timestamps: false 
});



module.exports = Tarefa;
