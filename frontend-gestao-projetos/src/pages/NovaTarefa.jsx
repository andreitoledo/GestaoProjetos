import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('todo');

  const { id: projetoId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Título da Tarefa"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Salvar Tarefa
          </button>
        </form>
      </div>
    </>
  );
}
