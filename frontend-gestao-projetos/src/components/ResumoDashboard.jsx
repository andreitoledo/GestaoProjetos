import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../services/api';

Chart.register(ArcElement, Tooltip, Legend);

export default function ResumoDashboard() {
  const [resumo, setResumo] = useState({ todo: 0, em_andamento: 0, concluido: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/tarefas/resumo');
        console.log('Resumo vindo do backend:', res.data); // 👈 VERIFICAR AQUI
        setResumo(res.data);
      } catch (err) {
        console.error('Erro ao carregar resumo:', err);
      }
    }
    fetchData();
  }, []);

  const data = {
    labels: ['A Fazer', 'Em Andamento', 'Concluído'],
    datasets: [
      {
        label: 'Tarefas',
        data: [
          resumo.todo || 0,
          resumo.em_andamento || 0,
          resumo.concluido || 0
        ],
        backgroundColor: ['#facc15', '#60a5fa', '#4ade80'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-6 max-w-md">
      <h2 className="text-lg font-bold mb-4">Resumo de Tarefas</h2>
      <Doughnut data={data} />
    </div>
  );
}
