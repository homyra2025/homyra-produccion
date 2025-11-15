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
      <p className="text-gray-600 text-sm mb-3">{p.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-blue-600">
          ${new Intl.NumberFormat('es-AR').format(p.price)}
        </span>
        {p.address && <span className="text-xs text-gray-500">{p.address}</span>}
      </div>

      {/* Mapa placeholder (Google Maps vendrá después) */}
      {p.lat && p.lng && (
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-600 mb-1">📍 Ubicación en mapa</p>
          <p className="text-xs text-gray-500">
            Coordenadas: {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
          </p>
        </div>
      )}

      <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition">
        Contactar →
      </button>
    </div>
  </div>
))