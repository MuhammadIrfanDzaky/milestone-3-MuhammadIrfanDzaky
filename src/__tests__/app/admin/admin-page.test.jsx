import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminDashboard } from '../../../app/admin/page'; // Adjust import if needed
import AdminTable from '../../../component/AdminTable';
import LogoutButton from '../../../component/LogoutButton';

// Mock the child components
jest.mock('../../../component/AdminTable', () => ({ products }) => (
  <div data-testid="admin-table">
    {products.map((product) => (
      <div key={product.id}>{product.title}</div>
    ))}
  </div>
));
jest.mock('../../../component/LogoutButton', () => () => (
  <button data-testid="logout-button">Logout</button>
));

describe('AdminDashboard', () => {
  const mockProducts = [
    { id: 1, title: 'Test Product', price: 10, description: 'Test Description', image: 'test.jpg' },
  ];

  test('renders admin dashboard with products', () => {
    render(<AdminDashboard products={mockProducts} />);

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('admin-table')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });
});