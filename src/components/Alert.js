import React, { useEffect } from 'react'
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react'

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const alertStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 mr-2" />,
    error: <AlertCircle className="w-5 h-5 mr-2" />,
    info: <Info className="w-5 h-5 mr-2" />,
    warning: <AlertCircle className="w-5 h-5 mr-2" />
  }

  return (
    <div className={`fixed top-4 right-4 z-50 ${alertStyles[type]} text-white p-4 rounded-md shadow-lg max-w-md`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icons[type]}
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

export default Alert