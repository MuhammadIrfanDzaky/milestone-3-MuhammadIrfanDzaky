import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminTable from '../../component/AdminTable';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('AdminTable Component', () => {
  const mockProducts = [
    { id: 1, title: 'Laptop', price: 999, category: { name: 'Electronics' } },
    { id: 2, title: 'Phone', price: 599, category: { name: 'Electronics' } },
    { id: 3, title: 'T-Shirt', price: 199, category: { name: 'Clothes' } },
  ];

  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    require('next/navigation').useRouter.mockReturnValue(mockRouter);
    global.fetch.mockClear();
  });

  // test case 1 : check if the component renders correctly with product data
  test('renders product table with correct data', () => {
    render(<AdminTable products={mockProducts} />);

    // table headers
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    // product data
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getAllByText('Electronics')).toHaveLength(2);
    expect(screen.getAllByText('Clothes')).toHaveLength(1);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('$599')).toBeInTheDocument();
  });

  // test case 2 : check if the component displays "No products found" when product list is empty
  test('displays "No products found" when product list is empty', () => {
    render(<AdminTable products={[]} />);

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });

  // test case 3 : check if the component navigates to add/edit product pages correctly
  test('navigates to /admin/add when "Add Product" button is clicked', () => {
    render(<AdminTable products={mockProducts} />);

    const addButton = screen.getByText('+ Add Product');
    fireEvent.click(addButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/admin/add');
  });

  // test case 4 : check if the component navigates to edit product page when "Edit" button is clicked
  test('navigates to /admin/edit/:id when "Edit" button is clicked', () => {
    render(<AdminTable products={mockProducts} />);

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    expect(mockRouter.push).toHaveBeenCalledWith('/admin/edit/1');
  });

  // test case 5 : check if the component calls delete API and updates list when "Delete" button is clicked
  test('calls delete API and updates list when "Delete" button is clicked', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    global.fetch.mockResolvedValue({ ok: true });

    render(<AdminTable products={mockProducts} />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledWith('/api/products/1', { method: 'DELETE' });

    await waitFor(() => {
      expect(screen.queryByText('Laptop')).not.toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    });
  });

  // test case 6 : check if the component does not delete product if confirm is cancelled
  test('does not delete product if confirm is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(<AdminTable products={mockProducts} />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(global.fetch).not.toHaveBeenCalled();

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
  });

  // test case 7 : check if the component displays "—" for products with no category
  test('displays "—" for products with no category', () => {
    const mockProductsWithNoCategory = [
      { id: 1, title: 'Laptop', price: 999, category: null }, // category is null
      { id: 2, title: 'Phone', price: 599 }, // category is undefined
      { id: 3, title: 'T-Shirt', price: 199, category: { name: 'Clothes' } }, // category exists
    ];

    render(<AdminTable products={mockProductsWithNoCategory} />);

    expect(screen.getAllByText('—')).toHaveLength(2);
    expect(screen.getByText('Clothes')).toBeInTheDocument();
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});