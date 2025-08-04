import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    const success = await login(data);
    if(success) navigate('/');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario (email):</label>
          <input
            {...register('username', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de email inválido',
              }
            })}
            type="email"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 3, message: 'Min 3 caracteres' } })}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Ingresar</button>
      </form>
      <p>No tienes cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  );
}
