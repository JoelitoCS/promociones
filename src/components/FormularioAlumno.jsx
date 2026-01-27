export function FormularioAlumno(){
    return(
        <div>
            <h2>Formulario de Alumno</h2>
            <form action="GET">
                <input type="text" placeholder="Nombre" required/>
                <input type="text" placeholder="Apellido" required/>
                <input type="text" placeholder="Promocion" required/>
                <select name="ciclo" id="ciclo">
                    <option value="DAW">DAW</option>
                    <option value="SMX">SMX</option>
                    <option value="ARI">ARI</option>
                    <option value="IEA">IEA</option>
                </select>
            </form>
        </div>
    )
}