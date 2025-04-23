import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function EditarTarefa() {
  const { id, tarefaId } = useParams(); // id = projetoId
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tarefas/${id}`) // rota lista todas por projeto
      .then(res => {
        const tarefa = res.data.find(t => t.id === parseInt(tarefaId));
        if (tarefa) {
          setTitulo(tarefa.titulo);
          setDescricao(tarefa.descricao);
          setStatus(tarefa.status);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar tarefa');
      });
  }, [id, tarefaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tarefas/${tarefaId}`, {
        titulo,
        descricao,
        status
      });

      alert('Tarefa atualizada!');
      navigate(`/projeto/${id}`);
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar tarefa');
    }
  };

  return (
    <>
      <Navbar />
    <div style={{ padding: '2rem' }}>
      <h2>Editar Tarefa #{tarefaId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
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

        <button type="submit">Salvar Alterações</button>
      </form>
      </div>
      </>
  );
}
