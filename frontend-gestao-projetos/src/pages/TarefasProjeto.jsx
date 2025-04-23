import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function TarefasProjeto() {
  const { id } = useParams(); // ID do projeto vindo da URL
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
                <strong>{tarefa.titulo}</strong> – <em>{tarefa.status}</em><br />
                <small>{tarefa.descricao}</small>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
