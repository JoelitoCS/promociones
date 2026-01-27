import "./estilo.css";
import { Pen, Trash } from "lucide-react";
import { Pencil } from "lucide-react";

/*
 nombre: "Pepe",
    apellido: "Sanchez",
    promocion: "24/25",
    grupo: "DAW"


*/

export function Alumno({
  nombre,
  apellido,
  promocion,
  grupo,
  onEdit,
  onDelete,
  children,
}) {
  return (
    <div>
      <div>
        {children}
        <div>
          <span>{nombre}</span>
          <span>{apellido}</span>
        </div>
        <div>
          <span>{grupo}</span>
          <span>{promocion}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="bg-gray-300 hover:bg-blue-900
               transition-colors duration-500 ease-in-out
               p-2 rounded"
          >
            <Trash className="w-4 h-4" />
          </button>

          <button
            onClick={onEdit}
            className="bg-gray-300 hover:bg-blue-900
               transition-colors duration-500 ease-in-out
               p-2 rounded"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
