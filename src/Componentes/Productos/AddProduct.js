import React, { useEffect, useState } from "react";
import Alert from '../Alert'; // Asegúrate de que la ruta sea correcta

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
  const [alert, setAlert] = useState({ message: '', type: '', isVisible: false });

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
      onAdd(data);
      setNuevoProducto({ nombre: '', descripcion: '', categoria: '', precio: '', stock: '' });
      
      // Mostrar alerta de éxito
      setAlert({ message: 'Producto agregado exitosamente', type: 'success', isVisible: true });

    } catch (error) {
      console.error("Error al guardar el producto:", error);
      // Mostrar alerta de error
      setAlert({ message: error.message, type: 'error', isVisible: true });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isVisible: false });
  };

  return (
    <div>
      {alert.isVisible && (
        <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
      )}
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
    </div>
  );
};

export default AddProduct;
