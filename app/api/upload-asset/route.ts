import { NextRequest, NextResponse } from 'next/server';
import { validateFile, generateUploadId, scanContentForFlags } from '@/utils/uploadUtils';

// Mock storage - in production this would use Firebase Storage, AWS S3, etc.
const mockStorage: { [key: string]: any } = {};

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Processing asset upload request');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const timestamp = formData.get('timestamp') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log(`📋 Processing file: ${file.name} (${file.size} bytes)`);
    
    // Content moderation check
    const fileName = file.name.toLowerCase();
    const isContentFlagged = await scanContentForFlags(fileName);
    
    if (isContentFlagged) {
      console.log('🚫 Content flagged by moderation system');
      return NextResponse.json(
        { success: false, error: 'Content flagged by moderation system' },
        { status: 400 }
      );
    }
    
    // Generate unique upload ID and mock URL
    const uploadId = generateUploadId();
    const mockUrl = `https://storage.nemurium.com/assets/${category}/${uploadId}_${file.name}`;
    
    // Store metadata (in production this would go to a database)
    mockStorage[uploadId] = {
      id: uploadId,
      name: file.name,
      category,
      size: file.size,
      type: file.type,
      url: mockUrl,
      uploadedAt: timestamp,
      status: 'uploaded'
    };
    
    console.log(`✅ Asset uploaded successfully: ${mockUrl}`);
    
    // Track upload in analytics (mock)
    await fetch('/api/track-tool-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'Asset Upload',
        category: category,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}); // Silent fail for analytics
    
    return NextResponse.json({
      success: true,
      id: uploadId,
      url: mockUrl,
      category,
      metadata: {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: timestamp
      }
    });
    
  } catch (error) {
    console.error('❌ Upload processing error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during upload processing' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return list of uploaded assets
  try {
    const assets = Object.values(mockStorage);
    
    return NextResponse.json({
      success: true,
      assets,
      total: assets.length
    });
    
  } catch (error) {
    console.error('❌ Error fetching assets:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}