import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    
    console.log('Social action:', action, data);
    
    switch (action) {
      case 'follow':
        return await followUser(data);
      case 'unfollow':
        return await unfollowUser(data);
      case 'like':
        return await likeContent(data);
      case 'comment':
        return await addComment(data);
      case 'share':
        return await shareContent(data);
      case 'join_realm':
        return await joinRealm(data);
      case 'invite':
        return await sendInvite(data);
      case 'message':
        return await sendMessage(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Social action error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process social action' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const userId = searchParams.get('userId');
    const targetId = searchParams.get('targetId');
    
    switch (type) {
      case 'profile':
        return await getUserProfile(userId);
      case 'following':
        return await getFollowing(userId);
      case 'followers':
        return await getFollowers(userId);
      case 'activity':
        return await getActivity(userId);
      case 'feed':
        return await getFeed(userId);
      case 'messages':
        return await getMessages(userId);
      case 'notifications':
        return await getNotifications(userId);
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Social fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social data' },
      { status: 500 }
    );
  }
}

async function followUser(data: any) {
  const { followerId, followeeId } = data;
  
  // Simulate follow action
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return NextResponse.json({
    success: true,
    relationship: {
      followerId,
      followeeId,
      status: 'following',
      timestamp: new Date().toISOString()
    },
    message: 'Now following user'
  });
}

async function unfollowUser(data: any) {
  const { followerId, followeeId } = data;
  
  // Simulate unfollow action
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return NextResponse.json({
    success: true,
    relationship: {
      followerId,
      followeeId,
      status: 'unfollowed',
      timestamp: new Date().toISOString()
    },
    message: 'Unfollowed user'
  });
}

async function likeContent(data: any) {
  const { userId, contentId, contentType } = data;
  
  // Simulate like action
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const isLiked = Math.random() > 0.5; // Random for demo
  
  return NextResponse.json({
    success: true,
    like: {
      userId,
      contentId,
      contentType,
      liked: isLiked,
      timestamp: new Date().toISOString()
    },
    message: isLiked ? 'Content liked' : 'Like removed'
  });
}

async function addComment(data: any) {
  const { userId, contentId, comment, parentId } = data;
  
  // Simulate comment creation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const commentId = `comment_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    comment: {
      id: commentId,
      userId,
      contentId,
      content: comment,
      parentId: parentId || null,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    },
    message: 'Comment added successfully'
  });
}

async function shareContent(data: any) {
  const { userId, contentId, contentType, message, platform } = data;
  
  // Simulate share action
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const shareId = `share_${Date.now()}`;
  const shareUrl = `https://nemurium.com/${contentType}/${contentId}`;
  
  return NextResponse.json({
    success: true,
    share: {
      id: shareId,
      userId,
      contentId,
      contentType,
      message,
      platform,
      shareUrl,
      timestamp: new Date().toISOString()
    },
    message: 'Content shared successfully'
  });
}

async function joinRealm(data: any) {
  const { userId, realmId, role } = data;
  
  // Simulate realm join
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    success: true,
    membership: {
      userId,
      realmId,
      role: role || 'visitor',
      joinedAt: new Date().toISOString(),
      permissions: {
        canEdit: role === 'collaborator' || role === 'admin',
        canInvite: role === 'admin',
        canModerate: role === 'admin'
      }
    },
    message: 'Successfully joined realm'
  });
}

