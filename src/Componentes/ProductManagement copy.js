import React, { useEffect, useState } from "react";

// Componente para agregar productos
const AddProduct = ({ onAdd }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      const data = await response.json();
      onAdd(data); // Llamar la función de callback para agregar el nuevo producto
      setNuevoProducto({ nombre: '', descripcion: '', categoria: '', precio: '', stock: '' }); // Reiniciar el formulario
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded-md p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoría</label>
          <select
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Precio</label>
          <input
            type="number"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={nuevoProducto.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Agregar Producto
      </button>
    </form>
  );
};

// Componente para editar productos
const EditProduct = ({ product, onUpdate, onClose }) => {
  const [editableProduct, setEditableProduct] = useState(product);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${editableProduct.idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableProduct),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const updatedProduct = await response.json();
      onUpdate(updatedProduct); // Llamar la función de callback para actualizar el producto
      onClose(); // Cerrar el modal después de actualizar
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h2 className="text-lg font-bold mb-2">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={editableProduct.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={editableProduct.descripcion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Categoría</label>
            <select
              name="categoria"
              value={editableProduct.categoria}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.idCategoria} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Precio</label>
            <input
              type="number"
              name="precio"
              value={editableProduct.precio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={editableProduct.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Actualizar Producto
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose} // Cerrar el modal
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente principal para gestionar productos
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // Producto que se está editando

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/productos");
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicializa los productos filtrados
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setFilteredProducts((prev) => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.idProducto === updatedProduct.idProducto ? updatedProduct : product
      )
    );
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.idProducto === updatedProduct.idProducto ? updatedProduct : product
      )
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      setProducts((prev) => prev.filter((product) => product.idProducto !== productId));
      setFilteredProducts((prev) => prev.filter((product) => product.idProducto !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const closeEditModal = () => {
    setEditingProduct(null); // Cerrar el modal de edición
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <AddProduct onAdd={handleAddProduct} /> {/* Componente para agregar productos */}

      <div className="mt-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Categoría</th>
              <th className="border border-gray-300 p-2">Precio</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.idProducto}>
                  <td className="border border-gray-300 p-2">{product.nombre}</td>
                  <td className="border border-gray-300 p-2">{product.descripcion}</td>
                  <td className="border border-gray-300 p-2">{product.categoria}</td>
                  <td className="border border-gray-300 p-2">{product.precio}</td>
                  <td className="border border-gray-300 p-2">{product.stock}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-gray-200 text-black py-1 px-3 rounded hover:bg-gray-300 mr-2"
                      onClick={() => handleEdit(product)} // Manejar la funcionalidad de editar
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(product.idProducto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 p-2 text-center">
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para editar productos */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default ProductManagement;
