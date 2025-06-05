import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartIcon from '../../component/CartIcon';

describe('CartIcon Component', () => {
    // Test case 1: Check if the component renders correctly
    test('renders the cart icon with correct attributes', () => {
        const { container } = render(<CartIcon count={0} animateIcon={false} animateBadge={false} />);
        const svg = container.querySelector('svg');
        
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');

        const path = svg.querySelector('path');

        expect(path).toBeInTheDocument();
    });

    // Test case 2: Check if the component renders the badge correctly
    test('does not render badge when count is 0', () => {
        const { container } = render(<CartIcon count={0} animateIcon={false} animateBadge={false} />);
        const svg = container.querySelector('svg');
        const circle = svg.querySelector('circle');

        expect(circle).toBeNull();

        const text = svg.querySelector('text');

        expect(text).toBeNull();
    });

    // Test case 3: Check if the badge renders with correct count when count is greater than 0
    test('renders badge with correct count when count is greater than 0', () => {
        const { container } = render(<CartIcon count={5} animateIcon={false} animateBadge={false} />);
        const svg = container.querySelector('svg');
        const circle = svg.querySelector('circle');

        expect(circle).toBeInTheDocument();

        const text = svg.querySelector('text');
        
        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent('5');
    });
});