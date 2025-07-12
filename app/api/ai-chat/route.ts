import { NextRequest, NextResponse } from 'next/server'

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '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'

export async function POST(request: NextRequest) {
  try {
    const { message, temperature = 0.7, context } = await request.json()

    console.log('🤖 AI Chat request:', { message, temperature })

    if (!message?.trim()) {
      return NextResponse.json({
        error: 'Message is required'
      }, { status: 400 })
    }

    // Create a focused prompt for creative assistance
    const systemPrompt = context || `You are Nemurium AI, an expert assistant for immersive content creation, VR/AR development, and creative world building. You help creators with:

- Writing compelling prompts for AI generation
- Creative ideas for immersive experiences  
- Technical guidance for VR/AR/3D content
- World building concepts and storytelling
- Code snippets for creative projects

Be concise, creative, and practical. Focus on actionable advice that helps creators bring their visions to life.`

    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`

    // Try HuggingFace text generation
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: fullPrompt,
            parameters: {
              temperature: temperature,
              max_new_tokens: 150,
              do_sample: true,
              return_full_text: false
            }
          })
        }
      )

      if (response.ok) {
        const data = await response.json()
        let aiResponse = data[0]?.generated_text || data.generated_text

        if (aiResponse) {
          // Clean up the response
          aiResponse = aiResponse.replace(fullPrompt, '').trim()
          
          console.log('✅ HuggingFace AI response:', aiResponse)
          
          return NextResponse.json({
            success: true,
            response: aiResponse
          })
        }
      }
    } catch (hfError) {
      console.log('HuggingFace API not available, using fallback responses')
    }

    // Fallback responses for when API is not available
    const fallbackResponses = {
      prompt: [
        "Here's a creative prompt idea: 'A mystical library floating in space where each book contains a different world, with aurora-colored light streaming between the shelves and gravity-defying reading nooks.'",
        "Try this: 'An underwater city with bioluminescent coral architecture, where merpeople swim through crystal-clear tubes connecting floating bio-domes filled with alien gardens.'",
        "Consider: 'A steampunk clockwork forest where mechanical trees have gears for leaves, steam-powered animals roam copper pathways, and the sky rains tiny golden cogs.'"
      ],
      world: [
        "For world building, start with these key elements: unique physics rules, compelling conflict sources, rich sensory details, and memorable landmarks that players will want to explore.",
        "Consider your world's 'heartbeat' - what makes it feel alive? Maybe it's the way light filters through crystal formations, or how the ground pulses with ancient magic.",
        "Think about layers: surface beauty that draws people in, hidden depths that reward exploration, and interconnected systems that make everything feel purposeful."
      ],
      technical: [
        "For VR optimization, focus on: maintaining 90+ FPS, using LOD systems for complex models, implementing smooth locomotion options, and testing comfort settings early.",
        "Key AR considerations: occlusion handling, lighting estimation, plane detection accuracy, and designing UI that works in variable lighting conditions.",
        "3D optimization tips: Use texture atlases, implement proper mesh decimation, employ frustum culling, and consider implementing dynamic batching for similar objects."
      ],
      creative: [
        "Creative tip: Start with emotion, then build the world around that feeling. What do you want users to feel? Wonder? Tension? Peace? Let that guide your design choices.",
        "Try the 'What if?' technique: Take something ordinary and ask 'What if gravity worked differently here?' or 'What if time moved in spirals instead of lines?'",
        "Consider multi-sensory design: How would your world sound? What would it smell like? How would different materials feel? This depth makes experiences memorable."
      ]
    }

    // Determine response type based on message content
    let responseType = 'creative'
    if (message.toLowerCase().includes('prompt')) responseType = 'prompt'
    else if (message.toLowerCase().includes('world') || message.toLowerCase().includes('build')) responseType = 'world'
    else if (message.toLowerCase().includes('vr') || message.toLowerCase().includes('ar') || message.toLowerCase().includes('3d') || message.toLowerCase().includes('code')) responseType = 'technical'

    const responses = fallbackResponses[responseType as keyof typeof fallbackResponses]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return NextResponse.json({
      success: true,
      response: randomResponse,
      fallback: true
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({
      error: 'Failed to process AI request',
      success: false
    }, { status: 500 })
  }
}