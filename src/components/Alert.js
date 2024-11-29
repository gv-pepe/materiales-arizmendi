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
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700'
  }

  const icons = {
    success: <CheckCircle className="w-6 h-6 mr-3" />,
    error: <AlertCircle className="w-6 h-6 mr-3" />,
    info: <Info className="w-6 h-6 mr-3" />,
    warning: <AlertCircle className="w-6 h-6 mr-3" />
  }

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl">
      <div 
        className={`${alertStyles[type]} border-l-4 p-4 rounded-md shadow-lg 
                    transition-all duration-300 ease-in-out 
                    transform translate-y-0 opacity-100`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {icons[type]}
            <p className="text-base font-medium">{message}</p>
          </div>
          <button 
            onClick={onClose} 
            className={`ml-4 text-${type === 'warning' ? 'yellow' : type}-500 hover:text-${type === 'warning' ? 'yellow' : type}-700 transition-colors duration-200`}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert

