import React from "react";

// Componente para mostrar la tabla de productos
const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Descripción</th>
          <th className="border px-4 py-2">Categoría</th>
          <th className="border px-4 py-2">Precio</th>
          <th className="border px-4 py-2">Stock</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.idProducto}>
            <td className="border px-4 py-2">{product.nombre}</td>
            <td className="border px-4 py-2">{product.descripcion}</td>
            <td className="border px-4 py-2">{product.categoria}</td>
            <td className="border px-4 py-2">{product.precio}</td>
            <td className="border px-4 py-2">{product.stock}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-gray-200 text-black py-1 px-3 rounded hover:bg-gray-300 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(product.idProducto)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
