
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { Color } from 'three';

// Animated Product Mesh Component
const AnimatedProduct = ({ index, color }: { index: number; color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Animate the mesh on each frame
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.3;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.2;
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={mesh}
        position={[(index - 2) * 2.2, 0, 0]}
      >
        {index % 3 === 0 ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : index % 3 === 1 ? (
          <sphereGeometry args={[0.7, 32, 32]} />
        ) : (
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
        )}
        <meshStandardMaterial 
          color={new Color(color)}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Enhanced Product Carousel Component
const ProductCarousel3D = ({ products }: { products: any[] }) => {
  const displayProducts = products?.slice(0, Math.min(5, products?.length || 0)) || [];
  const colors = ["#9333ea", "#f97316", "#2563eb", "#16a34a", "#ef4444"];

  return (
    <div className="relative h-[350px] w-full rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/90 to-indigo-50/90 z-0" />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {displayProducts.map((product, index) => (
          <AnimatedProduct 
            key={product.id || index} 
            index={index} 
            color={colors[index % colors.length]} 
          />
        ))}
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductCarousel3D;
