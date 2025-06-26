
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Glowing Soul component
const GlowingSoul = ({ position, color = '#ffffff', size = 1.2, pulseSpeed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && outerRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2 + 1;
      meshRef.current.scale.setScalar(pulse);
      outerRef.current.scale.setScalar(pulse * 1.3);
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[size * 1.8, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      
      {/* Main soul orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[size * 0.7, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
        />
      </mesh>
    </group>
  );
};

// Energy connection between souls
const EnergyConnection = () => {
  const lineRef = useRef<THREE.Mesh>(null);
  
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1.5, 0.5, 0),
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.5, 0),
      new THREE.Vector3(3, 0, 0)
    ]);
    return new THREE.TubeGeometry(curve, 30, 0.05, 8, false);
  }, []);
  
  useFrame((state) => {
    if (lineRef.current) {
      const opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
      (lineRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={lineRef} geometry={tubeGeometry}>
      <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
    </mesh>
  );
};

// Floating energy particles
const EnergyParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 40;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
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
        if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 4) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 3) velocities[i * 3 + 2] *= -1;
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
        color="#ffffff" 
        size={0.05} 
        transparent 
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Main 3D scene component
const Scene3D = () => {
  return (
    <>
      {/* Strong ambient lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 8]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 3, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[5, -3, 0]} intensity={0.8} color="#00ffff" />
      
      {/* Human soul - warm white, larger */}
      <GlowingSoul 
        position={[-3, 0, 0]} 
        color="#ffffff" 
        size={1.0} 
        pulseSpeed={0.8} 
      />
      
      {/* AI soul - cyan blue, larger */}
      <GlowingSoul 
        position={[3, 0, 0]} 
        color="#00ffff" 
        size={1.1} 
        pulseSpeed={1.2} 
      />
      
      {/* Energy connection */}
      <EnergyConnection />
      
      {/* Floating particles */}
      <EnergyParticles />
      
      {/* Floating text labels */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[-3, -2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Human Soul
        </Text>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Text
          position={[3, -2, 0]}
          fontSize={0.2}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          AI Soul
        </Text>
      </Float>
      
      {/* Additional floating elements */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0, -2.5, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
        </mesh>
      </Float>
    </>
  );
};

const HumanAIInteraction3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene3D />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={15} 
          minDistance={5}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default HumanAIInteraction3D;
