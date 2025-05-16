import Navbar from "@/component/Navbar"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params, onAdd }) {
  const { id } = params
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch product")
  const product = await res.json()

    const handleAddToCart = () => {
      setCartCount((prev) => prev + 1);
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 300);
    };
    
  return (
    <main>
      <Navbar cartCount={0} />
      <div className="flex justify-center mb-4">
        <section className="w-full max-w-5xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/2 flex items-center justify-center bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-xs max-h-80 object-contain"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-between p-8 text-black">
            <div>
              <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-4 capitalize">
                {product.category}
              </span>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <p className="text-3xl font-semibold">${product.price}</p>
              <p className="text-sm ">Stock : {product.rating.count}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onAdd}
                className="w-32 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}