// Smart Upload Utilities for Nemurium Platform

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  metadata?: {
    size: number;
    type: string;
    duration?: number;
    dimensions?: { width: number; height: number };
  };
}

export const SUPPORTED_FORMATS = {
  models: ['.glb', '.gltf', '.obj', '.fbx', '.usdz'],
  images: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  video: ['.mp4', '.mov', '.webm', '.avi'],
  archives: ['.zip', '.rar', '.7z']
};

export const MAX_FILE_SIZES = {
  models: 50 * 1024 * 1024, // 50MB
  images: 10 * 1024 * 1024, // 10MB
  audio: 25 * 1024 * 1024,  // 25MB
  video: 100 * 1024 * 1024, // 100MB
  archives: 75 * 1024 * 1024 // 75MB
};

export function getFileCategory(fileName: string): string {
  const ext = '.' + fileName.split('.').pop()?.toLowerCase();
  
  if (SUPPORTED_FORMATS.models.includes(ext)) return 'models';
  if (SUPPORTED_FORMATS.images.includes(ext)) return 'images';
  if (SUPPORTED_FORMATS.audio.includes(ext)) return 'audio';
  if (SUPPORTED_FORMATS.video.includes(ext)) return 'video';
  if (SUPPORTED_FORMATS.archives.includes(ext)) return 'archives';
  
  return 'unknown';
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  const category = getFileCategory(file.name);
  
  if (category === 'unknown') {
    return { valid: false, error: 'Unsupported file format' };
  }
  
  const maxSize = MAX_FILE_SIZES[category as keyof typeof MAX_FILE_SIZES];
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File too large. Maximum size for ${category}: ${(maxSize / 1024 / 1024).toFixed(1)}MB` 
    };
  }
  
  return { valid: true };
}

export async function uploadAsset(file: File): Promise<UploadResult> {
  try {
    console.log(`🚀 Starting upload for ${file.name}`);
    
    // Validate file first
    const validation = validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', getFileCategory(file.name));
    formData.append('timestamp', new Date().toISOString());
    
    const response = await fetch('/api/upload-asset', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log(`✅ Upload completed for ${file.name}`);
    
    return {
      success: true,
      url: result.url,
      metadata: {
        size: file.size,
        type: file.type,
      }
    };
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(fileName: string): string {
  const category = getFileCategory(fileName);
  
  const icons = {
    models: '🎯',
    images: '🖼️',
    audio: '🎵',
    video: '🎬',
    archives: '📦',
    unknown: '📄'
  };
  
  return icons[category as keyof typeof icons] || icons.unknown;
}

// Content moderation utilities
export async function scanContentForFlags(text: string): Promise<boolean> {
  const bannedTerms = [
    'nsfw', 'nudity', 'explicit', 'adult', 'porn', 'sex',
    'violence', 'gore', 'blood', 'death', 'kill',
    'hate', 'racist', 'nazi', 'terrorist'
  ];
  
  const lowerText = text.toLowerCase();
  return bannedTerms.some(term => lowerText.includes(term));
}

export function generateUploadId(): string {
  return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}