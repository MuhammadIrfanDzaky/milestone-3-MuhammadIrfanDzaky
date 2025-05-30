'use client'

import React from 'react'
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="relative flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400"></div>

      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="h-40 flex items-center justify-center p-2 bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>

        <div className="px-2 flex-1 flex flex-col">
          <h2 className="font-bold text-sm text-gray-800 line-clamp-2 mb-1">
            {product.title}
          </h2>
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="px-2 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
      </Link>
    </div>
  )
}
