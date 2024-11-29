import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { createCategory } from '../controllers/categoryController';
import Alert from '../components/Alert'; // Importa el componente de alerta

export default function CategoryForm() {
  const [nombre, setNombre] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState({
    message: '',
    type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async (confirmationKey) => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    const result = await createCategory(nombre, confirmationKey);

    if (result.success) {
      setStatus({
        message: result.message,
        type: 'success',
      });
      setNombre('');
    } else {
      setStatus({
        message: result.message,
        type: 'error',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Agregar Nueva Categoría</h2>
      </div>

      {status.message && <Alert message={status.message} type={status.type} onClose={() => setStatus({ message: '', type: '' })} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-sm font-medium">
            Nombre de Categoría
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ingrese el nombre de la categoría"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : 'Agregar Categoría'}
        </button>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        categoryName={nombre}
      />
    </div>
  );
}
