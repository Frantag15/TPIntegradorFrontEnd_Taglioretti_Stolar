import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#94B9FF', display: 'flex', gap: '1rem' }}>
      <Link to="/">Inicio</Link>
      <Link to="/login">Ingresar</Link>
      <Link to="/register">Registrarse</Link>
    </nav>
  )
}
