
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { Group, MathUtils, Color } from 'three';

// Individual 3D Product Card
function Product3D({ color, name, position, index, active, onClick }: any) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation with react-spring
  const { scale } = useSpring({
    scale: hovered ? 1.15 : 1,
    config: { mass: 2, tension: 300, friction: 30 }
  });
  
  const { rotationY } = useSpring({
    rotationY: hovered ? Math.PI / 8 : 0,
    config: { mass: 2, tension: 300, friction: 30 }
  });

  // Continuous animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    }
  });

  // Convert color string to Three.js color
  const threeColor = new Color(color);

  return (
    <animated.group 
      ref={ref}
      position={position}
      scale={scale}
      rotation-y={rotationY}
      onClick={() => onClick(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={threeColor} metalness={0.5} roughness={0.2} />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </animated.group>
  );
}

// Main Product Carousel Component
const ProductCarousel3D = ({ products }: { products: any[] }) => {
  const [active, setActive] = useState(0);
  const displayProducts = products.slice(0, Math.min(5, products.length));
  const colors = ["#9333ea", "#f97316", "#2563eb", "#16a34a", "#ef4444"];

  const handleClick = (index: number) => {
    setActive(index);
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={['#f5f3ff']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.3, 0.3]}
          azimuth={[-0.5, 0.5]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          {displayProducts.map((product, index) => (
            <Product3D
              key={index}
              color={colors[index % colors.length]}
              name={product.name}
              position={[(index - active) * 2.5, 0, 0]}
              index={index}
              active={index === active}
              onClick={handleClick}
            />
          ))}
        </PresentationControls>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ProductCarousel3D;
