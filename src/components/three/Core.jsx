import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * The geometric centrepiece: a wireframe shell inside the particle cloud with
 * two orbit rings. Deliberately spare — the particles carry the movement.
 */
export default function Core({ pointer, reduced, scale = 1, offset = [0, 0, 0] }) {
  const shell = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const group = useRef()

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    const speed = reduced ? 0.2 : 1

    if (shell.current) {
      shell.current.rotation.y += step * 0.16 * speed
      shell.current.rotation.x += step * 0.05 * speed
    }
    if (ringA.current) ringA.current.rotation.z += step * 0.22 * speed
    if (ringB.current) ringB.current.rotation.z -= step * 0.14 * speed

    if (group.current) {
      const px = pointer?.current?.x ?? 0
      const py = pointer?.current?.y ?? 0
      group.current.rotation.y += (px * 0.32 - group.current.rotation.y) * step * 2
      group.current.rotation.x += (-py * 0.22 - group.current.rotation.x) * step * 2
    }
  })

  return (
    <group ref={group} scale={scale} position={offset}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial
          color="#8f7bff"
          wireframe
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringA} rotation={[1.02, 0.26, 0]}>
        <torusGeometry args={[2.25, 0.005, 8, 220]} />
        <meshBasicMaterial
          color="#7a5cff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringB} rotation={[1.38, -0.44, 0.55]}>
        <torusGeometry args={[2.75, 0.004, 8, 220]} />
        <meshBasicMaterial
          color="#ff8a5c"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
