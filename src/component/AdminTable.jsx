'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminTable({ products }) {
    const [list, setList] = useState(products);
    const router = useRouter();

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        setList(prev => prev.filter(p => p.id !== id));
    };

    const handleEdit = (id) => {
        router.push(`/admin/edit/${id}`);
    };

    const handleAdd = () => {
        router.push('/admin/add');
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAdd}
                    className="px-5 py-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-white font-semibold rounded-lg shadow hover:opacity-90 transition cursor-pointer"
                >
                    + Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Title</th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Category</th>
                            <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {list.map((p, idx) => (
                            <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-4 text-sm text-gray-800">{p.title}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">${p.price}</td>
                                <td className="px-4 py-4 text-sm text-gray-800 capitalize">{p.category?.name || '—'}</td>
                                <td className="px-4 py-4 text-sm text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(p.id)}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}