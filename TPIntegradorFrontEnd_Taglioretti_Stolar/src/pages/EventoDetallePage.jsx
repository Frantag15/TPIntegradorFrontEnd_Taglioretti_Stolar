import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

export default function EventoDetallePage() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    cargarEvento();
  }, [id]);

  async function cargarEvento() {
    try {
      const res = await api.get(`/event/${id}`);
      setEvento(res.data);
    } catch (error) {
      toast.error('Error cargando evento');
    }
  }

  if (!evento) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{evento.name}</h2>
      <p>{evento.description}</p>
      <p>Fecha: {new Date(evento.start_date).toLocaleString()}</p>
      <p>Duración: {evento.duration_in_minutes} minutos</p>
      <p>Precio: ${evento.price}</p>
      <p>Habilitado para inscripción: {evento.enabled_for_enrollment ? 'Sí' : 'No'}</p>
      <p>Capacidad máxima: {evento.max_assistance}</p>

      <h3>Ubicación</h3>
      <p>{evento.event_location?.name}</p>
      <p>{evento.event_location?.full_address}</p>

      <h3>Creado por</h3>
      <p>{evento.creator_user?.first_name} {evento.creator_user?.last_name}</p>

      <h3>Tags</h3>
      <ul>
        {evento.tags?.map(tag => <li key={tag.id}>{tag.name}</li>)}
      </ul>

      {/* Aquí más funcionalidades como inscripción, editar o borrar para creador */}
    </div>
  );
}
