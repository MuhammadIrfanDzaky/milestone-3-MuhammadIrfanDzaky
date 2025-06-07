import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartIcon from '../../component/CartIcon';

describe('CartIcon Component', () => {
    test('renders the cart icon with animation when animateIcon is true', () => {
        const { container } = render(<CartIcon count={0} animateIcon={true} animateBadge={false} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
        const path = svg.querySelector('path');
        expect(path).toBeInTheDocument();
    });

    test('renders the cart icon without animation and no badge when count is 0', () => {
        const { container } = render(<CartIcon count={0} animateIcon={false} animateBadge={false} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        const circle = svg.querySelector('circle');
        expect(circle).toBeNull();
        const text = svg.querySelector('text');
        expect(text).toBeNull();
    });

    test('renders badge without animation when count is greater than 0', () => {
        render(<CartIcon count={5} animateIcon={false} animateBadge={false} />);
        const badgeText = screen.getByText('5');
        expect(badgeText).toBeInTheDocument();
    });

    test('renders badge with animation when count is greater than 0 and animateBadge is true', () => {
        render(<CartIcon count={5} animateIcon={false} animateBadge={true} />);
        const badgeText = screen.getByText('5');
        expect(badgeText).toBeInTheDocument();
    });
});