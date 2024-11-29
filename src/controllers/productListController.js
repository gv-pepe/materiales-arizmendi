import { useState, useEffect, useMemo } from "react";

export function useProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(""); // Resetear errores

      try {
        const response = await fetch("http://localhost:5000/api/productos");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data); // Asegúrate de que los nombres coinciden con la API
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((product) => product.categoria))];
    return ["Todas", ...uniqueCategories];
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "Todas" || product.categoria === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  // Manejar edición de producto
  const handleEdit = (productId) => {
    console.log("Editar producto:", productId);
    
  };

  // Manejar eliminación de producto
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      setProducts(products.filter((product) => product.id !== productId));
      console.log("Producto eliminado exitosamente.");
    } catch (err) {
      console.error("Error eliminando el producto:", err.message);
      setError("Error al eliminar el producto.");
    }
  };

  return {
    products,
    setProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
    handleEdit,
    handleDelete,
    isLoading,
    error,
  };
}
