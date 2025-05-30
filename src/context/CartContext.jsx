'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [lastAddedCount, setLastAddedCount] = useState(0);

  // Rehydrate cart
    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) setCart(JSON.parse(stored));
    }, []);

  // Persist cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setLastAddedCount(cart.reduce((sum, i) => sum + i.quantity, 0));
    }, [cart]);

    const addToCart = (product, qty = 1) => {
        setCart(prev => {
        const exists = prev.find(item => item.id === product.id);
        if (exists) {
            return prev.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            );
        }
        return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));
    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, cartCount, lastAddedCount, addToCart, removeFromCart, clearCart }}>
        {children}
        </CartContext.Provider>
    );
    }

export const useCart = () => useContext(CartContext);