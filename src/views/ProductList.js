import { useState } from "react";
import { useProductList } from "../controllers/productListController";
import useEditProduct from "../controllers/useEditProduct";
import EditProductView from "./EditProductView";

export default function ProductList() {
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    handleDelete,
    isLoading,
    error,
  } = useProductList();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSaveProductUpdate = (updatedProduct) => {
    const updatedProducts = filteredProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setSearchTerm("");
  };

  const {
    editedProduct,
    handleChange,
    handleCategoryChange,
    handleSave,
    isLoading: isEditing,
  } = useEditProduct({
    product: selectedProduct,
    categories,
    onSave: handleSaveProductUpdate,
    onClose: () => setSelectedProduct(null),
  });

  const handleEdit = (productId) => {
    const product = filteredProducts.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Lista de Productos</h2>
        
        {error && (
          <div className="mb-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 bg-white"
              >
                <option value="">Seleccionar...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nombre</th>
                    <th className="text-left py-3 px-4 font-medium">Descripción</th>
                    <th className="text-left py-3 px-4 font-medium">Categoría</th>
                    <th className="text-left py-3 px-4 font-medium">Precio</th>
                    <th className="text-left py-3 px-4 font-medium">Stock</th>
                    <th className="text-right py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-4">{product.nombre}</td>
                      <td className="py-3 px-4">{product.descripcion}</td>
                      <td className="py-3 px-4">{product.categoria}</td>
                      <td className="py-3 px-4">${product.precio.toFixed(2)}</td>
                      <td className="py-3 px-4">{product.stock}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                          aria-label={`Editar ${product.nombre}`}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                          aria-label={`Eliminar ${product.nombre}`}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-3 text-center text-gray-500"
                      >
                        No se encontraron productos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <EditProductView
        isOpen={selectedProduct !== null}
        editedProduct={editedProduct}
        categories={categories}
        handleChange={handleChange}
        handleCategoryChange={handleCategoryChange}
        handleSave={handleSave}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

