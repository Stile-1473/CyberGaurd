import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Campaign',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
      description: 'Increased online sales by 150% through targeted digital advertising.'
    },
    {
      id: 2,
      title: 'Brand Awareness TV Spot',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      description: 'Launched a memorable TV campaign that boosted brand recognition by 200%.'
    },
    {
      id: 3,
      title: 'Social Media Strategy',
      category: 'social',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80',
      description: 'Grew social media following by 300% and engagement by 400%.'
    },
    {
      id: 4,
      title: 'Mobile App Promotion',
      category: 'digital',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Achieved 500K downloads in the first month through innovative app store optimization.'
    },
    {
      id: 5,
      title: 'Outdoor Billboard Campaign',
      category: 'traditional',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'High-impact outdoor advertising that increased foot traffic by 80%.'
    },
    {
      id: 6,
      title: 'Influencer Marketing',
      category: 'social',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Collaborated with influencers to reach niche audiences and drive conversions.'
    }
  ];

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 mx-6 mb-12">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-8 glass-convex inline-block px-10 py-6 rounded-3xl">Our Portfolio</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Explore our successful campaigns and see how we've helped businesses achieve their marketing goals.
          </p>
        </div>
        <div className="flex justify-center mb-16 flex-wrap gap-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`glass-button px-10 py-5 rounded-2xl font-semibold transition duration-300 text-xl ${activeFilter === 'all' ? 'glass-pressed' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('digital')}
            className={`glass-button px-10 py-5 rounded-2xl font-semibold transition duration-300 text-xl ${activeFilter === 'digital' ? 'glass-pressed' : ''}`}
          >
            Digital
          </button>
          <button
            onClick={() => setActiveFilter('traditional')}
            className={`glass-button px-10 py-5 rounded-2xl font-semibold transition duration-300 text-xl ${activeFilter === 'traditional' ? 'glass-pressed' : ''}`}
          >
            Traditional
          </button>
          <button
            onClick={() => setActiveFilter('social')}
            className={`glass-button px-10 py-5 rounded-2xl font-semibold transition duration-300 text-xl ${activeFilter === 'social' ? 'glass-pressed' : ''}`}
          >
            Social
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card overflow-hidden hover:shadow-lg transition duration-300">
              <div className="glass-concave p-6">
                <img src={project.image} alt={project.title} className="w-full h-56 object-cover rounded-xl" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-semibold text-white mb-6">{project.title}</h3>
                <p className="text-lg mb-8 text-white">{project.description}</p>
                <button className="glass-button px-8 py-4 rounded-xl text-white hover:text-primary transition duration-300 flex items-center justify-center w-full text-lg">
                  View Case Study <FaExternalLinkAlt className="ml-3 text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
