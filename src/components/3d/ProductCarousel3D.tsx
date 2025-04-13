
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

// Simplified Product Carousel Component
const ProductCarousel3D = ({ products }: { products: any[] }) => {
  const displayProducts = products.slice(0, Math.min(5, products.length));
  const colors = ["#9333ea", "#f97316", "#2563eb", "#16a34a", "#ef4444"];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={['#f5f3ff']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {displayProducts.map((product, index) => (
          <mesh 
            key={index}
            position={[(index - 0) * 2.5, 0, 0]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors[index % colors.length]} />
          </mesh>
        ))}
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductCarousel3D;
