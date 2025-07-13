import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = {
  '3d_models': ['.glb', '.gltf', '.fbx', '.obj', '.blend', '.usd', '.usdz'],
  'textures': ['.jpg', '.jpeg', '.png', '.webp', '.hdr', '.exr'],
  'audio': ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  'videos': ['.mp4', '.webm', '.mov', '.avi'],
  'worlds': ['.nrm', '.world', '.json'],
  'documents': ['.pdf', '.txt', '.md']
};

const VIRUS_SCAN_PATTERNS = [
  'eval(',
  'document.write',
  'innerHTML',
  '<script',
  'javascript:',
  'onload=',
  'onerror='
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('type') as string || 'auto';
    const userId = formData.get('userId') as string;
    const privacy = formData.get('privacy') as string || 'private';
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }
    
    console.log('Upload request:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType,
      userId,
      privacy
    });
    
    // Validate file
    const validation = await validateFile(file, uploadType);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // Process upload
    const uploadResult = await processUpload(file, uploadType, userId, privacy);
    
    return NextResponse.json({
      success: true,
      upload: uploadResult,
      message: 'File uploaded successfully'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');
    
    switch (action) {
      case 'list':
        return await listUserUploads(userId);
      case 'quota':
        return await getUploadQuota(userId);
      case 'types':
        return await getSupportedTypes();
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Upload GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Request failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { fileId, userId } = await req.json();
    
    // Simulate file deletion
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Delete failed' },
      { status: 500 }
    );
  }
}

async function validateFile(file: File, uploadType: string): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    };
  }
  
  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  const detectedType = detectFileType(extension);
  
  if (uploadType !== 'auto' && uploadType !== detectedType) {
    return {
      valid: false,
      error: `File type mismatch. Expected ${uploadType}, detected ${detectedType}`
    };
  }
  
  if (!detectedType) {
    return {
      valid: false,
      error: `Unsupported file type: ${extension}`
    };
  }
  
  // Basic security scan
  try {
    const fileContent = await file.text();
    const securityCheck = scanForThreats(fileContent);
    
    if (!securityCheck.safe) {
      return {
        valid: false,
        error: `Security threat detected: ${securityCheck.threat}`
      };
    }
  } catch {
    // If we can't read as text, it's likely a binary file which is fine
  }
  
  return { valid: true };
}

function detectFileType(extension: string): string | null {
  for (const [type, extensions] of Object.entries(ALLOWED_TYPES)) {
    if (extensions.includes(extension)) {
      return type;
    }
  }
  return null;
}

function scanForThreats(content: string): { safe: boolean; threat?: string } {
  const lowerContent = content.toLowerCase();
  
  for (const pattern of VIRUS_SCAN_PATTERNS) {
    if (lowerContent.includes(pattern.toLowerCase())) {
      return {
        safe: false,
        threat: `Potentially malicious pattern detected: ${pattern}`
      };
    }
  }
  
  return { safe: true };
}

async function processUpload(file: File, uploadType: string, userId: string, privacy: string) {
  // Simulate file processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const fileName = file.name;
  const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase();
  const detectedType = detectFileType(fileExtension) || uploadType;
  
  // Generate file URL (in production this would be a CDN URL)
  const fileUrl = `/api/files/${fileId}${fileExtension}`;
  
  // Generate thumbnail for supported types
  let thumbnailUrl = null;
  if (detectedType === 'textures' || detectedType === 'videos') {
    thumbnailUrl = `/api/thumbnails/${fileId}.jpg`;
  }
  
  // Process metadata based on file type
  const metadata = await extractMetadata(file, detectedType);
  
  const uploadData = {
    id: fileId,
    name: fileName,
    originalName: fileName,
    size: file.size,
    type: detectedType,
    mimeType: file.type,
    url: fileUrl,
    thumbnailUrl,
    userId,
    privacy,
    metadata,
    uploadedAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString(),
    downloadCount: 0,
    status: 'ready',
    tags: generateAutoTags(fileName, detectedType),
    license: {
      type: 'creator_owned',
      allowCommercialUse: false,
      allowModification: true,
      allowRedistribution: false
    }
  };
  
  console.log('File processed:', uploadData);
  
  return uploadData;
}

async function extractMetadata(file: File, fileType: string) {
  const metadata: any = {
    fileType,
    uploadedSize: file.size,
    originalName: file.name
  };
  
  switch (fileType) {
    case '3d_models':
      metadata.estimatedPolygons = Math.floor(file.size / 1000); // Rough estimate
      metadata.recommendedLOD = file.size > 10 * 1024 * 1024 ? 'high' : 'medium';
      break;
      
    case 'textures':
      // For images, we'd typically use image processing libraries
      metadata.estimatedResolution = '1024x1024'; // Placeholder
      metadata.colorSpace = 'sRGB';
      break;
      
    case 'audio':
      metadata.estimatedDuration = Math.floor(file.size / 44100); // Rough estimate in seconds
      metadata.channels = 'stereo';
      metadata.sampleRate = '44.1kHz';
      break;
      
    case 'worlds':
      metadata.worldFormat = file.name.endsWith('.nrm') ? 'nemurium' : 'generic';
      metadata.estimatedComplexity = file.size > 5 * 1024 * 1024 ? 'high' : 'medium';
      break;
      
    default:
      metadata.category = 'general';
  }
  
  return metadata;
}

