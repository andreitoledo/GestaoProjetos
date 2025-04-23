import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function TarefasProjeto() {
  const { id } = useParams();
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tarefas/${id}`)
      .then(res => setTarefas(res.data))
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar tarefas');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const atualizarStatus = async (idTarefa, novoStatus) => {
    try {
      await api.put(`/tarefas/${idTarefa}`, { status: novoStatus });
      const novasTarefas = tarefas.map(t =>
        t.id === idTarefa ? { ...t, status: novoStatus } : t
      );
      setTarefas(novasTarefas);
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar status da tarefa');
    }
  };

  const excluirTarefa = async (idTarefa) => {
    const confirmar = window.confirm('Deseja realmente excluir esta tarefa?');
    if (!confirmar) return;

    try {
      await api.delete(`/tarefas/${idTarefa}`);
      setTarefas(tarefas.filter(t => t.id !== idTarefa));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir tarefa');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Tarefas do Projeto #{id}</h2>
          <button
            onClick={() => navigate(`/projeto/${id}/nova-tarefa`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Nova Tarefa
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Carregando tarefas...</p>
        ) : tarefas.length === 0 ? (
          <p className="text-gray-400">Nenhuma tarefa cadastrada.</p>
        ) : (
          <div className="space-y-4">
            {tarefas.map(tarefa => (
              <div key={tarefa.id} className="bg-white p-4 border rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{tarefa.titulo}</h3>
                    <p className="text-sm text-gray-600">{tarefa.descricao}</p>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded
                    ${tarefa.status === 'todo' ? 'bg-yellow-100 text-yellow-800' :
                      tarefa.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'}
                  `}>
                    {tarefa.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <select
                    value={tarefa.status}
                    onChange={e => atualizarStatus(tarefa.id, e.target.value)}
                    className="border px-3 py-1 rounded text-sm"
                  >
                    <option value="todo">A Fazer</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projeto/${id}/tarefa/${tarefa.id}/editar`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => excluirTarefa(tarefa.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
