
import { ReactNode } from 'react';
import { IProduct } from '..';
import Home from '../components/Home';



async function fetchProducts():Promise<IProduct[]> {
  const response = await fetch('http://localhost:3000/products'); 
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export default async function RootLayout({ children }:{children:ReactNode}) {
  const products = await fetchProducts();

  return (
        <div className="container mx-auto p-4">
          <Home products={products}>
            {children}
          </Home>
        </div>
  );
}
