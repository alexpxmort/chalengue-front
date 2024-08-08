import React from 'react';
import { render, screen } from '@testing-library/react';
import { IProduct } from '@/app';
import ProductList from '@/app/components/ProductList';


describe('ProductList Component', () => {
  it('should renders "Nenhum Produto Encontrado!" WHEN products list is empty', () => {
    render(<ProductList products={[]} />);

    const messageElement = screen.getByText('Nenhum Produto Encontrado!');
    expect(messageElement).toBeInTheDocument();
  });


  it('should renders the correct number of Product components', () => {
    const products: IProduct[] = [
      {
          id: 1, name: 'Product 1', price: 10,
          image: ''
      },
      {
          id: 2, name: 'Product 2', price: 20,
          image: ''
      },
      {
          id: 3, name: 'Product 3', price: 30,
          image: ''
      },
    ];

    render(<ProductList products={products} />);

    const productComponents = screen.getAllByTestId('product');
    expect(productComponents.length).toBe(products.length);
  });
});
