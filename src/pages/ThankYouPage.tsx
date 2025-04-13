
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const ThankYouPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // If the cart is not empty and there's no order, redirect to home
  useEffect(() => {
    if (items.length > 0) {
      navigate('/');
    }
  }, [items, navigate]);
  
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  return (
    <Layout>
      <div className="marketplace-container py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You For Your Order!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your order has been received and is now being processed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md mb-8">
            <p className="text-gray-500 mb-1">Order Number</p>
            <p className="text-xl font-semibold"># {orderNumber}</p>
          </div>
          
          <p className="mb-2 text-gray-600">
            We've sent a confirmation email to your email address.
          </p>
          
          <p className="mb-8 text-gray-600">
            You can check the status of your order in the "My Orders" section of your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="flex items-center gap-2 bg-marketplace-purple hover:bg-marketplace-purple/90">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/orders">
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
