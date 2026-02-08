import { Avatar } from './Avatar'


export function Alumno({ alumno, esAdmin, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start gap-4">
        {/* Avatar del alumno */}
        <div className="flex-shrink-0">
          <Avatar imagen={alumno.urlImagen} />
          
        </div>

        {/* Información del alumno */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {alumno.nombre} {alumno.apellidos}
          </h3>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Promoción:</span> {alumno.promocion}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Ciclo:</span> {alumno.ciclo}
            </p>
          </div>

          {/* Badge del ciclo */}
          <div className="mt-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {alumno.ciclo}
            </span>
          </div>
        </div>

        {/* Iconos de acción (solo visibles para administradores) */}
        {esAdmin && (
          <div className="flex flex-col gap-2">
            {/* Botón de editar */}
            <button
              onClick={onEdit}
              className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              title="Editar alumno"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            {/* Botón de eliminar */}
            <button
              onClick={onDelete}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              title="Eliminar alumno"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}