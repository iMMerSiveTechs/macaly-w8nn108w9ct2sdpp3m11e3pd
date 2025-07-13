import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    
    console.log('World builder action:', action, data);
    
    switch (action) {
      case 'save':
        return await saveWorld(data);
      case 'load':
        return await loadWorld(data);
      case 'export':
        return await exportWorld(data);
      case 'share':
        return await shareWorld(data);
      case 'validate':
        return await validateWorld(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('World builder error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const worldId = searchParams.get('worldId');
    const userId = searchParams.get('userId');
    
    if (worldId) {
      return await getWorld(worldId);
    } else if (userId) {
      return await getUserWorlds(userId);
    } else {
      return await getPublicWorlds();
    }
  } catch (error) {
    console.error('World retrieval error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve worlds' },
      { status: 500 }
    );
  }
}

async function saveWorld(worldData: any) {
  // Simulate saving to database
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const worldId = worldData.id || `world_${Date.now()}`;
  const savedWorld = {
    id: worldId,
    name: worldData.name || 'Untitled World',
    creator: worldData.creator || 'Anonymous',
    objects: worldData.objects || [],
    settings: worldData.settings || {
      lighting: 'daylight',
      weather: 'clear',
      gravity: 1.0,
      physics: true
    },
    metadata: {
      created: worldData.metadata?.created || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: (worldData.metadata?.version || 0) + 1,
      size: calculateWorldSize(worldData.objects || [])
    },
    permissions: worldData.permissions || {
      public: false,
      collaborative: false,
      downloadable: false
    }
  };
  
  console.log('World saved:', savedWorld);
  
  return NextResponse.json({
    success: true,
    world: savedWorld,
    message: 'World saved successfully'
  });
}

