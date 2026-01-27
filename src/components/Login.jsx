import { useState } from 'react'

/**
 * Componente Login - Gestiona la autenticación de usuarios
 * 
 * Características:
 * - Validación de credenciales
 * - Identificación de usuarios administradores
 * - Mensajes de error
 * - Diseño responsive con Tailwind CSS
 * 
 * Props:
 * @param {Function} onLogin - Callback que se ejecuta al hacer login exitoso
 */
export default function Login({ onLogin }) {
  // Estados para el formulario
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Credenciales de administrador (en producción esto estaría en un backend)
  const adminCredenciales = {
    username: 'admin',
    password: 'admin123'
  }

  // Credenciales de usuario normal (ejemplo)
  const userCredenciales = {
    username: 'user',
    password: 'user123'
  }

  /**
   * Maneja el envío del formulario de login
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Prevenir recarga de página
    
    // Limpiar mensaje de error anterior
    setError('')

    // Validar que los campos no estén vacíos
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos')
      return
    }

    // Verificar si es admin
    if (usuario === adminCredenciales.username && password === adminCredenciales.password) {
      onLogin({
        username: usuario,
        esAdmin: true
      })
      return
    }

    // Verificar si es usuario normal
    if (usuario === userCredenciales.username && password === userCredenciales.password) {
      onLogin({
        username: usuario,
        esAdmin: false
      })
      return
    }

    // Si no coincide ninguna credencial
    setError('Usuario o contraseña incorrectos')
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header del formulario */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-2">Bienvenido</h2>
          <p className="text-center text-blue-100">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Campo de usuario */}
          <div className="mb-6">
            <label htmlFor="usuario" className="block text-gray-700 font-semibold mb-2">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Introduce tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              autoComplete="username"
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              autoComplete="current-password"
            />
          </div>

          {/* Botón de submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </button>

          {/* Información de credenciales de prueba */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 font-semibold mb-2">Credenciales de prueba:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Admin:</strong> usuario: admin / contraseña: admin123</p>
              <p><strong>Usuario:</strong> usuario: user / contraseña: user123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}