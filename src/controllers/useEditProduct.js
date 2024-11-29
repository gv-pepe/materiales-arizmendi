"use client";

import { useState, useEffect } from "react";

export default function useEditProduct({ product, categories, onSave, onClose }) {
  const [editedProduct, setEditedProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: 0,
    stock: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditedProduct(product || {});
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setEditedProduct((prev) => ({ ...prev, categoria: value }));
  };

  const handleSave = async () => {
    if (!editedProduct.nombre || !editedProduct.precio || !editedProduct.stock) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/productos/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: editedProduct.nombre,
          descripcion: editedProduct.descripcion,
          categoria: editedProduct.categoria,
          precio: editedProduct.precio,
          stock: editedProduct.stock,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const updatedProduct = await response.json();
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un problema al actualizar el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editedProduct,
    categories,
    handleChange,
    handleCategoryChange,
    handleSave,
    isLoading,
  };
}
