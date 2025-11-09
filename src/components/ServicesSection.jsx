import React from 'react';
import { FaChartLine, FaBullseye, FaRocket, FaPaintBrush, FaVideo, FaSearch } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaChartLine className="text-5xl text-primary" />,
      title: 'Data Analytics',
      description: 'Leverage data-driven insights to optimize your advertising campaigns and maximize ROI.'
    },
    {
      icon: <FaBullseye className="text-5xl text-primary" />,
      title: 'Targeted Advertising',
      description: 'Reach your ideal audience with precision targeting strategies across multiple platforms.'
    },
    {
      icon: <FaRocket className="text-5xl text-primary" />,
      title: 'Performance Boost',
      description: 'Enhance your ad performance with our expert optimization techniques and A/B testing.'
    },
    {
      icon: <FaPaintBrush className="text-5xl text-primary" />,
      title: 'Creative Design',
      description: 'Stunning visuals and compelling copy that capture attention and drive engagement.'
    },
    {
      icon: <FaVideo className="text-5xl text-primary" />,
      title: 'Video Production',
      description: 'Professional video content creation for TV, social media, and digital campaigns.'
    },
    {
      icon: <FaSearch className="text-5xl text-primary" />,
      title: 'SEO & SEM',
      description: 'Dominate search results with our comprehensive SEO and paid search strategies.'
    }
  ];

  return (
    <section id="services" className="py-24 mx-6 mb-12">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-8 glass-convex inline-block px-10 py-6 rounded-3xl">Our Services</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            We offer a comprehensive range of advertising solutions to help your business thrive in the digital age.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-10 text-center hover:shadow-lg transition duration-300">
              <div className="mb-8 flex justify-center glass-convex w-24 h-24 rounded-2xl mx-auto flex items-center justify-center">{service.icon}</div>
              <h3 className="text-3xl font-semibold mb-6 text-white">{service.title}</h3>
              <p className="text-lg text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
