"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface WorldData {
  id: string
  prompt: string
  environment: {
    skybox: string
    terrain: string
    fog: boolean
    fogColor?: string
  }
  objects: Array<{
    type: string
    model: string
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
  }>
  audio: {
    ambience: string
    volume: number
    loop: boolean
    spatial: boolean
  }
}

interface WorldViewerProps {
  worldData: WorldData
  className?: string
}

export default function WorldViewer({ worldData, className = "" }: WorldViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const controlsRef = useRef<OrbitControls>()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isVRMode, setIsVRMode] = useState(false)

  useEffect(() => {
    if (!mountRef.current || !worldData) return

    // Initialize Three.js scene
    initializeScene()
    
    // Load world content
    loadWorld()

    // Cleanup on unmount
    return () => {
      cleanup()
    }
  }, [worldData])

  const initializeScene = () => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 5, 10)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    rendererRef.current = renderer

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2 - 0.1
    controls.minDistance = 2
    controls.maxDistance = 50
    controlsRef.current = controls

    // Lighting
    setupLighting(scene)

    // Environment
    setupEnvironment(scene)

    // Start render loop
    animate()

    // Handle window resize
    window.addEventListener('resize', handleResize)
  }

  const setupLighting = (scene: THREE.Scene) => {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    directionalLight.shadow.camera.left = -50
    directionalLight.shadow.camera.right = 50
    directionalLight.shadow.camera.top = 50
    directionalLight.shadow.camera.bottom = -50
    scene.add(directionalLight)

    // Hemisphere light for natural feel
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8fbc8f, 0.3)
    scene.add(hemisphereLight)
  }

  const setupEnvironment = (scene: THREE.Scene) => {
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100)
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: getGroundColor(worldData.environment.terrain) 
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Skybox
    loadSkybox(scene)

    // Fog
    if (worldData.environment.fog) {
      const fogColor = new THREE.Color(worldData.environment.fogColor || '#ffffff')
      scene.fog = new THREE.Fog(fogColor, 10, 100)
      rendererRef.current?.setClearColor(fogColor)
    }
  }

  const loadSkybox = (scene: THREE.Scene) => {
    const loader = new THREE.TextureLoader()
    
    // For now, use a solid color skybox - replace with actual texture loading
    const skyboxGeometry = new THREE.SphereGeometry(500, 32, 32)
    const skyboxMaterial = new THREE.MeshBasicMaterial({ 
      color: getSkyColor(worldData.environment.terrain),
      side: THREE.BackSide 
    })
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
    scene.add(skybox)
  }

  const loadWorld = async () => {
    if (!sceneRef.current) return

    setIsLoading(true)
    const loader = new GLTFLoader()
    const totalObjects = worldData.objects.length
    let loadedObjects = 0

    // Load objects
    for (const objectData of worldData.objects) {
      try {
        // For now, create placeholder objects instead of loading GLTFs
        const object = createPlaceholderObject(objectData.type)
        
        object.position.set(...objectData.position)
        object.rotation.set(
          THREE.MathUtils.degToRad(objectData.rotation[0]),
          THREE.MathUtils.degToRad(objectData.rotation[1]),
          THREE.MathUtils.degToRad(objectData.rotation[2])
        )
        object.scale.set(...objectData.scale)
        object.castShadow = true
        object.receiveShadow = true

        sceneRef.current.add(object)
        
        loadedObjects++
        setLoadingProgress((loadedObjects / totalObjects) * 100)
      } catch (error) {
        console.error('Failed to load object:', objectData.type, error)
        loadedObjects++
        setLoadingProgress((loadedObjects / totalObjects) * 100)
      }
    }

    // Load audio
    loadAudio()

    setIsLoading(false)
  }

  const createPlaceholderObject = (type: string): THREE.Object3D => {
    let geometry: THREE.BufferGeometry
    let material: THREE.Material
    let color: number

    switch (type) {
      case 'tree':
        geometry = new THREE.ConeGeometry(1, 3, 8)
        color = 0x228b22
        break
      case 'rock':
        geometry = new THREE.SphereGeometry(0.8, 8, 8)
        color = 0x696969
        break
      case 'house':
        geometry = new THREE.BoxGeometry(2, 2, 2)
        color = 0x8b4513
        break
      case 'crystal':
        geometry = new THREE.OctahedronGeometry(1)
        color = 0x9370db
        break
      case 'campfire':
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8)
        color = 0xff4500
        break
      case 'portal':
        geometry = new THREE.TorusGeometry(2, 0.5, 8, 16)
        color = 0x00ffff
        break
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1)
        color = 0x888888
    }

    material = new THREE.MeshLambertMaterial({ color })
    return new THREE.Mesh(geometry, material)
  }

  const loadAudio = () => {
    // Audio implementation - placeholder for now
    console.log('Loading audio:', worldData.audio.ambience)
  }

  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return

    requestAnimationFrame(animate)
    
    if (controlsRef.current) {
      controlsRef.current.update()
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
  }

  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    cameraRef.current.aspect = width / height
    cameraRef.current.updateProjectionMatrix()
    rendererRef.current.setSize(width, height)
  }

  const cleanup = () => {
    window.removeEventListener('resize', handleResize)
    
    if (rendererRef.current && mountRef.current) {
      mountRef.current.removeChild(rendererRef.current.domElement)
      rendererRef.current.dispose()
    }
    
    if (sceneRef.current) {
      sceneRef.current.clear()
    }
  }

  const getGroundColor = (terrain: string): number => {
    switch (terrain) {
      case 'forest': return 0x228b22
      case 'urban': return 0x404040
      case 'water': return 0x006994
      case 'void': return 0x000000
      default: return 0x8fbc8f
    }
  }

  const getSkyColor = (terrain: string): number => {
    switch (terrain) {
      case 'forest': return 0x87ceeb
      case 'urban': return 0x708090
      case 'water': return 0x4682b4
      case 'void': return 0x000011
      default: return 0x87ceeb
    }
  }

  const enterVR = () => {
    if (rendererRef.current) {
      // VR implementation would go here
      setIsVRMode(true)
      console.log('Entering VR mode...')
    }
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D World Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full bg-cosmic-space rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-cosmic-space/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cosmic-white text-lg font-semibold">
              Building your world...
            </p>
            <div className="w-64 bg-cosmic-white/20 rounded-full h-2 mt-4">
              <div 
                className="bg-cosmic-purple h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-cosmic-white/70 text-sm mt-2">
              {Math.round(loadingProgress)}% complete
            </p>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      {!isLoading && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={enterVR}
            className="px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 text-white rounded-lg transition-all"
          >
            🥽 VR Mode
          </button>
          <button
            onClick={() => window.open(`/worlds/${worldData.id}`, '_blank')}
            className="px-4 py-2 bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-white rounded-lg transition-all"
          >
            🔗 Share
          </button>
        </div>
      )}

      {/* World Info */}
      {!isLoading && (
        <div className="absolute bottom-4 left-4 bg-cosmic-space/80 backdrop-blur-sm rounded-lg p-4 max-w-sm">
          <h3 className="text-cosmic-white font-semibold mb-2">
            Generated World
          </h3>
          <p className="text-cosmic-white/70 text-sm mb-2">
            "{worldData.prompt}"
          </p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded">
              {worldData.objects.length} objects
            </span>
            <span className="px-2 py-1 bg-cosmic-cyan/20 text-cosmic-cyan rounded">
              Interactive
            </span>
          </div>
        </div>
      )}
    </div>
  )
}