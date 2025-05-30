import React from 'react'
import ProductForm from '../../../component/ProductForm'

export default function AddProductPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
            <ProductForm mode="add" initial={null} />
        </div>
        </main>
    )
}