
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById, getProductsByCategory } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Star, Truck, ShieldCheck, ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  
  // Get product details
  const product = productId ? getProductById(productId) : null;
  
  if (!product) {
    return (
      <Layout>
        <div className="marketplace-container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products/all')}>
            Browse All Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Get related products (same category)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  
  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Handle buy now
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = () => {
    toast.success('Added to wishlist');
  };
  
  // Go back
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="marketplace-container py-8">
        {/* Breadcrumb & Back Button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="flex items-center text-marketplace-purple hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
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
              <span className="text-sm text-gray-500 ml-2">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Sold by <span className="text-marketplace-purple">{product.vendorName}</span>
            </p>
            
            <div className="text-2xl font-bold text-marketplace-orange mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-marketplace-purple hover:bg-marketplace-purple/90 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-marketplace-orange hover:bg-marketplace-orange/90"
              >
                Buy Now
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="sm:flex-none"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-marketplace-purple mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-marketplace-purple mr-2" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
