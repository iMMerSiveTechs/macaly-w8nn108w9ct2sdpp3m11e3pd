// Leonardo.AI Integration Service
// Handles image generation using Leonardo.AI API

interface LeonardoGenerationRequest {
  prompt: string
  styles?: string[]
  width?: number
  height?: number
  modelId?: string
}

interface LeonardoGenerationResponse {
  success: boolean
  url?: string
  generationId?: string
  message?: string
  error?: string
}

export class LeonardoService {
  private apiKey: string
  private baseUrl = 'https://cloud.leonardo.ai/api/rest/v1'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.LEONARDO_API_KEY || ''
  }

  async generateImage(request: LeonardoGenerationRequest): Promise<LeonardoGenerationResponse> {
    if (!this.apiKey) {
      console.warn('⚠️ Leonardo API key not configured')
      return this.getPlaceholderImage(request.prompt)
    }

    try {
      console.log('🎨 Starting Leonardo.AI generation:', request.prompt)

      const { prompt, styles = [], width = 768, height = 768, modelId = 'ac614f96-1082-45bf-be9d-757f2d31c174' } = request

      // Enhance prompt with styles
      const enhancedPrompt = this.enhancePromptWithStyles(prompt, styles)

      // Step 1: Create generation
      const generationResponse = await fetch(`${this.baseUrl}/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          num_images: 1,
          height,
          width,
          guidance_scale: 7.5,
          modelId,
          alchemy: true,
          photoReal: styles.includes('realistic'),
          presetStyle: this.getPresetStyle(styles)
        })
      })

      if (!generationResponse.ok) {
        throw new Error(`Leonardo API error: ${generationResponse.status}`)
      }

      const generationData = await generationResponse.json()
      console.log('📡 Generation started:', generationData)

      if (!generationData.sdGenerationJob?.generationId) {
        throw new Error('Failed to get generation ID')
      }

      const generationId = generationData.sdGenerationJob.generationId

      // Step 2: Poll for completion
      const result = await this.pollForCompletion(generationId)
      
      if (result.success && result.url) {
        console.log('✅ Leonardo generation completed:', result.url)
        return result
      } else {
        throw new Error('Generation failed or timed out')
      }

    } catch (error) {
      console.error('❌ Leonardo.AI error:', error)
      
      // Return placeholder on error
      return this.getPlaceholderImage(request.prompt)
    }
  }

  private async pollForCompletion(generationId: string): Promise<LeonardoGenerationResponse> {
    const maxAttempts = 30 // 5 minutes max (10 seconds per attempt)
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        await new Promise(resolve => setTimeout(resolve, 10000)) // Wait 10 seconds
        
        const statusResponse = await fetch(`${this.baseUrl}/generations/${generationId}`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        })

        if (!statusResponse.ok) {
          throw new Error(`Status check failed: ${statusResponse.status}`)
        }

        const statusData = await statusResponse.json()
        console.log(`🔄 Generation status (attempt ${attempts + 1}):`, statusData.generations_by_pk?.status)
        
        if (statusData.generations_by_pk?.status === 'COMPLETE') {
          const imageUrl = statusData.generations_by_pk.generated_images?.[0]?.url
          
          if (imageUrl) {
            return {
              success: true,
              url: imageUrl,
              generationId
            }
          }
        } else if (statusData.generations_by_pk?.status === 'FAILED') {
          throw new Error('Generation failed')
        }
        
        attempts++
      } catch (error) {
        console.error(`❌ Polling error (attempt ${attempts + 1}):`, error)
        attempts++
      }
    }

    return {
      success: false,
      error: 'Generation timeout'
    }
  }

  private enhancePromptWithStyles(prompt: string, styles: string[]): string {
    if (styles.length === 0) return prompt

    const styleModifiers = {
      'cinematic': 'cinematic lighting, dramatic composition',
      'vibrant': 'vibrant colors, high saturation, bold',
      'moody': 'moody atmosphere, dramatic shadows',
      'sci-fi': 'futuristic, sci-fi, technological',
      'realistic': 'photorealistic, highly detailed',
      'stylized': 'artistic style, stylized rendering'
    }

    const modifiers = styles
      .map(style => styleModifiers[style as keyof typeof styleModifiers])
      .filter(Boolean)
      .join(', ')

    return modifiers ? `${prompt}, ${modifiers}` : prompt
  }

  private getPresetStyle(styles: string[]): string {
    if (styles.includes('cinematic')) return 'CINEMATIC'
    if (styles.includes('vibrant')) return 'VIBRANT'
    if (styles.includes('realistic')) return 'GENERAL'
    return 'GENERAL'
  }

  private getPlaceholderImage(prompt: string): LeonardoGenerationResponse {
    // Use Unsplash API for relevant placeholder images
    const searchTerm = encodeURIComponent(prompt.split(' ').slice(0, 3).join(' '))
    const placeholderUrl = `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop`
    
    return {
      success: true,
      url: placeholderUrl,
      message: 'Using placeholder image (configure Leonardo API key for real generation)'
    }
  }

  // Get user's remaining credits
  async getUserInfo(): Promise<{ credits?: number; error?: string }> {
    if (!this.apiKey) {
      return { error: 'API key not configured' }
    }

    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`User info request failed: ${response.status}`)
      }

      const userData = await response.json()
      return {
        credits: userData.user_details?.[0]?.apiCredit || 0
      }
    } catch (error) {
      console.error('❌ Failed to get user info:', error)
      return { error: 'Failed to get user info' }
    }
  }
}

// Export singleton instance
export const leonardoService = new LeonardoService()