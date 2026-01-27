/**
 * Componente Avatar - Muestra la imagen de un alumno
 */
export function Avatar({ imagen, nombre }) {
  return (
    <img
      src={imagen}
      alt={nombre}
      className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen'
      }}
    />
  )
}