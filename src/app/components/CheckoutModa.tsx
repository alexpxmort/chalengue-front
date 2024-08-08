import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: { name: string; email: string }) => void; 
}

const CheckoutModal = ({ isOpen, onClose, onSubmit }:CheckoutModalProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (name && email) {
      onSubmit({ name, email });
      onClose(); 
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Finalizar Compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              name="name" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 px-4 py-2 rounded-md text-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 rounded-md text-white"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
