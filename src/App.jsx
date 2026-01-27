import './App.css'
import { Alumno } from './components/alumno'
import { Avatar } from './components/Avatar'
import { SelectorPromocion } from './components/SelectorPromocion'
import { ListaAlumnos } from './components/ListaAlumnos'
import { useState } from 'react'
import { InputNombre } from './components/InputNombre'

export default function App(){

const datosPromos = ["24/25" , "25/26"]
const datosNombre= ["Joel" , "Ivan"]
const datosApellido=["Cano", "Garciote"]
const datosAlumno = [
  {
    nombre: "Joel",
    apellido: "Cano",
    promocion: "24/25",
    grupo: "DAW (para mas listos)",
    imagen: "https://png.pngtree.com/png-vector/20251030/ourmid/pngtree-cristiano-ronaldo-football-player-celebrating-goal-illustration-png-image_17856069.webp"
  },
  {
    nombre: "Guadalupe",
    apellido: "CR7",
    promocion: "24/25",
    grupo: "DAW (para mas listos)",
    imagen: "https://png.pngtree.com/png-vector/20251030/ourmid/pngtree-cristiano-ronaldo-football-player-celebrating-goal-illustration-png-image_17856069.webp"
  },

  {
    nombre: "Ivan",
    apellido: "Garciote",
    promocion: "25/26",
    grupo: "DAW (para tontos)",
    imagen:"https://wallpapers.com/images/hd/lionel-messi-barcelona-portrait-oyw8o6mkx7o39j4m.jpg"
  },
  {
    nombre: "Santo",
    apellido: "Messias",
    promocion: "25/26",
    grupo: "DAW (para tontos)",
    imagen:"https://wallpapers.com/images/hd/lionel-messi-barcelona-portrait-oyw8o6mkx7o39j4m.jpg"
  }
]
  const [nombre, setNombre]=useState("")
  const [promocion, setPromocion]=useState("")
  const [apellido, setApellido]=useState("")
  const [ciclo, setCiclo]=useState()

  const datosFiltrados = datosAlumno.filter((d)=> {

    let okP = (d.promocion === promocion || promocion ==="")
    let okN = (d.nombre.includes(nombre) || nombre === "")
    
    return okP && okN  
  })



  function controlPromocion(e){
    console.log("Ejecutando control promo")
    console.log(e.target.value)
    setPromocion(datosPromos[e.target.value])
  }

  function controlNombre (e){
    console.log(e.target.value)
    setNombre(datosNombre[e.target.value])
  }

 
  
  return(
    
    <div>
        
        <div className='selectProm'>
          <h2>Promoción: {promocion} </h2>
          <SelectorPromocion datosPromos={datosPromos} promocion={promocion} setPromocion = {setPromocion} />
        </div>

        <div className='selectName'>
          <h2>Nombre: {nombre}</h2>
          <InputNombre datosNombre={datosFiltrados} nombre={nombre} setNombre={setNombre} />
        </div>
      
        <div className='flex justify-center mt-5 '>
          <ListaAlumnos datosAlumno={datosFiltrados} />
        </div>
     
    </div>
  )

   

}