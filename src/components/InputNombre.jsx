import { useState } from 'react'

/**
 * Componente InputNombre - Input para filtrar por nombre
 */
export function InputNombre({ datosNombre, nombre, setNombre }) {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  )
}