'use client';
import { useState, useEffect } from 'react';
import { Search, Upload, Play, Trash2, Edit, Copy, Share } from 'lucide-react';

interface WorldTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  thumbnail: string;
  downloadCount: number;
  rating: number;
  premium: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  objects: any[];
  lighting: string;
  mood: string;
}

export default function TemplateLibraryPage() {
  const [templates, setTemplates] = useState<WorldTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Templates', icon: '🌟' },
    { id: 'environments', name: 'Environments', icon: '🏔️' },
    { id: 'games', name: 'Game Templates', icon: '🎮' },
    { id: 'social', name: 'Social Spaces', icon: '👥' },
    { id: 'educational', name: 'Educational', icon: '🎓' },
    { id: 'art', name: 'Art Galleries', icon: '🎨' },
    { id: 'events', name: 'Event Spaces', icon: '🎪' },
    { id: 'meditation', name: 'Wellness', icon: '🧘' }
  ];

  useEffect(() => {
    // Mock template data
    const mockTemplates: WorldTemplate[] = [
      {
        id: '1',
        name: 'Cyberpunk Neon District',
        description: 'A dark futuristic cityscape with neon lights, rain effects, and flying cars.',
        category: 'environments',
        creator: 'CyberArtist',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 2450,
        rating: 4.8,
        premium: false,
        difficulty: 'Intermediate',
        tags: ['cyberpunk', 'neon', 'rain', 'futuristic'],
        objects: [],
        lighting: 'night',
        mood: 'atmospheric'
      },
      {
        id: '2',
        name: 'Enchanted Forest Sanctuary',
        description: 'Magical forest with glowing trees, mystical creatures, and hidden portals.',
        category: 'environments',
        creator: 'MysticBuilder',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 1890,
        rating: 4.9,
        premium: true,
        difficulty: 'Beginner',
        tags: ['fantasy', 'forest', 'magic', 'peaceful'],
        objects: [],
        lighting: 'daylight',
        mood: 'mystical'
      },
      {
        id: '3',
        name: 'Battle Royale Arena',
        description: 'Competitive arena with weapon spawns, cover points, and dynamic weather.',
        category: 'games',
        creator: 'GameMaster',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 3200,
        rating: 4.7,
        premium: false,
        difficulty: 'Advanced',
        tags: ['battle', 'competitive', 'weapons', 'pvp'],
        objects: [],
        lighting: 'dynamic',
        mood: 'intense'
      },
      {
        id: '4',
        name: 'Virtual Conference Hall',
        description: 'Professional meeting space with presentation screens and networking areas.',
        category: 'social',
        creator: 'ProfessionalBuilder',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 890,
        rating: 4.5,
        premium: true,
        difficulty: 'Beginner',
        tags: ['business', 'meeting', 'professional', 'presentation'],
        objects: [],
        lighting: 'bright',
        mood: 'professional'
      },
      {
        id: '5',
        name: 'Physics Laboratory',
        description: 'Interactive science lab with experiments, equipment, and educational content.',
        category: 'educational',
        creator: 'ScienceTeacher',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 1200,
        rating: 4.6,
        premium: false,
        difficulty: 'Intermediate',
        tags: ['science', 'physics', 'education', 'interactive'],
        objects: [],
        lighting: 'laboratory',
        mood: 'educational'
      },
      {
        id: '6',
        name: 'Zen Garden Meditation',
        description: 'Peaceful Japanese garden with flowing water, cherry blossoms, and meditation spots.',
        category: 'meditation',
        creator: 'ZenMaster',
        thumbnail: '/api/placeholder/400/300',
        downloadCount: 1650,
        rating: 4.9,
        premium: false,
        difficulty: 'Beginner',
        tags: ['zen', 'meditation', 'peaceful', 'japanese'],
        objects: [],
        lighting: 'soft',
        mood: 'peaceful'
      }
    ];
    
    setTemplates(mockTemplates);
    setLoading(false);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const loadTemplate = (template: WorldTemplate) => {
    // Store template data and redirect to world builder
    localStorage.setItem('loadedTemplate', JSON.stringify(template));
    window.location.href = `/world-builder?template=${template.id}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl">Loading Templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-blue-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                📋 World Templates
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
                <Upload className="h-4 w-4" />
                Upload Template
              </button>
              <button 
                onClick={() => window.location.href = '/world-builder'}
                className="flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
              >
                <Play className="h-4 w-4" />
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-lg font-bold mb-4">📂 Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600/50 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-lg font-bold mb-4">📊 Library Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Templates</span>
                  <span className="text-blue-400 font-bold">{templates.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Free Templates</span>
                  <span className="text-green-400 font-bold">{templates.filter(t => !t.premium).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Premium Templates</span>
                  <span className="text-purple-400 font-bold">{templates.filter(t => t.premium).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Downloads</span>
                  <span className="text-yellow-400 font-bold">{templates.reduce((sum, t) => sum + t.downloadCount, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedCategory === 'all' ? 'All Templates' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-400">{filteredTemplates.length} templates found</p>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition group"
                >
                  {/* Template Preview */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-4xl opacity-50">
                        {template.category === 'environments' && '🏔️'}
                        {template.category === 'games' && '🎮'}
                        {template.category === 'social' && '👥'}
                        {template.category === 'educational' && '🎓'}
                        {template.category === 'art' && '🎨'}
                        {template.category === 'events' && '🎪'}
                        {template.category === 'meditation' && '🧘'}
                      </div>
                    </div>
                    
                    {template.premium && (
                      <div className="absolute top-2 right-2 bg-purple-500/90 text-white text-xs px-2 py-1 rounded">
                        PREMIUM
                      </div>
                    )}
                    
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        onClick={() => loadTemplate(template)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                      >
                        Load Template
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-blue-400 transition line-clamp-1">
                        {template.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>by {template.creator}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>↓</span>
                          <span>{template.downloadCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/10 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No Templates Found</h3>
                <p className="text-gray-400">Try adjusting your search or browse different categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}