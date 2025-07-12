"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface VisualPreviewProps {
  modelUrl?: string
  type?: 'image' | 'model' | 'video'
  className?: string
}

export function VisualPreview({ modelUrl, type = 'model', className = '' }: VisualPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return

    // Dynamically import Three.js to avoid SSR issues
    import('three').then((THREE) => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0a0a23)

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
      camera.position.z = 5

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(10, 10, 5)
      scene.add(directionalLight)

      // Add some cosmic effects
      const pointLight1 = new THREE.PointLight(0x9945ff, 1, 100)
      pointLight1.position.set(5, 5, 5)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0x00ffe5, 0.8, 100)
      pointLight2.position.set(-5, -5, 5)
      scene.add(pointLight2)

      // Create a sample 3D object
      const geometry = new THREE.IcosahedronGeometry(1, 0)
      const material = new THREE.MeshStandardMaterial({
        color: 0x9945ff,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x220066,
        emissiveIntensity: 0.1
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // Add wireframe overlay
      const wireframeGeometry = new THREE.IcosahedronGeometry(1.01, 0)
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffe5,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
      const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
      scene.add(wireframeMesh)

      sceneRef.current = { scene, camera, renderer, mesh, wireframeMesh, pointLight1, pointLight2 }

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)

        const time = Date.now() * 0.001

        // Rotate the main mesh
        mesh.rotation.x = time * 0.5
        mesh.rotation.y = time * 0.7

        // Rotate wireframe in opposite direction
        wireframeMesh.rotation.x = -time * 0.3
        wireframeMesh.rotation.y = -time * 0.5

        // Animate lights
        pointLight1.position.x = Math.sin(time) * 3
        pointLight1.position.z = Math.cos(time) * 3
        
        pointLight2.position.x = Math.cos(time * 1.3) * 3
        pointLight2.position.z = Math.sin(time * 1.3) * 3

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!canvas) return
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
      }
    }).catch(err => {
      console.log('Three.js not available:', err)
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative rounded-lg overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur rounded-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">
            {type === 'model' ? '3D Preview' : 
             type === 'video' ? 'Video Preview' : 
             'Image Preview'}
          </span>
        </div>
      </div>

      {/* Loading overlay for when models are loading */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur rounded-lg px-3 py-2">
        <span className="text-white/80 text-xs">
          {modelUrl ? 'Loaded' : 'Demo Mode'}
        </span>
      </div>
    </motion.div>
  )
}