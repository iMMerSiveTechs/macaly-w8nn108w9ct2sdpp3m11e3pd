import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1200))

    const responses = [
      "Great question! For immersive content, I'd suggest focusing on environmental storytelling and dynamic elements that respond to user presence.",
      "I love that creative direction! Consider adding layered audio landscapes and interactive hotspots to enhance the user experience.",
      "That's a fascinating concept! Here's how we can make it even more engaging with proper lighting and spatial audio design.",
      "Perfect! Let me help you refine that prompt. Try adding specific mood descriptors and environmental details for better AI generation.",
      "Excellent idea! For world-building, consider the user's journey through your space and how each element contributes to the narrative."
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]
    
    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}