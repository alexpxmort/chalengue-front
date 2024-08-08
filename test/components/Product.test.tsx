import { render, screen } from '@testing-library/react';
import Product from '@/app/components/Product';


describe('Product', () => {
  test('renders product information', () => {
    const product = {
      name: 'Test Product',
      price: 99.99,
      image:''
    };
    render(<Product product={product} />);


    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
});
