import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from '../../component/LogoutButton';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
    signOut: jest.fn(),
}));

describe('LogoutButton Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case 1: Check if the component renders correctly
    test('renders logout button with correct text', () => {
        render(<LogoutButton />);

        const button = screen.getByText('Logout');

        expect(button).toBeInTheDocument();
    });

    // Test case 2: Check if the button has correct styles
    test('calls signOut with correct callbackUrl when clicked', () => {
        render(<LogoutButton />);

        const button = screen.getByText('Logout');
        fireEvent.click(button);

        expect(require('next-auth/react').signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});