import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 mx-6 mb-12">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-8 glass-convex inline-block px-10 py-6 rounded-3xl">Get In Touch</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Ready to elevate your advertising game? Let's discuss how we can help your business grow.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="glass-card p-10">
            <h3 className="text-3xl font-semibold text-white mb-10 glass-convex inline-block px-8 py-4 rounded-2xl">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-center glass-flat p-6 rounded-xl">
                <div className="glass-convex p-4 rounded-xl mr-6">
                  <FaMapMarkerAlt className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Address</p>
                  <p className="text-white">123 Advertising Ave, Marketing City, MC 12345</p>
                </div>
              </div>
              <div className="flex items-center glass-flat p-6 rounded-xl">
                <div className="glass-convex p-4 rounded-xl mr-6">
                  <FaPhone className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Phone</p>
                  <p className="text-white">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center glass-flat p-6 rounded-xl">
                <div className="glass-convex p-4 rounded-xl mr-6">
                  <FaEnvelope className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Email</p>
                  <p className="text-white">hello@advantage.com</p>
                </div>
              </div>
              <div className="flex items-center glass-flat p-6 rounded-xl">
                <div className="glass-convex p-4 rounded-xl mr-6">
                  <FaClock className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Business Hours</p>
                  <p className="text-white">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-10">
            <h3 className="text-3xl font-semibold text-white mb-10 glass-convex inline-block px-8 py-4 rounded-2xl">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-white mb-3">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-input w-full px-6 py-4 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-white mb-3">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-input w-full px-6 py-4 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="company" className="block text-lg font-medium text-white mb-3">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="glass-input w-full px-6 py-4 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-white mb-3">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input w-full px-6 py-4 text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-white mb-3">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="glass-input w-full px-6 py-4 text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="glass-button w-full bg-primary text-white px-10 py-5 rounded-2xl font-semibold hover:bg-blue-600 transition duration-300 text-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
