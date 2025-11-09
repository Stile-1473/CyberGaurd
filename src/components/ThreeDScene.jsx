import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, Box, Torus, Cone, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingAd({ position, text, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={meshRef} position={position}>
        <Box args={[2, 1, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/OpenSans-Bold.ttf"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function TunnelWalls() {
  const wallsRef = useRef();

  useFrame((state) => {
    wallsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={wallsRef}>
      {Array.from({ length: 50 }, (_, i) => (
        <group key={i}>
          <Torus
            args={[8 + i * 0.3, 0.2, 8, 16]}
            position={[0, 0, -i * 1.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={`hsl(${200 + i * 5}, 70%, 50%)`}
              emissive={`hsl(${200 + i * 5}, 70%, 20%)`}
              emissiveIntensity={0.3}
            />
          </Torus>
          <Torus
            args={[8 + i * 0.3, 0.2, 8, 16]}
            position={[0, 0, -i * 1.5]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <meshStandardMaterial
              color={`hsl(${300 + i * 5}, 70%, 50%)`}
              emissive={`hsl(${300 + i * 5}, 70%, 20%)`}
              emissiveIntensity={0.3}
            />
          </Torus>
        </group>
      ))}
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        speed: Math.random() * 0.02,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    particlesRef.current.children.forEach((child, i) => {
      child.position.z += particles[i].speed;
      if (child.position.z > 10) {
        child.position.z = -10;
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[0.05]} position={particle.position}>
          <meshBasicMaterial color="#3498db" />
        </Sphere>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={2} />
      <directionalLight position={[0, 0, -10]} intensity={1} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />

      <TunnelWalls />

      <ParticleField />

      <FloatingAd position={[-5, 3, -5]} text="ROI +" color="#f1c40f" />
      <FloatingAd position={[5, -2, -10]} text="BRAND" color="#3498db" />
      <FloatingAd position={[-4, -3, -15]} text="GROWTH" color="#e74c3c" />
      <FloatingAd position={[4, 2, -20]} text="SUCCESS" color="#27ae60" />
      <FloatingAd position={[-3, 1, -25]} text="REACH" color="#9b59b6" />
      <FloatingAd position={[3, -1, -30]} text="ENGAGE" color="#1abc9c" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          position={[0, 0, -40]}
          fontSize={2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          AdVantage
        </Text>
      </Float>

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Cone args={[1, 2]} position={[0, -5, -50]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.5} />
        </Cone>
      </Float>
    </>
  );
}

export default function ThreeDScene({ onEnter }) {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
      <div className="absolute top-4 left-4 text-white z-10">
        <h2 className="text-2xl font-bold mb-2">AdVantage 3D Experience</h2>
        <p className="text-sm opacity-80">Use mouse to explore the tunnel</p>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <button
          onClick={onEnter}
          className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition duration-300"
        >
          Enter AdVantage
        </button>
      </div>
      <div className="absolute bottom-4 right-4 text-white text-xs opacity-60 z-10">
        <p>Scroll to zoom • Drag to rotate</p>
      </div>
    </div>
  );
}
