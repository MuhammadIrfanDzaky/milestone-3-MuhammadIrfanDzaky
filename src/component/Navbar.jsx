'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '../context/CartContext'
import CartIcon from '../component/CartIcon'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const { cart } = useCart()
  const router = useRouter()

  const [query, setQuery] = useState("")

  const itemTypeCount = cart.length

  const [animateIcon, setAnimateIcon] = useState(false)
  const [animateBadge, setAnimateBadge] = useState(false)
  const [prevCount, setPrevCount] = useState(itemTypeCount)

  useEffect(() => {
    if (itemTypeCount > prevCount) {
      setAnimateIcon(true)
      setAnimateBadge(true)
      setTimeout(() => {
        setAnimateIcon(false)
        setAnimateBadge(false)
      }, 300)
    }
    setPrevCount(itemTypeCount)
  }, [itemTypeCount, prevCount])

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/?q=${encodeURIComponent(query)}`)
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          RevoShop
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex" role="Search">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className="px-3 py-1 border rounded-l focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700 flex items-center justify-center"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-6">
          <Link href="/" className="py-2">Home</Link>
          <Link href="/faq" className="py-2">FAQ</Link>

          <Link href="/cart" aria-label="View Cart">
            <CartIcon
              count={itemTypeCount}
              animateIcon={animateIcon}
              animateBadge={animateBadge}
            />
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="py-2 cursor-pointer">Logout</button>
          ) : (
            <Link href="/auth/login" className="py-2 cursor-pointer">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}