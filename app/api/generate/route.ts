// Nemurium Dream Machine API
// Handles AI generation requests using FREE alternatives

import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  prompt: string
  outputType: 'image' | 'video' | '3d' | 'voiceover' | 'soundscape' | 'ar-layer'
  styles: string[]
}

// HuggingFace free inference API
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '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'
const HUGGINGFACE_BASE_URL = 'https://api-inference.huggingface.co/models'

// Free services configuration
const FREE_MODELS = {
  image: 'stabilityai/stable-diffusion-xl-base-1.0',
  image_anime: 'Linaqruf/animagine-xl-3.1',
  image_realistic: 'SG161222/RealVisXL_V4.0'
}

export async function POST(request: Request) {
  try {
    const { prompt, outputType = 'image', styles = [] } = await request.json()
    
    console.log('🎨 Generation request:', { prompt, outputType, styles })

    if (!prompt?.trim()) {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 })
    }

    // Enhance prompt with styles
    const enhancedPrompt = styles.length > 0 
      ? `${prompt}, ${styles.join(', ')} style`
      : prompt

    if (outputType === 'image') {
      // Use HuggingFace Stable Diffusion
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            negative_prompt: 'blurry, low quality, distorted',
            num_inference_steps: 20,
            guidance_scale: 7.5,
            width: 512,
            height: 512
          }
        })
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('❌ HuggingFace API error:', error)
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to generate image' 
        }, { status: response.status })
      }

      const imageBlob = await response.blob()
      const imageBuffer = await imageBlob.arrayBuffer()
      const imageBase64 = Buffer.from(imageBuffer).toString('base64')
      const imageUrl = `data:image/png;base64,${imageBase64}`

      console.log('✅ Image generated successfully')
      
      return NextResponse.json({
        success: true,
        url: imageUrl,
        message: `Generated "${enhancedPrompt}" using Stable Diffusion`
      })
    }

    let result
    
    switch (outputType) {
      case 'image':
        result = await generateImage(prompt, styles)
        break
      case 'video':
        result = await generateVideo(prompt, styles)
        break
      case '3d':
        result = await generate3DModel(prompt, styles)
        break
      case 'voiceover':
        result = await generateVoiceover(prompt, styles)
        break
      case 'soundscape':
        result = await generateSoundscape(prompt, styles)
        break
      case 'ar-layer':
        result = { success: false, error: 'AR layers coming soon!' }
        break
      default:
        return Response.json({
          success: false,
          error: 'Invalid output type'
        }, { status: 400 })
    }

    return Response.json(result)

  } catch (error) {
    console.error('❌ Dream Machine error:', error)
    return Response.json({
      success: false,
      error: 'Generation failed'
    }, { status: 500 })
  }
}

// HuggingFace Free Image Generation
async function generateImage(prompt: string, styles: string[]) {
  console.log('🖼️ Generating image with HuggingFace (FREE)')

  // Choose model based on styles
  let modelId = FREE_MODELS.image
  if (styles.includes('realistic')) {
    modelId = FREE_MODELS.image_realistic
  } else if (styles.includes('vibrant') || styles.includes('stylized')) {
    modelId = FREE_MODELS.image_anime
  }

  // Enhance prompt with styles
  const enhancedPrompt = enhancePromptWithStyles(prompt, styles)

  try {
    if (!HUGGINGFACE_API_KEY) {
      console.warn('⚠️ HuggingFace API key not configured, using Unsplash placeholder')
      return getUnsplashPlaceholder(prompt)
    }

    console.log(`🎨 Using model: ${modelId}`)
    console.log(`📝 Enhanced prompt: ${enhancedPrompt}`)

    const response = await fetch(`${HUGGINGFACE_BASE_URL}/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted, bad anatomy",
          num_inference_steps: 20,
          guidance_scale: 7.5,
          width: 768,
          height: 768
        }
      })
    })

    if (!response.ok) {
      if (response.status === 503) {
        // Model is loading, try again in a few seconds
        console.log('🔄 Model loading, retrying...')
        await new Promise(resolve => setTimeout(resolve, 10000))
        
        const retryResponse = await fetch(`${HUGGINGFACE_BASE_URL}/${modelId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: enhancedPrompt
          })
        })

        if (retryResponse.ok) {
          const imageBlob = await retryResponse.blob()
          const imageUrl = await uploadImageToStorage(imageBlob, prompt)
          return {
            success: true,
            url: imageUrl,
            message: 'Generated with HuggingFace Stable Diffusion'
          }
        }
      }
      
      throw new Error(`HuggingFace API error: ${response.status}`)
    }

    const imageBlob = await response.blob()
    const imageUrl = await uploadImageToStorage(imageBlob, prompt)
    
    return {
      success: true,
      url: imageUrl,
      message: 'Generated with HuggingFace Stable Diffusion (FREE)'
    }

  } catch (error) {
    console.error('❌ HuggingFace error:', error)
    
    // Fallback to Unsplash placeholder
    return getUnsplashPlaceholder(prompt)
  }
}

