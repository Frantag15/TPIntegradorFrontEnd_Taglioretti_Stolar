import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import EventosPage from '../pages/EventosPage';
import EventoDetallePage from '../pages/EventoDetallePage';
import CrearEventoPage from '../pages/CrearEventoPage';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute><EventosPage /></PrivateRoute>} />
        <Route path="/event/:id" element={<PrivateRoute><EventoDetallePage /></PrivateRoute>} />
        <Route path="/crear-evento" element={<PrivateRoute><CrearEventoPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
