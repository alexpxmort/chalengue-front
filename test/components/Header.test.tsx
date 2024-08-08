import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/app/components/Header';

jest.mock('../../src/store/zustand', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
      cart: [],
    }),
  }));
  
describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart icon with correct class names and styles', () => {
  
    render(<Header />);

    const cartIcon = screen.getByRole('button').querySelector('svg');
    expect(cartIcon).toHaveClass('h-6 w-6 text-white mt-2 mx-3');
  });
});
