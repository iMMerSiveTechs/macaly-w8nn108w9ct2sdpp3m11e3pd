// File Upload Service for Nemurium
// Handles secure file uploads, processing, and storage

import { cacheService } from '../cache/redis'

export interface UploadResult {
  success: boolean
  fileId?: string
  url?: string
  thumbnailUrl?: string
  metadata?: FileMetadata
  error?: string
}

export interface FileMetadata {
  filename: string
  originalName: string
  size: number
  mimeType: string
  dimensions?: {
    width: number
    height: number
  }
  duration?: number // for video/audio files
  checksum: string
  uploadedAt: Date
}

export interface UploadConfig {
  maxFileSize: number
  allowedMimeTypes: string[]
  generateThumbnail: boolean
  processVideo: boolean
  folder?: string
}

export class FileUploadService {
  private static instance: FileUploadService
  
  private defaultConfig: UploadConfig = {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'model/gltf+json',
      'model/gltf-binary',
      'application/pdf'
    ],
    generateThumbnail: true,
    processVideo: false
  }

  private constructor() {}

  static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService()
    }
    return FileUploadService.instance
  }

  async uploadFile(
    file: File | Buffer,
    config: Partial<UploadConfig> = {},
    userId?: string
  ): Promise<UploadResult> {
    
    const uploadConfig = { ...this.defaultConfig, ...config }
    
    try {
      // Validate file
      const validation = await this.validateFile(file, uploadConfig)
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        }
      }

      // Generate file ID and paths
      const fileId = this.generateFileId()
      const folder = uploadConfig.folder || 'uploads'
      const filename = this.generateFilename(file, fileId)
      
      // Mock file processing (replace with actual cloud storage)
      const uploadPath = await this.processAndStore(file, filename, folder, uploadConfig)
      
      // Generate metadata
      const metadata = await this.generateMetadata(file, filename, uploadPath)
      
      // Store file info in cache/database
      await this.storeFileInfo(fileId, metadata, userId)
      
      return {
        success: true,
        fileId,
        url: uploadPath,
        thumbnailUrl: metadata.mimeType.startsWith('image/') ? uploadPath : undefined,
        metadata
      }
      
    } catch (error) {
      console.error('File upload error:', error)
      return {
        success: false,
        error: 'Upload failed'
      }
    }
  }

  private async validateFile(file: File | Buffer, config: UploadConfig): Promise<{ valid: boolean, error?: string }> {
    let size: number
    let mimeType: string

    if (file instanceof File) {
      size = file.size
      mimeType = file.type
    } else {
      size = file.length
      mimeType = 'application/octet-stream' // Default for Buffer
    }

    // Check file size
    if (size > config.maxFileSize) {
      return {
        valid: false,
        error: `File size ${(size / 1024 / 1024).toFixed(2)}MB exceeds limit of ${(config.maxFileSize / 1024 / 1024).toFixed(2)}MB`
      }
    }

    // Check MIME type
    if (!config.allowedMimeTypes.includes(mimeType) && file instanceof File) {
      return {
        valid: false,
        error: `File type ${mimeType} is not allowed`
      }
    }

    return { valid: true }
  }

  private async processAndStore(
    file: File | Buffer, 
    filename: string, 
    folder: string, 
    config: UploadConfig
  ): Promise<string> {
    // Mock implementation - replace with actual cloud storage (AWS S3, Cloudinary, etc.)
    const mockUrl = `https://cdn.nemurium.com/${folder}/${filename}`
    
    console.log('Processing file:', {
      filename,
      folder,
      size: file instanceof File ? file.size : file.length,
      generateThumbnail: config.generateThumbnail
    })

    // Simulate file processing delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return mockUrl
  }

  private async generateMetadata(file: File | Buffer, filename: string, url: string): Promise<FileMetadata> {
    const metadata: FileMetadata = {
      filename,
      originalName: file instanceof File ? file.name : filename,
      size: file instanceof File ? file.size : file.length,
      mimeType: file instanceof File ? file.type : 'application/octet-stream',
      checksum: this.generateChecksum(file),
      uploadedAt: new Date()
    }

    // Add dimensions for images (mock)
    if (metadata.mimeType.startsWith('image/')) {
      metadata.dimensions = {
        width: 1920,
        height: 1080
      }
    }

    // Add duration for videos/audio (mock)
    if (metadata.mimeType.startsWith('video/') || metadata.mimeType.startsWith('audio/')) {
      metadata.duration = 120 // seconds
    }

    return metadata
  }

  private async storeFileInfo(fileId: string, metadata: FileMetadata, userId?: string): Promise<void> {
    const fileInfo = {
      id: fileId,
      ...metadata,
      userId,
      createdAt: new Date()
    }

    // Store in cache for quick access
    await cacheService.setJson(`file_${fileId}`, fileInfo, 86400) // 24 hours

    // In production, also store in database
    console.log('Storing file info:', fileInfo)
  }

  async getFileInfo(fileId: string): Promise<FileMetadata | null> {
    return await cacheService.getJson<FileMetadata>(`file_${fileId}`)
  }

  async deleteFile(fileId: string, userId?: string): Promise<boolean> {
    try {
      const fileInfo = await this.getFileInfo(fileId)
      if (!fileInfo) {
        return false
      }

      // Check ownership if userId provided
      if (userId) {
        const storedInfo = await cacheService.getJson<any>(`file_${fileId}`)
        if (storedInfo?.userId !== userId) {
          throw new Error('Unauthorized file deletion')
        }
      }

      // Delete from storage (mock)
      console.log('Deleting file:', fileId)

      // Remove from cache
      await cacheService.del(`file_${fileId}`)

      return true
    } catch (error) {
      console.error('File deletion error:', error)
      return false
    }
  }

  async getUserFiles(userId: string, limit = 20): Promise<FileMetadata[]> {
    // Mock implementation - in production, query database
    const mockFiles: FileMetadata[] = [
      {
        filename: 'world_001.jpg',
        originalName: 'My VR World.jpg',
        size: 2048000,
        mimeType: 'image/jpeg',
        dimensions: { width: 1920, height: 1080 },
        checksum: 'abc123',
        uploadedAt: new Date()
      },
      {
        filename: 'audio_track.mp3',
        originalName: 'Ambient Music.mp3',
        size: 5120000,
        mimeType: 'audio/mp3',
        duration: 180,
        checksum: 'def456',
        uploadedAt: new Date()
      }
    ]

    return mockFiles.slice(0, limit)
  }

  private generateFileId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateFilename(file: File | Buffer, fileId: string): string {
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substr(2, 9)
    
    if (file instanceof File) {
      const ext = file.name.split('.').pop() || 'bin'
      return `${timestamp}_${randomStr}.${ext}`
    }
    
    return `${timestamp}_${randomStr}.bin`
  }

  private generateChecksum(file: File | Buffer): string {
    // Simple checksum - in production use crypto.createHash
    const content = file instanceof File ? file.name + file.size : file.toString()
    return Buffer.from(content).toString('base64').slice(0, 16)
  }

  // Get upload config based on user subscription tier
  getUploadConfigForTier(tier: string): UploadConfig {
    const configs: Record<string, UploadConfig> = {
      'FREE': {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png'],
        generateThumbnail: true,
        processVideo: false
      },
      'SUPPORTER': {
        maxFileSize: 25 * 1024 * 1024, // 25MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'audio/mp3', 'audio/wav'],
        generateThumbnail: true,
        processVideo: false
      },
      'FOUNDING_CREATOR': {
        maxFileSize: 100 * 1024 * 1024, // 100MB
        allowedMimeTypes: [
          'image/jpeg', 'image/png', 'image/gif',
          'audio/mp3', 'audio/wav', 'audio/ogg',
          'video/mp4', 'video/webm'
        ],
        generateThumbnail: true,
        processVideo: true
      },
      'INNER_CIRCLE': {
        maxFileSize: 500 * 1024 * 1024, // 500MB
        allowedMimeTypes: [
          'image/jpeg', 'image/png', 'image/gif', 'image/webp',
          'audio/mp3', 'audio/wav', 'audio/ogg',
          'video/mp4', 'video/webm',
          'model/gltf+json', 'model/gltf-binary',
          'application/pdf'
        ],
        generateThumbnail: true,
        processVideo: true
      }
    }

    return configs[tier] || configs['FREE']
  }
}

// Export singleton instance
export const fileUploadService = FileUploadService.getInstance()