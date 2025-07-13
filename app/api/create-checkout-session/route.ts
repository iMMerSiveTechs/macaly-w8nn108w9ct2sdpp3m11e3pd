import { NextRequest, NextResponse } from 'next/server';

// Stripe price IDs for each tier (in production, these would be real Stripe price IDs)
const tierPrices = {
  bronze: 'price_bronze_tier',
  silver: 'price_silver_tier', 
  gold: 'price_gold_tier',
  master: 'price_master_tier'
};

export async function POST(request: NextRequest) {
  try {
    const { tier, successUrl, cancelUrl } = await request.json();
    
    console.log(`💳 Creating Stripe checkout session for ${tier} tier`);
    
    // Validate tier
    if (!tierPrices[tier as keyof typeof tierPrices]) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      );
    }
    
    // In production, this would use the actual Stripe SDK:
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: tierPrices[tier as keyof typeof tierPrices],
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        tier: tier,
        userId: 'user_123' // Get from auth in production
      }
    });
    
    return NextResponse.json({ sessionId: session.id });
    */
    
    // For demo purposes, return a mock session ID
    const mockSessionId = `cs_test_${tier}_${Date.now()}`;
    
    console.log(`✅ Mock Stripe session created: ${mockSessionId}`);
    
    return NextResponse.json({ 
      sessionId: mockSessionId,
      message: 'Checkout session created successfully',
      tier: tier
    });
    
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}