import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novo, setNovo] = useState({ nome: '', email: '', senha: '', perfil: 'cliente' });
  const [editando, setEditando] = useState(null); // objeto do usuário em edição

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await api.get('/admin/usuarios');
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

  const salvarEdicao = async () => {
    try {
      await api.put(`/admin/usuarios/${editando.id}`, editando);
      setEditando(null);
      carregarUsuarios();
    } catch (err) {
      console.error('Erro ao editar usuário:', err);
      alert('Erro ao salvar alterações');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Administração de Usuários</h1>

        {/* Cadastro */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Cadastrar Novo Usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Nome" value={novo.nome}
              onChange={e => setNovo({ ...novo, nome: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Email" value={novo.email}
              onChange={e => setNovo({ ...novo, email: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Senha" type="password" value={novo.senha}
              onChange={e => setNovo({ ...novo, senha: e.target.value })} />
            <select className="border p-2 rounded" value={novo.perfil}
              onChange={e => setNovo({ ...novo, perfil: e.target.value })}>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button onClick={criarUsuario}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Salvar
          </button>
        </div>

        {/* Lista */}
        <h2 className="text-lg font-semibold mb-3">Lista de Usuários</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Perfil</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.perfil}</td>
                <td className="p-2">
                  <button
                    onClick={() => setEditando(u)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ✏️ Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edição */}
      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>

            <input className="border p-2 rounded w-full mb-2" placeholder="Nome"
              value={editando.nome}
              onChange={e => setEditando({ ...editando, nome: e.target.value })}
            />
            <input className="border p-2 rounded w-full mb-2" placeholder="Email"
              value={editando.email}
              onChange={e => setEditando({ ...editando, email: e.target.value })}
            />
            <select className="border p-2 rounded w-full"
              value={editando.perfil}
              onChange={e => setEditando({ ...editando, perfil: e.target.value })}>
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setEditando(null)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={salvarEdicao}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
