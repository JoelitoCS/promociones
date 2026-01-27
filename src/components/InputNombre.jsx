export function InputNombre({setNombre}){

    return(
        <>
         
        <input type="text" onChange={(e)=> setNombre(e.target.value)}></input>
                
        </>

    )



}