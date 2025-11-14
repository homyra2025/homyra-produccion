'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase.from('properties').insert({
      title,
      description,
      price: Number(price)
    })
    
    if (!error) {
      alert('Propiedad guardada!')
      setTitle('')
      setDescription('')
      setPrice('')
    } else {
      alert('Error: ' + error.message)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cargar Propiedad</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <textarea 
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border mb-4 h-32"
        />
        <input 
          type="number" 
          placeholder="Precio"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Guardar Propiedad
        </button>
      </form>
    </div>
  )
}