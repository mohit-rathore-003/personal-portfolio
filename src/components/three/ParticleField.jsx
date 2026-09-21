import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particleFragment, particleVertex } from './shaders'

const COLOR_A = new THREE.Color('#5b46d6')
const COLOR_B = new THREE.Color('#b9a9ff')
const COLOR_C = new THREE.Color('#ff8a5c')

/**
 * A shell of points that breathes, rotates differentially and parts around the
 * pointer. Everything happens on the GPU — the CPU only feeds four uniforms.
 */
export default function ParticleField({
  count = 5200,
  radius = 3.1,
  pointer,
  burst,
  reduced,
  offset = [0, 0, 0],
}) {
  const points = useRef()
  const material = useRef()
  const { viewport, size } = useThree()
  const pointerTarget = useRef(new THREE.Vector2())

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const drift = new Float32Array(count)
    const tone = new Float32Array(count)

    // Fibonacci sphere keeps the distribution even; the jitter gives it depth.
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i

      const shell = radius * (0.62 + Math.pow(Math.random(), 0.55) * 0.48)
      positions[i * 3] = Math.cos(theta) * ringRadius * shell
      positions[i * 3 + 1] = y * shell * 0.86
      positions[i * 3 + 2] = Math.sin(theta) * ringRadius * shell

      scales[i] = 0.35 + Math.random() * 0.95
      drift[i] = Math.random()
      tone[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geo.setAttribute('aDrift', new THREE.BufferAttribute(drift, 1))
    geo.setAttribute('aTone', new THREE.BufferAttribute(tone, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 2)
    return geo
  }, [count, radius])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 2.6 },
      uPixelRatio: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
      uPointerStrength: { value: 0 },
      uScroll: { value: 0 },
      uBurst: { value: 0 },
      uColorA: { value: COLOR_A },
      uColorB: { value: COLOR_B },
      uColorC: { value: COLOR_C },
    }),
    [],
  )

  useFrame((state, delta) => {
    const u = material.current?.uniforms
    if (!u) return

    const step = Math.min(delta, 0.05)
    u.uTime.value += reduced ? step * 0.25 : step
    u.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2)

    // Pointer lives in view-space units; the camera looks down -Z at the origin.
    pointerTarget.current.set(
      (pointer?.current?.x ?? 0) * viewport.width * 0.5,
      (pointer?.current?.y ?? 0) * viewport.height * 0.5,
    )
    u.uPointer.value.lerp(pointerTarget.current, 1 - Math.pow(0.001, step))

    const wantsPush = reduced ? 0 : 0.85
    u.uPointerStrength.value += (wantsPush - u.uPointerStrength.value) * step * 3

    const progress = window.scrollY / Math.max(window.innerHeight, 1)
    u.uScroll.value += (Math.min(progress, 1.6) - u.uScroll.value) * step * 4

    const targetBurst = burst?.current ?? 0
    u.uBurst.value += (targetBurst - u.uBurst.value) * step * 6

    if (points.current) {
      points.current.rotation.y += step * (reduced ? 0.004 : 0.012)
    }

    // Keep points crisp rather than chunky on small screens.
    u.uSize.value = size.width < 768 ? 3.8 : 5.2
  })

  return (
    <points ref={points} geometry={geometry} position={offset} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
