import { NextResponse } from 'next/server'

// Advanced Audio Generation API - Sonarium Engine
export async function POST(request: Request) {
  try {
    const { 
      prompt, 
      model = 'facebook/musicgen-medium', 
      duration = 30, 
      format = 'mp3',
      style = 'ambient',
      bpm,
      key
    } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 })
    }

    console.log('🎵 Audio Generation Request:', { prompt, model, duration, style })

    let result

    // Route to appropriate audio generation model
    switch (model) {
      case 'facebook/musicgen-medium':
        result = await generateWithMusicGen(prompt, duration, style)
        break
      case 'facebook/musicgen-large':
        result = await generateWithMusicGenLarge(prompt, duration, style)
        break
      case 'riffusion/riffusion':
        result = await generateWithRiffusion(prompt, duration, style)
        break
      case 'mubert/mubert':
        result = await generateWithMubert(prompt, duration, style)
        break
      case 'sonarium/ambient':
        result = await generateWithSonarium(prompt, duration, style)
        break
      default:
        result = await generateWithBestAudioModel(prompt, duration, style)
    }

    // Post-process the audio
    const processedResult = await postProcessAudio(result, format, duration)

    return NextResponse.json({
      success: true,
      audioUrl: processedResult.audioUrl,
      waveformUrl: processedResult.waveformUrl,
      spectrogramUrl: processedResult.spectrogramUrl,
      metadata: {
        prompt,
        model: result.modelUsed,
        duration: processedResult.actualDuration,
        format,
        style,
        sampleRate: processedResult.sampleRate,
        bitrate: processedResult.bitrate,
        bpm: processedResult.detectedBPM,
        key: processedResult.detectedKey,
        mood: processedResult.mood,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Audio Generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate audio',
      details: error.message 
    }, { status: 500 })
  }
}

