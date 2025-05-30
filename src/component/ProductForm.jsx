'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductForm({ initial = null, mode = 'add' }) {
    const router = useRouter()
    const [title, setTitle] = useState(initial?.title || '')
    const [price, setPrice] = useState(initial?.price || '')
    const [description, setDescription] = useState(initial?.description || '')
    const [image, setImage] = useState(initial?.images?.[0] || '')
    const [category, setCategory] = useState(initial?.category?.id || '')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    // Redirect to /admin if editing but no initial data is provided
    useEffect(() => {
        if (mode === 'edit' && initial === null) {
        router.push('/admin')
        }
    }, [initial, mode, router])

    const handleSubmit = async e => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        const payload = {
        title,
        price: parseFloat(price),
        description,
        categoryId: parseInt(category),
        images: [image],
        }

        try {
        let res
        if (mode === 'add') {
            res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            })
        } else {
            res = await fetch(`/api/products/${initial.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            })
        }

        if (!res.ok) throw new Error('Save failed')
        router.push('/admin')
        } catch (err) {
        setError(err.message)
        setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold">{mode === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            rows={4}
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
            type="url"
            value={image}
            onChange={e => setImage(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Category ID</label>
            <input
            type="number"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            />
        </div>

        <div className="flex justify-end">
            <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-white rounded shadow hover:opacity-90 transition cursor-pointer"
            >
            {saving ? 'Saving…' : mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
        </div>
        </form>
    )
}