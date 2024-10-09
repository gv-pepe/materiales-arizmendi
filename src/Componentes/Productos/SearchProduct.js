// SearchProduct.js
import React from 'react';

const SearchProduct = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={onSearch}
        className="p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

export default SearchProduct;
