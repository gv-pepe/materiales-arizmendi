import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductTable from "./ProductTable";
import Alert from "../Alert"; // Asegúrate de que la ruta sea correcta

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' }); // Estado para alertas

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/productos");
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setAlert({ message: "Error al obtener productos.", type: "error" }); // Mensaje de error
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
    setAlert({ message: "Producto agregado exitosamente.", type: "success" }); // Mensaje de éxito
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
    setAlert({ message: "Producto actualizado exitosamente.", type: "success" }); // Mensaje de éxito
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/productos/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        setProducts((prev) => prev.filter((product) => product.idProducto !== productId));
        setFilteredProducts((prev) => prev.filter((product) => product.idProducto !== productId));
        setAlert({ message: "Producto eliminado exitosamente.", type: "success" }); // Mensaje de éxito
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        setAlert({ message: "Error al eliminar el producto.", type: "error" }); // Mensaje de error
      }
    }
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  const closeAlert = () => {
    setAlert({ message: '', type: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <AddProduct onAdd={handleAddProduct} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para editar productos */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onClose={closeEditModal}
        />
      )}

      {/* Mostrar alerta si hay un mensaje */}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default ProductManagement;
