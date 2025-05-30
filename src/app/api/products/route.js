import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export async function GET() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: res.status }
        );
        }
        const products = await res.json();
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
    }

    export async function POST(request) {
    try {
        const body = await request.json();
        const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        });
        if (!res.ok) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: res.status }
        );
        }
        const created = await res.json();
        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
}