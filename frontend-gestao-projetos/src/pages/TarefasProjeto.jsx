import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function TarefasProjeto() {
  const { id } = useParams();
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState('');

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
      console.error('Erro ao atualizar status:', err);
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
      console.error('Erro ao excluir tarefa:', err);
      alert('Erro ao excluir tarefa');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e, tarefaId) => {
    e.preventDefault();
    if (!file) return alert('Selecione um arquivo');

    const formData = new FormData();
    formData.append('arquivo', file);

    try {
      await api.post(`/tarefas/${tarefaId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Arquivo enviado com sucesso!');
      setFile(null);

      const res = await api.get(`/tarefas/${id}`);
      setTarefas(res.data);
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer upload');
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

                <form
                  onSubmit={(e) => handleUpload(e, tarefa.id)}
                  className="mt-3 flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm border border-gray-300 rounded p-1"
                  />
                  <button
                    type="submit"
                    className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  >
                    📎 Enviar Arquivo
                  </button>
                </form>

                {/* Link visualização */}
                {tarefa.arquivo && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setArquivoSelecionado(`http://localhost:3001/${tarefa.arquivo}`);
                        setModalAberto(true);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      📄 Visualizar Arquivo
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => {
                setModalAberto(false);
                setArquivoSelecionado('');
              }}
            >
              ❌
            </button>

            {arquivoSelecionado.endsWith('.pdf') ? (
              <iframe
                src={arquivoSelecionado}
                className="w-full h-[70vh] rounded"
                title="Pré-visualização do PDF"
              />
            ) : (
              <img
                src={arquivoSelecionado}
                alt="Arquivo"
                className="max-h-[70vh] mx-auto rounded"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
