
import React from 'react';
import { Link } from 'react-router-dom';
import { vendors } from '@/data/mockData';
import { Star } from 'lucide-react';

const VendorShowcase = () => {
  return (
    <section className="py-12 bg-white">
      <div className="marketplace-container">
        <h2 className="section-title text-center">Our Trusted Vendors</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <Link 
              to={`/vendor/${vendor.id}`} 
              key={vendor.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <img
                    src={vendor.logoUrl}
                    alt={vendor.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-2 hover:text-marketplace-purple transition-colors">
                {vendor.name}
              </h3>
              
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vendor.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({vendor.reviews})
                </span>
              </div>
              
              <p className="text-sm text-gray-500 text-center line-clamp-2 mb-4">
                {vendor.description}
              </p>
              
              <div className="text-center">
                <span className="text-sm text-marketplace-purple font-medium hover:underline">
                  View {vendor.products.length} Products
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link
            to="/vendors"
            className="inline-block bg-marketplace-blue text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          >
            View All Vendors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorShowcase;
