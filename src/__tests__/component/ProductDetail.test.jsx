import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetail from '../../component/ProductDetail';
import { useCart } from '../../context/CartContext';
import '@testing-library/jest-dom';

jest.mock('../../context/CartContext', () => ({
    useCart: jest.fn(),
}));

const mockProduct = {
    id: 1,
    title: 'Sample Product',
    description: 'This is a sample product description.',
    price: 29.99,
    images: ['/sample-image.jpg'],
};

describe('ProductDetail Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useCart.mockReturnValue({ addToCart: jest.fn() });
    });

    // Test case 1: Check if the ProductDetail renders correctly
    test('renders product details correctly', () => {
        render(<ProductDetail product={mockProduct} />);

        expect(screen.getByText('Sample Product')).toBeInTheDocument();
        expect(screen.getByText('This is a sample product description.')).toBeInTheDocument();
        expect(screen.getByText('$29.99')).toBeInTheDocument();

        const image = screen.getByAltText('Sample Product');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/sample-image.jpg');
    });

    // Test case 2: Check if the Add to Cart button is present
    test('quantity starts at 1 and updates correctly', () => {
        render(<ProductDetail product={mockProduct} />);

        const quantityDisplay = screen.getByText('1');
        expect(quantityDisplay).toBeInTheDocument();

        const incrementButton = screen.getAllByRole('button', { name: /\+/i })[0];
        const decrementButton = screen.getAllByRole('button', { name: /-/i })[0];

        fireEvent.click(incrementButton);
        expect(screen.getByText('2')).toBeInTheDocument();

        fireEvent.click(decrementButton);
        expect(screen.getByText('1')).toBeInTheDocument();

        fireEvent.click(decrementButton);
        expect(screen.getByText('1')).toBeInTheDocument(); // Quantity cant be less than 1
    });

    // Test case 3: Check if the Add to Cart function is called with correct arguments
    test('calls addToCart with correct arguments when Add to Cart is clicked', () => {
        const mockAddToCart = jest.fn();
        useCart.mockReturnValue({ addToCart: mockAddToCart });

        render(<ProductDetail product={mockProduct} />);

        const incrementButton = screen.getAllByRole('button', { name: /\+/i })[0];
        fireEvent.click(incrementButton); //Quantity = 2

        const addToCartButton = screen.getByText('Add to Cart');
        fireEvent.click(addToCartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
    });
});