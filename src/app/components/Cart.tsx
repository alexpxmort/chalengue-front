'use client';

import useStore, { CartItem } from '@/store/zustand';
import { TrashIcon } from '@heroicons/react/outline';
import { createOrder } from '../actions/createOrder';
import { useMemo, useState } from 'react';
import CheckoutModal from './CheckoutModa';
import { useCustomAlert } from '../hooks/useCustomAlert';
import CustomAlert from './CustomAlert';

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { alert, showAlert, closeAlert } = useCustomAlert();

  
  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + ( Number(item.price) * Number(item.quantity)); 
    }, 0); 
  }, [cart]); 
  
  const handleQuantityChange = (itemIdx:number, evt:any) => {
    const newQuantity = parseInt(evt.target.value);
    if (newQuantity > 0) {
      updateQuantity(itemIdx, newQuantity);
    }
  };


  const finishCart = async ()=>{
    handleOpenModal()
  
  }


  const handleSubmit = async (data: { name: string; email: string; }) => {
    const mappedCart = cart.map((item) =>{

      function calculateFinalPrice(item: CartItem): number {
        if (item.hasDiscount && item?.discountValue) {
          return Number(Number(item.price) - Number(item.price * item?.discountValue));
        }
        return Number(item.price);
      }

      return {
        name:item.name,
        category:item.category ?? '',
        description: item.description ?? '',
        department: item.department ?? '',
        image:item.image,
        material:item.material ?? '',
        quantity: item.quantity,
        price: calculateFinalPrice(item)
      }
    })
    try {
      await createOrder({
        items: [...mappedCart],
        customer:{
          ...data
        }
      })
      clearCart()
      showAlert('success','Pedido Realizado com Sucesso!')
    } catch (error:any) {
      showAlert('error',`Erro ao realizar pedido ${error.message}`)
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4">
      {
        cart.length > 0 && (
          <h2 className="text-xl font-bold">${total.toFixed(2)}</h2>
        )
      }

      
         {alert && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}
      
      {cart.length === 0 ? (
        <p className="text-gray-500"> Carrinho  vazio!</p>
      ) : (
        <ul>
          {cart.map((item,idx) => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name}</span>
              <span className='mx-4'>${item.price}</span>
              <span> X </span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(idx, e)}
                className="w-16 text-center border rounded mx-3 "
              />
              <span> = </span>
               <span className='mx-4'>${Number(item.price) * item.quantity}</span>
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
       <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      {cart.length > 0 && (
       <div className='flex space-around gap-4'>
         <button
          onClick={clearCart}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Limpar Carrinho
        </button>
        <button
          onClick={finishCart}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Finalizar Compra
        </button>
       </div>
      )}
    </div>
  );
};

export default Cart;
