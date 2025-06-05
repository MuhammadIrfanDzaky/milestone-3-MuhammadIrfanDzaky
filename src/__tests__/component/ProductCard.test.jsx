import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../component/ProductCard';
import '@testing-library/jest-dom';

const mockProduct = {
    id: 1,
    title: 'Sample Product',
    description: 'This product is fake.',
    price: 19.99,
    images: ['/sample-image.jpg'],
};

describe('ProductCard Component', () => {
    // test case 1: check if the ProductCard renders correctly
    test('renders the product title', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Sample Product')).toBeInTheDocument();
    });

    // test case 2: check if the ProductCard renders the product description
    test('renders the product description', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('This product is fake.')).toBeInTheDocument();
    });

    // test case 3: check if the ProductCard renders the product price
    test('renders the product price', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('$19.99')).toBeInTheDocument();
    });

    // test case 4: check if the ProductCard renders the product image
    test('renders the product image with correct src and alt', () => {
        render(<ProductCard product={mockProduct} />);
        const image = screen.getByAltText('Sample Product');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/sample-image.jpg');
    });

    // test case 5: check if the ProductCard has a link to the product detail page
    test('has a link to the product detail page', () => {
        render(<ProductCard product={mockProduct} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/products/1');
    });
});