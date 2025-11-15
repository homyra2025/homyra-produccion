import { supabase } from '@/lib/supabase'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error:', error)
    return <div className="text-red-500 p-8">Error: {error.message}</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Homyra Propiedades</h1>
              <p className="text-sm text-gray-500">Inmobiliaria Matías Caballero</p>
            </div>
            <a 
              href="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Panel Admin
            </a>
          </div>
        </div>
      </header>

      {/* Properties Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Propiedades Disponibles</h2>
          <p className="text-gray-500">{properties?.length || 0} propiedades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties && properties.length > 0 ? (
            properties.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                {/* Image placeholder */}
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Sin foto</span>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      ${new Intl.NumberFormat('es-AR').format(p.price)}
                    </span>
                    {p.address && (
                      <span className="text-xs text-gray-500">{p.address}</span>
                    )}
                  </div>

                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay propiedades</h3>
              <p className="text-gray-500">Cargá la primera propiedad desde el panel admin</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}