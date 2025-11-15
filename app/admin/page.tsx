'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.from('properties').insert({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      address: form.address
    })
    
    if (!error) {
      alert('✅ Propiedad guardada correctamente!')
      setForm({ title: '', description: '', price: '', address: '' })
    } else {
      alert('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500">Cargar nueva propiedad</p>
            </div>
            <a 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              ← Volver al sitio
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título de la propiedad *
              </label>
              <input 
                type="text" 
                placeholder="Ej: Casa en Country Barrio URCA"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción completa *
              </label>
              <textarea 
                placeholder="Describe la propiedad con detalles clave..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <input 
                  type="number" 
                  placeholder="450000"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: Country Barrancas, Córdoba"
                  value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Propiedad'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}