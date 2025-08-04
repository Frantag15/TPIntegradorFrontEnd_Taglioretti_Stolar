import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CrearEventoPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      // Convertir algunos campos a número según API espera
      data.duration_in_minutes = Number(data.duration_in_minutes);
      data.price = Number(data.price);
      data.max_assistance = Number(data.max_assistance);
      data.enabled_for_enrollment = data.enabled_for_enrollment === 'true' || data.enabled_for_enrollment === true;

      await api.post('/event', data);
      toast.success('Evento creado');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creando evento');
    }
  }

  return (
    <div>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input {...register('name', { required: true, minLength: 3 })} />
          {errors.name && <p>El nombre debe tener al menos 3 caracteres</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea {...register('description', { required: true, minLength: 3 })} />
          {errors.description && <p>La descripción debe tener al menos 3 caracteres</p>}
        </div>

        <div>
          <label>Fecha de inicio:</label>
          <input type="datetime-local" {...register('start_date', { required: true })} />
          {errors.start_date && <p>Fecha obligatoria</p>}
        </div>

        <div>
          <label>Duración (minutos):</label>
          <input type="number" {...register('duration_in_minutes', { required: true, min: 1 })} />
          {errors.duration_in_minutes && <p>Debe ser mayor a cero</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input type="number" {...register('price', { required: true, min: 0 })} />
          {errors.price && <p>Debe ser cero o más</p>}
        </div>

        <div>
          <label>Habilitado para inscripción:</label>
          <select {...register('enabled_for_enrollment')}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label>Capacidad máxima:</label>
          <input type="number" {...register('max_assistance', { required: true, min: 1 })} />
          {errors.max_assistance && <p>Debe ser mayor a cero</p>}
        </div>

        <div>
          <label>ID ubicación (event_location):</label>
          <input type="number" {...register('id_event_location', { required: true })} />
          {errors.id_event_location && <p>Obligatorio</p>}
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
