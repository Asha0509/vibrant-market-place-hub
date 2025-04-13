
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <Link to={link} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-md h-64">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-semibold mb-1 group-hover:text-marketplace-orange transition-colors">
            {title}
          </h3>
          <p className="text-gray-200 text-sm mb-3">
            {description}
          </p>
          <span className="text-marketplace-orange font-medium group-hover:underline">
            Explore {title}
          </span>
        </div>
      </div>
    </Link>
  );
};

const CategorySection = () => {
  const categories = [
    {
      title: 'Clothes',
      description: 'Discover the latest fashion trends',
      imageUrl: '/placeholder.svg',
      link: '/products/clothes',
    },
    {
      title: 'Curtains',
      description: 'Elegant window treatments for your home',
      imageUrl: '/placeholder.svg',
      link: '/products/curtains',
    },
    {
      title: 'Decor',
      description: 'Beautiful items to enhance your space',
      imageUrl: '/placeholder.svg',
      link: '/products/decor',
    },
    {
      title: 'Furniture',
      description: 'Quality furniture for every room',
      imageUrl: '/placeholder.svg',
      link: '/products/furniture',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="marketplace-container">
        <h2 className="section-title text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
