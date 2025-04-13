
import { Product, Vendor } from '../types/product';

// Sample vendors
export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'HomeStyle Decor',
    logoUrl: '/placeholder.svg',
    description: 'Specializing in high-quality home decoration items with unique designs.',
    rating: 4.8,
    reviews: 156,
    products: [],
  },
  {
    id: 'v2',
    name: 'Fashion Forward',
    logoUrl: '/placeholder.svg',
    description: 'Trendy clothes and accessories for the modern individual.',
    rating: 4.5,
    reviews: 208,
    products: [],
  },
  {
    id: 'v3',
    name: 'Elegant Drapery',
    logoUrl: '/placeholder.svg',
    description: 'Premium curtains and window treatments to beautify your home.',
    rating: 4.7,
    reviews: 124,
    products: [],
  },
  {
    id: 'v4',
    name: 'Comfort Furniture',
    logoUrl: '/placeholder.svg',
    description: 'Stylish and comfortable furniture for every room in your home.',
    rating: 4.6,
    reviews: 178,
    products: [],
  },
];

// Sample products
export const products: Product[] = [
  // Clothes
  {
    id: 'p1',
    name: 'Summer Floral Dress',
    description: 'Light, breezy summer dress with a beautiful floral pattern. Perfect for warm days.',
    price: 59.99,
    imageUrl: '/placeholder.svg',
    category: 'clothes',
    vendorId: 'v2',
    vendorName: 'Fashion Forward',
    rating: 4.6,
    reviews: 42,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Casual Denim Jacket',
    description: 'Classic denim jacket that goes with any outfit. Durable and stylish.',
    price: 89.99,
    imageUrl: '/placeholder.svg',
    category: 'clothes',
    vendorId: 'v2',
    vendorName: 'Fashion Forward',
    rating: 4.7,
    reviews: 38,
  },
  {
    id: 'p3',
    name: 'Slim Fit Trousers',
    description: 'Comfortable yet stylish slim fit trousers for a modern look.',
    price: 49.99,
    imageUrl: '/placeholder.svg',
    category: 'clothes',
    vendorId: 'v2',
    vendorName: 'Fashion Forward',
    rating: 4.4,
    reviews: 26,
  },
  
  // Curtains
  {
    id: 'p4',
    name: 'Blackout Curtains',
    description: 'Energy-efficient blackout curtains that block sunlight and provide privacy.',
    price: 79.99,
    imageUrl: '/placeholder.svg',
    category: 'curtains',
    vendorId: 'v3',
    vendorName: 'Elegant Drapery',
    rating: 4.8,
    reviews: 56,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Sheer White Curtains',
    description: 'Lightweight sheer curtains that add elegance while letting in natural light.',
    price: 39.99,
    imageUrl: '/placeholder.svg',
    category: 'curtains',
    vendorId: 'v3',
    vendorName: 'Elegant Drapery',
    rating: 4.5,
    reviews: 34,
  },
  {
    id: 'p6',
    name: 'Patterned Drapes',
    description: 'Beautiful patterned drapes that add character to any room.',
    price: 69.99,
    imageUrl: '/placeholder.svg',
    category: 'curtains',
    vendorId: 'v3',
    vendorName: 'Elegant Drapery',
    rating: 4.6,
    reviews: 29,
  },
  
  // Decor
  {
    id: 'p7',
    name: 'Ceramic Vase Set',
    description: 'Set of 3 ceramic vases in varying sizes for an elegant display.',
    price: 49.99,
    imageUrl: '/placeholder.svg',
    category: 'decor',
    vendorId: 'v1',
    vendorName: 'HomeStyle Decor',
    rating: 4.7,
    reviews: 48,
  },
  {
    id: 'p8',
    name: 'Wall Art Canvas',
    description: 'Beautiful abstract canvas art to brighten up your walls.',
    price: 89.99,
    imageUrl: '/placeholder.svg',
    category: 'decor',
    vendorId: 'v1',
    vendorName: 'HomeStyle Decor',
    rating: 4.9,
    reviews: 52,
    featured: true,
  },
  {
    id: 'p9',
    name: 'Decorative Pillows',
    description: 'Set of decorative throw pillows to add comfort and style to your sofa.',
    price: 34.99,
    imageUrl: '/placeholder.svg',
    category: 'decor',
    vendorId: 'v1',
    vendorName: 'HomeStyle Decor',
    rating: 4.6,
    reviews: 37,
  },
  
  // Furniture
  {
    id: 'p10',
    name: 'Modern Coffee Table',
    description: 'Sleek modern coffee table with tempered glass top and wooden legs.',
    price: 199.99,
    imageUrl: '/placeholder.svg',
    category: 'furniture',
    vendorId: 'v4',
    vendorName: 'Comfort Furniture',
    rating: 4.8,
    reviews: 45,
    featured: true,
  },
  {
    id: 'p11',
    name: 'Comfortable Armchair',
    description: 'Luxurious armchair with soft padding and sturdy frame.',
    price: 249.99,
    imageUrl: '/placeholder.svg',
    category: 'furniture',
    vendorId: 'v4',
    vendorName: 'Comfort Furniture',
    rating: 4.7,
    reviews: 39,
  },
  {
    id: 'p12',
    name: 'Wooden Bookshelf',
    description: 'Spacious wooden bookshelf with adjustable shelves for your books and decor.',
    price: 179.99,
    imageUrl: '/placeholder.svg',
    category: 'furniture',
    vendorId: 'v4',
    vendorName: 'Comfort Furniture',
    rating: 4.5,
    reviews: 28,
  },
];

// Update vendors with their products
vendors.forEach(vendor => {
  vendor.products = products.filter(product => product.vendorId === vendor.id);
});

// Get featured products
export const featuredProducts = products.filter(product => product.featured);

// Get products by category
export const getProductsByCategory = (category: string) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Get vendor by ID
export const getVendorById = (id: string) => {
  return vendors.find(vendor => vendor.id === id);
};
