import './App.css'
import { Alumno } from './components/alumno'
import { SelectorPromocion } from './components/SelectorPromocion'
import { ListaAlumnos } from './components/ListaAlumnos'
import { useState, useEffect } from 'react'
import { InputNombre } from './components/InputNombre'
import { FormularioAlumno } from './components/FormularioAlumno'
import Login from './components/Login'
import { InfoAdmin } from './components/InfoAdmin'

export default function App(){

  // --- DATOS INICIALES ---
  const datosPromos = ["24/25", "25/26"]
  
  // Datos iniciales de alumnos (se usan solo si no hay datos en localStorage)
  const datosAlumnoIniciales = [
    {
      id: 1, // Añadimos ID único para cada alumno
      nombre: "Joel",
      apellido: "Cano",
      promocion: "24/25",
      ciclo: "DAW",
      imagen: "https://png.pngtree.com/png-vector/20251030/ourmid/pngtree-cristiano-ronaldo-football-player-celebrating-goal-illustration-png-image_17856069.webp"
    },
    {
      id: 2,
      nombre: "Guadalupe",
      apellido: "CR7",
      promocion: "24/25",
      ciclo: "DAW",
      imagen: "https://png.pngtree.com/png-vector/20251030/ourmid/pngtree-cristiano-ronaldo-football-player-celebrating-goal-illustration-png-image_17856069.webp"
    },
    {
      id: 3,
      nombre: "Ivan",
      apellido: "Garciote",
      promocion: "25/26",
      ciclo: "SMX",
      imagen:"https://wallpapers.com/images/hd/lionel-messi-barcelona-portrait-oyw8o6mkx7o39j4m.jpg"
    },
    {
      id: 4,
      nombre: "Santo",
      apellido: "Messias",
      promocion: "25/26",
      ciclo: "SMX",
      imagen:"https://wallpapers.com/images/hd/lionel-messi-barcelona-portrait-oyw8o6mkx7o39j4m.jpg"
    }
  ]

  // --- ESTADOS DE AUTENTICACIÓN ---
  const [usuarioLogueado, setUsuarioLogueado] = useState(false)
  const [esAdmin, setEsAdmin] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState("")

  // --- ESTADOS DE FILTROS ---
  const [nombre, setNombre] = useState("")
  const [promocion, setPromocion] = useState("")

  // --- ESTADOS DE ALUMNOS (CRUD) ---
  const [datosAlumno, setDatosAlumno] = useState([])

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
  }, []) // Solo se ejecuta al montar el componente

  // --- EFECTO: Cargar alumnos desde localStorage al iniciar ---
  useEffect(() => {
    const alumnosGuardados = localStorage.getItem('alumnos')
    if (alumnosGuardados) {
      setDatosAlumno(JSON.parse(alumnosGuardados))
    } else {
      // Si no hay datos en localStorage, usar datos iniciales
      setDatosAlumno(datosAlumnoIniciales)
    }
  }, []) // Solo se ejecuta al montar el componente

  // --- EFECTO: Guardar alumnos en localStorage cada vez que cambian ---
  useEffect(() => {
    if (datosAlumno.length > 0) {
      localStorage.setItem('alumnos', JSON.stringify(datosAlumno))
    }
  }, [datosAlumno]) // Se ejecuta cada vez que datosAlumno cambia

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

  // --- FUNCIÓN CRUD: Crear alumno ---
  const crearAlumno = (nuevoAlumno) => {
    // Generar un ID único basado en timestamp
    const alumnoConId = {
      ...nuevoAlumno,
      id: Date.now()
    }
    setDatosAlumno([...datosAlumno, alumnoConId])
    setFormularioAbierto(false)
  }

  // --- FUNCIÓN CRUD: Editar alumno ---
  const editarAlumno = (alumnoEditado) => {
    setDatosAlumno(
      datosAlumno.map(alumno => 
        alumno.id === alumnoEditado.id ? alumnoEditado : alumno
      )
    )
    setFormularioAbierto(false)
    setAlumnoEditando(null)
  }

  // --- FUNCIÓN CRUD: Eliminar alumno ---
  const eliminarAlumno = (id) => {
    // Confirmación antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
      setDatosAlumno(datosAlumno.filter(alumno => alumno.id !== id))
    }
  }

  // --- FUNCIÓN: Abrir formulario en modo CREAR ---
  const abrirFormularioCrear = () => {
    setAlumnoEditando(null)
    setFormularioAbierto(true)
  }

  // --- FUNCIÓN: Abrir formulario en modo EDITAR ---
  const abrirFormularioEditar = (alumno) => {
    setAlumnoEditando(alumno)
    setFormularioAbierto(true)
  }

  // --- FUNCIÓN: Cerrar formulario ---
  const cerrarFormulario = () => {
    setFormularioAbierto(false)
    setAlumnoEditando(null)
  }

  // --- FILTRADO DE ALUMNOS ---
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
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">🔍 Filtros de búsqueda</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filtro por promocion */}
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

            {/* Filtro por nombre */}
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

        {/* Botónnn para añadir alumno (solo visible para admins) */}
        {esAdmin && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={abrirFormularioCrear}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105 border-2 border-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              ➕ Añadir Alumno
            </button>
          </div>
        )}

        {/* Lista de alumnos */}
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

      {/* Modal del formulario (se muestra cuando formularioAbierto es true) */}
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