import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              LideraAI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Recursos
            </a>
            <a href="#beneficios" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Como Funciona
            </a>
            <button
              onClick={() => {
                const loginSection = document.querySelector('[data-login]');
                if (loginSection) {
                  loginSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
              Entrar
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#recursos"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Recursos
            </a>
            <a
              href="#beneficios"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Benefícios
            </a>
            <a
              href="#como-funciona"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Como Funciona
            </a>
            <button
              onClick={() => {
                const loginSection = document.querySelector('[data-login]');
                if (loginSection) {
                  loginSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md font-medium">
              Entrar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
