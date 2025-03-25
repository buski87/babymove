import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart(); // Obtenemos el carrito y la función para abrirlo

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular la cantidad total de productos en el carrito
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center text-gray-900">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-blue-500">BabyMove</a>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#features" className="hover:text-blue-500">Características</a>
          <a href="#productos" className="hover:text-blue-500">Productos</a>
          <a href="#faq" className="hover:text-blue-500">FAQ</a>
          <a href="#contacto" className="hover:text-blue-500">Contacto</a>
        </nav>

        {/* Icono del carrito con contador */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center text-gray-900 md:ml-4"
        >
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Botón menú hamburguesa (sólo en móvil) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-4"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-gray-900"
        >
          <X size={32} />
        </button>

        <nav className="flex flex-col space-y-8 text-2xl font-medium text-gray-900">
          <a href="#features" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Características</a>
          <a href="#productos" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Productos</a>
          <a href="#faq" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="#contacto" className="hover:text-blue-500" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}
