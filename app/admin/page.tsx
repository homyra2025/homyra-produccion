'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    lat: '',
    lng: ''
  })
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = ''
    
    // Subir foto si existe
    if (image) {
      const filename = `${Date.now()}-${image.name}`
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filename, image)
      
      if (uploadError) {
        alert('Error al subir foto: ' + uploadError.message)
        setLoading(false)
        return
      }
      
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${filename}`
    }

    // Insertar propiedad
    const { error } = await supabase.from('properties').insert({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      address: form.address,
      lat: form.lat ? Number(form.lat) : null,
      lng: form.lng ? Number(form.lng) : null,
      image_url: imageUrl
    })
    
    if (!error) {
      alert('✅ Propiedad guardada correctamente!')
      setForm({ title: '', description: '', price: '', address: '', lat: '', lng: '' })
      setImage(null)
    } else {
      alert('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
              <p className="text-sm text-gray-500">Cargar nueva propiedad con foto</p>
            </div>
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">← Volver</a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg h-32" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio USD *</label>
                <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
            </div>

            {/* FOTO */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto de la propiedad</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)}
                className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            {/* COORDENADAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitud (para mapa)</label>
                <input type="number" step="0.000001" value={form.lat} onChange={e => setForm({...form, lat: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="-31.4201" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitud (para mapa)</label>
                <input type="number" step="0.000001" value={form.lng} onChange={e => setForm({...form, lng: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg" placeholder="-64.1888" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar Propiedad'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}// VERCEL CACHE BUST sábado, 15 de noviembre de 2025, 19:03:23 -03
