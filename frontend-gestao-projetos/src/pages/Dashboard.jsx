import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ResumoDashboard from '../components/ResumoDashboard';
import { useAuth } from '../context/AuthContext';


export default function Dashboard() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useAuth();
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ✅ Resumo de tarefas com Tailwind */}
        <ResumoDashboard />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Meus Projetos</h2>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate('/novo-projeto')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Novo Projeto
            </button>

            {usuario?.perfil === 'admin' && (
              <button
                onClick={() => navigate('/admin/usuarios')}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Administração
              </button>
            )}
          </div>
         
        </div>

        {loading ? (
          <p className="text-gray-500">Carregando...</p>
        ) : (
          <ul className="space-y-4">
            {projetos.length === 0 ? (
              <p className="text-gray-400">Nenhum projeto cadastrado.</p>
            ) : (
              projetos.map(proj => (
                <li
                  key={proj.id}
                  onClick={() => navigate(`/projeto/${proj.id}`)}
                  className="p-4 border border-gray-300 rounded hover:shadow cursor-pointer"
                >
                  <strong className="text-lg">{proj.nome}</strong>
                  <p className="text-gray-600">{proj.descricao}</p>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}
