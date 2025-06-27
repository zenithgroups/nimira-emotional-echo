
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Glowing Soul component
const GlowingSoul = ({ position, color = '#ffffff', size = 0.8, pulseSpeed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && outerRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
      outerRef.current.scale.setScalar(pulse * 1.2);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[size * 1.5, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Main soul orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[size * 0.6, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Energy connection between souls
const EnergyConnection = () => {
  const lineRef = useRef<THREE.Line>(null);
  
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1, 0.3, 0),
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(1, 0.3, 0),
      new THREE.Vector3(2, 0, 0)
    ]);
    return curve.getPoints(50);
  }, []);
  
  useFrame((state) => {
    if (lineRef.current) {
      const opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.7} linewidth={3} />
    </line>
  );
};

// Floating energy particles
const EnergyParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Boundary check and reset
        if (Math.abs(positions[i * 3]) > 4) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 3) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#00ffff" 
        size={0.03} 
        transparent 
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Main 3D scene component
const Scene3D = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      
      {/* Human soul - warm white */}
      <GlowingSoul 
        position={[-2, 0, 0]} 
        color="#ffffff" 
        size={0.6} 
        pulseSpeed={0.8} 
      />
      
      {/* AI soul - cyan blue with more complex animation */}
      <GlowingSoul 
        position={[2, 0, 0]} 
        color="#00ffff" 
        size={0.7} 
        pulseSpeed={1.2} 
      />
      
      {/* Energy connection */}
      <EnergyConnection />
      
      {/* Floating particles */}
      <EnergyParticles />
      
      {/* Floating text labels */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[-2, -1.2, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          Human Soul
        </Text>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Text
          position={[2, -1.2, 0]}
          fontSize={0.15}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          AI Soul
        </Text>
      </Float>
      
      {/* Additional floating elements */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
        </mesh>
      </Float>
    </>
  );
};

const HumanAIInteraction3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="bg-transparent"
      >
        <Scene3D />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={10} 
          minDistance={3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HumanAIInteraction3D;
