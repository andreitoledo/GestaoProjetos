import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function NovoProjeto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !descricao) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    try {
      await api.post('/projetos', {
        nome,
        descricao,
        dataInicio,
        dataFim
      });

      alert('Projeto criado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar projeto');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Novo Projeto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Projeto"
          value={nome}
          onChange={e => setNome(e.target.value)}
        /><br />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        /><br />

        <label>Data de Início:</label>
        <input
          type="date"
          value={dataInicio}
          onChange={e => setDataInicio(e.target.value)}
        /><br />

        <label>Data de Fim:</label>
        <input
          type="date"
          value={dataFim}
          onChange={e => setDataFim(e.target.value)}
        /><br />

        <button type="submit">Salvar Projeto</button>
      </form>
    </div>
  );
}
