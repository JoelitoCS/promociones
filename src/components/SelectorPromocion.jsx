/**
 * Componente SelectorPromocion - Selector para filtrar por promoción
 */
export function SelectorPromocion({ datosPromos, promocion, setPromocion }) {
  return (
    <select value={promocion} onChange={(e) => setPromocion(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    >
      <option value="">Todas las promociones</option>
      {datosPromos.map((promo) => (
        <option key={promo} value={promo}>
          {promo}
        </option>
      ))}
    </select>
  )
}