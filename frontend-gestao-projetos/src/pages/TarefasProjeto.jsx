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
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '', status: 'todo' });
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [resTarefas, resTags, resProjeto] = await Promise.all([
          api.get(`/tarefas/projeto/${id}`),

          api.get('/tags'),
          api.get(`/projetos/${id}`)
        ]);

        setTarefas(resTarefas.data);
        setTagsDisponiveis(resTags.data);
        setProjeto(resProjeto.data);

        resTarefas.data.forEach(t => {
          carregarComentarios(t.id);
          carregarTagsPorTarefa(t.id);
        });
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };
    carregar();
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
        prev.map(t => (t.id === tarefaId ? { ...t, tags: res.data } : t))
      );
    } catch (err) {
      console.error(`Erro ao carregar tags da tarefa ${tarefaId}:`, err);
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
    }
  };

  const adicionarTag = async (tarefaId, tagId) => {
    try {
      await api.post('/tags/associar', { tarefaId, tagId });
      carregarTagsPorTarefa(tarefaId);
    } catch (err) {
      console.error('Erro ao associar tag:', err);
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
      alert('Arquivo enviado com sucesso!');
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
    }
  };

  const criarTarefa = async () => {
    const { titulo, descricao, status } = novaTarefa;
    if (!titulo || !descricao) {
      alert('Título e descrição são obrigatórios');
      return;
    }
  
    try {
      await api.post('/tarefas', {
        ...novaTarefa,
        ProjetoId: id
      });
  
      setNovaTarefa({ titulo: '', descricao: '', status: 'todo' });
  
      const res = await api.get(`/tarefas/projeto/${id}`); // ✅ corrigido aqui
      setTarefas(res.data);
  
      res.data.forEach(t => {
        carregarComentarios(t.id);
        carregarTagsPorTarefa(t.id);
      });
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      alert('Erro ao criar tarefa');
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">📋 Tarefas do Projeto</h1>
        {projeto && (
          <p className="text-gray-600 text-sm mb-6">Projeto: <strong>{projeto.nome}</strong></p>
        )}

        {/* Formulário Nova Tarefa */}
        <div className="bg-white border p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">➕ Nova Tarefa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Título"
              value={novaTarefa.titulo}
              onChange={e => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={novaTarefa.descricao}
              onChange={e => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={novaTarefa.status}
              onChange={e => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="todo">A Fazer</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
          <button
            onClick={criarTarefa}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Cadastrar Tarefa
          </button>
        </div>

        {/* Lista de Tarefas */}
        {tarefas.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          tarefas.map(tarefa => (
            <div key={tarefa.id} className="bg-white shadow-md rounded-lg p-5 mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-1">{tarefa.titulo}</h2>
              <p className="text-gray-700 mb-2">{tarefa.descricao}</p>

              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1 font-medium">Status:</label>
                <select
                  value={tarefa.status}
                  onChange={async e => {
                    const novoStatus = e.target.value;
                    try {
                      await api.put(`/tarefas/${tarefa.id}`, { status: novoStatus });
                      setTarefas(prev =>
                        prev.map(t => (t.id === tarefa.id ? { ...t, status: novoStatus } : t))
                      );
                    } catch (err) {
                      console.error('Erro ao atualizar status:', err);
                    }
                  }}
                  className="border px-2 py-1 rounded text-sm"
                >
                  <option value="todo">A Fazer</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div className="mb-4">
                <input type="file" onChange={e => handleArquivoChange(tarefa.id, e.target.files[0])} />
                <button
                  onClick={() => handleUpload(tarefa.id)}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Enviar Arquivo
                </button>
                {tarefa.arquivo && (
                  <div className="mt-2">
                    <a
                      href={`http://localhost:3001/${tarefa.arquivo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      📎 Visualizar Arquivo
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">💬 Comentários</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 mb-2">
                  {(comentarios[tarefa.id] || []).map(c => (
                    <li key={c.id}>{c.mensagem}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novoComentario[tarefa.id] || ''}
                    onChange={e => setNovoComentario(prev => ({ ...prev, [tarefa.id]: e.target.value }))}
                    placeholder="Novo comentário"
                    className="flex-1 border px-2 py-1 rounded text-sm"
                  />
                  <button onClick={() => adicionarComentario(tarefa.id)} className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Adicionar
                  </button>
                </div>
              </div>

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
                      setTagSelecionada(prev => ({ ...prev, [tarefa.id]: e.target.value }))
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
                    + Tag
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TarefasProjeto;
