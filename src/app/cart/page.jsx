'use client'

import React from 'react'
import Navbar from '../../component/Navbar'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import Footer from '../../component/Footer'

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart()
    const router = useRouter()
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div>
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto space-y-6 mt-18">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
            ) : (
            <>
                <div className="space-y-4">
                {cart.map(item => (
                    <div
                    key={item.id}
                    className="flex justify-between items-center bg-white p-4 rounded shadow"
                    >
                    <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">
                        {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover: cursor-pointer transition"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                </div>

                <div className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>

                <div className="flex justify-between items-center">
                {/* Clear Cart */}
                <button
                    onClick={() => clearCart()}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer transition"
                >
                    Clear Cart
                </button>

                {/* Checkout Button */}
                <button
                    onClick={() => router.push('/checkout')}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Checkout
                </button>
                </div>
            </>
            )}
        </main>
        <Footer />
        </div>
    )
}
