// confirmationController.js

import { useState } from 'react';

export const useConfirmationController = (onConfirm, onClose) => {
  const [confirmationKey, setConfirmationKey] = useState('');
  
  const confirmationSecretKey = '1'; 

  const handleConfirm = () => {
    if (confirmationKey.trim() === confirmationSecretKey) {
      onConfirm(confirmationKey);
      setConfirmationKey('');
    } else {
      alert("La clave de confirmación es incorrecta.");  
    }
  };

  const handleClose = () => {
    setConfirmationKey('');
    onClose();
  };

  return {
    confirmationKey,
    setConfirmationKey,
    handleConfirm,
    handleClose,
  };
};
