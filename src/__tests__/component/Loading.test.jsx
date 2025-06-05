import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../../component/Loading';

describe('Loading', () => {
    test('renders loading container with correct classes', () => {
        render(<Loading />);
        const container = screen.getByTestId('loading-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'h-screen');
    });

    test('renders loading spinner with correct classes', () => {
        render(<Loading />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-t-4', 'border-primary');
    });
});