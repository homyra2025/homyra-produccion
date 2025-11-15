import { supabase } from '@/lib/supabase'
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
              <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Foto o placeholder */}
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-56 object-cover" />
                ) : (
                  <div className="bg-gray-200 h-56 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sin foto</span>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${new Intl.NumberFormat('es-AR').format(p.price)}
                    </span>
                    {p.address && (
                      <span className="text-xs text-gray-500">{p.address}</span>
                    )}
                  </div>

                  {/* Mapa placeholder */}
                  {p.lat && p.lng && (
                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-600 mb-1">📍 Ubicación en mapa</p>
                      <p className="text-xs text-gray-500">
                        {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                      </p>
                    </div>
                  )}

                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    Contactar →
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
