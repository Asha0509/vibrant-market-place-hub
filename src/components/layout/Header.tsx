
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="marketplace-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-marketplace-purple">
            VibrantMarket
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-marketplace-purple transition-colors">
              Home
            </Link>
            <Link to="/products/clothes" className="font-medium hover:text-marketplace-purple transition-colors">
              Clothes
            </Link>
            <Link to="/products/curtains" className="font-medium hover:text-marketplace-purple transition-colors">
              Curtains
            </Link>
            <Link to="/products/decor" className="font-medium hover:text-marketplace-purple transition-colors">
              Decor
            </Link>
            <Link to="/products/furniture" className="font-medium hover:text-marketplace-purple transition-colors">
              Furniture
            </Link>
          </nav>

          {/* Search, User, and Cart Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    Hello, {user.name}
                  </DropdownMenuItem>
                  {user.isVendor && (
                    <DropdownMenuItem asChild>
                      <Link to="/vendor/dashboard" className="w-full flex items-center">
                        <Store className="mr-2 h-4 w-4" />
                        Vendor Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500 flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-marketplace-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cart" className="relative mr-2">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-marketplace-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white animate-slideIn">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/products/clothes" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMenu}
              >
                Clothes
              </Link>
              <Link 
                to="/products/curtains" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMenu}
              >
                Curtains
              </Link>
              <Link 
                to="/products/decor" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMenu}
              >
                Decor
              </Link>
              <Link 
                to="/products/furniture" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMenu}
              >
                Furniture
              </Link>
              <Link 
                to="/search" 
                className="font-medium px-4 py-2 hover:bg-gray-100 rounded-md flex items-center"
                onClick={closeMenu}
              >
                <Search className="h-4 w-4 mr-2" /> Search
              </Link>
              
              {user ? (
                <>
                  <div className="px-4 py-2 font-medium border-t border-gray-200">
                    Hello, {user.name}
                  </div>
                  {user.isVendor && (
                    <Link 
                      to="/vendor/dashboard" 
                      className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center"
                      onClick={closeMenu}
                    >
                      <Store className="h-4 w-4 mr-2" /> Vendor Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/orders" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/profile" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md"
                    onClick={closeMenu}
                  >
                    Profile Settings
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="px-4 py-2 text-left hover:bg-gray-100 rounded-md text-red-500 font-medium flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center font-medium"
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4 mr-2" /> Login / Sign Up
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
