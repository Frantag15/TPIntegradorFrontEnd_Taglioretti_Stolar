import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', startdate: '', tag: '' });

  useEffect(() => {
    cargarEventos();
  }, [page]);

  async function cargarEventos() {
    try {
      const params = { page, ...filters };
      const res = await api.get('/event', { params });
      setEventos(res.data.events || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      toast.error('Error cargando eventos');
    }
  }

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPage(1);
    cargarEventos();
  }

  return (
    <div>
      <h2>Eventos</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={filters.name}
          onChange={handleChange}
        />
        <input
          name="startdate"
          type="date"
          value={filters.startdate}
          onChange={handleChange}
        />
        <input
          name="tag"
          placeholder="Tag"
          value={filters.tag}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {eventos.map(e => (
          <li key={e.id}>
            <Link to={`/event/${e.id}`}>{e.name}</Link> - {new Date(e.start_date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}
