import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Backdrop from './Backdrop'
import Core from './Core'
import ParticleField from './ParticleField'
import { useIsMobile, usePageVisible, usePrefersReducedMotion } from '../../hooks/useEnvironment'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    return false
  }
}

/** Parallax + a gentle dolly-out as the hero scrolls away. */
function CameraRig({ pointer, reduced }) {
  const { camera } = useThree()
  const base = useRef(new THREE.Vector3(0, 0, 9))

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    const px = reduced ? 0 : (pointer?.current?.x ?? 0)
    const py = reduced ? 0 : (pointer?.current?.y ?? 0)
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)

    const targetX = px * 0.85
    const targetY = py * 0.6 + progress * 0.4
    const targetZ = base.current.z + progress * 2.4

    camera.position.x += (targetX - camera.position.x) * step * 2.2
    camera.position.y += (targetY - camera.position.y) * step * 2.2
    camera.position.z += (targetZ - camera.position.z) * step * 2.2
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Places the cloud. On desktop it sits in the right third so the headline on the
 * left keeps a clean field; on phones there is no room beside the type, so it
 * moves up above it instead.
 */
function Composition({ pointer, burst, reduced, isMobile }) {
  const { viewport } = useThree()

  // viewport.width is in world units at z = 0, so this stays put across breakpoints.
  // On phones it sits behind the headline, which is heavy enough to stay readable —
  // the small type in the top band is not, so the cloud stays clear of it.
  const offset = isMobile ? [0, -0.6, 0] : [viewport.width * 0.225, -0.3, 0]

  return (
    <>
      <ParticleField
        pointer={pointer}
        burst={burst}
        reduced={reduced}
        offset={offset}
        count={isMobile ? 2200 : 5200}
        radius={isMobile ? 2.0 : 2.45}
      />
      <Core
        pointer={pointer}
        reduced={reduced}
        offset={offset}
        scale={isMobile ? 0.55 : 0.82}
      />
    </>
  )
}

export default function HeroScene({ className = '' }) {
  const pointer = useRef({ x: 0, y: 0 })
  const burst = useRef(0)
  const wrapper = useRef(null)
  const [inView, setInView] = useState(true)
  const [ready, setReady] = useState(false)
  const [webgl] = useState(() => (typeof window === 'undefined' ? false : supportsWebGL()))

  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const pageVisible = usePageVisible()

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      pointer.current.x = 0
      pointer.current.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // Click anywhere on the hero to scatter the cloud.
  useEffect(() => {
    const el = wrapper.current
    if (!el || reduced) return undefined
    let timer
    const onDown = () => {
      burst.current = 1
      clearTimeout(timer)
      timer = setTimeout(() => {
        burst.current = 0
      }, 420)
    }
    const host = el.parentElement ?? el
    host.addEventListener('pointerdown', onDown)
    return () => {
      host.removeEventListener('pointerdown', onDown)
      clearTimeout(timer)
    }
  }, [reduced])

  // Stop rendering once the hero leaves the viewport.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '400px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!webgl) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 42%, rgba(122,92,255,0.30), transparent 70%), radial-gradient(45% 40% at 72% 68%, rgba(255,122,69,0.16), transparent 72%)',
        }}
      />
    )
  }

  const active = inView && pageVisible

  return (
    <div
      ref={wrapper}
      className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
        ready ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, isMobile ? 1.5 : 1.75]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 9], fov: 45, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = THREE.NoToneMapping
          setReady(true)
        }}
      >
        <Backdrop pointer={pointer} reduced={reduced} />
        <Composition pointer={pointer} burst={burst} reduced={reduced} isMobile={isMobile} />
        <CameraRig pointer={pointer} reduced={reduced} />
      </Canvas>
    </div>
  )
}
