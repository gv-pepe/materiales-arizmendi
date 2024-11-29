import { useState, useEffect } from 'react';

export const useProductForm = () => {
  const [productData, setProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    stockMinimo: ''
  });

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState({
    message: '',
    type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  // Fetch categorías desde el servidor
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch('http://localhost:5000/api/categorias');
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setStatus({
          message: 'Error al cargar categorías',
          type: 'error'
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setProductData((prev) => ({
      ...prev,
      categoria: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async (confirmationKey) => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          confirmationKey
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          message: 'Producto agregado exitosamente',
          type: 'success'
        });
        setProductData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          minStock: ''
        });
      } else {
        setStatus({
          message: data.error || 'Error al agregar el producto',
          type: 'error'
        });
      }
    } catch (error) {
      setStatus({
        message: 'Error de conexión',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    productData,
    setProductData,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handleConfirm,
    isModalOpen,
    setIsModalOpen,
    status,
    isSubmitting,
    categories,
    isLoadingCategories
  };
};
