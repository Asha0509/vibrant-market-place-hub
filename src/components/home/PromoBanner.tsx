
import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="py-10 bg-marketplace-purple text-white">
      <div className="marketplace-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Ready to start selling?</h3>
            <p className="text-purple-100">
              Join our marketplace today and reach thousands of customers.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/signup?vendor=true"
              className="bg-white text-marketplace-purple px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Become a Vendor
            </Link>
            <Link
              to="/learn-more"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
