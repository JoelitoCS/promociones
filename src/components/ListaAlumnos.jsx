import { Alumno } from "./Alumno"

export function ListaAlumnos(props) {

  if (!props.datosAlumno || props.datosAlumno.length === 0) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay alumnos</h3>
        <p className="text-gray-500">
          {props.esAdmin 
            ? 'Haz clic en "Añadir Alumno" para comenzar' 
            : 'No se encontraron alumnos con los filtros seleccionados'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.datosAlumno.map((alumno) => (
        <Alumno
          key={alumno._id}
          alumno={alumno}
          esAdmin={props.esAdmin}
          onEdit={() => props.onEdit(alumno)}
          onDelete={() => props.onDelete(alumno._id)}
        />
      ))}
    </div>
  )
}