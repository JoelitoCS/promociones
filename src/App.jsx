import './App.css'
import { SelectorPromocion } from './components/SelectorPromocion'
import { ListaAlumnos } from './components/ListaAlumnos'
import { useState, useEffect } from 'react'
import { InputNombre } from './components/InputNombre'
import { FormularioAlumno } from './components/FormularioAlumno'
import Login from './components/Login'
import { InfoAdmin } from './components/InfoAdmin'
import { alumnosService } from './services/alumnosService' // 👈 IMPORTAR EL SERVICIO

export default function App(){

  // --- DATOS INICIALES ---
  const datosPromos = ["24/25", "25/26"]

  // --- ESTADOS DE AUTENTICACIÓN ---
  const [usuarioLogueado, setUsuarioLogueado] = useState(false)
  const [esAdmin, setEsAdmin] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState("")

  // --- ESTADOS DE FILTROS ---
  const [nombre, setNombre] = useState("")
  const [promocion, setPromocion] = useState("")

  // --- ESTADOS DE ALUMNOS (CRUD) ---
  const [datosAlumno, setDatosAlumno] = useState([])
  
  // 👇 NUEVOS ESTADOS PARA MANEJAR CARGA Y ERRORES
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // --- ESTADOS DEL FORMULARIO ---
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const [alumnoEditando, setAlumnoEditando] = useState(null)

  // --- EFECTO: Cargar autenticación desde localStorage al iniciar ---
  useEffect(() => {
    const authData = localStorage.getItem('authData')
    if (authData) {
      const { usuarioLogueado, esAdmin, nombreUsuario } = JSON.parse(authData)
      setUsuarioLogueado(usuarioLogueado)
      setEsAdmin(esAdmin)
      setNombreUsuario(nombreUsuario)
    }
  }, [])

  // --- EFECTO: Cargar alumnos desde la API al iniciar ---
  // 👇 REEMPLAZAR ESTE useEffect COMPLETO
  useEffect(() => {
    if (usuarioLogueado) {
      cargarAlumnos()
    }
  }, [usuarioLogueado])

  // 👇 NUEVA FUNCIÓN PARA CARGAR ALUMNOS DESDE LA API
  const cargarAlumnos = async () => {
    try {
      setLoading(true)
      setError(null)
      const alumnos = await alumnosService.obtenerTodos()
      setDatosAlumno(alumnos)
    } catch (err) {
      setError('Error al cargar los alumnos. Por favor, intenta de nuevo.')
      console.error('Error al cargar alumnos:', err)
    } finally {
      setLoading(false)
    }
  }

  // 👇 ELIMINAR ESTOS useEffect QUE GUARDABAN EN LOCALSTORAGE
  // useEffect(() => {
  //   if (datosAlumno.length > 0) {
  //     localStorage.setItem('alumnos', JSON.stringify(datosAlumno))
  //   }
  // }, [datosAlumno])

  // --- EFECTO: Guardar autenticación en localStorage cada vez que cambia ---
  useEffect(() => {
    const authData = {
      usuarioLogueado,
      esAdmin,
      nombreUsuario
    }
    localStorage.setItem('authData', JSON.stringify(authData))
  }, [usuarioLogueado, esAdmin, nombreUsuario])

  // --- FUNCIÓN: Manejar login exitoso ---
  const handleLogin = (userData) => {
    setUsuarioLogueado(true)
    setEsAdmin(userData.esAdmin)
    setNombreUsuario(userData.username)
  }

  // --- FUNCIÓN: Manejar logout ---
  const handleLogout = () => {
    setUsuarioLogueado(false)
    setEsAdmin(false)
    setNombreUsuario("")
    localStorage.removeItem('authData')
  }

  // 👇 MODIFICAR FUNCIÓN CREAR ALUMNO
  const crearAlumno = async (nuevoAlumno) => {
  try {
    setError(null)
  
    // NO añadas el id aquí, MongoDB lo genera automáticamente como _id
    const alumnoCreado = await alumnosService.crear(nuevoAlumno)
    setDatosAlumno([...datosAlumno, alumnoCreado])
    setFormularioAbierto(false)
  } catch (err) {
    setError('Error al crear el alumno. Por favor, intenta de nuevo.')
    console.error('Error al crear alumno:', err)
  }
}

  // 👇 MODIFICAR FUNCIÓN EDITAR ALUMNO
  const editarAlumno = async (alumnoEditado) => {
  try {
    setError(null)
    // MongoDB usa _id
    const id = alumnoEditado._id
    const alumnoActualizado = await alumnosService.actualizar(id, alumnoEditado)
    
    setDatosAlumno(
      datosAlumno.map(alumno => 
        alumno._id === id ? alumnoActualizado : alumno
      )
    )
    setFormularioAbierto(false)
    setAlumnoEditando(null)
  } catch (err) {
    setError('Error al editar el alumno. Por favor, intenta de nuevo.')
    console.error('Error al editar alumno:', err)
  }
}

  // 👇 MODIFICAR FUNCIÓN ELIMINAR ALUMNO
  const eliminarAlumno = async (id) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
    try {
      setError(null)
      await alumnosService.eliminar(id)
      setDatosAlumno(datosAlumno.filter(alumno => alumno._id !== id))
    } catch (err) {
      setError('Error al eliminar el alumno. Por favor, intenta de nuevo.')
      console.error('Error al eliminar alumno:', err)
    }
  }
}

  const abrirFormularioCrear = () => {
    setAlumnoEditando(null)
    setFormularioAbierto(true)
  }

  const abrirFormularioEditar = (alumno) => {
    setAlumnoEditando(alumno)
    setFormularioAbierto(true)
  }

  const cerrarFormulario = () => {
    setFormularioAbierto(false)
    setAlumnoEditando(null)
  }

  // --- FILTRADO DE ALUMNOS (mantener igual) ---
  const datosFiltrados = datosAlumno.filter((d) => {
    let okP = (d.promocion === promocion || promocion === "")
    let okN = (d.nombre.toLowerCase().includes(nombre.toLowerCase()) || nombre === "")
    return okP && okN  
  })

  // --- RENDERIZADO CONDICIONAL: Si no está logueado, mostrar Login ---
  if (!usuarioLogueado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Login onLogin={handleLogin} />
      </div>
    )
  }

  // 👇 AGREGAR ESTADO DE CARGA
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Cargando alumnos...</p>
        </div>
      </div>
    )
  }

  // --- RENDERIZADO PRINCIPAL: Dashboard de alumnos ---
  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header con información de usuario */}
      <div className="bg-white shadow-lg border-b-2 border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <InfoAdmin 
            nombreUsuario={nombreUsuario} 
            esAdmin={esAdmin} 
            onLogout={handleLogout} 
          />
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-4 py-8">
        
        {/* 👇 MOSTRAR ERRORES SI EXISTEN */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError(null)}
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

        {esAdmin && (
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
              {datosFiltrados.length}
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

      {formularioAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
            <FormularioAlumno
              alumno={alumnoEditando}
              onSubmit={alumnoEditando ? editarAlumno : crearAlumno}
              onCancel={cerrarFormulario}
            />
          </div>
        </div>
      )}
    </div>
  )
}