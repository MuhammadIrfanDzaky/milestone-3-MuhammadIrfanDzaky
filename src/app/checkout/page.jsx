'use client'

import Navbar from '../../component/Navbar'
import { useCart } from '../../context/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Footer from '../../component/Footer'

export default function CheckoutPage() {
    const { cart, clearCart } = useCart()
    const { data: session, status } = useSession()
    const router = useRouter()

    // Client-side safeguard in case middleware fails:
    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push('/auth/login')
        }
    }, [status, router])

    // Calculate totals
    const lineItems = cart.map(item => ({
        ...item,
        lineTotal: item.price * item.quantity,
    }))
    const grandTotal = lineItems.reduce((sum, i) => sum + i.lineTotal, 0)

    return (
        <div>
        <Navbar />
        <main className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            
            {cart.length === 0 ? (
            <p>Your cart is empty.</p>
            ) : (
            <>
                {/* Cart Summary */}
                <div className="space-y-4">
                {lineItems.map(item => (
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
                    <p className="font-semibold">${item.lineTotal.toFixed(2)}</p>
                    </div>
                ))}
                </div>

                {/* Grand Total */}
                <div className="text-right text-xl font-bold">
                Total: ${grandTotal.toFixed(2)}
                </div>

                {/* Payment Options */}
                <fieldset className="space-y-2">
                    <legend className="font-medium">Select Payment Method:</legend>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="COD" />
                        Cash-On-Delivery (COD)
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="CreditCard" />
                        Credit/Debit Card
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="QRIS" />
                        QRIS
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="BankTransfer" />
                        Bank Transfer
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" value="EWallet" />
                        E-Wallet (e.g. ShopeePay, Gopay, OVO)
                    </label>
                </fieldset>

                {/* Place Order */}
                <button
                onClick={() => {
                    alert('Order placed! (demo)')
                    clearCart()
                    router.push('/')
                }}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition cursor-pointer"
                >
                Place Order
                </button>
            </>
            )}
        </main>
        <Footer />
        </div>
    )
}