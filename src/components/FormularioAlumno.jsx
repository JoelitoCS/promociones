import { useState, useEffect } from 'react'

export function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [promocion, setPromocion] = useState('')
  const [ciclo, setCiclo] = useState('DAW')
  const [imagen, setImagen] = useState('')

  const promociones = ["24/25", "25/26"]
  const ciclos = ["DAW", "SMX", "ARI", "IEA"]

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre || '')
      setApellido(alumno.apellidos || '')  
      setPromocion(alumno.promocion || '')
      setCiclo(alumno.ciclo || 'DAW')
      setImagen(alumno.urlImagen || '')     
    }
  }, [alumno])

  const handleSubmit = (e) => {
    e.preventDefault()

    const alumnoData = {
      nombre: nombre.trim(),
      apellidos: apellido.trim(),
      promocion,
      ciclo,
      urlImagen: imagen.trim()
    }

    if (alumno && alumno._id) {
      alumnoData._id = alumno._id
    }

    onSubmit(alumnoData)
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {alumno ? 'Editar Alumno' : 'Añadir Nuevo Alumno'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Apellidos */}
        <input
          type="text"
          placeholder="Apellidos"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Promoción */}
        <select
          value={promocion}
          onChange={(e) => setPromocion(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona una promoción</option>
          {promociones.map(promo => <option key={promo} value={promo}>{promo}</option>)}
        </select>

        {/* Ciclo */}
        <select
          value={ciclo}
          onChange={(e) => setCiclo(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ciclos.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Imagen */}
        <input
          type="url"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {imagen && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <img
              src={imagen}
              alt="Vista previa"
              className="h-24 w-24 object-cover rounded-lg"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error' }}
            />
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {alumno ? 'Guardar Cambios' : 'Añadir Alumno'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
