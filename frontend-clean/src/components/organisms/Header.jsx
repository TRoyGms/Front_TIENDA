import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation(); // Hook para obtener la ubicación actual

  const handleLinkClick = (to) => {
    if (location.pathname === to) {
      window.location.reload(); // Refresca la página si la ruta es la misma
    }
  };

  return (
    <header className="bg-[#C78562] w-full h-[110px] flex items-center justify-between px-8">
      <h1 className="text-white text-7xl font-bold">BIENVENIDO</h1>
      <nav className="flex space-x-6">
        <Link
          to="/services"
          onClick={() => handleLinkClick('/services')}
          className="text-white text-2xl font-semibold hover:text-gray-400 transition duration-200"
        >
          Servicios
        </Link>
        <Link
          to="/products"
          onClick={() => handleLinkClick('/products')}
          className="text-white text-2xl font-semibold hover:text-gray-400 transition duration-200"
        >
          Productos
        </Link>
      </nav>
    </header>
  );
}

export default Header;
