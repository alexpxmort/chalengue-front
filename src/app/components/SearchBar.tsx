'use client'

import { useRef } from 'react';
import { DocumentSearchIcon } from '@heroicons/react/outline';

interface SearchBarProps {
  onSearch: (query: string) => void; 
  placeholder: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (inputRef.current) {
        console.log(inputRef.current.value)
       onSearch(inputRef.current.value);
    }
  };


  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <DocumentSearchIcon className="h-6 w-6 text-white"/>
      </button>
    </div>
  );
}
