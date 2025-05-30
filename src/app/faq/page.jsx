import React from 'react';
import Navbar from "../../component/Navbar"
import Footer from '../../component/Footer';

export const revalidate = 60

export default async function FAQPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', { next: { revalidate: 60 } })
    const data = await res.json()
    const faqs = data.map(item => ({
        question: item.title,
        answer: item.body,
    }))

    return (
        <>
        <Navbar />
        <main className="p-5 mt-18">
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="border rounded-lg p-4 bg-white shadow">
                <p className="text-gray-600">Q: {faq.question}?</p>
                <p className="mt-2 text-gray-600">A: {faq.answer}</p>
                </div>
            ))}
            </div>
        </main>
        <Footer />
        </>
    )
}