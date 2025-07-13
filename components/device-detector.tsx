'use client';
import { useEffect, useState } from 'react';

interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: 'iOS' | 'Android' | 'Windows' | 'macOS' | 'Linux' | 'Unknown';
  isVisionOS: boolean;
  supportsAR: boolean;
}

export default function DeviceDetector({ onDeviceDetected }: { onDeviceDetected?: (info: DeviceInfo) => void }) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const detectDevice = () => {
      const ua = navigator.userAgent;
      
      // Device type detection
      let type: DeviceInfo['type'] = 'desktop';
      if (/iPad/.test(ua)) type = 'tablet';
      else if (/iPhone|iPod|Android.*Mobile/.test(ua)) type = 'mobile';
      else if (/Android/.test(ua)) type = 'tablet';

      // OS detection
      let os: DeviceInfo['os'] = 'Unknown';
      if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
      else if (/Android/.test(ua)) os = 'Android';
      else if (/Windows/.test(ua)) os = 'Windows';
      else if (/Macintosh/.test(ua)) os = 'macOS';
      else if (/Linux/.test(ua)) os = 'Linux';

      // VisionOS detection
      const isVisionOS = /AppleVision|VisionOS|XROS/.test(ua);

      // AR support detection
      const supportsAR = !!(navigator as any).xr || isVisionOS || (type === 'mobile' && (os === 'iOS' || os === 'Android'));

      const info: DeviceInfo = { type, os, isVisionOS, supportsAR };
      
      setDeviceInfo(info);
      onDeviceDetected?.(info);
      
      console.log('🖥️ Device detected:', info);
    };

    detectDevice();
  }, [onDeviceDetected]);

  if (!deviceInfo) return null;

  return (
    <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg z-40">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${deviceInfo.supportsAR ? 'bg-green-400' : 'bg-gray-400'}`}></span>
        <span>{deviceInfo.type} • {deviceInfo.os}</span>
        {deviceInfo.isVisionOS && <span className="text-purple-400">• VisionOS</span>}
        {deviceInfo.supportsAR && <span className="text-green-400">• AR Ready</span>}
      </div>
    </div>
  );
}