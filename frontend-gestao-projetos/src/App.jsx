import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import NovoProjeto from './pages/NovoProjeto';
import TarefasProjeto from './pages/TarefasProjeto';
import NovaTarefa from './pages/NovaTarefa';
import EditarTarefa from './pages/EditarTarefa';
import AdminUsuarios from './pages/AdminUsuarios';



const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/novo-projeto" element={
            <PrivateRoute>
              <NovoProjeto />
            </PrivateRoute>
          } />

          <Route path="/projeto/:id" element={
            <PrivateRoute>
              <TarefasProjeto />
            </PrivateRoute>
          } />

          <Route path="/projeto/:id/nova-tarefa" element={
            <PrivateRoute>
              <NovaTarefa />
            </PrivateRoute>
          } />

          <Route path="/projeto/:id/tarefa/:tarefaId/editar" element={
            <PrivateRoute>
              <EditarTarefa />
            </PrivateRoute>
          } />

          <Route path="/admin/usuarios" element={
            <PrivateRoute>
              <AdminUsuarios />
            </PrivateRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
