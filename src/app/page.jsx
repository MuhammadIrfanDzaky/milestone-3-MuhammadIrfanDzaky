import ProductCard from "../component/ProductCard"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"
import React from "react"

export const revalidate = 60

export default async function Home({ searchParams }) {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", { next: { revalidate: 60 } })
  if (!res.ok) throw new Error("Failed to fetch products")
  let products = await res.json()

  const params = await searchParams
  const q = params.q?.toLowerCase() || ""
  if (q) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(q)
    )
  }

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white min-h-screen flex flex-col justify-center items-center py-16 px-4 mb-8 shadow-md text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Blurred background overlay */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(10px)",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
              Welcome to RevoShop
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 font-medium text-white max-w-2xl drop-shadow">
            Discover the <span className="font-bold text-yellow-200">best products</span> at unbeatable prices. Shop the latest trends and enjoy exclusive deals!
          </p>
          <a
            href="#products"
            className="inline-block bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
          >
            Shop Now
          </a>
        </div>
        </section>
      <section id="products" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
            Our Latest Products
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
