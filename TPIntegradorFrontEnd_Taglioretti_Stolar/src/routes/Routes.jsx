import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import EventosPage from '../pages/EventosPage';
import EventoDetallePage from '../pages/EventDetail';
import CrearEventoPage from '../pages/Home';

import { useAuth } from '../hooks/useAuth';

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
