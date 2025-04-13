
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, Float, ContactShadows, Text } from '@react-three/drei';
import { Group, MathUtils } from 'three';
import { useLocation } from 'react-router-dom';

// 3D Model component
function Model(props: any) {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF('/placeholder.svg');
  
  // Animate the model
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * Math.PI / 8,
        0.075
      );
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * Math.PI / 8,
        0.075
      );
    }
  });

  return (
    <group ref={group} {...props} scale={1.5}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#9333ea" metalness={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.75]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 3D Text component
function FloatingText({ children, position, rotation, color }: any) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={0.25}
      color={color}
      font="/Inter-Bold.woff"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
}

// Main 3D Product Showcase component
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
        
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.4}>
            <Model />
            <FloatingText position={[0, 1.25, 0]} color="#6d28d9" rotation={[0, 0, 0]}>
              Amazing Products
            </FloatingText>
            <FloatingText position={[-1.5, 0, 0]} color="#f97316" rotation={[0, -Math.PI / 2, 0]}>
              Unique Items
            </FloatingText>
            <FloatingText position={[0, -1.25, 0]} color="#2563eb" rotation={[0, 0, 0]}>
              Shop Now
            </FloatingText>
          </Float>
        </PresentationControls>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductShowcase3D;
