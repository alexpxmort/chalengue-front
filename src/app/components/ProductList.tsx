import React from 'react';
import Product from './Product';
import { IProduct } from '..';

interface ProductListProps {
    products: IProduct[];
}

const ProductList = ({ products }:ProductListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.length === 0 ? (
                <h2 className="text-gray-500 text-center">Nenhum Produto Encontrado!</h2>
            ) : (
                products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductList;
