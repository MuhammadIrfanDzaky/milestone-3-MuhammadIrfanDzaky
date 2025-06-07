import React from 'react';
import AdminTable from '../../component/AdminTable';
import LogoutButton from '../../component/LogoutButton';

// Client Component to render the UI
function AdminDashboard({ products }) {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <header className="flex items-center justify-between mb-6 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <LogoutButton />
      </header>
      <section className="bg-white rounded-lg shadow p-6 w-full max-w-5xl mx-auto">
        <AdminTable products={products} />
      </section>
    </main>
  );
}

// Server Component to fetch data
export default async function AdminPage() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products', { next: { revalidate: 60 } });
  const products = await res.json();

  return <AdminDashboard products={products} />;
}

export const revalidate = 60;
export { AdminDashboard };