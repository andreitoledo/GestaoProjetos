import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('todo');

  const { id: projetoId } = useParams(); // ID do projeto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo) {
      alert('Título é obrigatório');
      return;
    }

    try {
      await api.post('/tarefas', {
        titulo,
        descricao,
        status,
        ProjetoId: projetoId
      });

      alert('Tarefa criada com sucesso!');
      navigate(`/projeto/${projetoId}`);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar tarefa');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Nova Tarefa – Projeto #{projetoId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da Tarefa"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        /><br />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        /><br />

        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="todo">A Fazer</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
        </select><br />

        <button type="submit">Salvar Tarefa</button>
      </form>
    </div>
  );
}
