import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novo, setNovo] = useState({ nome: '', email: '', senha: '', perfil: 'cliente' });

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
        const res = await api.get('/admin/usuarios'); // ✅ certo!

      setUsuarios(res.data);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      alert('Acesso negado ou erro ao carregar');
    }
  };

  const criarUsuario = async () => {
    try {
      await api.post('/admin/usuarios', novo);
      setNovo({ nome: '', email: '', senha: '', perfil: 'cliente' });
      carregarUsuarios();
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      alert('Erro ao cadastrar novo usuário');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Administração de Usuários</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Cadastrar Novo Usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Nome"
              value={novo.nome}
              onChange={e => setNovo({ ...novo, nome: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={novo.email}
              onChange={e => setNovo({ ...novo, email: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Senha"
              type="password"
              value={novo.senha}
              onChange={e => setNovo({ ...novo, senha: e.target.value })}
            />
            <select
              className="border p-2 rounded"
              value={novo.perfil}
              onChange={e => setNovo({ ...novo, perfil: e.target.value })}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={criarUsuario}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Lista de Usuários</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Perfil</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.perfil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
