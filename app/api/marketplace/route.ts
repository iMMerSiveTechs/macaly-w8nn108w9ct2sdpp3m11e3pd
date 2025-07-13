import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'trending';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    console.log('Marketplace request:', { category, search, sort, page, limit });
    
    const products = await getMarketplaceProducts({ category, search, sort, page, limit });
    
    return NextResponse.json({
      success: true,
      products: products.items,
      pagination: {
        page,
        limit,
        total: products.total,
        totalPages: Math.ceil(products.total / limit)
      },
      filters: {
        category,
        search,
        sort
      }
    });
    
  } catch (error) {
    console.error('Marketplace error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch marketplace data' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    
    console.log('Marketplace action:', action, data);
    
    switch (action) {
      case 'purchase':
        return await processPurchase(data);
      case 'list':
        return await listProduct(data);
      case 'review':
        return await addReview(data);
      case 'favorite':
        return await toggleFavorite(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Marketplace action error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function getMarketplaceProducts(filters: any) {
  // Simulate database query
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const allProducts = [
    {
      id: 'prod_1',
      name: 'Cyberpunk City Complete Pack',
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
      tags: ['cyberpunk', 'city', 'neon', 'complete'],
      files: [
        { name: 'city_main.nrm', size: '45.2 MB', type: 'World File' },
        { name: 'textures.zip', size: '128.7 MB', type: 'Texture Pack' },
        { name: 'audio.zip', size: '67.3 MB', type: 'Audio Assets' }
      ],
      requirements: {
        tier: 'silver',
        vram: '4GB',
        storage: '250MB'
      },
      lastUpdated: '2024-01-15',
      compatibility: ['WebXR', 'VisionOS', 'Desktop']
    },
    {
      id: 'prod_2',
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
      tags: ['fantasy', 'forest', 'magic', 'nature'],
      files: [
        { name: 'forest_assets.zip', size: '89.4 MB', type: 'Asset Pack' },
        { name: 'materials.json', size: '2.1 MB', type: 'Material Definitions' }
      ],
      requirements: {
        tier: 'bronze',
        vram: '2GB',
        storage: '100MB'
      },
      lastUpdated: '2024-01-12',
      compatibility: ['WebXR', 'Desktop']
    },
    {
      id: 'prod_3',
      name: 'VR Event Space Template',
      creator: 'EventMaster',
      price: 199.99,
      category: 'templates',
      rating: 4.7,
      reviews: 89,
      sales: 234,
      featured: false,
      premium: true,
      thumbnail: '/api/placeholder/300/200',
      description: 'Professional VR event space template with customizable branding and layouts.',
      tags: ['events', 'professional', 'customizable', 'vr'],
      files: [
        { name: 'event_template.nrm', size: '67.8 MB', type: 'World Template' },
        { name: 'branding_kit.zip', size: '23.4 MB', type: 'Customization Pack' }
      ],
      requirements: {
        tier: 'gold',
        vram: '6GB',
        storage: '150MB'
      },
      lastUpdated: '2024-01-10',
      compatibility: ['WebXR', 'VisionOS', 'Desktop', 'Mobile']
    },
    {
      id: 'prod_4',
      name: 'Ambient Space Audio Pack',
      creator: 'CosmicSounds',
      price: 12.99,
      category: 'audio',
      rating: 4.6,
      reviews: 67,
      sales: 456,
      featured: false,
      premium: false,
      thumbnail: '/api/placeholder/300/200',
      description: 'High-quality ambient space sounds and musical loops for immersive experiences.',
      tags: ['ambient', 'space', 'music', 'loops'],
      files: [
        { name: 'space_ambient.zip', size: '156.2 MB', type: 'Audio Pack' },
        { name: 'loop_config.json', size: '0.8 MB', type: 'Configuration' }
      ],
      requirements: {
        tier: 'bronze',
        vram: '1GB',
        storage: '200MB'
      },
      lastUpdated: '2024-01-08',
      compatibility: ['All Platforms']
    },
    {
      id: 'prod_5',
      name: 'Golden Dragon NFT Avatar',
      creator: 'DragonForge',
      price: 299.99,
      category: 'avatars',
      rating: 5.0,
      reviews: 23,
      sales: 45,
      featured: true,
      premium: true,
      nft: true,
      thumbnail: '/api/placeholder/300/200',
      description: 'Limited edition animated golden dragon avatar with blockchain ownership certificate.',
      tags: ['nft', 'dragon', 'limited', 'animated'],
      files: [
        { name: 'dragon_avatar.vrm', size: '34.7 MB', type: 'VRM Avatar' },
        { name: 'animations.zip', size: '45.3 MB', type: 'Animation Pack' }
      ],
      requirements: {
        tier: 'master',
        vram: '8GB',
        storage: '100MB'
      },
      lastUpdated: '2024-01-14',
      compatibility: ['WebXR', 'VisionOS'],
      blockchain: {
        contract: '0x1234...5678',
        tokenId: 42,
        network: 'Ethereum'
      }
    },
    {
      id: 'prod_6',
      name: 'Physics Playground Kit',
      creator: 'PhysicsLab',
      price: 79.99,
      category: 'tools',
      rating: 4.8,
      reviews: 178,
      sales: 667,
      featured: false,
      premium: true,
      thumbnail: '/api/placeholder/300/200',
      description: 'Advanced physics simulation tools with interactive experiments and educational content.',
      tags: ['physics', 'education', 'simulation', 'interactive'],
      files: [
        { name: 'physics_kit.zip', size: '234.5 MB', type: 'Tool Package' },
        { name: 'documentation.pdf', size: '12.3 MB', type: 'User Guide' }
      ],
      requirements: {
        tier: 'gold',
        vram: '4GB',
        storage: '300MB'
      },
      lastUpdated: '2024-01-11',
      compatibility: ['WebXR', 'Desktop']
    }
  ];
  
  // Apply filters
  let filteredProducts = allProducts;
  
  if (filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply sorting
  switch (filters.sort) {
    case 'trending':
      filteredProducts.sort((a, b) => b.sales - a.sales);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      break;
  }
  
  // Apply pagination
  const startIndex = (filters.page - 1) * filters.limit;
  const endIndex = startIndex + filters.limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    items: paginatedProducts,
    total: filteredProducts.length
  };
}

async function processPurchase(data: any) {
  const { productId, userId, paymentMethod } = data;
  
  // Simulate payment processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const transactionId = `txn_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    transaction: {
      id: transactionId,
      productId,
      userId,
      amount: 49.99, // This would be looked up from the product
      currency: 'USD',
      status: 'completed',
      paymentMethod,
      timestamp: new Date().toISOString(),
      downloadUrl: `/api/download/${productId}`,
      license: {
        type: 'standard',
        allowCommercialUse: false,
        allowModification: true,
        allowRedistribution: false
      }
    },
    message: 'Purchase completed successfully'
  });
}

async function listProduct(data: any) {
  const { 
    name, 
    description, 
    price, 
    category, 
    tags, 
    files, 
    creatorId 
  } = data;
  
  // Simulate product listing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const productId = `prod_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    product: {
      id: productId,
      name,
      description,
      price,
      category,
      tags,
      files,
      creator: creatorId,
      status: 'pending_review',
      listed: new Date().toISOString(),
      sales: 0,
      rating: 0,
      reviews: 0
    },
    message: 'Product submitted for review'
  });
}

async function addReview(data: any) {
  const { productId, userId, rating, comment } = data;
  
  // Simulate review submission
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const reviewId = `review_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    review: {
      id: reviewId,
      productId,
      userId,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      helpful: 0,
      verified: false // Would be true if user actually purchased
    },
    message: 'Review submitted successfully'
  });
}

async function toggleFavorite(data: any) {
  const { productId, userId } = data;
  
  // Simulate favorite toggle
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const isFavorited = Math.random() > 0.5; // Random for demo
  
  return NextResponse.json({
    success: true,
    favorited: isFavorited,
    message: isFavorited ? 'Added to favorites' : 'Removed from favorites'
  });
}