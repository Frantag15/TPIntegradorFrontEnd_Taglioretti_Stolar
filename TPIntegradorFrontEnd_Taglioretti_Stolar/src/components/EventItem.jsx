import React from 'react'
import { Link } from 'react-router-dom'

export default function EventItem({ event }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>
        Fecha: {new Date(event.start_date).toLocaleDateString()} | Precio: ${event.price}
      </p>
      <Link to={`/event/${event.id}`}>Ver detalle</Link>
    </div>
  )
}
