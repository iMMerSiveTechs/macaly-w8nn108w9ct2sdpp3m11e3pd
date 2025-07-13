import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    console.log('AI Realm Generation Request:', prompt);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Parse prompt for world elements
    const keywords = prompt.toLowerCase();
    const objects = [];
    
    // Forest/Nature generation
    if (keywords.includes('forest') || keywords.includes('tree') || keywords.includes('nature')) {
      const treeCount = Math.floor(Math.random() * 8) + 5;
      for (let i = 0; i < treeCount; i++) {
        objects.push({
          id: `tree_${Date.now()}_${i}`,
          type: 'tree',
          position: {
            x: Math.random() * 16 - 8,
            y: 0,
            z: Math.random() * 16 - 8
          },
          rotation: {
            x: 0,
            y: Math.random() * 360,
            z: 0
          }
        });
      }
      
      // Add some rocks
      const rockCount = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < rockCount; i++) {
        objects.push({
          id: `rock_${Date.now()}_${i}`,
          type: 'rock',
          position: {
            x: Math.random() * 12 - 6,
            y: 0,
            z: Math.random() * 12 - 6
          },
          rotation: {
            x: 0,
            y: Math.random() * 360,
            z: 0
          }
        });
      }
    }
    
    // Mystical/Magic generation
    if (keywords.includes('mystical') || keywords.includes('magic') || keywords.includes('portal') || keywords.includes('crystal')) {
      // Add portal
      objects.push({
        id: `portal_${Date.now()}`,
        type: 'portal',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      });
      
      // Add crystals
      const crystalCount = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < crystalCount; i++) {
        objects.push({
          id: `crystal_${Date.now()}_${i}`,
          type: 'crystal',
          position: {
            x: Math.random() * 10 - 5,
            y: 0,
            z: Math.random() * 10 - 5
          },
          rotation: {
            x: 0,
            y: Math.random() * 360,
            z: 0
          }
        });
      }
      
      // Add magical lighting
      objects.push({
        id: `light_${Date.now()}`,
        type: 'light',
        position: { x: 0, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      });
    }
    
    // City/Urban generation
    if (keywords.includes('city') || keywords.includes('urban') || keywords.includes('building')) {
      const buildingCount = Math.floor(Math.random() * 6) + 4;
      for (let i = 0; i < buildingCount; i++) {
        objects.push({
          id: `building_${Date.now()}_${i}`,
          type: 'building',
          position: {
            x: (i % 3 - 1) * 4 + Math.random() * 2 - 1,
            y: 0,
            z: Math.floor(i / 3) * 4 - 4 + Math.random() * 2 - 1
          },
          rotation: {
            x: 0,
            y: Math.random() * 4 * 90, // 90-degree increments
            z: 0
          }
        });
      }
      
      // Add street lights
      const lightCount = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < lightCount; i++) {
        objects.push({
          id: `light_${Date.now()}_${i}`,
          type: 'light',
          position: {
            x: Math.random() * 12 - 6,
            y: 2,
            z: Math.random() * 12 - 6
          },
          rotation: { x: 0, y: 0, z: 0 }
        });
      }
    }
    
    // Water/Ocean generation
    if (keywords.includes('water') || keywords.includes('ocean') || keywords.includes('sea') || keywords.includes('lake')) {
      objects.push({
        id: `water_${Date.now()}`,
        type: 'water',
        position: { x: 0, y: -0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      });
    }
    
    // Fire/Lava generation
    if (keywords.includes('fire') || keywords.includes('lava') || keywords.includes('volcano')) {
      const fireCount = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < fireCount; i++) {
        objects.push({
          id: `fire_${Date.now()}_${i}`,
          type: 'fire',
          position: {
            x: Math.random() * 8 - 4,
            y: 0,
            z: Math.random() * 8 - 4
          },
          rotation: { x: 0, y: 0, z: 0 }
        });
      }
    }
    
    // Default generation if no keywords match
    if (objects.length === 0) {
      objects.push(
        {
          id: `tree_${Date.now()}`,
          type: 'tree',
          position: { x: 2, y: 0, z: 2 },
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: `rock_${Date.now()}`,
          type: 'rock',
          position: { x: -2, y: 0, z: -2 },
          rotation: { x: 0, y: 45, z: 0 }
        },
        {
          id: `light_${Date.now()}`,
          type: 'light',
          position: { x: 0, y: 2, z: 0 },
          rotation: { x: 0, y: 0, z: 0 }
        }
      );
    }
    
    const realmData = {
      success: true,
      prompt,
      objects,
      metadata: {
        generatedAt: new Date().toISOString(),
        objectCount: objects.length,
        style: detectStyle(keywords),
        mood: detectMood(keywords)
      }
    };
    
    console.log('Generated realm:', realmData);
    
    return NextResponse.json(realmData);
    
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate realm' },
      { status: 500 }
    );
  }
}

function detectStyle(keywords: string): string {
  if (keywords.includes('mystical') || keywords.includes('magic')) return 'mystical';
  if (keywords.includes('city') || keywords.includes('urban')) return 'urban';
  if (keywords.includes('forest') || keywords.includes('nature')) return 'natural';
  if (keywords.includes('fire') || keywords.includes('lava')) return 'volcanic';
  if (keywords.includes('water') || keywords.includes('ocean')) return 'aquatic';
  return 'mixed';
}

function detectMood(keywords: string): string {
  if (keywords.includes('dark') || keywords.includes('scary')) return 'dark';
  if (keywords.includes('peaceful') || keywords.includes('calm')) return 'peaceful';
  if (keywords.includes('vibrant') || keywords.includes('colorful')) return 'vibrant';
  if (keywords.includes('ancient') || keywords.includes('old')) return 'ancient';
  return 'neutral';
}