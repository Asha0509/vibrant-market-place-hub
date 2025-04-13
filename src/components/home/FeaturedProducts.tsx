
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { featuredProducts } from '@/data/mockData';

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-white">
      <div className="marketplace-container">
        <h2 className="section-title text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card group">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-marketplace-orange text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-marketplace-purple transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-bold text-marketplace-orange">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">
                  {product.vendorName}
                </p>
                
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link
            to="/products/all"
            className="inline-block bg-marketplace-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
