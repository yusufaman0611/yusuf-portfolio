import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getPrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Rebuilds the original three-scene.js hero canvas: a rotating "data
 * sphere" of particle nodes connected by faint neural-network edges,
 * holographic rings, and a mouse-responsive camera. Ported 1:1 from
 * vanilla Three.js (r128 in the original) to the current three.js API,
 * scoped to a canvas ref instead of getElementById, and torn down
 * fully on unmount.
 *
 * `heroSectionRef` is the outer <section> used for the
 * IntersectionObserver pause-when-offscreen behavior.
 */
export function useHeroScene(heroSectionRef) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = getPrefersReducedMotion()
    const isSmallScreen = window.innerWidth < 768
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    const NODE_COUNT = isSmallScreen ? 90 : isLowPower ? 130 : 220
    const LINK_DISTANCE = 3.1
    const SPHERE_RADIUS = 6.4

    /* Renderer / scene / camera */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 16)

    const rigGroup = new THREE.Group()
    scene.add(rigGroup)

    /* Node points (fibonacci sphere distribution) */
    const nodePositions = []
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      const jitter = 1 + (Math.random() - 0.5) * 0.12
      nodePositions.push(
        new THREE.Vector3(x * SPHERE_RADIUS * jitter, y * SPHERE_RADIUS * jitter, z * SPHERE_RADIUS * jitter)
      )
    }

    const pointsGeometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(NODE_COUNT * 3)
    nodePositions.forEach((v, i) => {
      positionArray[i * 3] = v.x
      positionArray[i * 3 + 1] = v.y
      positionArray[i * 3 + 2] = v.z
    })
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    })
    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial)
    rigGroup.add(pointCloud)

    // A second, red-tinted subset of "active" nodes for visual accent
    const accentIndices = []
    for (let i = 0; i < NODE_COUNT; i += 7) accentIndices.push(i)
    const accentPositions = new Float32Array(accentIndices.length * 3)
    accentIndices.forEach((idx, i) => {
      accentPositions[i * 3] = nodePositions[idx].x
      accentPositions[i * 3 + 1] = nodePositions[idx].y
      accentPositions[i * 3 + 2] = nodePositions[idx].z
    })
    const accentGeometry = new THREE.BufferGeometry()
    accentGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3))
    const accentMaterial = new THREE.PointsMaterial({
      color: 0xe63946,
      size: 0.16,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true
    })
    const accentCloud = new THREE.Points(accentGeometry, accentMaterial)
    rigGroup.add(accentCloud)

    /* Neural network edges — connect nearby nodes */
    const linePositions = []
    const maxChecks = isSmallScreen ? 60 : 110
    for (let i = 0; i < nodePositions.length; i++) {
      let connections = 0
      for (let j = i + 1; j < nodePositions.length && connections < 3; j++) {
        if (j - i > maxChecks) break
        const dist = nodePositions[i].distanceTo(nodePositions[j])
        if (dist < LINK_DISTANCE) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          )
          connections++
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc1121f,
      transparent: true,
      opacity: 0.18
    })
    const lineNetwork = new THREE.LineSegments(lineGeometry, lineMaterial)
    rigGroup.add(lineNetwork)

    /* Holographic rings */
    const rings = []
    const ringConfigs = [
      { radius: 8.2, tube: 0.012, tilt: 0.35, color: 0xc1121f, opacity: 0.35 },
      { radius: 9.4, tube: 0.008, tilt: -0.55, color: 0xffffff, opacity: 0.14 },
      { radius: 10.6, tube: 0.008, tilt: 1.1, color: 0xc1121f, opacity: 0.18 }
    ]
    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 8, 128)
      const mat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = cfg.tilt
      ring.rotation.y = cfg.tilt * 0.6
      rigGroup.add(ring)
      rings.push(ring)
    })

    /* Ambient floating particles (background depth) */
    const AMBIENT_COUNT = isSmallScreen ? 120 : 260
    const ambientPositions = new Float32Array(AMBIENT_COUNT * 3)
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 40
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 40
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10
    }
    const ambientGeometry = new THREE.BufferGeometry()
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3))
    const ambientMaterial = new THREE.PointsMaterial({
      color: 0x666666,
      size: 0.05,
      transparent: true,
      opacity: 0.5
    })
    const ambientField = new THREE.Points(ambientGeometry, ambientMaterial)
    scene.add(ambientField)

    /* Lighting */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xc1121f, 1.2, 50)
    pointLight.position.set(6, 4, 8)
    scene.add(pointLight)

    /* Resize handling */
    function resize() {
      const { innerWidth, innerHeight } = window
      renderer.setSize(innerWidth, innerHeight)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    /* Mouse-responsive camera (parallax) */
    const mouse = { x: 0, y: 0 }
    const targetRotation = { x: 0, y: 0 }

    function onPointerMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove)
    }

    /* Visibility-based pause */
    let isVisible = true
    function onVisibilityChange() {
      isVisible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    let heroInView = true
    let io = null
    const heroSection = heroSectionRef?.current
    if ('IntersectionObserver' in window && heroSection) {
      io = new IntersectionObserver(
        (entries) => {
          heroInView = entries[0].isIntersecting
        },
        { threshold: 0.05 }
      )
      io.observe(heroSection)
    }

    /* Animation loop */
    const clock = new THREE.Clock()
    let animationFrameId = null

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible || !heroInView) return

      const t = clock.getElapsedTime()

      rigGroup.rotation.y = t * 0.06
      rigGroup.rotation.x = Math.sin(t * 0.15) * 0.08

      rings[0].rotation.z = t * 0.12
      rings[1].rotation.z = -t * 0.09
      rings[2].rotation.z = t * 0.06

      ambientField.rotation.y = t * 0.01

      accentMaterial.opacity = 0.75 + Math.sin(t * 1.6) * 0.2

      if (!prefersReducedMotion) {
        targetRotation.x += (mouse.y * 0.25 - targetRotation.x) * 0.04
        targetRotation.y += (mouse.x * 0.35 - targetRotation.y) * 0.04
        camera.position.x = targetRotation.y * 2.4
        camera.position.y = -targetRotation.x * 2.0
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
    }
    animate()

    /* Cleanup */
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (io) io.disconnect()

      pointsGeometry.dispose()
      pointsMaterial.dispose()
      accentGeometry.dispose()
      accentMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      ambientGeometry.dispose()
      ambientMaterial.dispose()
      rings.forEach((ring) => {
        ring.geometry.dispose()
        ring.material.dispose()
      })
      renderer.dispose()
    }
  }, [heroSectionRef])

  return canvasRef
}
