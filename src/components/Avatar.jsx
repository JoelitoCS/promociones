export function Avatar({imagen}){
    return(
    <div>
        <div className='imagenUser'>
            <img src={imagen} alt="Usuario" />
        </div>
    </div>
    
    )
}