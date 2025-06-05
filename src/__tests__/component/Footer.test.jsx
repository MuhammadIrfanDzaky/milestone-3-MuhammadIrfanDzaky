import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../component/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
    test('renders footer with correct text', () => {
        render(<Footer />);
        expect(screen.getByText('RevoShop')).toBeInTheDocument();
        expect(screen.getByText('© 2025 RevoShop. All rights reserved.')).toBeInTheDocument();
    });
});