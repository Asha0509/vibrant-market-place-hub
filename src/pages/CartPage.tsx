
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingCart className="h-8 w-8 mr-2" />
          Your Cart
        </h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <Link to={`/product/${item.product.id}`} className="shrink-0">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          </Link>
                          
                          {/* Product Details */}
                          <div className="flex-grow">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-medium text-gray-800 hover:text-marketplace-purple transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500 mb-1">
                              Sold by {item.product.vendorName}
                            </p>
                            <p className="text-marketplace-orange font-semibold">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity, -1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity, 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-4 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{subtotal > 50 ? 'Free' : '$4.99'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      ${(
                        subtotal +
                        (subtotal > 50 ? 0 : 4.99) +
                        subtotal * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-marketplace-purple hover:bg-marketplace-purple/90 flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-4">
                  <Link
                    to="/products/all"
                    className="text-marketplace-purple text-sm hover:underline flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products/all">
              <Button className="bg-marketplace-purple hover:bg-marketplace-purple/90">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
