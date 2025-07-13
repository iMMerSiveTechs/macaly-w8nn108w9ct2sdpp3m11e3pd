'use client';
import { useState } from 'react';
import { 
  Hammer, 
  Save, 
  Share, 
  Brain, 
  Package, 
  Play, 
  Palette, 
  Settings, 
  Upload,
  Eye,
  Users,
  Zap,
  Globe,
  Layers,
  Camera,
  Music,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { notifications } from '@/utils/notifications';

interface BuilderSidebarProps {
  onSpawnObject?: () => void;
  onSaveRealm?: () => void;
  onPublishShare?: () => void;
  onLaunchCopilot?: () => void;
  onOpenAssetLibrary?: () => void;
  onPreviewMode?: () => void;
  onCollabMode?: () => void;
  onUploadAsset?: () => void;
}

export default function BuilderSidebar({
  onSpawnObject,
  onSaveRealm,
  onPublishShare,
  onLaunchCopilot,
  onOpenAssetLibrary,
  onPreviewMode,
  onCollabMode,
  onUploadAsset
}: BuilderSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('build');
  const [showLightingModal, setShowLightingModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showSoundModal, setShowSoundModal] = useState(false);
  const [lightingSettings, setLightingSettings] = useState({
    ambient: 0.5,
    directional: 0.8,
    shadows: 0.7,
    timeOfDay: 'day'
  });
  const [soundSettings, setSoundSettings] = useState({
    ambient: 0.3,
    effects: 0.7,
    music: 0.5,
    zone: 'forest'
  });

  const categories = {
    build: {
      name: 'Build',
      icon: Hammer,
      tools: [
        { name: 'Spawn Object', icon: Package, action: onSpawnObject, color: 'bg-blue-500 hover:bg-blue-600' },
        { name: 'AI Copilot', icon: Brain, action: onLaunchCopilot, color: 'bg-purple-500 hover:bg-purple-600' },
        { name: 'Asset Library', icon: Globe, action: onOpenAssetLibrary, color: 'bg-emerald-500 hover:bg-emerald-600' },
        { name: 'Upload Asset', icon: Upload, action: onUploadAsset, color: 'bg-orange-500 hover:bg-orange-600' }
      ]
    },
    design: {
      name: 'Design',
      icon: Palette,
      tools: [
        { name: 'Themes', icon: Sparkles, action: () => alert('Theme selector'), color: 'bg-pink-500 hover:bg-pink-600' },
        { name: 'Lighting', icon: Zap, action: () => setShowLightingModal(true), color: 'bg-yellow-500 hover:bg-yellow-600' },
        { name: 'Materials', icon: Layers, action: () => setShowMaterialModal(true), color: 'bg-indigo-500 hover:bg-indigo-600' },
        { name: 'Audio Zones', icon: Music, action: () => setShowSoundModal(true), color: 'bg-green-500 hover:bg-green-600' }
      ]
    },
    share: {
      name: 'Share',
      icon: Share,
      tools: [
        { name: 'Save Realm', icon: Save, action: onSaveRealm, color: 'bg-blue-600 hover:bg-blue-700' },
        { name: 'Publish', icon: Share, action: onPublishShare, color: 'bg-green-600 hover:bg-green-700' },
        { name: 'Preview', icon: Eye, action: onPreviewMode, color: 'bg-purple-600 hover:bg-purple-700' },
        { name: 'Collaborate', icon: Users, action: onCollabMode, color: 'bg-orange-600 hover:bg-orange-700' }
      ]
    },
    test: {
      name: 'Test',
      icon: Play,
      tools: [
        { name: 'Play Mode', icon: Play, action: () => alert('Entering play mode...'), color: 'bg-green-500 hover:bg-green-600' },
        { name: 'VR Preview', icon: Camera, action: () => alert('VR preview loading...'), color: 'bg-blue-500 hover:bg-blue-600' },
        { name: 'Performance', icon: Settings, action: () => alert('Performance metrics'), color: 'bg-gray-500 hover:bg-gray-600' }
      ]
    }
  };

  const currentCategory = categories[activeCategory as keyof typeof categories];

  return (
    <>
      <div className={`fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-md text-white border-r border-gray-700 z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Builder Tools
              </h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="p-2 border-b border-gray-700">
          <div className={`grid ${isCollapsed ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`p-2 rounded-lg transition-all ${
                    activeCategory === key 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  } ${isCollapsed ? 'justify-center' : 'justify-start'} flex items-center gap-2`}
                  title={isCollapsed ? category.name : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && <span className="text-sm">{category.name}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {currentCategory.name} Tools
            </h3>
          )}
          
          <div className="space-y-2">
            {currentCategory.tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <button
                  key={index}
                  onClick={tool.action}
                  className={`w-full p-3 rounded-lg ${tool.color} ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  } flex items-center gap-3`}
                  title={isCollapsed ? tool.name : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <span className="font-medium">{tool.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions (Always Visible) */}
        <div className="p-4 border-t border-gray-700">
          {!isCollapsed && (
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Quick Actions
            </h4>
          )}
          
          <div className={`${isCollapsed ? 'space-y-2' : 'grid grid-cols-2 gap-2'}`}>
            <button
              onClick={onSaveRealm}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center"
              title={isCollapsed ? 'Save' : undefined}
            >
              <Save className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2 text-sm">Save</span>}
            </button>
            
            <button
              onClick={onPreviewMode}
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
              title={isCollapsed ? 'Preview' : undefined}
            >
              <Eye className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2 text-sm">Preview</span>}
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Realm Builder Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Lighting Modal */}
      {showLightingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-xl w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Lighting Controls
              </h3>
              <button
                onClick={() => setShowLightingModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ambient Light</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lightingSettings.ambient}
                  onChange={(e) => setLightingSettings({...lightingSettings, ambient: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{lightingSettings.ambient}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Directional Light</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={lightingSettings.directional}
                  onChange={(e) => setLightingSettings({...lightingSettings, directional: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{lightingSettings.directional}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Shadow Intensity</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={lightingSettings.shadows}
                  onChange={(e) => setLightingSettings({...lightingSettings, shadows: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{lightingSettings.shadows}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Time of Day</label>
                <select
                  value={lightingSettings.timeOfDay}
                  onChange={(e) => setLightingSettings({...lightingSettings, timeOfDay: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                >
                  <option value="dawn">Dawn</option>
                  <option value="day">Day</option>
                  <option value="dusk">Dusk</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLightingModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Applied lighting settings:', lightingSettings);
                  notifications.lightingApplied();
                  setShowLightingModal(false);
                }}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-xl w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Layers className="h-6 w-6 text-indigo-400" />
                Material Editor
              </h3>
              <button
                onClick={() => setShowMaterialModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {['Metal', 'Wood', 'Stone', 'Glass', 'Fabric', 'Plastic'].map((material) => (
                  <button
                    key={material}
                    className="p-3 bg-gray-700 hover:bg-indigo-600 rounded text-center transition-colors"
                  >
                    {material}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Roughness</label>
                <input type="range" min="0" max="1" step="0.1" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Metallic</label>
                <input type="range" min="0" max="1" step="0.1" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Emission</label>
                <input type="range" min="0" max="1" step="0.1" className="w-full" />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowMaterialModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Applied material settings');
                  notifications.materialApplied();
                  setShowMaterialModal(false);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sound Modal */}
      {showSoundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-xl w-96 max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Music className="h-6 w-6 text-green-400" />
                Audio Zones
              </h3>
              <button
                onClick={() => setShowSoundModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ambient Sounds</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={soundSettings.ambient}
                  onChange={(e) => setSoundSettings({...soundSettings, ambient: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{soundSettings.ambient}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Sound Effects</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={soundSettings.effects}
                  onChange={(e) => setSoundSettings({...soundSettings, effects: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{soundSettings.effects}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Background Music</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={soundSettings.music}
                  onChange={(e) => setSoundSettings({...soundSettings, music: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{soundSettings.music}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Ambient Zone</label>
                <select
                  value={soundSettings.zone}
                  onChange={(e) => setSoundSettings({...soundSettings, zone: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                >
                  <option value="forest">Forest</option>
                  <option value="ocean">Ocean</option>
                  <option value="city">City</option>
                  <option value="space">Space</option>
                  <option value="cave">Cave</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSoundModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Applied sound settings:', soundSettings);
                  notifications.soundApplied();
                  setShowSoundModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}