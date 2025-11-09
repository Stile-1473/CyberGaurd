import React from 'react';
import { FaBullseye, FaUsers, FaAward } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 mx-6 mb-12">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-8 glass-convex inline-block px-10 py-6 rounded-3xl">About AdVantage</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            We're a leading advertising agency dedicated to helping businesses grow through innovative marketing strategies and data-driven insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="glass-card p-10 text-center">
            <div className="glass-convex w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center">
              <FaBullseye className="text-5xl text-primary" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-6">Our Mission</h3>
            <p className="text-lg text-white">To empower businesses with cutting-edge advertising solutions that drive real results.</p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="glass-convex w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center">
              <FaUsers className="text-5xl text-primary" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-6">Our Team</h3>
            <p className="text-lg text-white">A diverse group of creative minds and marketing experts working together to achieve excellence.</p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="glass-convex w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center">
              <FaAward className="text-5xl text-primary" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-6">Our Achievements</h3>
            <p className="text-lg text-white">Recognized industry leaders with numerous awards and successful campaigns under our belt.</p>
          </div>
        </div>
        <div className="glass-card p-16">
          <h3 className="text-4xl font-bold text-white mb-12 text-center glass-convex inline-block px-10 py-6 rounded-3xl">Why Choose AdVantage?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-flat p-8 rounded-2xl">
              <h4 className="text-2xl font-semibold text-white mb-4">Data-Driven Approach</h4>
              <p className="text-lg text-white">We use advanced analytics to optimize your campaigns for maximum ROI.</p>
            </div>
            <div className="glass-flat p-8 rounded-2xl">
              <h4 className="text-2xl font-semibold text-white mb-4">Creative Excellence</h4>
              <p className="text-lg text-white">Our team of designers and copywriters create compelling content that resonates with your audience.</p>
            </div>
            <div className="glass-flat p-8 rounded-2xl">
              <h4 className="text-2xl font-semibold text-white mb-4">Proven Results</h4>
              <p className="text-lg text-white">We have a track record of delivering measurable results for our clients across various industries.</p>
            </div>
            <div className="glass-flat p-8 rounded-2xl">
              <h4 className="text-2xl font-semibold text-white mb-4">Personalized Service</h4>
              <p className="text-lg text-white">We work closely with each client to understand their unique needs and tailor our strategies accordingly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
