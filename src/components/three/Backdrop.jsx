import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { backdropFragment, backdropVertex } from './shaders'

const DEPTH = -7

/** Slow aurora wash behind the particles, with one light pool on the pointer. */
export default function Backdrop({ pointer, reduced }) {
  const material = useRef()
  const { viewport, camera } = useThree()
  const smoothed = useRef(new THREE.Vector2())

  const plane = useMemo(() => {
    const v = viewport.getCurrentViewport(camera, [0, 0, DEPTH])
    return [v.width * 1.25, v.height * 1.25]
  }, [viewport, camera])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color('#2b1f70') },
      uColorB: { value: new THREE.Color('#52264d') },
      uIntensity: { value: 0.82 },
    }),
    [],
  )

  useFrame((_, delta) => {
    const u = material.current?.uniforms
    if (!u) return
    const step = Math.min(delta, 0.05)
    u.uTime.value += reduced ? step * 0.2 : step

    smoothed.current.set(pointer?.current?.x ?? 0, pointer?.current?.y ?? 0)
    u.uPointer.value.lerp(smoothed.current, 1 - Math.pow(0.004, step))
  })

  return (
    <mesh position={[0, 0, DEPTH]} frustumCulled={false}>
      <planeGeometry args={[plane[0], plane[1], 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        depthWrite={false}
      />
    </mesh>
  )
}
