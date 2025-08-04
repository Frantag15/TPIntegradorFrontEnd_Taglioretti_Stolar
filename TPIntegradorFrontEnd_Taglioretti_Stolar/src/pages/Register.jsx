import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/user/register', {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      })
      setMessage('Registro exitoso')
      // Limpiar campos o redireccionar
    } catch (err) {
      setMessage('Error en registro')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <label>
        Nombre:
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required minLength={3} />
      </label>
      <br />
      <label>
        Apellido:
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required minLength={3} />
      </label>
      <br />
      <label>
        Usuario (email):
        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={3} />
      </label>
      <br />
      <button type="submit">Registrarse</button>
      <p>{message}</p>
    </form>
  )
}
