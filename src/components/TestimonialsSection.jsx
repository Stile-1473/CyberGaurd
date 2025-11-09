import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "AdVantage transformed our marketing strategy. Our ROI increased by 300% in just 6 months!",
      author: "John Doe",
      position: "CEO, TechStart Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 5
    },
    {
      quote: "The team's expertise and dedication are unmatched. They delivered beyond our expectations!",
      author: "Jane Smith",
      position: "Marketing Director, FashionForward",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 5
    },
    {
      quote: "Working with AdVantage was a game-changer. Our brand visibility skyrocketed overnight.",
      author: "Mike Johnson",
      position: "Founder, GreenEats Co.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 mx-6 mb-12">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-8 glass-convex inline-block px-10 py-6 rounded-3xl">What Our Clients Say</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-10 hover:shadow-lg transition duration-300">
              <div className="flex mb-8 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-secondary text-2xl" />
                ))}
              </div>
              <p className="text-lg mb-8 italic text-white text-center">"{testimonial.quote}"</p>
              <div className="flex items-center justify-center">
                <div className="glass-convex p-3 rounded-2xl mr-6">
                  <img src={testimonial.image} alt={testimonial.author} className="w-20 h-20 rounded-2xl object-cover" />
                </div>
                <div className="text-center">
                  <span className="font-semibold text-white block text-xl">{testimonial.author}</span>
                  <span className="text-lg text-white">{testimonial.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
