import { supabase } from '@/lib/supabase'

export const revalidate = 0 // NO CACHEAR NUNCA
export const dynamic = 'force-dynamic' // Forzar render dinámico

export default async function Home() {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching properties:', error)
    return <div>Error: {error.message}</div>
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Propiedades Homyra</h1>
      <div className="grid grid-cols-1 gap-4">
        {properties && properties.length > 0 ? (
          properties.map((p) => (
            <div key={p.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-2xl font-bold mt-2">${p.price}</p>
            </div>
          ))
        ) : (
          <div>No hay propiedades cargadas</div>
        )}
      </div>
    </div>
  )
}