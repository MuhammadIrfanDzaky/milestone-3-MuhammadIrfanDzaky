'use client'
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-400 bg-gray-200 shadow shadow-lg transition-transform duration-200 hover:scale-105 flex flex-col justify-between h-full">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div>
          <div className="h-35 flex items-center justify-center bg-white overflow-hidden">
            <img src={product.image} alt={product.title} className="object-contain h-full" />
          </div>
          <div className="p-1 text-black">
            <h2 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h2>
          </div>
        </div>
        <div className="p-1 mt-auto flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-md font-semibold">${product.price}</p>
            <span className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-4 h-4 mr-1"
                fill="#facc15"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              {product.rating.rate}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}