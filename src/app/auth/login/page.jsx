'use client'
import React, { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (status === 'authenticated') {
            if (session.user?.role === 'admin') {
                router.replace('/admin')
            } else {
                router.replace('/')
            }
        }
    }, [status, session, router])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        })

        if (res.error) {
        setError('Invalid email or password.')
        } else {
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
            <p className="text-sm">Demo Account</p>
            <p className="text-sm">email : user@example.com | password : password</p>
            <p className="text-sm mb-3">email : admin@example.com | password : password</p>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded"
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
            Login
            </button>
        </form>
        </div>
    )
}