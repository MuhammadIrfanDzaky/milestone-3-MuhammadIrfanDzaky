import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../component/Navbar';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('../../context/CartContext', () => ({
    useCart: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Navbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test case 1: check if the Navbar renders correctly when not logged in
    test('renders Navbar with Login link when not logged in', () => {
        useSession.mockReturnValue({ data: null });
        useCart.mockReturnValue({ cart: [] });
        useRouter.mockReturnValue({ push: jest.fn() });

        render(<Navbar />);

        expect(screen.getByText('RevoShop')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    // test case 2: check if the Navbar renders correctly when logged in
    test('renders Navbar with Logout button when logged in', () => {
        useSession.mockReturnValue({ data: { user: { name: 'Test User' } } });
        useCart.mockReturnValue({ cart: [] });
        useRouter.mockReturnValue({ push: jest.fn() });

        render(<Navbar />);

        expect(screen.getByText('RevoShop')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('FAQ')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    // test case 3: check if the Navbar handles search correctly
    test('handles search correctly', () => {
        useSession.mockReturnValue({ data: null });
        useCart.mockReturnValue({ cart: [] });
        const pushMock = jest.fn();
        useRouter.mockReturnValue({ push: pushMock });

        render(<Navbar />);

        const searchInput = screen.getByPlaceholderText('Search…');
        fireEvent.change(searchInput, { target: { value: 'test query' } });

        const searchForm = screen.getByRole('Search');
        fireEvent.submit(searchForm);

        expect(pushMock).toHaveBeenCalledWith('/?q=test%20query');
    });

    // test case 4: check if the Navbar renders cart icon when not logged in
    test('renders cart icon', () => {
        useSession.mockReturnValue({ data: null });
        useCart.mockReturnValue({ cart: [] });
        useRouter.mockReturnValue({ push: jest.fn() });

        render(<Navbar />);

        const cartLink = screen.getByRole('link', { name: 'View Cart' });
        expect(cartLink).toBeInTheDocument();
    });

    // test case 5: check if the Navbar calls signOut when Logout button is clicked
    test('logs out when Logout button is clicked', () => {
        useSession.mockReturnValue({ data: { user: { name: 'Test User' } } });
        useCart.mockReturnValue({ cart: [] });
        useRouter.mockReturnValue({ push: jest.fn() });

        render(<Navbar />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(signOut).toHaveBeenCalled();
    });
    // Test 6: Check if cart animation triggers when cart item count increases
    test('triggers cart animation when cart item count increases', async () => {
        useSession.mockReturnValue({ data: null });
        useRouter.mockReturnValue({ push: jest.fn() });
        const cartMock = { cart: [] };
        useCart.mockReturnValue(cartMock);

        const { rerender } = render(<Navbar />);

        const cartLink = screen.getByRole('link', { name: 'View Cart' });
        expect(cartLink).toBeInTheDocument();

        cartMock.cart = [{ id: 1 }];
        rerender(<Navbar />);

        await new Promise((resolve) => setTimeout(resolve, 350));

        rerender(<Navbar />);

        expect(cartLink).toBeInTheDocument();
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});