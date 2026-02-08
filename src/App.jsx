import './App.css' // importo los estilos generales
import { SelectorPromocion } from './components/SelectorPromocion' // componente para seleccionar promoción
import { ListaAlumnos } from './components/ListaAlumnos' // componente que muestra la lista de alumnos
import { useState, useEffect } from 'react' // hooks de React
import { InputNombre } from './components/InputNombre' // input para filtrar por nombre
import { FormularioAlumno } from './components/FormularioAlumno' // formulario para crear o editar alumno
import Login from './components/Login' // pantalla de login
import { InfoAdmin } from './components/InfoAdmin' // header con info del usuario logueado
import { alumnosService } from './services/alumnosService' // funciones para interactuar con la API de alumnos

export default function App(){

  const datosPromos = ["24/25", "25/26"] // promociones disponibles para filtros

  const [usuarioLogueado, setUsuarioLogueado] = useState(false) // si hay un usuario logueado
  const [esAdmin, setEsAdmin] = useState(false) // si el usuario es administrador
  const [nombreUsuario, setNombreUsuario] = useState("") // nombre del usuario logueado

  const [nombre, setNombre] = useState("") // filtro por nombre
  const [promocion, setPromocion] = useState("") // filtro por promoción

  const [datosAlumno, setDatosAlumno] = useState([]) // lista de alumnos traídos de la API
  const [loading, setLoading] = useState(true) // indica si se está cargando información
  const [error, setError] = useState(null) // mensaje de error si algo falla

  const [formularioAbierto, setFormularioAbierto] = useState(false) // controla si se muestra el formulario
  const [alumnoEditando, setAlumnoEditando] = useState(null) // alumno que se está editando

  useEffect(() => {
    const authData = localStorage.getItem('authData') // leo la info de login guardada
    if (authData) {
      const { usuarioLogueado, esAdmin, nombreUsuario } = JSON.parse(authData)
      setUsuarioLogueado(usuarioLogueado) // actualizo estado de login
      setEsAdmin(esAdmin) // actualizo rol de usuario
      setNombreUsuario(nombreUsuario) // actualizo nombre
    }
  }, []) // se ejecuta solo al montar la app

  useEffect(() => {
    if (usuarioLogueado) {
      cargarAlumnos() // traigo los alumnos si hay usuario logueado
    }
  }, [usuarioLogueado]) // se ejecuta cada vez que cambia el login

  const cargarAlumnos = async () => {
    try {
      setLoading(true) // activo spinner de carga
      setError(null) // limpio errores previos
      const alumnos = await alumnosService.obtenerTodos() // llamo a la API
      setDatosAlumno(alumnos) // guardo los alumnos en el estado
    } catch (err) {
      setError('Error al cargar los alumnos. Por favor, intenta de nuevo.') // muestro error
      console.error('Error al cargar alumnos:', err)
    } finally {
      setLoading(false) // desactivo spinner
    }
  }

  useEffect(() => {
    const authData = { usuarioLogueado, esAdmin, nombreUsuario } 
    localStorage.setItem('authData', JSON.stringify(authData)) // guardo login en localStorage
  }, [usuarioLogueado, esAdmin, nombreUsuario]) // cada vez que cambian estos estados

  const handleLogin = (userData) => {
    setUsuarioLogueado(true) // marco como logueado
    setEsAdmin(userData.esAdmin) // guardo si es admin
    setNombreUsuario(userData.username) // guardo el nombre
  }

  const handleLogout = () => {
    setUsuarioLogueado(false) // marco como deslogueado
    setEsAdmin(false) // quito rol de admin
    setNombreUsuario("") // limpio nombre
    localStorage.removeItem('authData') // borro login del localStorage
  }

  const crearAlumno = async (nuevoAlumno) => {
    try {
      setError(null) // limpio errores
      const alumnoCreado = await alumnosService.crear(nuevoAlumno) // llamo a la API para crear
      setDatosAlumno([...datosAlumno, alumnoCreado]) // agrego alumno nuevo al estado
      setFormularioAbierto(false) // cierro formulario
    } catch (err) {
      setError('Error al crear el alumno. Por favor, intenta de nuevo.') // muestro error
      console.error('Error al crear alumno:', err)
    }
  }


  //en este caso, como en mongo db no es id a secas, le ponesmos _id para que tenga el mismo formato y se pueda editar bien los alumnos

  const editarAlumno = async (alumnoEditado) => {
    try {
      setError(null)
      const id = alumnoEditado._id // tomo el id del alumno
      const alumnoActualizado = await alumnosService.actualizar(id, alumnoEditado) // llamo a la API
      setDatosAlumno(
        datosAlumno.map(alumno => 
          alumno._id === id ? alumnoActualizado : alumno // reemplazo el alumno editado
        )
      )
      setFormularioAbierto(false) // cierro formulario
      setAlumnoEditando(null) // limpio estado de edición
    } catch (err) {
      setError('Error al editar el alumno. Por favor, intenta de nuevo.')
      console.error('Error al editar alumno:', err)
    }
  }

  const eliminarAlumno = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este alumno?')) { // confirmacion
      try {
        setError(null)
        await alumnosService.eliminar(id) // llamo a la API para eliminar
        setDatosAlumno(datosAlumno.filter(alumno => alumno._id !== id)) // actualizo estado
      } catch (err) {
        setError('Error al eliminar el alumno. Por favor, intenta de nuevo.')
        console.error('Error al eliminar alumno:', err)
      }
    }
  }

  const abrirFormularioCrear = () => {
    setAlumnoEditando(null) // limpio cualquier alumno previo
    setFormularioAbierto(true) // abro formulario
  }

  const abrirFormularioEditar = (alumno) => {
    setAlumnoEditando(alumno) // pongo el alumno a editar
    setFormularioAbierto(true) // abro formulario
  }

  const cerrarFormulario = () => {
    setFormularioAbierto(false) // cierro formulario
    setAlumnoEditando(null) // limpio alumno editando
  }

  const datosFiltrados = datosAlumno.filter((d) => { 
    let okP = (d.promocion === promocion || promocion === "") // filtro por promoción
    let okN = (d.nombre.toLowerCase().includes(nombre.toLowerCase()) || nombre === "") // filtro por nombre
    return okP && okN  
  })

  if (!usuarioLogueado) { // si no esta logueado, muestro login
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Login onLogin={handleLogin} />
      </div>
    )
  }

  if (loading) { // muestro spinner mientras carga
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Cargando alumnos...</p>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-lg border-b-2 border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <InfoAdmin 
            nombreUsuario={nombreUsuario} 
            esAdmin={esAdmin} 
            onLogout={handleLogout} 
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && ( // muestro mensaje de error si hay
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)} // cierro el mensaje
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">🔍 Filtros de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📅 Promoción: <span className="text-blue-700 font-bold">{promocion || "Todas"}</span>
              </label>
              <SelectorPromocion 
                datosPromos={datosPromos} 
                promocion={promocion} 
                setPromocion={setPromocion} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👤 Buscar por nombre: <span className="text-blue-700 font-bold">{nombre || "Todos"}</span>
              </label>
              <InputNombre 
                datosNombre={datosFiltrados} 
                nombre={nombre} 
                setNombre={setNombre} 
              />
            </div>
          </div>
        </div>

        {esAdmin && ( // botón para añadir alumno si es admin
          <div className="mb-6 flex justify-end">
            <button
              onClick={abrirFormularioCrear}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105 border-2 border-green-500"
            >
              ➕ Añadir Alumno
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            👥 Lista de Alumnos 
            <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              {datosFiltrados.length} // número de alumnos filtrados
            </span>
          </h2>
          <ListaAlumnos 
            datosAlumno={datosFiltrados} 
            esAdmin={esAdmin} 
            onEdit={abrirFormularioEditar} 
            onDelete={eliminarAlumno} 
          />
        </div>
      </div>

      {formularioAbierto && ( // muestro formulario si está abierto
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
            <FormularioAlumno
              alumno={alumnoEditando} // paso alumno si estoy editando
              onSubmit={alumnoEditando ? editarAlumno : crearAlumno} // si hay alumno, edito, si no creo
              onCancel={cerrarFormulario} // cerrar formulario
            />
          </div>
        </div>
      )}
    </div>
  )
}
