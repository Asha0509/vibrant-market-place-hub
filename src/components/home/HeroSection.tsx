
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductShowcase3D from '../3d/ProductShowcase3D';

const HeroSection = () => {
  // Add entrance animations
  useEffect(() => {
    const title = document.querySelector('.hero-title');
    const description = document.querySelector('.hero-description');
    const buttons = document.querySelector('.hero-buttons');
    
    setTimeout(() => {
      title?.classList.add('animate-fade-in');
    }, 300);
    
    setTimeout(() => {
      description?.classList.add('animate-fade-in');
    }, 600);
    
    setTimeout(() => {
      buttons?.classList.add('animate-fade-in');
    }, 900);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12 md:py-20 overflow-hidden">
      <div className="marketplace-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 opacity-0 transition-all duration-700">
              Discover Unique Products from <span className="text-marketplace-purple">Amazing Vendors</span>
            </h1>
            <p className="hero-description text-xl text-gray-700 mb-6 opacity-0 transition-all duration-700">
              Shop our curated collection of clothes, curtains, decor, and furniture from trusted vendors.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 opacity-0 transition-all duration-700">
              <Link
                to="/products/all"
                className="inline-flex items-center bg-marketplace-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup?vendor=true"
                className="inline-flex items-center bg-marketplace-orange text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-marketplace-purple opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-marketplace-orange opacity-20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 right-0 w-40 h-40 bg-marketplace-blue opacity-20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Replace the static image with our 3D component */}
              <div className="relative z-10 overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-105">
                <ProductShowcase3D />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
