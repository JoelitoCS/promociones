import { useState, useEffect } from 'react'

/**
 * Componente FormularioAlumno - Formulario para crear y editar alumnos
 * 
 * Características:
 * - Modo CREAR: Añade un nuevo alumno
 * - Modo EDITAR: Modifica un alumno existente
 * - Validación de todos los campos
 * - Diseño responsive
 * 
 * Recibe como props un objeto alumno que puede ser nulo si estamos en modo crear,
 * o un objeto con los datos del alumno si estamos en modo editar.
 * También recibe una función onSubmit que se ejecuta al enviar el formulario,
 * y una función onCancel que se ejecuta al cancelar.
 */
export function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  // Estados del formulario
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [promocion, setPromocion] = useState('')
  const [ciclo, setCiclo] = useState('DAW')
  const [imagen, setImagen] = useState('')
  const [errores, setErrores] = useState({})

  // Opciones para los selectores
  const promociones = ["24/25", "25/26", "26/27"]
  const ciclos = ["DAW", "SMX", "ARI", "IEA"]

  /**
   * Efecto: Si hay un alumno (modo EDITAR), cargar sus datos en el formulario
   */
  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre || '')
      setApellido(alumno.apellido || '')
      setPromocion(alumno.promocion || '')
      setCiclo(alumno.ciclo || 'DAW')
      setImagen(alumno.imagen || '')
    }
  }, [alumno])

  /**
   * Valida todos los campos del formulario y devuelve un objeto
   * con los mensajes de error correspondientes a cada campo que no haya superado la validación.
   */
  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }

    if (!apellido.trim()) {
      nuevosErrores.apellido = 'Los apellidos son obligatorios'
    }

    if (!promocion) {
      nuevosErrores.promocion = 'Debes seleccionar una promoción'
    }

    if (!ciclo) {
      nuevosErrores.ciclo = 'Debes seleccionar un ciclo'
    }

    return nuevosErrores
  }

  /**
   * Maneja el envío del formulario. Primero valida los campos y, si todos son correctos,
   * prepara el objeto con los datos del alumno y lo pasa al callback onSubmit.
   * Si estamos en modo editar, también incluye el identificador del alumno en el objeto.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar el formulario
    const nuevosErrores = validarFormulario()
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    // Preparar los datos del alumno
    const alumnoData = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      promocion,
      ciclo,
      imagen: imagen.trim()
    }

    // Si estamos editando, incluir el ID
    if (alumno) {
      alumnoData.id = alumno.id
    }

    // Llamar al callback onSubmit
    onSubmit(alumnoData)
  }

  /**
   * Recibe el nombre de un campo como argumento y, si ese campo tiene un error
   * registrado actualmente, lo elimina del objeto de errores.
   */
  const limpiarError = (campo) => {
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: undefined })
    }
  }

  return (
    <div className="p-8">
      {/* Header del formulario */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {alumno ? 'Editar Alumno' : 'Añadir Nuevo Alumno'}
        </h2>
        <p className="text-gray-600">
          {alumno 
            ? 'Modifica los datos del alumno y guarda los cambios' 
            : 'Completa todos los campos para añadir un nuevo alumno'
          }
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Campo: Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: Juan"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value)
                limpiarError('nombre')
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errores.nombre 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errores.nombre && (
              <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
            )}
          </div>

          {/* Campo: Apellidos */}
          <div>
            <label htmlFor="apellido" className="block text-sm font-semibold text-gray-700 mb-2">
              Apellidos *
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="Ej: García López"
              value={apellido}
              onChange={(e) => {
                setApellido(e.target.value)
                limpiarError('apellido')
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errores.apellido 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errores.apellido && (
              <p className="mt-1 text-sm text-red-600">{errores.apellido}</p>
            )}
          </div>

          {/* Campo: Promoción */}
          <div>
            <label htmlFor="promocion" className="block text-sm font-semibold text-gray-700 mb-2">
              Promoción *
            </label>
            <select
              id="promocion"
              value={promocion}
              onChange={(e) => {
                setPromocion(e.target.value)
                limpiarError('promocion')
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errores.promocion 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Selecciona una promoción</option>
              {promociones.map((promo) => (
                <option key={promo} value={promo}>
                  {promo}
                </option>
              ))}
            </select>
            {errores.promocion && (
              <p className="mt-1 text-sm text-red-600">{errores.promocion}</p>
            )}
          </div>

          {/* Campo: Ciclo */}
          <div>
            <label htmlFor="ciclo" className="block text-sm font-semibold text-gray-700 mb-2">
              Ciclo Formativo *
            </label>
            <select
              id="ciclo"
              value={ciclo}
              onChange={(e) => {
                setCiclo(e.target.value)
                limpiarError('ciclo')
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errores.ciclo 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              {ciclos.map((cicloOption) => (
                <option key={cicloOption} value={cicloOption}>
                  {cicloOption}
                </option>
              ))}
            </select>
            {errores.ciclo && (
              <p className="mt-1 text-sm text-red-600">{errores.ciclo}</p>
            )}
          </div>

          {/* Campo: URL de la imagen */}
          <div>
            <label htmlFor="imagen" className="block text-sm font-semibold text-gray-700 mb-2">
              URL de la Imagen *
            </label>
            <input
              id="imagen"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={imagen}
              onChange={(e) => {
                setImagen(e.target.value)
                limpiarError('imagen')
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errores.imagen 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errores.imagen && (
              <p className="mt-1 text-sm text-red-600">{errores.imagen}</p>
            )}
            {imagen && !errores.imagen && (
              <div className="mt-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                <img 
                  src={imagen} 
                  alt="Vista previa" 
                  className="h-24 w-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Error'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            {alumno ? 'Guardar Cambios' : 'Añadir Alumno'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}