async function generateWithMusicGen(prompt: string, duration: number, style: string) {
  console.log('🎼 Using MusicGen for audio generation')
  
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/musicgen-medium',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: enhanceAudioPrompt(prompt, style),
          parameters: {
            max_new_tokens: Math.floor(duration * 50), // ~50 tokens per second
            temperature: 0.8,
            top_p: 0.9,
            repetition_penalty: 1.1
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`MusicGen API error: ${response.statusText}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const audioUrl = await uploadAudioToStorage(audioBuffer, 'wav')
    
    return {
      audioUrl,
      modelUsed: 'MusicGen Medium',
      confidence: 0.88,
      originalFormat: 'wav'
    }
  } catch (error) {
    console.error('MusicGen generation failed:', error)
    throw error
  }
}

async function generateWithMusicGenLarge(prompt: string, duration: number, style: string) {
  console.log('🎼🔥 Using MusicGen Large for high-quality audio generation')
  
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/musicgen-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: enhanceAudioPrompt(prompt, style),
          parameters: {
            max_new_tokens: Math.floor(duration * 50),
            temperature: 0.7,
            top_p: 0.95,
            guidance_scale: 3.0
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`MusicGen Large API error: ${response.statusText}`)
    }

    const audioBuffer = await response.arrayBuffer()
    const audioUrl = await uploadAudioToStorage(audioBuffer, 'wav')
    
    return {
      audioUrl,
      modelUsed: 'MusicGen Large',
      confidence: 0.95,
      originalFormat: 'wav'
    }
  } catch (error) {
    console.error('MusicGen Large generation failed:', error)
    // Fallback to medium model
    return await generateWithMusicGen(prompt, duration, style)
  }
}

async function generateWithRiffusion(prompt: string, duration: number, style: string) {
  console.log('🌊 Using Riffusion for spectrogram-based audio generation')
  
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'riffusion-model-version',
        input: {
          prompt_a: enhanceAudioPrompt(prompt, style),
          denoising: 0.75,
          num_inference_steps: 50,
          alpha: 0.5
        }
      }),
    })

    const prediction = await response.json()
    const result = await pollReplicateResult(prediction.id)
    
    return {
      audioUrl: result.output.audio,
      modelUsed: 'Riffusion',
      confidence: 0.82,
      originalFormat: 'wav'
    }
  } catch (error) {
    console.error('Riffusion generation failed:', error)
    return await generateMockAudio(prompt, duration, style)
  }
}

async function generateWithMubert(prompt: string, duration: number, style: string) {
  console.log('🎛️ Using Mubert for AI music generation')
  
  try {
    const response = await fetch('https://api-b2b.mubert.com/v2/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MUBERT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'track',
        prompt: enhanceAudioPrompt(prompt, style),
        duration: duration,
        format: 'wav',
        quality: 'high'
      }),
    })

    if (!response.ok) {
      throw new Error(`Mubert API error: ${response.statusText}`)
    }

    const result = await response.json()
    
    return {
      audioUrl: result.download_link,
      modelUsed: 'Mubert AI',
      confidence: 0.91,
      originalFormat: 'wav'
    }
  } catch (error) {
    console.error('Mubert generation failed:', error)
    return await generateWithMusicGen(prompt, duration, style)
  }
}

async function generateWithSonarium(prompt: string, duration: number, style: string) {
  console.log('🔮 Using Sonarium custom audio engine')
  
  // Custom Sonarium audio generation for immersive experiences
  try {
    // This would use our proprietary Sonarium audio generation
    // For now, enhanced MusicGen with spatial audio processing
    const baseAudio = await generateWithMusicGen(prompt, duration, style)
    
    // Add spatial audio enhancements
    const spatialAudio = await addSpatialEffects(baseAudio.audioUrl, style)
    
    return {
      audioUrl: spatialAudio,
      modelUsed: 'Sonarium Engine',
      confidence: 0.93,
      originalFormat: 'wav',
      spatialAudio: true
    }
  } catch (error) {
    console.error('Sonarium generation failed:', error)
    return await generateWithMusicGen(prompt, duration, style)
  }
}

async function generateWithBestAudioModel(prompt: string, duration: number, style: string) {
  console.log('🤖 Auto-selecting best audio model for:', prompt, style)
  
  const promptLower = prompt.toLowerCase()
  
  if (style === 'ambient' || promptLower.includes('ambient')) {
    return await generateWithSonarium(prompt, duration, style)
  } else if (promptLower.includes('music') || promptLower.includes('song')) {
    return await generateWithMubert(prompt, duration, style)
  } else if (promptLower.includes('electronic') || promptLower.includes('synth')) {
    return await generateWithRiffusion(prompt, duration, style)
  } else {
    return await generateWithMusicGen(prompt, duration, style)
  }
}

function enhanceAudioPrompt(prompt: string, style: string): string {
  // Enhance the prompt for better audio generation
  const styleEnhancements = {
    ambient: 'atmospheric, ethereal, peaceful, flowing',
    electronic: 'synthesized, digital, rhythmic, energetic',
    classical: 'orchestral, harmonic, melodic, sophisticated',
    cinematic: 'dramatic, epic, emotional, dynamic',
    nature: 'organic, natural sounds, environmental, soothing',
    experimental: 'abstract, innovative, unconventional, creative'
  }
  
  const enhancement = styleEnhancements[style] || styleEnhancements.ambient
  return `${prompt}, ${enhancement}, high quality, immersive audio`
}

async function addSpatialEffects(audioUrl: string, style: string): Promise<string> {
  console.log('🎧 Adding spatial audio effects')
  
  // In production, this would apply:
  // - 3D spatial positioning
  // - Reverb based on virtual environment
  // - Binaural processing
  // - Frequency optimization for VR/AR
  
  // For now, return the original URL with a spatial indicator
  return audioUrl.replace('.wav', '_spatial.wav')
}

async function generateMockAudio(prompt: string, duration: number, style: string) {
  console.log('🎭 Generating mock audio for:', prompt)
  
  // Generate a simple procedural audio for development
  const frequency = getFrequencyFromPrompt(prompt)
  const mockAudio = generateSineWave(frequency, duration)
  const audioUrl = await uploadAudioToStorage(mockAudio, 'wav')
  
  return {
    audioUrl,
    modelUsed: 'Mock Audio Generator',
    confidence: 0.60,
    originalFormat: 'wav'
  }
}

function getFrequencyFromPrompt(prompt: string): number {
  // Extract musical elements from prompt to determine frequency
  const promptLower = prompt.toLowerCase()
  
  if (promptLower.includes('bass') || promptLower.includes('low')) return 80
  if (promptLower.includes('treble') || promptLower.includes('high')) return 880
  if (promptLower.includes('middle') || promptLower.includes('mid')) return 440
  
  // Default middle C
  return 261.63
}

function generateSineWave(frequency: number, duration: number): ArrayBuffer {
  const sampleRate = 44100
  const samples = sampleRate * duration
  const buffer = new ArrayBuffer(samples * 2) // 16-bit audio
  const view = new DataView(buffer)
  
  for (let i = 0; i < samples; i++) {
    const value = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3
    const sample = Math.round(value * 32767)
    view.setInt16(i * 2, sample, true)
  }
  
  return buffer
}

async function postProcessAudio(result: any, format: string, duration: number) {
  console.log('⚙️ Post-processing audio')
  
  // In production, this would:
  // - Convert between formats (MP3, WAV, OGG)
  // - Apply compression and EQ
  // - Generate waveform visualization
  // - Create spectrogram
  // - Analyze BPM and key
  // - Extract mood/genre information
  
  return {
    audioUrl: result.audioUrl,
    waveformUrl: result.audioUrl.replace('.wav', '_waveform.png'),
    spectrogramUrl: result.audioUrl.replace('.wav', '_spectrogram.png'),
    actualDuration: duration,
    sampleRate: 44100,
    bitrate: 320, // kbps for MP3
    detectedBPM: Math.floor(Math.random() * 60) + 80, // 80-140 BPM
    detectedKey: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][Math.floor(Math.random() * 12)],
    mood: ['energetic', 'peaceful', 'dramatic', 'uplifting', 'mysterious'][Math.floor(Math.random() * 5)]
  }
}

async function uploadAudioToStorage(audioBuffer: ArrayBuffer, extension: string): Promise<string> {
  // In production, upload to Firebase Storage, S3, or CDN
  const filename = `audio_${Date.now()}.${extension}`
  
  // Mock URL for development
  return `https://cdn.nemurium.com/audio/${filename}`
}

async function pollReplicateResult(predictionId: string, maxAttempts = 30): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    })
    
    const prediction = await response.json()
    
    if (prediction.status === 'succeeded') {
      return prediction
    } else if (prediction.status === 'failed') {
      throw new Error('Replicate prediction failed')
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  throw new Error('Timeout waiting for Replicate result')
}