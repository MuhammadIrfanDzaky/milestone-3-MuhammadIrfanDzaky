import React from 'react'
import ProductForm from '../../../../component/ProductForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }) {
    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${params.id}`,
        { cache: 'no-store' }
    )

    if (!res.ok) return notFound()
    const product = await res.json()

    return (
        <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
            <ProductForm mode="edit" initial={product} />
        </div>
        </main>
    )
}