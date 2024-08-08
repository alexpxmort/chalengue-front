'use client';

import React, { useEffect, ReactNode, useState } from 'react';
import Cart from '../components/Cart';
import SearchBar from '../components/SearchBar';
import { IProduct } from '..';
import useStore from '@/store/zustand';
import LoadingSpinner from './LoadingSpinner';
import Header from './Header';

interface HomeProps {
    products: IProduct[];
    children: ReactNode;
}

const ProductList = React.lazy(() => import('../components/ProductList'));

export default function Home({ products, children }: HomeProps) {
    const setProducts = useStore((state) => state.setProducts);
    const setProductsFiltered = useStore((state) => state.setProductsFiltered);
    const productsStoreFiltered = useStore((state) => state.productsFiltered);
    const productsStore = useStore((state) => state.products);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            setProducts(products);
            setLoading(false)
        }
    }, [products, setProducts]);

    const searchProducts = async (query: string) => {
        setLoading(true)
        const filteredProducts = productsStore.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProductsFiltered(filteredProducts);
        setTimeout(()=>{
            setLoading(false)
        },1000)
    };

    return (
        <div className="container mx-auto p-4">
            <Header />

            <SearchBar placeholder='Pesquise por produtos' onSearch={searchProducts} />
            {
                loading ? (
                    <LoadingSpinner/>
                ):(
                    <ProductList products={productsStoreFiltered} />
                )
            }
            {children}
        </div>
    );
}
