'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
    >
      Logout
    </button>
  )
}