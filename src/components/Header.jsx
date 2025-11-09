import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="glass-flat sticky top-0 z-50 rounded-b-3xl mx-6 mt-6 mb-12">
      <div className="container mx-auto px-8 py-8 flex justify-between items-center">
        <div className="text-4xl font-bold text-white glass-convex px-8 py-4 rounded-2xl">AdVantage</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">Home</a>
          <a href="#about" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">About</a>
          <a href="#services" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">Services</a>
          <a href="#portfolio" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">Portfolio</a>
          <a href="#testimonials" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">Testimonials</a>
          <a href="#contact" className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300">Contact</a>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="glass-button p-4 rounded-xl text-white focus:outline-none">
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden glass-concave mx-8 mb-8 rounded-2xl">
          <nav className="px-8 py-6 space-y-4">
            <a href="#home" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>Home</a>
            <a href="#about" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>About</a>
            <a href="#services" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>Services</a>
            <a href="#portfolio" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>Portfolio</a>
            <a href="#testimonials" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>Testimonials</a>
            <a href="#contact" className="glass-button block px-8 py-4 rounded-xl text-center text-white hover:text-primary transition duration-300" onClick={toggleMenu}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
