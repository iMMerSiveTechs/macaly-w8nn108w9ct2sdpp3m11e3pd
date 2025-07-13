import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for now (in production, use Firebase/database)
const toolClicks: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { tool, timestamp } = await request.json();
    
    console.log(`📊 Tool click tracked: ${tool} at ${timestamp}`);
    
    // Store the click data
    toolClicks.push({
      tool,
      timestamp,
      userId: 'anonymous', // In production, get from auth
      id: Date.now().toString()
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tool click tracked successfully' 
    });
  } catch (error) {
    console.error('Error tracking tool click:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track tool click' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return analytics data for admin dashboard
  const stats: { [key: string]: number } = {};
  
  toolClicks.forEach(click => {
    stats[click.tool] = (stats[click.tool] || 0) + 1;
  });
  
  return NextResponse.json({
    totalClicks: toolClicks.length,
    toolStats: stats,
    recentClicks: toolClicks.slice(-10) // Last 10 clicks
  });
}