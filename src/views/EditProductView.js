export default function EditProductView({
  isOpen,
  editedProduct,
  categories,
  handleChange,
  handleCategoryChange,
  handleSave,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded w-[500px] p-6">
        <div className="space-y-4">
          {/* Nombre del Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Nombre del Producto
            </label>
            <input
              name="nombre"
              value={editedProduct.nombre || ""}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={editedProduct.descripcion || ""}
              onChange={handleChange}
              placeholder="Ingrese la descripción del producto"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Precio y Stock en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Precio
              </label>
              <input
                type="number"
                name="precio"
                value={editedProduct.precio || ""}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={editedProduct.stock || ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Categoría y Stock Mínimo en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Categoría
              </label>
              <select
                name="categoria"
                value={editedProduct.categoria || ""}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white"
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Stock Mínimo
              </label>
              <input
                type="number"
                name="stockMinimo"
                value={editedProduct.stockMinimo || ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Guardar Cambios
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-600 py-2 px-4 mt-2 hover:text-gray-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

