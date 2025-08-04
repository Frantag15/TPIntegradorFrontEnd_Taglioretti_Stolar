import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/event/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError('Evento no encontrado'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando evento...</p>
  if (error) return <p>{error}</p>
  if (!event) return null

  return (
    <article>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Fecha: {new Date(event.start_date).toLocaleString()}</p>
      <p>Duración: {event.duration_in_minutes} minutos</p>
      <p>Precio: ${event.price}</p>
      <p>Capacidad máxima: {event.max_assistance}</p>
      {/* Aquí podés agregar más datos y estilos */}
    </article>
  )
}
