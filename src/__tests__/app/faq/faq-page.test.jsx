import React from 'react';
import { render, screen } from '@testing-library/react';
import FAQPage from '../../../app/faq/page';
import '@testing-library/jest-dom';

jest.mock('../../../component/Navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('../../../component/Footer', () => () => <div>Mocked Footer</div>);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
        Promise.resolve([
            { title: 'What is this', body: 'This is a test FAQ.' },
            { title: 'How does it work', body: 'It works great!' },
        ]),
    })
);

describe('FAQPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //test case 1: check if the FAQ page renders with the correct title
    test('renders FAQ page with the correct title', async () => {
        render(await FAQPage());
        const title = screen.getByText('Frequently Asked Questions');
        expect(title).toBeInTheDocument();
    });

    //test case 2: check if the FAQ page fetches and displays FAQs correctly
    test('displays fetched FAQs', async () => {
        render(await FAQPage());
        expect(screen.getByText('Q: What is this?')).toBeInTheDocument();
        expect(screen.getByText('A: This is a test FAQ.')).toBeInTheDocument();
        expect(screen.getByText('Q: How does it work?')).toBeInTheDocument();
        expect(screen.getByText('A: It works great!')).toBeInTheDocument();
    });

    //test case 3: check if the Navbar and Footer components are rendered
    test('renders Navbar and Footer components', async () => {
        render(await FAQPage());
        expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
        expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
    });
});