async function sendInvite(data: any) {
  const { senderId, recipientId, realmId, message, role } = data;
  
  // Simulate invite creation
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const inviteId = `invite_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    invite: {
      id: inviteId,
      senderId,
      recipientId,
      realmId,
      message,
      role: role || 'visitor',
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      createdAt: new Date().toISOString()
    },
    message: 'Invitation sent successfully'
  });
}

async function sendMessage(data: any) {
  const { senderId, recipientId, message, type } = data;
  
  // Simulate message sending
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const messageId = `msg_${Date.now()}`;
  
  return NextResponse.json({
    success: true,
    message: {
      id: messageId,
      senderId,
      recipientId,
      content: message,
      type: type || 'text',
      timestamp: new Date().toISOString(),
      read: false
    },
    message: 'Message sent successfully'
  });
}

async function getUserProfile(userId: string | null) {
  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User ID required' },
      { status: 400 }
    );
  }
  
  // Simulate profile fetch
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const profiles = {
    'user_1': {
      id: 'user_1',
      username: 'CrystalMaster',
      displayName: 'Crystal Master',
      avatar: '/api/placeholder/100/100',
      bio: 'Creating mystical realms since 2023. Lover of crystals and magical landscapes.',
      verified: true,
      tier: 'gold',
      stats: {
        worldsCreated: 23,
        followers: 1240,
        following: 89,
        totalViews: 45230,
        totalLikes: 8920
      },
      social: {
        twitter: '@crystalmaster',
        discord: 'CrystalMaster#1234',
        website: 'https://crystalworlds.com'
      },
      achievements: [
        { id: 'first_world', name: 'First Steps', description: 'Created your first world' },
        { id: 'viral_world', name: 'Viral Creator', description: 'World reached 10k+ views' },
        { id: 'community_favorite', name: 'Community Favorite', description: 'Received 100+ likes' }
      ],
      joinedAt: '2023-03-15T10:00:00Z',
      lastActive: '2024-01-16T14:30:00Z'
    },
    'user_2': {
      id: 'user_2',
      username: 'SkyBuilder',
      displayName: 'Sky Builder',
      avatar: '/api/placeholder/100/100',
      bio: 'Architect of floating realms and celestial experiences.',
      verified: false,
      tier: 'silver',
      stats: {
        worldsCreated: 12,
        followers: 456,
        following: 234,
        totalViews: 12450,
        totalLikes: 2340
      },
      social: {
        discord: 'SkyBuilder#5678'
      },
      achievements: [
        { id: 'first_world', name: 'First Steps', description: 'Created your first world' },
        { id: 'sky_high', name: 'Sky High', description: 'Created a floating world' }
      ],
      joinedAt: '2023-07-22T16:20:00Z',
      lastActive: '2024-01-16T12:15:00Z'
    }
  };
  
  const profile = profiles[userId as keyof typeof profiles];
  
  if (!profile) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    profile
  });
}

async function getFollowing(userId: string | null) {
  // Simulate following list
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const following = [
    {
      id: 'user_2',
      username: 'SkyBuilder',
      displayName: 'Sky Builder',
      avatar: '/api/placeholder/50/50',
      verified: false,
      followedAt: '2024-01-10T09:30:00Z'
    },
    {
      id: 'user_3',
      username: 'NeonArtist',
      displayName: 'Neon Artist',
      avatar: '/api/placeholder/50/50',
      verified: true,
      followedAt: '2024-01-08T14:20:00Z'
    }
  ];
  
  return NextResponse.json({
    success: true,
    following,
    total: following.length
  });
}

async function getFollowers(userId: string | null) {
  // Simulate followers list
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const followers = [
    {
      id: 'user_4',
      username: 'WorldExplorer',
      displayName: 'World Explorer',
      avatar: '/api/placeholder/50/50',
      verified: false,
      followedAt: '2024-01-15T11:45:00Z'
    },
    {
      id: 'user_5',
      username: 'VREnthusiast',
      displayName: 'VR Enthusiast',
      avatar: '/api/placeholder/50/50',
      verified: false,
      followedAt: '2024-01-12T16:30:00Z'
    }
  ];
  
  return NextResponse.json({
    success: true,
    followers,
    total: followers.length
  });
}

async function getActivity(userId: string | null) {
  // Simulate activity feed
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const activities = [
    {
      id: 'activity_1',
      type: 'world_created',
      userId,
      content: {
        worldId: 'world_123',
        worldName: 'Crystal Sanctuary',
        thumbnail: '/api/placeholder/200/150'
      },
      timestamp: '2024-01-16T10:30:00Z'
    },
    {
      id: 'activity_2',
      type: 'user_followed',
      userId,
      content: {
        followedUserId: 'user_6',
        followedUsername: 'DigitalArtist'
      },
      timestamp: '2024-01-15T14:20:00Z'
    },
    {
      id: 'activity_3',
      type: 'world_liked',
      userId,
      content: {
        worldId: 'world_456',
        worldName: 'Neon Dreams',
        worldCreator: 'CyberBuilder'
      },
      timestamp: '2024-01-14T09:15:00Z'
    }
  ];
  
  return NextResponse.json({
    success: true,
    activities,
    total: activities.length
  });
}

async function getFeed(userId: string | null) {
  // Simulate social feed
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const feedItems = [
    {
      id: 'feed_1',
      type: 'world_shared',
      user: {
        id: 'user_2',
        username: 'SkyBuilder',
        avatar: '/api/placeholder/50/50'
      },
      content: {
        worldId: 'world_789',
        worldName: 'Floating Gardens',
        thumbnail: '/api/placeholder/300/200',
        description: 'Just finished my latest creation - a peaceful floating garden realm!'
      },
      stats: {
        likes: 45,
        comments: 12,
        shares: 8
      },
      timestamp: '2024-01-16T12:00:00Z'
    },
    {
      id: 'feed_2',
      type: 'achievement_unlocked',
      user: {
        id: 'user_3',
        username: 'NeonArtist',
        avatar: '/api/placeholder/50/50'
      },
      content: {
        achievement: {
          id: 'master_builder',
          name: 'Master Builder',
          description: 'Created 50+ worlds',
          icon: '🏆'
        }
      },
      stats: {
        likes: 78,
        comments: 23,
        shares: 15
      },
      timestamp: '2024-01-16T08:30:00Z'
    }
  ];
  
  return NextResponse.json({
    success: true,
    feed: feedItems,
    total: feedItems.length
  });
}

async function getMessages(userId: string | null) {
  // Simulate messages
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const conversations = [
    {
      id: 'conv_1',
      participant: {
        id: 'user_2',
        username: 'SkyBuilder',
        avatar: '/api/placeholder/50/50'
      },
      lastMessage: {
        content: 'Love your latest crystal world! Any tips for beginners?',
        timestamp: '2024-01-16T11:30:00Z',
        read: false
      },
      unreadCount: 2
    },
    {
      id: 'conv_2',
      participant: {
        id: 'user_3',
        username: 'NeonArtist',
        avatar: '/api/placeholder/50/50'
      },
      lastMessage: {
        content: 'Thanks for the collaboration! The neon effects turned out amazing.',
        timestamp: '2024-01-15T16:45:00Z',
        read: true
      },
      unreadCount: 0
    }
  ];
  
  return NextResponse.json({
    success: true,
    conversations,
    total: conversations.length
  });
}

async function getNotifications(userId: string | null) {
  // Simulate notifications
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const notifications = [
    {
      id: 'notif_1',
      type: 'new_follower',
      content: {
        userId: 'user_7',
        username: 'NewCreator',
        message: 'started following you'
      },
      read: false,
      timestamp: '2024-01-16T13:45:00Z'
    },
    {
      id: 'notif_2',
      type: 'world_liked',
      content: {
        userId: 'user_8',
        username: 'WorldLover',
        worldName: 'Crystal Sanctuary',
        message: 'liked your world'
      },
      read: false,
      timestamp: '2024-01-16T12:20:00Z'
    },
    {
      id: 'notif_3',
      type: 'comment_added',
      content: {
        userId: 'user_9',
        username: 'Commenter',
        worldName: 'Mystic Forest',
        message: 'commented on your world'
      },
      read: true,
      timestamp: '2024-01-15T18:30:00Z'
    }
  ];
  
  return NextResponse.json({
    success: true,
    notifications,
    unreadCount: notifications.filter(n => !n.read).length
  });
}