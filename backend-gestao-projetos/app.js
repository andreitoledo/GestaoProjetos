
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const projetoRoutes = require('./routes/projetoRoutes');
app.use('/api/projetos', projetoRoutes);

const tarefaRoutes = require('./routes/tarefaRoutes');
app.use('/api/tarefas', tarefaRoutes);

app.use('/uploads', express.static('uploads'));

module.exports = app;
