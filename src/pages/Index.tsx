
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import VendorShowcase from '@/components/home/VendorShowcase';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PromoBanner from '@/components/home/PromoBanner';

const Index = () => {
  // Add animation classes when page loads
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Layout>
      <HeroSection />
      <div className="animate-on-scroll">
        <FeaturedProducts />
      </div>
      <div className="animate-on-scroll">
        <CategorySection />
      </div>
      <div className="animate-on-scroll">
        <VendorShowcase />
      </div>
      <div className="animate-on-scroll">
        <TestimonialsSection />
      </div>
      <div className="animate-on-scroll">
        <PromoBanner />
      </div>
    </Layout>
  );
};

export default Index;
