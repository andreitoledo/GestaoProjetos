import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function NovoProjeto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/projetos', {
        nome,
        descricao,
        dataInicio,
        dataFim
      });

      alert('Projeto criado!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar projeto');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Novo Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Nome do Projeto"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">Data de Início:</label>
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={dataInicio}
            onChange={e => setDataInicio(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700">Data de Fim:</label>
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={dataFim}
            onChange={e => setDataFim(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Salvar Projeto
          </button>
        </form>
      </div>
    </>
  );
}
