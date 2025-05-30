import React from 'react';
import Navbar from "../../../component/Navbar"
import ProductDetail from "../../../component/ProductDetail"
import Footer from '../../../component/Footer';

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${params.id}`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch product')
  const product = await res.json()

  return (
    <main>
      <Navbar />
      <ProductDetail product={product}/>
      <Footer />
    </main>
  )
}
