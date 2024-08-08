import React from 'react';

interface CustomAlertProps {
  type: 'success' | 'error' | 'warning' | 'info'; 
  message: string; 
  onClose: () => void; 
}

const alertTypes = {
  success: {
    color: 'bg-green-100 text-green-800',
    icon: '✓',
  },
  error: {
    color: 'bg-red-100 text-red-800',
    icon: '✘',
  },
  warning: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: '!',
  },
  info: {
    color: 'bg-blue-100 text-blue-800',
    icon: 'ℹ️',
  },
};

const CustomAlert= ({ type, message, onClose }:CustomAlertProps) => {
  const { color, icon } = alertTypes[type];

  return (
    <div className={`fixed top-4 right-4 w-full max-w-sm p-4 rounded-lg shadow-lg ${color}`} role="alert">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
