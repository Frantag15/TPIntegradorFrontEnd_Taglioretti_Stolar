import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setUser({ token }); // Podés mejorar esto decodificando el token si querés
    }
  }, []);

  async function login(credentials) {
    try {
      const res = await api.post('/user/login', credentials);
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token });
      toast.success('Login exitoso');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error en login');
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Sesión cerrada');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