// Video Generation (placeholder)
async function generateVideo(prompt: string, styles: string[]) {
  console.log('🎬 Generating video placeholder')

  return {
    success: true,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    message: 'Video generation coming soon - integrate with free alternatives'
  }
}

// 3D Model Generation (placeholder)
async function generate3DModel(prompt: string, styles: string[]) {
  console.log('📦 Generating 3D model placeholder')
  
  return {
    success: true,
    url: 'https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf',
    message: '3D generation coming soon - integrate with Meshy.ai or local tools'
  }
}

// Voiceover Generation (placeholder)
async function generateVoiceover(prompt: string, styles: string[]) {
  console.log('🗣️ Generating voiceover placeholder')
  
  return {
    success: true,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    message: 'Voiceover generation coming soon - integrate with free TTS APIs'
  }
}

// Soundscape Generation (placeholder)
async function generateSoundscape(prompt: string, styles: string[]) {
  console.log('🎵 Generating soundscape placeholder')
  
  return {
    success: true,
    url: 'https://www.soundjay.com/misc/sounds/ambient-01.wav',
    message: 'Soundscape generation coming soon - integrate with Suno.ai or local tools'
  }
}

// Helper Functions
function enhancePromptWithStyles(prompt: string, styles: string[]): string {
  if (styles.length === 0) return prompt

  const styleModifiers = {
    'cinematic': 'cinematic lighting, dramatic composition, film-like',
    'vibrant': 'vibrant colors, high saturation, bold, colorful',
    'moody': 'moody atmosphere, dramatic shadows, dark ambiance',
    'sci-fi': 'futuristic, sci-fi, technological, cyberpunk',
    'realistic': 'photorealistic, highly detailed, professional photography',
    'stylized': 'artistic style, stylized rendering, concept art'
  }

  const modifiers = styles
    .map(style => styleModifiers[style as keyof typeof styleModifiers])
    .filter(Boolean)
    .join(', ')

  return modifiers ? `${prompt}, ${modifiers}` : prompt
}

async function uploadImageToStorage(imageBlob: Blob, prompt: string): Promise<string> {
  // For now, convert to base64 data URL
  // In production, upload to your preferred storage (Cloudinary, S3, etc.)
  
  const buffer = await imageBlob.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const mimeType = imageBlob.type || 'image/png'
  
  // Return data URL (in production, return actual storage URL)
  return `data:${mimeType};base64,${base64}`
}

function getUnsplashPlaceholder(prompt: string) {
  // Extract key words from prompt for better Unsplash results
  const keywords = prompt
    .split(' ')
    .slice(0, 3)
    .join(',')
  
  const unsplashUrl = `https://source.unsplash.com/768x768/?${encodeURIComponent(keywords)}`
  
  return {
    success: true,
    url: unsplashUrl,
    message: 'Using Unsplash placeholder (configure HuggingFace API key for AI generation)'
  }
}