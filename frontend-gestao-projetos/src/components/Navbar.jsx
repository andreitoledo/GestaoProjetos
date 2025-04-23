import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { logout, usuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#0d6efd',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontWeight: 'bold' }}>
        Gestão de Projetos
      </span>
      <div>
        {usuario && (
          <span style={{ marginRight: '1rem' }}>
            Olá, {usuario.email}
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
