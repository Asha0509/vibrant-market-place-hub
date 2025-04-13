
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import VendorShowcase from '@/components/home/VendorShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PromoBanner from '@/components/home/PromoBanner';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <VendorShowcase />
      <TestimonialsSection />
      <PromoBanner />
    </Layout>
  );
};

export default Index;
