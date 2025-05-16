export const dynamic = 'force-static'

export default async function FAQPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await res.json();
    const faqs = data.map((item, i) => ({
        question: item.title,
        answer: item.body,
    }));

    return (
        <main className="p-5">
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                <div key={i} className="border rounded-lg p-4 bg-white shadow">
                    <p className="text-gray-600">Q : {faq.question}?</p>
                    <p className="mt-2 text-gray-600">A : {faq.answer}</p>
                </div>
                ))}
            </div>
        </main>
    );
}
