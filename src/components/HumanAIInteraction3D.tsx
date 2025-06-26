
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Create wireframe material
const WireframeMaterial = ({ color = '#00ffff', opacity = 0.8 }) => {
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: opacity,
    });
  }, [color, opacity]);
  
  return <primitive object={material} />;
};

// Human figure component
const HumanFigure = () => {
  return (
    <group position={[-2, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// AI Wireframe figure component
const AIWireframeFigure = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[2, 0, 0]}>
      {/* AI Head - wireframe sphere with grid pattern */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.35, 12, 12]} />
        <WireframeMaterial color="#00ffff" opacity={0.8} />
      </mesh>
      
      {/* Inner brain pattern */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <WireframeMaterial color="#0099ff" opacity={0.6} />
      </mesh>
      
      {/* AI Body - wireframe cylinder */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.5, 8]} />
        <WireframeMaterial color="#00ffff" opacity={0.7} />
      </mesh>
      
      {/* AI Arms - wireframe */}
      <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <WireframeMaterial color="#00ffff" opacity={0.7} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 6]} />
        <WireframeMaterial color="#00ffff" opacity={0.7} />
      </mesh>
      
      {/* Floating data points around AI */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0.8, 1.8, 0.3]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-0.6, 1.2, 0.4]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color="#0099ff" />
        </mesh>
      </Float>
    </group>
  );
};

// Connection beam between human and AI
const ConnectionBeam = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.02, 0.02, 3.5, 8]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
    </mesh>
  );
};

// Particle system for ambiance
const Particles = () => {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 100;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00ffff" size={0.02} transparent opacity={0.6} />
    </points>
  );
};

// Main 3D scene component
const Scene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
      
      {/* Main figures */}
      <HumanFigure />
      <AIWireframeFigure />
      <ConnectionBeam />
      <Particles />
      
      {/* Floating text labels */}
      <Text
        position={[-2, -1.5, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Human
      </Text>
      
      <Text
        position={[2, -1.5, 0]}
        fontSize={0.2}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        AI
      </Text>
      
      {/* Grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial color="#003366" wireframe transparent opacity={0.3} />
      </mesh>
    </>
  );
};

const HumanAIInteraction3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        className="bg-transparent"
      >
        <Scene3D />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={15} 
          minDistance={5}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default HumanAIInteraction3D;
