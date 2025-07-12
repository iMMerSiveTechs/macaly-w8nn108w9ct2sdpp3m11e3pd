# 🌟 Nemurium Dream Machine Setup Guide

## Overview
The Dream Machine is a powerful AI content generation interface that transforms text prompts into multiple formats: images, videos, 3D models, voiceovers, and soundscapes.

## 🚀 Quick Start

### 1. Configure API Keys
Copy `.env.example` to `.env` and add your API keys:

```bash
# Leonardo.AI - For image generation
LEONARDO_API_KEY=your_leonardo_api_key_here

# Replicate - For video generation  
REPLICATE_API_KEY=your_replicate_api_key_here

# ElevenLabs - For voiceover generation
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### 2. Get Leonardo.AI API Key
1. Visit [Leonardo.AI](https://leonardo.ai)
2. Create an account (free credits included)
3. Go to Settings → API Access
4. Generate your API key
5. Add to `.env` file

### 3. Get Replicate API Key (Optional)
1. Visit [Replicate.com](https://replicate.com)
2. Sign up for an account
3. Go to Account → API Tokens
4. Create a new token
5. Add to `.env` file

## 🎨 Features

### Output Types
- **AI Image**: High-quality concept art via Leonardo.AI
- **Cinematic Video**: Motion sequences via Replicate
- **3D Object (.glb)**: VR/AR ready models (coming soon)
- **AI Voiceover**: Natural speech synthesis (coming soon)
- **Ambient Soundscape**: Immersive audio (coming soon)
- **AR World Layer**: Spatial overlays (coming soon)

### Style System
- **Cinematic**: Dramatic lighting and composition
- **Vibrant**: Bold, saturated colors
- **Moody**: Dark, atmospheric scenes
- **Sci-fi**: Futuristic, technological aesthetics
- **Realistic**: Photorealistic rendering
- **Stylized**: Artistic, non-photorealistic styles

## 🔧 API Endpoints

### POST /api/generate
Generate content based on prompt and settings.

**Request Body:**
```json
{
  "prompt": "a floating neon fortress on a cliff",
  "outputType": "image",
  "styles": ["cinematic", "vibrant"]
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://generated-content-url.com/image.jpg",
  "generationId": "abc123"
}
```

## 📝 Usage Examples

### Basic Image Generation
```javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "a magical crystal cave with bioluminescent plants",
    outputType: "image",
    styles: ["vibrant", "sci-fi"]
  })
})
```

### Video Generation (with Replicate)
```javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "epic slow motion shot of a spaceship landing",
    outputType: "video",
    styles: ["cinematic"]
  })
})
```

## 🛠️ Extending the System

### Adding New AI Services
1. Create a new service in `src/server/services/`
2. Implement the generation logic
3. Add to the switch statement in `/api/generate/route.ts`
4. Update the frontend output types

### Custom Style Presets
Edit `components/dream-machine.tsx` to add new style options:

```typescript
const styleOptions: StyleTag[] = [
  'moody', 'vibrant', 'sci-fi', 'cinematic', 
  'stylized', 'realistic', 'your-new-style'
]
```

## 🎯 Production Considerations

### Rate Limiting
- Implement user-based rate limiting
- Track API usage and costs
- Add subscription-based limits

### Storage
- Store generated content in cloud storage (S3, Cloudinary)
- Implement content moderation
- Add user galleries and favorites

### Monitoring
- Track generation success rates
- Monitor API costs and usage
- Log generation analytics

## 🌟 Future Roadmap

### Phase 1 (Current)
- ✅ Leonardo.AI image generation
- ✅ Style system and prompt enhancement
- ✅ Responsive UI with Nemurium branding

### Phase 2 (Next)
- 🔄 Replicate video generation
- 🔄 ElevenLabs voice synthesis
- 🔄 User authentication and galleries

### Phase 3 (Future)
- 🔄 3D model generation (Meshy.ai)
- 🔄 AR layer creation
- 🔄 Collaborative generation
- 🔄 Marketplace integration

## 💡 Tips & Best Practices

### Prompt Engineering
- Be specific and descriptive
- Include lighting, mood, and style details
- Use cinematic terminology for videos
- Test different style combinations

### Performance
- Cache generated results
- Implement progressive loading
- Use CDN for serving generated content
- Optimize images for web delivery

### User Experience
- Show progress indicators
- Provide example prompts
- Allow saving and sharing
- Implement generation history

---

Built with ❤️ for the Nemurium platform