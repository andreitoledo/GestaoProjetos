import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const { setUsuario } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, senha });

      const { token, usuario } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setToken(token); // ✅ mostra na tela
      setUsuario(usuario);

      setTimeout(() => navigate('/'), 1500); // redireciona após 1.5s
    } catch (err) {
      setErro('Credenciais inválidas');
      setToken('');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {erro && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">{erro}</div>}

        <input
          type="email"
          className="w-full mb-3 border px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 border px-3 py-2 rounded"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
          onClick={handleLogin}
        >
          Entrar
        </button>

        {/* Token exibido após login */}
        {token && (
          <div className="mt-4 text-xs text-green-700 bg-green-100 p-2 rounded break-all">
            <strong>Token:</strong><br />
            {token}
          </div>
        )}
      </div>
    </div>
  );
}
