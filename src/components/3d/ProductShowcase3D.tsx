
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { useLocation } from 'react-router-dom';

// Simplified 3D Product Showcase component
const ProductShowcase3D = ({ size = "large" }: { size?: "small" | "medium" | "large" }) => {
  const [height, setHeight] = useState("400px");
  const location = useLocation();
  
  // Adjust height based on component size prop
  useEffect(() => {
    if (size === "small") setHeight("200px");
    else if (size === "medium") setHeight("300px");
    else setHeight("400px");
  }, [size]);

  // Only render the 3D showcase on certain routes for performance reasons
  if (location.pathname !== "/" && location.pathname !== "/products/all") {
    return null;
  }

  return (
    <div style={{ height, width: "100%" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['#f5f3ff']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#9333ea" />
        </mesh>
        
        <mesh position={[0, 0, 0.75]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductShowcase3D;
