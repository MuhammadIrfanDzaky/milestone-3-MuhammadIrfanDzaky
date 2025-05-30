'use client'
import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductDetail({ product }) {
    const { addToCart } = useCart()
    const [qty, setQty] = useState(1)

    const increment = () => setQty(q => q + 1)
    const decrement = () => setQty(q => (q > 1 ? q - 1 : 1))

    return (
        <div className="flex justify-center mb-3 mt-20">
            <section className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/2 p-4 flex items-center justify-center">
                    <img src={product.images[0]} alt={product.title} className="object-contain max-h-96" />
                </div>

                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        <p className="text-3xl font-semibold mb-4">${product.price}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={decrement} className="px-3 py-1 bg-gray-200 rounded-lg cursor-pointer">-</button>
                        <span className="px-4 py-1 border rounded-lg">{qty}</span>
                        <button onClick={increment} className="px-3 py-1 bg-gray-200 rounded-lg cursor-pointer">+</button>
                    </div>

                    <button
                        onClick={() => addToCart(product, qty)}
                        className="w-40 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </section>
        </div>
    )
}