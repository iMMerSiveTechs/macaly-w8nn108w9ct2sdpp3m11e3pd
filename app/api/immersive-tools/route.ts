import { NextResponse } from "next/server";

const immersiveTools = [
  { id: "ai-worlds", slug: "ai-worlds", name: "AI World Generator", category: "AI", status: "active" },
  { id: "prefab-upload", slug: "prefab-upload", name: "Prefab Uploader", category: "Assets", status: "active" },
  { id: "voice-gen", slug: "voice-gen", name: "VoiceType Integration", category: "Audio", status: "active" },
  { id: "avatar-fusion", slug: "avatar-fusion", name: "Avatar Fusion", category: "Characters", status: "beta" },
  { id: "video-gen", slug: "video-gen", name: "VR Video Creator", category: "Video", status: "active" },
  { id: "object-sculpt", slug: "object-sculpt", name: "3D Object Sculptor", category: "Modeling", status: "active" },
  { id: "story-realm", slug: "story-realm", name: "Story to World Tool", category: "AI", status: "beta" },
  { id: "sonarium-uplink", slug: "sonarium-uplink", name: "Sonarium Audio Uplink", category: "Audio", status: "active" },
  { id: "visionos-launch", slug: "visionos-launch", name: "VisionOS Portal Builder", category: "XR", status: "active" },
  { id: "realm-portal", slug: "realm-portal", name: "Realm Portal Linker", category: "Navigation", status: "active" },
  { id: "spatial-audio", slug: "spatial-audio", name: "Spatial Audio Engine", category: "Audio", status: "active" },
  { id: "object-scanner", slug: "object-scanner", name: "Object-to-3D Scanner", category: "AI", status: "beta" },
  { id: "controller-map", slug: "controller-map", name: "Controller Mapping", category: "Input", status: "active" },
  { id: "nft-creator", slug: "nft-creator", name: "NFT Pass Creator", category: "Blockchain", status: "active" },
  { id: "legal-vault", slug: "legal-vault", name: "Legal Content Scanner", category: "Security", status: "active" },
];

export async function GET() {
  try {
    console.log("📊 Fetching immersive tools list");
    
    return NextResponse.json({
      success: true,
      tools: immersiveTools,
      total: immersiveTools.length,
      categories: Array.from(new Set(immersiveTools.map(tool => tool.category))),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Error fetching immersive tools:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch immersive tools",
        tools: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { toolId, action } = await request.json();
    
    console.log(`🔧 Tool action: ${action} on ${toolId}`);
    
    // Mock tool activation/deactivation
    const tool = immersiveTools.find(t => t.id === toolId);
    if (!tool) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 }
      );
    }
    
    // In production, this would update the tool status in database
    const result = {
      success: true,
      tool: tool.name,
      action,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error processing tool action:", error);
    
    return NextResponse.json(
      { success: false, error: "Failed to process tool action" },
      { status: 500 }
    );
  }
}