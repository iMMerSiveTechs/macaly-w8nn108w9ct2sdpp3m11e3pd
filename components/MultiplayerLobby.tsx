"use client"

import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'building';
  joinedAt: number;
}

interface LobbyProps {
  realmId: string;
  maxPlayers?: number;
}

export default function MultiplayerLobby({ realmId, maxPlayers = 8 }: LobbyProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    // Generate room code
    setRoomCode(realmId.slice(0, 6).toUpperCase());
    
    // Mock player data - in production this would come from Firebase/WebSocket
    const mockPlayers: Player[] = [
      { id: '1', name: 'Alex Chen', avatar: '🧑‍🎨', status: 'building', joinedAt: Date.now() - 300000 },
      { id: '2', name: 'Maya Rivera', avatar: '👩‍💻', status: 'online', joinedAt: Date.now() - 180000 },
      { id: '3', name: 'Jordan Kim', avatar: '🧑‍🚀', status: 'away', joinedAt: Date.now() - 120000 },
    ];
    
    setPlayers(mockPlayers);
  }, [realmId]);

  const joinLobby = async () => {
    console.log(`🚀 Joining lobby for realm: ${realmId}`);
    setIsJoined(true);
    
    // Add current user to players list
    const newPlayer: Player = {
      id: 'current',
      name: 'You',
      avatar: '🎮',
      status: 'online',
      joinedAt: Date.now()
    };
    
    setPlayers(prev => [...prev, newPlayer]);
  };

  const leaveLobby = () => {
    console.log('👋 Leaving lobby');
    setIsJoined(false);
    setPlayers(prev => prev.filter(p => p.id !== 'current'));
  };

  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'building': return 'bg-blue-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatJoinTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return minutes < 1 ? 'Just joined' : `${minutes}m ago`;
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-white max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">🌍 Realm Lobby</h2>
          <div className="bg-gray-700 px-3 py-1 rounded-full text-sm font-mono">
            {roomCode}
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {players.length}/{maxPlayers} creators online
        </p>
      </div>

      {/* Players List */}
      <div className="space-y-3 mb-6">
        {players.map((player) => (
          <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
            <div className="relative">
              <span className="text-2xl">{player.avatar}</span>
              <div 
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(player.status)}`}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{player.name}</div>
              <div className="text-xs text-gray-400 capitalize">
                {player.status === 'building' ? '🔨 Building' : 
                 player.status === 'online' ? '✅ Online' : '😴 Away'}
                <span className="ml-2">{formatJoinTime(player.joinedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {!isJoined ? (
          <button
            onClick={joinLobby}
            disabled={players.length >= maxPlayers}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              players.length >= maxPlayers
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {players.length >= maxPlayers ? 'Lobby Full' : 'Join Realm'}
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => console.log('🎮 Starting VR session')}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              🥽 Enter VR Mode
            </button>
            <button
              onClick={leaveLobby}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Leave Lobby
            </button>
          </div>
        )}
        
        <button
          onClick={() => navigator.share?.({ 
            title: 'Join my Nemurium realm!', 
            url: `${window.location.origin}/realm/${realmId}` 
          })}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          📱 Share Realm
        </button>
      </div>

      {/* Room Settings */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Room Privacy</span>
          <span className="text-green-400">🔓 Public</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
          <span>Voice Chat</span>
          <span className="text-blue-400">🎤 Enabled</span>
        </div>
      </div>
    </div>
  );
}