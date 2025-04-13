
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg',
    role: 'Fashion Enthusiast',
    content: 'I love the variety of clothes available on VibrantMarket. The quality is excellent, and the vendors are very responsive. Will definitely shop here again!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Lee',
    avatar: '/placeholder.svg',
    role: 'Home Decorator',
    content: 'Found amazing curtains for my new apartment. The checkout process was smooth, and delivery was faster than expected. Great platform!',
    rating: 4,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: '/placeholder.svg',
    role: 'Interior Designer',
    content: 'As a professional interior designer, I\'m impressed by the quality of decor items. My clients love the unique pieces I\'ve sourced from this marketplace.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="marketplace-container">
        <h2 className="section-title text-center">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
