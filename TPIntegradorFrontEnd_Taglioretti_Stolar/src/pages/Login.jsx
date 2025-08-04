import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', { username, password })
      setMessage('Login exitoso')
      // Guardar token, redireccionar, etc
    } catch (err) {
      setMessage('Error en login')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingresar</h2>
      <label>
        Usuario:
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Ingresar</button>
      <p>{message}</p>
    </form>
  )
}
