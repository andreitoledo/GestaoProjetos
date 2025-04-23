require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // ✅ TEM QUE VIR ANTES DAS ROTAS

app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const comentarioRoutes = require('./routes/comentarioRoutes');
app.use('/api/comentarios', comentarioRoutes);

const projetoRoutes = require('./routes/projetoRoutes');
app.use('/api/projetos', projetoRoutes);

const tarefaRoutes = require('./routes/tarefaRoutes');
app.use('/api/tarefas', tarefaRoutes);

const tagRoutes = require('./routes/tagRoutes');
app.use('/api/tags', tagRoutes);


module.exports = app;
