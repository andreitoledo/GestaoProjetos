import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function TarefasProjeto() {
  const { id } = useParams();
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Chamada inicial para buscar tarefas
  useEffect(() => {
    api.get(`/tarefas/${id}`)
      .then(res => setTarefas(res.data))
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar tarefas');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Função que você perguntou
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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tarefas do Projeto #{id}</h2>
      <button onClick={() => navigate('/')}>← Voltar</button>
      <button onClick={() => navigate(`/projeto/${id}/nova-tarefa`)}>
        + Nova Tarefa
      </button>

      {loading ? <p>Carregando...</p> : (
        tarefas.length === 0 ? (
          <p>Nenhuma tarefa cadastrada.</p>
        ) : (
          <ul>
            {tarefas.map(tarefa => (
              <li key={tarefa.id} style={{ marginBottom: '1rem' }}>
                <strong>{tarefa.titulo}</strong><br />
                <small>{tarefa.descricao}</small><br />

                <label>Status:</label>
                <select
                  value={tarefa.status}
                  onChange={e => atualizarStatus(tarefa.id, e.target.value)}
                >
                  <option value="todo">A Fazer</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
