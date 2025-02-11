import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  triggerFooterContact: () => void;
}

const menuItems = [
  { title: 'PROJECTS', href: '#projects', image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/2_olbmkz.png' },
  { title: 'ITALIAN CRAFTSMANSHIP', href: '#italian-craftsmanship', image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/1_eooofq.png' },
  { title: 'HISTORY', href: '#history', image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/3_lirws2.png' },
  { title: 'SUSTAINABILITY', href: '/sustainability', image: 'https://res.cloudinary.com/dnddesigncenter/image/upload/sustainability_2_vyrldt.avif' },
  { title: 'CONTACT', href: '#footer', image: 'https://images.unsplash.com/photo-1567016557389-5246a1940bdc?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
];

const Navbar: React.FC<NavbarProps> = ({ isScrolled, isMenuOpen, setIsMenuOpen }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleClose = () => {
    setIsMenuOpen(false);
    setIsHovered(false);
    setActiveItem(null);
  };

  const isHomePage = location.pathname === '/';

  function triggerFooterContact() {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 transform ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        } ${
          isMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="https://res.cloudinary.com/dnddesigncenter/image/upload/D_D_h52kdi.svg" 
                alt="D&D Design Center" 
                className={`h-12 transition-all duration-300 ${
                  isScrolled 
                    ? 'brightness-0' 
                    : 'brightness-0 invert'
                }`}
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-serif ${isScrolled ? 'text-[#2D2D2D]' : 'text-white'}`}>MENU</span>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${
                  isScrolled ? 'text-[#2D2D2D]' : 'text-white'
                } hover:scale-110`}
                aria-label="Menu"
              >
                <Menu className="w-10 h-10 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      >
        <div
          className={`fixed top-0 right-0 h-screen flex transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 text-[#2D2D2D] hover:scale-110 transition-transform duration-200 z-50"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div 
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? 'w-[500px]' : 'w-0'
            }`}
          >
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeItem === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>

          <div className="w-[300px] bg-white flex flex-col h-full">
            <div className="pt-12 pb-8 px-12 flex justify-center items-center">
              <img 
                src="https://res.cloudinary.com/dnddesigncenter/image/upload/D_D_h52kdi.svg" 
                alt="D&D Design Center" 
                className="w-32 brightness-0"
              />
            </div>

            <nav className="flex-1 px-12 flex flex-col justify-center space-y-8">
            {menuItems.map((item, index) => {
              const handleItemClick = () => {
                handleClose();
                if (item.title === 'CONTACT') {
                  triggerFooterContact();
                }
              };

              return item.href.startsWith('#') && !isHomePage ? (
                <Link
                  key={item.title}
                  to={`/${item.href}`}
                  className="block text-[20px] font-serif text-[#2D2D2D] hover:text-[#C5A267] transition-colors duration-200"
                  onClick={handleItemClick}
                  onMouseEnter={() => {
                    setActiveItem(index);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={item.title}
                  to={item.href}
                  className="block text-[20px] font-serif text-[#2D2D2D] hover:text-[#C5A267] transition-colors duration-200"
                  onClick={handleItemClick}
                  onMouseEnter={() => {
                    setActiveItem(index);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  {item.title}
                </Link>
              );
            })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;