
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/mockData';
import { Product, Category } from '@/types/product';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal, X } from 'lucide-react';

const ProductListingPage = () => {
  const { category = 'all' } = useParams<{ category: Category }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [vendors, setVendors] = useState<{ id: string; name: string; checked: boolean }[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Set category title
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  // Load products based on category
  useEffect(() => {
    const fetchedProducts = getProductsByCategory(category);
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
    
    // Extract unique vendors from products
    const uniqueVendors = Array.from(
      new Set(fetchedProducts.map((product) => product.vendorId))
    ).map((vendorId) => {
      const vendorName = fetchedProducts.find((p) => p.vendorId === vendorId)?.vendorName || '';
      return { id: vendorId, name: vendorName, checked: true };
    });
    
    setVendors(uniqueVendors);
  }, [category]);
  
  // Apply filters when they change
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Price filter
      const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Vendor filter
      const selectedVendorIds = vendors
        .filter((v) => v.checked)
        .map((v) => v.id);
      const vendorSelected = selectedVendorIds.includes(product.vendorId);
      
      return withinPriceRange && vendorSelected;
    });
    
    setFilteredProducts(filtered);
  }, [priceRange, vendors, products]);
  
  // Handle vendor filter change
  const handleVendorChange = (vendorId: string, checked: boolean) => {
    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, checked } : vendor
      )
    );
  };
  
  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-8">
        <div className="marketplace-container">
          <h1 className="text-3xl font-bold text-gray-900">
            {category === 'all' ? 'All Products' : `${categoryTitle}`}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} products available
          </p>
        </div>
      </div>
      
      <div className="marketplace-container py-8">
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-2 text-marketplace-purple font-medium"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          
          {filteredProducts.length < products.length && (
            <span className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop (always visible) and Mobile (toggleable) */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                {showFilters && (
                  <button onClick={toggleFilters} className="lg:hidden">
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={[0, 300]}
                  max={300}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Vendor Filter */}
              <div>
                <h3 className="font-medium mb-3">Vendors</h3>
                <div className="space-y-2">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center">
                      <Checkbox
                        id={`vendor-${vendor.id}`}
                        checked={vendor.checked}
                        onCheckedChange={(checked) =>
                          handleVendorChange(vendor.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`vendor-${vendor.id}`}
                        className="ml-2 text-sm font-normal cursor-pointer"
                      >
                        {vendor.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
