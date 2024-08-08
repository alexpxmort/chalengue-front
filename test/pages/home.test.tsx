/* eslint-disable react/no-children-prop */
import React from 'react';
import { render,screen} from '@testing-library/react';
import Home from '@/app/components/Home';


jest.mock('../../src/store/zustand', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    setProducts: ()=> jest.fn(),
    setProductsFiltered: jest.fn(),
    productsFiltered: [],
    products: [],
  }),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Home component', () => {
    render(<Home products={[]} children={<div>Child Component</div>} />);

    expect(screen.getByPlaceholderText('Pesquise por produtos')).toBeInTheDocument()
  });

});
