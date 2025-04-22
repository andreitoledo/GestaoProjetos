import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setUsuario(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
