export function SelectorPromocion({datosPromos, setPromocion}){
    
    console.log(datosPromos)

    

    return(
        <>
         
            <select onChange={(e) => setPromocion(e.target.value)} name="selectPromo" id="selectPromo">
                <option value="promo">Selecciona la promoción</option>
                {datosPromos.map((p, index)=>(
                        <option key={index} value={p}>Promocion: {p}</option>
                    )

                )
                
                }

            </select>
        </>

    )
}