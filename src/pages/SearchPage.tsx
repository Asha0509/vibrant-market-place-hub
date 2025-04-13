
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { products } from '@/data/mockData';
import { Product, Category } from '@/types/product';
import { Search, ChevronDown } from 'lucide-react';

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'clothes', label: 'Clothes' },
  { value: 'curtains', label: 'Curtains' },
  { value: 'decor', label: 'Decor' },
  { value: 'furniture', label: 'Furniture' },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    // Filter products based on search term and category
    const results = products.filter((product) => {
      const matchesSearchTerm = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearchTerm && matchesCategory;
    });
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <Layout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
        
        {/* Add featured products section at the top of search */}
        {!hasSearched && (
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-center mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.filter(p => p.featured).slice(0, 5).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, categories, vendors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
            
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    {categoryOptions.find(cat => cat.value === selectedCategory)?.label || 'All Categories'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {categoryOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSelectedCategory(option.value)}
                      className={selectedCategory === option.value ? "font-bold" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Button 
            onClick={handleSearch} 
            className="w-full md:w-auto"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        
        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-2">No products found matching your search criteria.</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
