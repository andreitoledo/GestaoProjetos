import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const TarefasProjeto = () => {
  const { id } = useParams();
  const [tarefas, setTarefas] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [novoComentario, setNovoComentario] = useState({});
  const [tagsDisponiveis, setTagsDisponiveis] = useState([]);
  const [tagSelecionada, setTagSelecionada] = useState({});
  const [arquivos, setArquivos] = useState({});
  const [filtroStatus, setFiltroStatus] = useState('todos');

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const res = await api.get(`/tarefas/${id}`);
        setTarefas(res.data);
        res.data.forEach(tarefa => {
          carregarComentarios(tarefa.id);
          carregarTagsPorTarefa(tarefa.id);
        });
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
      }
    };

    carregarTarefas();
    carregarTagsDisponiveis();
  }, [id]);

  const carregarComentarios = async (tarefaId) => {
    try {
      const res = await api.get(`/comentarios/${tarefaId}`);
      setComentarios(prev => ({ ...prev, [tarefaId]: res.data }));
    } catch (err) {
      console.error(`Erro ao carregar comentários da tarefa ${tarefaId}:`, err);
    }
  };

  const carregarTagsPorTarefa = async (tarefaId) => {
    try {
      const res = await api.get(`/tags/${tarefaId}`);
      setTarefas(prev =>
        prev.map(t =>
          t.id === tarefaId ? { ...t, tags: res.data } : t
        )
      );
    } catch (err) {
      console.error(`Erro ao carregar tags da tarefa ${tarefaId}:`, err);
    }
  };

  const carregarTagsDisponiveis = async () => {
    try {
      const res = await api.get('/tags');
      setTagsDisponiveis(res.data);
    } catch (err) {
      console.error('Erro ao carregar tags disponíveis:', err);
    }
  };

  const adicionarComentario = async (tarefaId) => {
    const mensagem = novoComentario[tarefaId];
    if (!mensagem) return;

    try {
      await api.post(`/comentarios/${tarefaId}`, { mensagem });
      setNovoComentario(prev => ({ ...prev, [tarefaId]: '' }));
      carregarComentarios(tarefaId);
    } catch (err) {
      console.error('Erro ao adicionar comentário:', err);
      alert('Erro ao adicionar comentário');
    }
  };

  const adicionarTag = async (tarefaId, tagId) => {
    try {
      await api.post('/tags/associar', { tarefaId, tagId });
      carregarTagsPorTarefa(tarefaId);
    } catch (err) {
      console.error('Erro ao associar tag:', err);
      alert('Erro ao adicionar tag');
    }
  };

  const handleArquivoChange = (tarefaId, file) => {
    setArquivos(prev => ({ ...prev, [tarefaId]: file }));
  };

  const handleUpload = async (tarefaId) => {
    const file = arquivos[tarefaId];
    if (!file) return;
    const formData = new FormData();
    formData.append('arquivo', file);
    try {
      await api.post(`/tarefas/${tarefaId}/upload`, formData);
      const res = await api.get(`/tarefas/${id}`);
      setTarefas(res.data);
      alert('Arquivo enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      alert('Erro ao enviar arquivo');
    }
  };

  const atualizarStatus = async (idTarefa, novoStatus) => {
    try {
      await api.put(`/tarefas/${idTarefa}`, { status: novoStatus });
      setTarefas(prev =>
        prev.map(t =>
          t.id === idTarefa ? { ...t, status: novoStatus } : t
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao atualizar status da tarefa');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tarefas do Projeto</h1>

        {/* Filtro por status */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-gray-600">
            Filtrar por Status:
          </label>
          <select
            className="border rounded px-3 py-1 text-sm"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="todo">A Fazer</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>

        {tarefas
          .filter(t => filtroStatus === 'todos' || t.status === filtroStatus)
          .map(tarefa => (
            <div key={tarefa.id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-semibold">{tarefa.titulo}</h2>
              <p className="text-gray-700">{tarefa.descricao}</p>

              {/* Select para status */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>Status:</span>
                <select
                  className="border px-2 py-1 rounded text-sm"
                  value={tarefa.status}
                  onChange={e => atualizarStatus(tarefa.id, e.target.value)}
                >
                  <option value="todo">A Fazer</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              {/* Upload de Arquivo */}
              <div className="mt-4">
                <input
                  type="file"
                  onChange={e => handleArquivoChange(tarefa.id, e.target.files[0])}
                  className="mb-2"
                />
                <button
                  onClick={() => handleUpload(tarefa.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Enviar Arquivo
                </button>
                {tarefa.arquivo && (
                  <div className="mt-2">
                    <a
                      href={`http://localhost:3001/${tarefa.arquivo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      📎 Visualizar Arquivo
                    </a>
                  </div>
                )}
              </div>

              {/* Comentários */}
              <div className="mt-4">
                <h3 className="text-lg font-medium">Comentários</h3>
                <ul className="list-disc list-inside">
                  {(comentarios[tarefa.id] || []).map(comentario => (
                    <li key={comentario.id}>{comentario.mensagem}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <input
                    type="text"
                    value={novoComentario[tarefa.id] || ''}
                    onChange={e =>
                      setNovoComentario(prev => ({
                        ...prev,
                        [tarefa.id]: e.target.value
                      }))
                    }
                    placeholder="Novo comentário"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <button
                    onClick={() => adicionarComentario(tarefa.id)}
                    className="mt-1 bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Adicionar Comentário
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 border-t pt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">🏷️ Tags</h4>

                <div className="flex flex-wrap gap-2 mb-2">
                  {(tarefa.tags || []).map(tag => (
                    <span
                      key={tag.id}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag.nome}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 items-center">
                  <select
                    className="text-sm border px-2 py-1 rounded"
                    value={tagSelecionada[tarefa.id] || ''}
                    onChange={e =>
                      setTagSelecionada(prev => ({
                        ...prev,
                        [tarefa.id]: e.target.value
                      }))
                    }
                  >
                    <option value="">-- Selecione uma tag --</option>
                    {tagsDisponiveis.map(tag => (
                      <option key={tag.id} value={tag.id}>
                        {tag.nome}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      const tagId = tagSelecionada[tarefa.id];
                      if (tagId) adicionarTag(tarefa.id, tagId);
                    }}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
                  >
                    + Adicionar Tag
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </>
  );
};

export default TarefasProjeto;
