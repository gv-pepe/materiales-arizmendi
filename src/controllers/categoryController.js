// categoryController.js

export const createCategory = async (nombre) => {
  try {
    const response = await fetch('http://localhost:5000/api/categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Categoría creada exitosamente', data };
    } else {
      if (data.error === 'Categoría ya existe') {
        return { success: false, message: 'La categoría ya existe.' };
      }
      return { success: false, message: data.error || 'Error al crear la categoría' };
    }
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};
