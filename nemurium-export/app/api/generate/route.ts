import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('Generate API called')
  
  try {
    const body = await request.json()
    const { prompt, type = 'image', styles = [] } = body

    console.log('Generation request:', { prompt, type, styles })

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Simulate AI generation based on type
    await new Promise(resolve => setTimeout(resolve, 2000))

    let result
    switch (type) {
      case 'image':
        result = {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
          filename: 'generated_image.jpg'
        }
        break
      case 'video':
        result = {
          type: 'video',
          url: '/api/placeholder/video.mp4',
          filename: 'generated_video.mp4'
        }
        break
      case 'audio':
        result = {
          type: 'audio',
          url: '/api/placeholder/audio.mp3',
          filename: 'generated_audio.mp3'
        }
        break
      case '3d':
        result = {
          type: '3d',
          url: '/api/placeholder/model.glb',
          filename: 'generated_model.glb'
        }
        break
      case 'ar':
        result = {
          type: 'ar',
          url: '/api/placeholder/ar_scene.json',
          filename: 'ar_scene.json'
        }
        break
      default:
        result = {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
          filename: 'generated_image.jpg'
        }
    }

    return NextResponse.json({
      success: true,
      data: result,
      prompt,
      type,
      styles,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}