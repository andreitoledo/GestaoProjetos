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
    api.get(`/tarefas/${id}`) // usando o endpoint que traz todas as tarefas do projeto
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
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Editar Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="todo">A Fazer</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Atualizar Tarefa
          </button>
        </form>
      </div>
    </>
  );
}
