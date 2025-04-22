import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projetos')
      .then(res => {
        console.log('Projetos do backend:', res.data); // 🔍 debug importante
        setProjetos(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar projetos:', err);
        alert('Erro ao carregar projetos');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Meus Projetos</h2>
      {loading ? <p>Carregando...</p> : (
        <ul>
          {projetos.length === 0 ? (
            <p>Nenhum projeto cadastrado.</p>
          ) : (
            projetos.map(proj => (
              <li key={proj.id}>
                <strong>{proj.nome}</strong><br />
                <span>{proj.descricao}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
