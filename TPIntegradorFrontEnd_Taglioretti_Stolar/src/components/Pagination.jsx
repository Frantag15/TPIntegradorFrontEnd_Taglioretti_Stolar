import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            marginRight: '0.5rem',
            fontWeight: page === currentPage ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
