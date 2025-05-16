'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar({}) {
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  // const handleAddToCart = () => {
  //   setCartCount((prev) => prev + 1);
  //   setAnimateCart(true);
  //   setTimeout(() => setAnimateCart(false), 300);
  // };

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between p-4 bg-white mb-4 md:gap-0 border-b">
      <div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 md:gap-0">
        <Link href="/" className="w-full md:w-auto flex justify-center md:justify-start">
          <h1 className="text-2xl md:text-3xl font-bold cursor-pointer text-primary">RevoShop</h1>
        </Link>
        <div className="w-full md:w-1/3 flex justify-center md:justify-center">
          <div className="flex-1 mx-0 md:mx-6 w-full">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Product..."
              className="w-full px-4 py-2 border focus:outline-none focus:ring focus:border-secondary"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end p-2 rounded-lg">
          <Link
            href="/faq"
            className="px-4 py-2 text-gray-700 font-bold rounded-lg text-md hover:bg-gray-700 hover:text-white duration-200"
          >
            FAQ
          </Link>
          <div className="flex items-center relative">
            <motion.button
              animate={animateCart ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700 hover:text-white flex items-center transition duration-200 rounded-lg"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
              </svg>
            </motion.button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Link href="#" className="px-4 py-2 bg-white text-gray-700 border font-bold rounded-lg text-sm hover:bg-gray-700 hover:text-white duration-200">
            Login
          </Link>
          <Link href="#" className="px-4 py-2 bg-gray-700 text-white border font-bold rounded-lg text-sm hover:bg-white hover:text-gray-700 hover:border-gray-700 duration-200">
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
