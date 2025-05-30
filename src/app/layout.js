import './globals.css';
import { Providers } from './providers';
import React from 'react';

export const metadata = {
  title: 'RevoShop',
  description: 'A fake e-commerce platform built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;700&family=Geist+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}