async function loadWorld(data: any) {
  const { worldId } = data;
  
  // Simulate loading from database
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock world data
  const worlds = {
    'world_1': {
      id: 'world_1',
      name: 'Crystal Caverns',
      creator: 'CrystalMaster',
      objects: [
        {
          id: 'crystal_1',
          type: 'crystal',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 45, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          properties: { color: '#00ffff', glow: true }
        },
        {
          id: 'portal_1',
          type: 'portal',
          position: { x: 5, y: 0, z: 5 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          properties: { destination: 'world_2', active: true }
        }
      ],
      settings: {
        lighting: 'mystical',
        weather: 'none',
        gravity: 0.8,
        physics: true,
        skybox: 'cave',
        ambientSound: 'crystal_hum'
      },
      metadata: {
        created: '2024-01-15T10:30:00Z',
        lastModified: '2024-01-16T14:20:00Z',
        version: 3,
        size: '2.4 MB'
      }
    },
    'world_2': {
      id: 'world_2',
      name: 'Sky Garden',
      creator: 'FloatingBuilder',
      objects: [
        {
          id: 'island_1',
          type: 'terrain',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          properties: { texture: 'grass', vegetation: true }
        },
        {
          id: 'tree_1',
          type: 'tree',
          position: { x: 2, y: 1, z: 3 },
          rotation: { x: 0, y: 90, z: 0 },
          scale: { x: 1.2, y: 1.5, z: 1.2 },
          properties: { species: 'oak', animated: true }
        }
      ],
      settings: {
        lighting: 'golden_hour',
        weather: 'gentle_breeze',
        gravity: 1.0,
        physics: true,
        skybox: 'clouds',
        ambientSound: 'wind_peaceful'
      },
      metadata: {
        created: '2024-01-10T08:15:00Z',
        lastModified: '2024-01-15T16:45:00Z',
        version: 5,
        size: '4.1 MB'
      }
    }
  };
  
  const world = worlds[worldId as keyof typeof worlds];
  
  if (!world) {
    return NextResponse.json(
      { success: false, error: 'World not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    world,
    message: 'World loaded successfully'
  });
}

async function exportWorld(data: any) {
  const { worldId, format } = data;
  
  // Simulate export processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const exportFormats = {
    'json': {
      mimeType: 'application/json',
      extension: '.json',
      description: 'Nemurium world format'
    },
    'glb': {
      mimeType: 'model/gltf-binary',
      extension: '.glb',
      description: '3D model format'
    },
    'usdz': {
      mimeType: 'model/vnd.usdz+zip',
      extension: '.usdz',
      description: 'Apple AR Quick Look format'
    }
  };
  
  const selectedFormat = exportFormats[format as keyof typeof exportFormats] || exportFormats.json;
  
  return NextResponse.json({
    success: true,
    export: {
      worldId,
      format,
      downloadUrl: `/api/download/world_${worldId}${selectedFormat.extension}`,
      mimeType: selectedFormat.mimeType,
      description: selectedFormat.description,
      size: '3.2 MB',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    },
    message: 'Export ready for download'
  });
}

async function shareWorld(data: any) {
  const { worldId, permissions } = data;
  
  // Simulate sharing process
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const shareUrl = `https://nemurium.com/world/${worldId}`;
  const embedCode = `<iframe src="${shareUrl}?embed=true" width="800" height="600" frameborder="0"></iframe>`;
  
  return NextResponse.json({
    success: true,
    sharing: {
      worldId,
      shareUrl,
      embedCode,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`,
      permissions: {
        public: permissions?.public || false,
        collaborative: permissions?.collaborative || false,
        downloadable: permissions?.downloadable || false,
        remixable: permissions?.remixable || false
      },
      analytics: {
        views: 0,
        shares: 0,
        downloads: 0
      }
    },
    message: 'World shared successfully'
  });
}

async function validateWorld(data: any) {
  const { objects, settings } = data;
  
  const issues = [];
  const warnings = [];
  const suggestions = [];
  
  // Validate objects
  if (!objects || objects.length === 0) {
    warnings.push('World is empty - consider adding some objects');
  }
  
  if (objects && objects.length > 1000) {
    warnings.push('World has many objects - this may impact performance');
  }
  
  // Check for objects outside reasonable bounds
  objects?.forEach((obj: any, index: number) => {
    const pos = obj.position;
    if (pos && (Math.abs(pos.x) > 100 || Math.abs(pos.y) > 100 || Math.abs(pos.z) > 100)) {
      warnings.push(`Object ${index + 1} is very far from origin - may cause precision issues`);
    }
  });
  
  // Validate settings
  if (settings?.gravity && (settings.gravity < 0 || settings.gravity > 5)) {
    warnings.push('Gravity setting is outside normal range (0-5)');
  }
  
  // Performance suggestions
  if (objects && objects.length > 100) {
    suggestions.push('Consider using LOD (Level of Detail) for distant objects');
  }
  
  if (objects?.some((obj: any) => obj.properties?.animated)) {
    suggestions.push('Animated objects can impact performance - use sparingly');
  }
  
  // Accessibility suggestions
  suggestions.push('Consider adding audio descriptions for visually impaired users');
  suggestions.push('Ensure color contrast meets accessibility standards');
  
  return NextResponse.json({
    success: true,
    validation: {
      valid: issues.length === 0,
      score: Math.max(0, 100 - (issues.length * 20) - (warnings.length * 5)),
      issues,
      warnings,
      suggestions,
      objectCount: objects?.length || 0,
      estimatedSize: calculateWorldSize(objects || []),
      performanceRating: getPerformanceRating(objects || [])
    }
  });
}

async function getWorld(worldId: string) {
  // This would typically query a database
  return await loadWorld({ worldId });
}

async function getUserWorlds(userId: string) {
  // Simulate user's worlds
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const userWorlds = [
    {
      id: 'world_1',
      name: 'Crystal Caverns',
      thumbnail: '/api/placeholder/200/150',
      lastModified: '2024-01-16T14:20:00Z',
      public: true,
      collaborative: false
    },
    {
      id: 'world_2',
      name: 'Sky Garden',
      thumbnail: '/api/placeholder/200/150',
      lastModified: '2024-01-15T16:45:00Z',
      public: false,
      collaborative: true
    }
  ];
  
  return NextResponse.json({
    success: true,
    worlds: userWorlds,
    total: userWorlds.length
  });
}

async function getPublicWorlds() {
  // Simulate public worlds feed
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const publicWorlds = [
    {
      id: 'featured_1',
      name: 'Neon Cityscape',
      creator: 'CyberArtist',
      thumbnail: '/api/placeholder/200/150',
      rating: 4.8,
      downloads: 1250,
      featured: true
    },
    {
      id: 'featured_2',
      name: 'Enchanted Forest',
      creator: 'NatureLover',
      thumbnail: '/api/placeholder/200/150',
      rating: 4.9,
      downloads: 890,
      featured: false
    }
  ];
  
  return NextResponse.json({
    success: true,
    worlds: publicWorlds,
    total: publicWorlds.length,
    page: 1,
    totalPages: 1
  });
}

function calculateWorldSize(objects: any[]): string {
  // Rough estimate based on object count and complexity
  const baseSize = 0.5; // MB
  const objectSize = objects.length * 0.1; // MB per object
  const totalMB = baseSize + objectSize;
  
  if (totalMB < 1) {
    return `${Math.round(totalMB * 1000)} KB`;
  } else {
    return `${totalMB.toFixed(1)} MB`;
  }
}

function getPerformanceRating(objects: any[]): string {
  const count = objects.length;
  
  if (count < 50) return 'Excellent';
  if (count < 150) return 'Good';
  if (count < 300) return 'Fair';
  return 'Poor - Consider optimization';
}