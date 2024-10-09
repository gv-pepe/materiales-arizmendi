import React, { useState } from 'react';
import ProductManagement from './Productos/ProductManagement'; // Asegúrate de que este es el nombre correcto del componente

const Inventario = () => <div>Contenido de Inventario</div>;
const Ventas = () => <div>Contenido de Ventas</div>;
const Reportes = () => <div>Contenido de Reportes</div>;

const Header = () => {
  const [activeTab, setActiveTab] = useState('Productos');

  const tabs = ['Productos', 'Inventario', 'Ventas', 'Reportes'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Productos':
        return <ProductManagement />; // Renderiza el componente ProductManagement
      case 'Inventario':
        return <Inventario />;
      case 'Ventas':
        return <Ventas />;
      case 'Reportes':
        return <Reportes />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between p-2 bg-gray-100 rounded-lg mx-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 px-6 py-2 text-sm font-medium rounded mx-2 ${
              activeTab === tab
                ? 'bg-white text-black shadow'
                : 'text-gray-500 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab} // Mejora la accesibilidad
            aria-label={`Ir a ${tab}`} // Mejora la accesibilidad
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        {renderContent()} {/* Muestra el contenido del componente activo */}
      </div>
    </div>
  );
};

export default Header;