function generateAutoTags(fileName: string, fileType: string): string[] {
  const tags = [fileType];
  const name = fileName.toLowerCase();
  
  // Add tags based on filename
  const tagPatterns = {
    'texture': ['material', 'surface'],
    'normal': ['normalmap', 'bump'],
    'diffuse': ['color', 'albedo'],
    'rough': ['roughness', 'material'],
    'metal': ['metallic', 'material'],
    'glow': ['emission', 'light'],
    'tree': ['nature', 'vegetation'],
    'rock': ['stone', 'natural'],
    'building': ['architecture', 'structure'],
    'character': ['avatar', 'person'],
    'vehicle': ['transport', 'mobile'],
    'weapon': ['tool', 'combat'],
    'ambient': ['atmosphere', 'background'],
    'music': ['soundtrack', 'audio'],
    'sfx': ['effects', 'sound']
  };
  
  for (const [keyword, relatedTags] of Object.entries(tagPatterns)) {
    if (name.includes(keyword)) {
      tags.push(keyword, ...relatedTags);
    }
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

async function listUserUploads(userId: string | null) {
  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User ID required' },
      { status: 400 }
    );
  }
  
  // Simulate fetching user uploads
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockUploads = [
    {
      id: 'file_1',
      name: 'crystal_texture.jpg',
      type: 'textures',
      size: 2048576,
      uploadedAt: '2024-01-15T10:30:00Z',
      downloadCount: 23,
      thumbnailUrl: '/api/thumbnails/file_1.jpg'
    },
    {
      id: 'file_2',
      name: 'floating_island.glb',
      type: '3d_models',
      size: 15728640,
      uploadedAt: '2024-01-14T16:20:00Z',
      downloadCount: 45,
      thumbnailUrl: '/api/thumbnails/file_2.jpg'
    },
    {
      id: 'file_3',
      name: 'ambient_forest.wav',
      type: 'audio',
      size: 8388608,
      uploadedAt: '2024-01-13T09:15:00Z',
      downloadCount: 12,
      thumbnailUrl: null
    }
  ];
  
  return NextResponse.json({
    success: true,
    uploads: mockUploads,
    total: mockUploads.length,
    totalSize: mockUploads.reduce((sum, file) => sum + file.size, 0)
  });
}

async function getUploadQuota(userId: string | null) {
  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User ID required' },
      { status: 400 }
    );
  }
  
  // Simulate quota check
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const quotas = {
    bronze: { storage: 1024 * 1024 * 1024, // 1GB
             uploads: 50,
             fileSize: 50 * 1024 * 1024 }, // 50MB
    silver: { storage: 5 * 1024 * 1024 * 1024, // 5GB
             uploads: 200,
             fileSize: 100 * 1024 * 1024 }, // 100MB
    gold: { storage: 20 * 1024 * 1024 * 1024, // 20GB
           uploads: 1000,
           fileSize: 500 * 1024 * 1024 }, // 500MB
    master: { storage: 100 * 1024 * 1024 * 1024, // 100GB
             uploads: -1, // unlimited
             fileSize: 2 * 1024 * 1024 * 1024 } // 2GB
  };
  
  const userTier = 'silver'; // This would be fetched from user data
  const limits = quotas[userTier];
  
  return NextResponse.json({
    success: true,
    quota: {
      tier: userTier,
      storage: {
        used: 2.1 * 1024 * 1024 * 1024, // 2.1GB used
        limit: limits.storage,
        remaining: limits.storage - (2.1 * 1024 * 1024 * 1024)
      },
      uploads: {
        used: 47,
        limit: limits.uploads,
        remaining: limits.uploads === -1 ? -1 : limits.uploads - 47
      },
      maxFileSize: limits.fileSize
    }
  });
}

async function getSupportedTypes() {
  return NextResponse.json({
    success: true,
    supportedTypes: Object.entries(ALLOWED_TYPES).map(([category, extensions]) => ({
      category,
      extensions,
      description: getCategoryDescription(category)
    }))
  });
}

function getCategoryDescription(category: string): string {
  const descriptions = {
    '3d_models': '3D models and meshes for world building',
    'textures': 'Images and materials for surfaces',
    'audio': 'Sound effects and music files',
    'videos': 'Video content and animations',
    'worlds': 'Complete world files and templates',
    'documents': 'Documentation and text files'
  };
  
  return descriptions[category as keyof typeof descriptions] || 'General files';
}