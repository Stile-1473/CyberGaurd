import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden mx-6 mb-12">
      <div className="glass-card w-full max-w-7xl p-16 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-12 text-white glass-convex inline-block px-12 py-6 rounded-3xl">AdVantage</h1>
        <p className="text-2xl md:text-3xl lg:text-4xl mb-16 max-w-5xl mx-auto text-white animate-fade-in-up animation-delay-200">
          Elevate Your Advertising Game with Cutting-Edge Strategies and Data-Driven Insights
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12 animate-fade-in-up animation-delay-400">
          <button className="glass-button bg-secondary text-white px-12 py-6 rounded-2xl font-semibold text-2xl hover:bg-yellow-400 transition duration-300">
            Get Started Today
          </button>
          <button
            onClick={scrollToAbout}
            className="glass-button px-12 py-6 rounded-2xl font-semibold text-2xl text-white hover:text-primary transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <button onClick={scrollToAbout} className="glass-button p-6 rounded-2xl text-white hover:text-primary transition duration-300 animate-bounce">
          <FaArrowDown className="text-3xl" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
