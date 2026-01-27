import { Alumno } from "./alumno";
import { Avatar } from "./Avatar";
import './estilo.css';

export function ListaAlumnos({datosAlumno}){
    console.log(datosAlumno)
    return(
        <>

            {datosAlumno.map((a, indx)=>{

                return(
                    
                   <div className="divPrincipal">
                        <Alumno key={indx} nombre={a.nombre} apellido={a.apellido} grupo={a.grupo} promocion={a.promocion}>
                            <Avatar imagen={a.imagen}/>
                        </Alumno>
                   </div> 
                    
                )

            }

                )
                
            }
           
        </>
    )

}