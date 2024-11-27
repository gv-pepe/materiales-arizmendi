'use client'

import { useConfirmationController } from '../controllers/confirmationController';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, categoryName }) {
  const {
    confirmationKey,
    setConfirmationKey,
    handleConfirm,
    handleClose,
  } = useConfirmationController(onConfirm, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg sm:max-w-[425px] w-full">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Confirmar Nueva Categoría</h3>
          <p className="text-sm text-gray-600">
            Está a punto de agregar la categoría "{categoryName}". Por favor, ingrese la clave de confirmación para proceder.
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmationKey" className="block text-sm font-medium text-gray-700">
            Clave
          </label>
          <input
            id="confirmationKey"
            type="password"
            value={confirmationKey}
            onChange={(e) => setConfirmationKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${confirmationKey ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
            onClick={handleConfirm}
            disabled={!confirmationKey}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
