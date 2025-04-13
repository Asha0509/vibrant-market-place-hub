
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Text } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { Color } from 'three';

// Animated Showcase Component
const AnimatedShowcase = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  // Animate the meshes on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (cubeRef.current) {
      cubeRef.current.rotation.x = Math.sin(time * 0.3) * 0.4;
      cubeRef.current.rotation.y = Math.sin(time * 0.2) * 0.5;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      sphereRef.current.position.x = Math.sin(time * 0.3) * 0.5;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={cubeRef} position={[-2, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial 
            color={new Color("#9333ea")}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={sphereRef} position={[0, 0, 1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={new Color("#f97316")}
            metalness={0.4} 
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.6} floatIntensity={0.3}>
        <mesh ref={torusRef} position={[2, 0, 0]}>
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
          <meshStandardMaterial 
            color={new Color("#2563eb")}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="#9333ea"
        anchorX="center"
        anchorY="middle"
      >
        Discover Amazing Products
      </Text>
    </>
  );
};

// Enhanced 3D Product Showcase component
const ProductShowcase3D = ({ size = "large" }: { size?: "small" | "medium" | "large" }) => {
  const [height, setHeight] = useState("450px");
  const location = useLocation();
  
  // Adjust height based on component size prop
  useEffect(() => {
    if (size === "small") setHeight("250px");
    else if (size === "medium") setHeight("350px");
    else setHeight("450px");
  }, [size]);

  // Only render the 3D showcase on certain routes for performance reasons
  if (location.pathname !== "/" && location.pathname !== "/products/all") {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl" style={{ height }}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 z-0" />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <AnimatedShowcase />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={12} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductShowcase3D;
