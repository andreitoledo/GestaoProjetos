import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/projetos')
      .then(res => setProjetos(res.data))
      .catch(err => {
        console.error('Erro ao buscar projetos:', err);
        alert('Erro ao carregar projetos');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2>Meus Projetos</h2>
        <h1 className="text-red-600 text-2xl font-bold">Tailwind funcionando!</h1>


        <button onClick={() => navigate('/novo-projeto')}>
          + Novo Projeto
        </button>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {projetos.length === 0 ? (
              <p>Nenhum projeto cadastrado.</p>
            ) : (
              projetos.map(proj => (
                <li
                  key={proj.id}
                  onClick={() => navigate(`/projeto/${proj.id}`)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                  }}
                >
                  <strong>{proj.nome}</strong><br />
                  <span>{proj.descricao}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}
