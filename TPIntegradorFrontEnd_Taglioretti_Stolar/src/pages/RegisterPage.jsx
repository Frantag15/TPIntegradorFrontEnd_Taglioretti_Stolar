import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    try {
      await api.post('/user/register', data);
      toast.success('Usuario registrado correctamente');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar');
    }
  }

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input {...register('first_name', { required: true, minLength: 3 })} />
          {errors.first_name && <p>Debe tener al menos 3 caracteres</p>}
        </div>

        <div>
          <label>Apellido:</label>
          <input {...register('last_name', { required: true, minLength: 3 })} />
          {errors.last_name && <p>Debe tener al menos 3 caracteres</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            {...register('username', {
              required: 'El email es obligatorio',
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })}
            type="email"
          />
          {errors.username && <p>Formato de email inválido</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input {...register('password', { required: true, minLength: 3 })} type="password" />
          {errors.password && <p>Debe tener al menos 3 caracteres</p>}
        </div>

        <button type="submit">Registrar</button>
      </form>
      <p>Ya tienes cuenta? <Link to="/login">Ingresar</Link></p>
    </div>
  );
}
