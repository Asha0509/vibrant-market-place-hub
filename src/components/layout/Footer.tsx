
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="marketplace-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VibrantMarket</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop shop for all home goods and fashion needs from trusted vendors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-marketplace-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-marketplace-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products/all" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-300 hover:text-white transition-colors">
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/clothes" className="text-gray-300 hover:text-white transition-colors">
                  Clothes
                </Link>
              </li>
              <li>
                <Link to="/products/curtains" className="text-gray-300 hover:text-white transition-colors">
                  Curtains
                </Link>
              </li>
              <li>
                <Link to="/products/decor" className="text-gray-300 hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products/furniture" className="text-gray-300 hover:text-white transition-colors">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-marketplace-orange" />
                <span className="text-gray-300">
                  123 Market Street, City Center, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-marketplace-orange" />
                <span className="text-gray-300">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-marketplace-orange" />
                <span className="text-gray-300">support@vibrantmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} VibrantMarket. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-gray-400 text-sm hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
