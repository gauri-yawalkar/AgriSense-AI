import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  // Clone to avoid any mutation issues
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    
    // Define PBR Materials for the industrial aesthetic
    const baseMetal = new THREE.MeshStandardMaterial({
      color: '#cbd5e1', // Bright silver metallic
      roughness: 0.2, // Very smooth
      metalness: 0.9, // Highly metallic reflection
    });
    
    const aluminum = new THREE.MeshStandardMaterial({
      color: '#cbd5e1', // Bright silver
      roughness: 0.2,
      metalness: 0.9,
    });
    
    const charcoal = new THREE.MeshStandardMaterial({
      color: '#0f172a', // Dark accents
      roughness: 0.8,
      metalness: 0.2,
    });

    let meshCount = 0;

    clone.traverse((node) => {
      if (node.isMesh) {
        // Fix CAD exports that often lack smooth normals
        if (node.geometry) {
          node.geometry.computeVertexNormals();
        }

        const name = (node.name || '').toLowerCase();
        const matName = node.material ? (node.material.name || '').toLowerCase() : '';
        const searchStr = name + ' ' + matName;
        
        if (searchStr.includes('vent') || searchStr.includes('grill') || searchStr.includes('dark') || searchStr.includes('hole') || searchStr.includes('tire') || searchStr.includes('wheel') || searchStr.includes('black') || searchStr.includes('rubber')) {
          node.material = charcoal;
        } else if (searchStr.includes('metal') || searchStr.includes('aluminum') || searchStr.includes('accent') || searchStr.includes('frame') || searchStr.includes('rim') || searchStr.includes('silver') || searchStr.includes('steel') || searchStr.includes('rod') || searchStr.includes('prong') || searchStr.includes('leg') || searchStr.includes('cylinder')) {
          node.material = aluminum;
        } else {
          // Both models will now use the exact same metallic material for all their main parts.
          node.material = baseMetal;
        }
        meshCount++;
      }
    });
    
    return clone;
  }, [scene]);
  return (
    <group {...props}>
      <primitive object={clonedScene} />
    </group>
  );
}

const RoverSimulation = ({ url }) => {
  return (
    <div style={{ width: '100%', height: '100%', background: 'transparent', minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 1, 4], fov: 35 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 15, 5]} intensity={1.5} />
        <directionalLight position={[-10, 15, -5]} intensity={0.5} />

        <Suspense fallback={null}>
          <Center>
            <Model url={url} scale={[10, 10, 10]} />
          </Center>
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
};

export default RoverSimulation;
