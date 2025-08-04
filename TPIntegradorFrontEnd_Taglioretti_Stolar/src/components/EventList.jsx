import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventItem from './EventItem'
import Pagination from './Pagination'

export default function EventList() {
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const pageSize = 5

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios
      .get('http://localhost:3000/api/event', {
        params: { page, pageSize },
      })
      .then((res) => {
        setEvents(res.data.events)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        setError('Error al cargar eventos')
      })
      .finally(() => setLoading(false))
  }, [page])

  if (loading) return <p>Cargando eventos...</p>
  if (error) return <p>{error}</p>
  if (!events.length) return <p>No hay eventos disponibles.</p>

  return (
    <div>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
