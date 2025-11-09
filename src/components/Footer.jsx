import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="glass-flat mx-6 mt-12 mb-6 rounded-t-3xl">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="glass-concave p-8 rounded-2xl">
            <h3 className="text-4xl font-bold text-white mb-8 glass-convex inline-block px-6 py-3 rounded-xl">AdVantage</h3>
            <p className="text-lg mb-8 text-white">
              Elevating businesses through innovative advertising solutions and data-driven strategies.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="glass-button p-4 rounded-xl text-white hover:text-primary transition duration-300">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="glass-button p-4 rounded-xl text-white hover:text-primary transition duration-300">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="glass-button p-4 rounded-xl text-white hover:text-primary transition duration-300">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="glass-button p-4 rounded-xl text-white hover:text-primary transition duration-300">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
          <div className="glass-concave p-8 rounded-2xl">
            <h4 className="text-2xl font-semibold mb-8 text-white glass-convex inline-block px-6 py-3 rounded-xl">Services</h4>
            <ul className="space-y-4 text-lg">
              <li><a href="#services" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Data Analytics</a></li>
              <li><a href="#services" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Targeted Advertising</a></li>
              <li><a href="#services" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Creative Design</a></li>
              <li><a href="#services" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Video Production</a></li>
            </ul>
          </div>
          <div className="glass-concave p-8 rounded-2xl">
            <h4 className="text-2xl font-semibold mb-8 text-white glass-convex inline-block px-6 py-3 rounded-xl">Company</h4>
            <ul className="space-y-4 text-lg">
              <li><a href="#about" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">About Us</a></li>
              <li><a href="#portfolio" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Portfolio</a></li>
              <li><a href="#testimonials" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Testimonials</a></li>
              <li><a href="#contact" className="glass-button block px-6 py-3 rounded-xl text-center text-white hover:text-primary transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="glass-concave p-8 rounded-2xl">
            <h4 className="text-2xl font-semibold mb-8 text-white glass-convex inline-block px-6 py-3 rounded-xl">Contact Info</h4>
            <ul className="space-y-4 text-lg">
              <li className="glass-flat p-4 rounded-xl text-center text-white">123 Advertising Ave</li>
              <li className="glass-flat p-4 rounded-xl text-center text-white">Marketing City, MC 12345</li>
              <li className="glass-flat p-4 rounded-xl text-center text-white">(555) 123-4567</li>
              <li className="glass-flat p-4 rounded-xl text-center text-white">hello@advantage.com</li>
            </ul>
          </div>
        </div>
        <div className="glass-concave mt-12 p-8 rounded-2xl text-center">
          <p className="text-lg text-white">&copy; 2024 AdVantage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
