'use client';

import useStore from '@/store/zustand';
import { TrashIcon } from '@heroicons/react/outline';

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const handleQuantityChange = (itemIdx:number, evt:any) => {
    const newQuantity = parseInt(evt.target.value);
    if (newQuantity > 0) {
      updateQuantity(itemIdx, newQuantity);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4">
      {cart.length === 0 ? (
        <p className="text-gray-500"> Carrinho  vazio!</p>
      ) : (
        <ul>
          {cart.map((item,idx) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name}</span>
              <span className='mx-4'>${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(idx, e)}
                className="w-16 text-center border rounded"
              />
              <button
                onClick={() => removeFromCart(idx)}
                className="text-red-500 hover:underline ml-2"
              >
                 <TrashIcon className="h-6 w-6 text-red"/>

              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Limpar Carrinho
        </button>
      )}
    </div>
  );
};

export default Cart;
