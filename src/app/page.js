import ProductCard from "@/component/ProductCard"
import Navbar from "@/component/Navbar"

export const revalidate = false

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products")
  if (!res.ok) throw new Error("Failed to fetch products")
  const products = await res.json()

  return (
    <main>
      <Navbar cartCount={0}/>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 px-4 py-1">
        {products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </main>
  )
}