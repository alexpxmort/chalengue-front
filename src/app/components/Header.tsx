import React, { useState } from 'react';
import useStore from '@/store/zustand';
import { ShoppingCartIcon } from '@heroicons/react/outline'; 
import Cart from '../components/Cart'; 

const Header: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cart = useStore((state) => state.cart);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <header className="flex mb-6 items-center justify-between p-4 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">Shopex</h1>
            <div className="relative">
                <button onClick={toggleCart} className="relative">
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
                {isCartOpen && (
                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-4 z-10">
                        <Cart />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
