'use client';

import useStore from '@/store/zustand';
import { IProduct } from '@/app';
import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

interface ProductProps{
    product:IProduct
}

const Product = ({ product }:ProductProps) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
               <PlusIcon className="h-4 w-4 text-white"/>

      </button>
    </div>
  );
};

export default Product;
