'use client'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 py-3 border-t mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold">RevoShop</h2>
                    <p className="text-sm">© 2025 RevoShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}