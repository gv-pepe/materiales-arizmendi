import { useProductForm } from '../controllers/productController';
import ConfirmationModal from '../views/ConfirmationModal';
import Alert from '../components/Alert';

export default function ProductForm() {
  const {
    productData,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handleConfirm,
    isModalOpen,
    setIsModalOpen,
    status,
    isSubmitting,
    categories
  } = useProductForm();

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mt-8 max-w-4xl mx-auto">
      <div className="font-bold text-2xl mb-4">
        <h2>Agregar Nuevo Producto</h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre del Producto
            </label>
            <input
              id="nombre"
              name="nombre"
              value={productData.nombre}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre del producto"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={productData.descripcion}
              onChange={handleChange}
              required
              placeholder="Ingrese la descripción del producto"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Precio
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={productData.precio}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="text-sm font-medium">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={productData.stock}
                onChange={handleChange}
                required
                placeholder="0"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Categoría
              </label>
              <select
                id="categoria"
                value={productData.categoria}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category.nombre} value={category.nombre.toString()}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="minStock" className="text-sm font-medium">
                Stock Mínimo
              </label>
              <input
                id="stockMinimo"
                name="stockMinimo"
                type="number"
                min="0"
                value={productData.stockMinimo}
                onChange={handleChange}
                required
                placeholder="0"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Mostrar Alert si hay un mensaje de estado */}
          {status.message && (
            <Alert message={status.message} type={status.type} onClose={() => {}} />
          )}

          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Procesando...' : 'Agregar Producto'}
          </button>
        </form>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          productData={productData}
        />
      </div>
    </div>
  );
}
