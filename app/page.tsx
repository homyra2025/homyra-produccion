import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: properties } = await supabase.from('properties').select('*')
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Propiedades Homyra</h1>
      <div className="grid grid-cols-1 gap-4">
        {properties?.map((p) => (
          <div key={p.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-2xl font-bold mt-2">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}