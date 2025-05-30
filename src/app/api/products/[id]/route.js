import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export async function GET(request, { params }) {
try {
        const res = await fetch(`${BASE_URL}/${params.id}`);
        if (!res.ok) {
        return NextResponse.json(
            { error: 'Product not found' },
            { status: res.status }
        );
        }
        const product = await res.json();
        return NextResponse.json(product);
    } catch (err) {
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
    }

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const res = await fetch(`${BASE_URL}/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        });
        if (!res.ok) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: res.status }
        );
        }
        const updated = await res.json();
        return NextResponse.json(updated);
    } catch (err) {
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
    }

export async function DELETE(request, { params }) {
    try {
        const res = await fetch(`${BASE_URL}/${params.id}`, {
        method: 'DELETE',
        });
        if (!res.ok) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: res.status }
        );
        }
        // 204 No Content
        return NextResponse.json(null, { status: 204 });
    } catch (err) {
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
}