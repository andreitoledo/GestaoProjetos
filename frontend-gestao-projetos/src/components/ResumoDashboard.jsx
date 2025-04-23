import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ResumoDashboard() {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    api.get('/tarefas/resumo')
      .then(res => setResumo(res.data))
      .catch(err => {
        console.error(err);
        alert('Erro ao carregar resumo');
      });
  }, []);

  if (!resumo) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
        <h4 className="text-blue-800 font-semibold text-lg">Total</h4>
        <p className="text-2xl font-bold">{resumo.total}</p>
      </div>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
        <h4 className="text-yellow-800 font-semibold text-lg">A Fazer</h4>
        <p className="text-2xl font-bold">{resumo.afazer}</p>
      </div>
      <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 rounded shadow">
        <h4 className="text-indigo-800 font-semibold text-lg">Em Andamento</h4>
        <p className="text-2xl font-bold">{resumo.andamento}</p>
      </div>
      <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow sm:col-span-3">
        <h4 className="text-green-800 font-semibold text-lg">Concluído</h4>
        <p className="text-2xl font-bold">{resumo.concluido}</p>
      </div>
    </div>
  );
}
