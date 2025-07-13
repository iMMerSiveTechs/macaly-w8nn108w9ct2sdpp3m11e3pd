'use client';
import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Filter, TrendingUp, Crown, Zap, Gift } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  creator: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  sales: number;
  featured: boolean;
  premium: boolean;
  discount?: number;
  thumbnail: string;
  description: string;
  tags: string[];
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  totalSales: number;
  rating: number;
  products: number;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<Creator[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌟' },
    { id: 'worlds', name: 'Complete Worlds', icon: '🌍' },
    { id: 'assets', name: '3D Assets', icon: '🧱' },
    { id: 'templates', name: 'Templates', icon: '📋' },
    { id: 'sounds', name: 'Audio Packs', icon: '🎵' },
    { id: 'tools', name: 'Creator Tools', icon: '🛠️' },
    { id: 'nfts', name: 'Limited Edition', icon: '💎' }
  ];

  // Mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Cyberpunk City Pack',
        creator: 'NeonMaster',
        price: 49.99,
        originalPrice: 79.99,
        category: 'worlds',
        rating: 4.9,
        reviews: 234,
        sales: 1520,
        featured: true,
        premium: true,
        discount: 38,
        thumbnail: '/api/placeholder/300/200',
        description: 'Complete cyberpunk city with 50+ buildings, neon effects, and atmospheric audio.',
        tags: ['cyberpunk', 'city', 'neon', 'complete']
      },
      {
        id: '2',
        name: 'Mystical Forest Collection',
        creator: 'ForestWhisper',
        price: 24.99,
        category: 'assets',
        rating: 4.8,
        reviews: 156,
        sales: 890,
        featured: true,
        premium: false,
        thumbnail: '/api/placeholder/300/200',
        description: 'Enchanted forest assets including magical trees, glowing mushrooms, and fairy lights.',
        tags: ['forest', 'nature', 'magical', 'trees']
      },
      {
        id: '3',
        name: 'VR Event Template',
        creator: 'EventPro',
        price: 199.99,
        category: 'templates',
        rating: 4.7,
        reviews: 89,
        sales: 234,
        featured: false,
        premium: true,
        thumbnail: '/api/placeholder/300/200',
        description: 'Professional VR event space template with customizable branding and layouts.',
        tags: ['events', 'professional', 'customizable', 'vr']
      },
      {
        id: '4',
        name: 'Ambient Space Sounds',
        creator: 'CosmicAudio',
        price: 12.99,
        category: 'sounds',
        rating: 4.6,
        reviews: 67,
        sales: 456,
        featured: false,
        premium: false,
        thumbnail: '/api/placeholder/300/200',
        description: 'High-quality ambient space sounds and musical loops for immersive experiences.',
        tags: ['ambient', 'space', 'music', 'loops']
      },
      {
        id: '5',
        name: 'Golden Dragon NFT',
        creator: 'DragonForge',
        price: 299.99,
        category: 'nfts',
        rating: 5.0,
        reviews: 23,
        sales: 45,
        featured: true,
        premium: true,
        thumbnail: '/api/placeholder/300/200',
        description: 'Limited edition animated golden dragon with blockchain ownership certificate.',
        tags: ['nft', 'dragon', 'limited', 'animated']
      },
      {
        id: '6',
        name: 'World Builder Pro Tools',
        creator: 'DevStudio',
        price: 79.99,
        category: 'tools',
        rating: 4.8,
        reviews: 178,
        sales: 667,
        featured: false,
        premium: true,
        thumbnail: '/api/placeholder/300/200',
        description: 'Advanced world building tools with AI assistance and collaboration features.',
        tags: ['tools', 'professional', 'ai', 'collaboration']
      }
    ];

    const mockCreators: Creator[] = [
      {
        id: '1',
        name: 'NeonMaster',
        avatar: '/api/placeholder/60/60',
        verified: true,
        totalSales: 50000,
        rating: 4.9,
        products: 12
      },
      {
        id: '2',
        name: 'ForestWhisper',
        avatar: '/api/placeholder/60/60',
        verified: true,
        totalSales: 25000,
        rating: 4.8,
        products: 8
      },
      {
        id: '3',
        name: 'CosmicAudio',
        avatar: '/api/placeholder/60/60',
        verified: false,
        totalSales: 12000,
        rating: 4.7,
        products: 15
      }
    ];

    setProducts(mockProducts);
    setFeaturedCreators(mockCreators);
  }, []);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.sales - a.sales;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
    // You could also show a toast notification here
  };

  const proceedToCheckout = () => {
    // Implement Stripe checkout
    console.log('Proceeding to checkout with cart:', cart);
    alert('Checkout feature coming soon! This will integrate with Stripe for secure payments.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-red-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-purple-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🛒 Nemurium Marketplace
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={proceedToCheckout}
                  className="flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cart.length})
                </button>
              </div>
              <button className="flex items-center gap-2 bg-pink-600/80 hover:bg-pink-600 px-4 py-2 rounded-lg transition">
                <Crown className="h-4 w-4" />
                Sell Your Creations
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-white/10 p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Discover Amazing Immersive Content</h2>
          <p className="text-gray-300 mb-6">
            Shop worlds, assets, templates, and tools created by our talented community of developers and artists.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span>2,500+ Products</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span>Verified Creators</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Zap className="h-5 w-5 text-blue-400" />
              <span>Instant Download</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-purple-600/50 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-lg font-bold mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500"
              >
                <option value="trending">🔥 Trending</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="newest">🆕 Newest</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
              </select>
            </div>

            {/* Featured Creators */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Featured Creators
              </h3>
              <div className="space-y-3">
                {featuredCreators.map((creator) => (
                  <div key={creator.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {creator.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium truncate">{creator.name}</span>
                        {creator.verified && (
                          <Crown className="h-3 w-3 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {creator.products} products
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-400">{sortedProducts.length} products found</p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition group"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-4xl opacity-50">
                        {product.category === 'worlds' && '🌍'}
                        {product.category === 'assets' && '🧱'}
                        {product.category === 'templates' && '📋'}
                        {product.category === 'sounds' && '🎵'}
                        {product.category === 'tools' && '🛠️'}
                        {product.category === 'nfts' && '💎'}
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      {product.featured && (
                        <span className="bg-yellow-500/90 text-black text-xs px-2 py-1 rounded font-bold">
                          FEATURED
                        </span>
                      )}
                      {product.premium && (
                        <span className="bg-purple-500/90 text-white text-xs px-2 py-1 rounded font-bold">
                          PRO
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded font-bold">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-purple-400 transition line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="text-right">
                        {product.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </div>
                        )}
                        <div className="text-lg font-bold text-white">
                          ${product.price}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">by</span>
                        <span className="text-purple-400 font-medium">{product.creator}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                        <div className="text-green-400">
                          {product.sales} sales
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.tags.slice(0, 3).map((tag) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}