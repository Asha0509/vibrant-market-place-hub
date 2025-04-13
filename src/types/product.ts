
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  products: Product[];
  rating: number;
  reviews: number;
}

export type Category = 'all' | 'clothes' | 'curtains' | 'decor' | 'furniture';
