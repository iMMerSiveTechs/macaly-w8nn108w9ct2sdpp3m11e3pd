"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Image, 
  Mic,
  Globe,
  Music,
  User,
  Circle,
  CheckCheck,
  Clock
} from 'lucide-react'
import { auth, db } from '../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  getDocs
} from 'firebase/firestore'

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  timestamp: any
  type: 'text' | 'image' | 'world' | 'audio'
  mediaUrl?: string
  worldId?: string
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

interface Chat {
  id: string
  participants: string[]
  participantNames: { [key: string]: string }
  participantAvatars: { [key: string]: string }
  lastMessage: string
  lastMessageTime: any
  unreadCount: number
  isOnline: { [key: string]: boolean }
  type: 'direct' | 'group'
}

export default function DirectMessages() {
  const [user] = useAuthState(auth)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for development
  const mockChats: Chat[] = [
    {
      id: 'chat1',
      participants: ['user1', 'current_user'],
      participantNames: { user1: 'Maya Chen', current_user: 'You' },
      participantAvatars: { user1: '/avatars/maya.jpg', current_user: '/avatars/you.jpg' },
      lastMessage: 'Check out my new cyberpunk world!',
      lastMessageTime: new Date(),
      unreadCount: 2,
      isOnline: { user1: true, current_user: true },
      type: 'direct'
    },
    {
      id: 'chat2',
      participants: ['user2', 'current_user'],
      participantNames: { user2: 'Neon Architect', current_user: 'You' },
      participantAvatars: { user2: '/avatars/neon.jpg', current_user: '/avatars/you.jpg' },
      lastMessage: 'Thanks for the feedback on the lighting!',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
      isOnline: { user2: false, current_user: true },
      type: 'direct'
    },
    {
      id: 'chat3',
      participants: ['user3', 'user4', 'current_user'],
      participantNames: { 
        user3: 'Audio Wizard', 
        user4: 'Sound Master',
        current_user: 'You'
      },
      participantAvatars: { 
        user3: '/avatars/audio.jpg', 
        user4: '/avatars/sound.jpg',
        current_user: '/avatars/you.jpg'
      },
      lastMessage: 'Let\'s collaborate on the ambient soundtrack',
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 5,
      isOnline: { user3: true, user4: false, current_user: true },
      type: 'group'
    }
  ]

  const mockMessages: Message[] = [
    {
      id: 'msg1',
      text: 'Hey! I just finished my new world. Want to check it out?',
      senderId: 'user1',
      senderName: 'Maya Chen',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg2',
      text: 'Absolutely! Send me the link',
      senderId: 'current_user',
      senderName: 'You',
      timestamp: new Date(Date.now() - 1700000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg3',
      text: 'Here\'s my cyberpunk metropolis! Took me 6 months to build',
      senderId: 'user1',
      senderName: 'Maya Chen',
      timestamp: new Date(Date.now() - 1600000),
      type: 'world',
      worldId: 'cyberpunk_city',
      status: 'read'
    },
    {
      id: 'msg4',
      text: 'This is incredible! The neon lighting is perfect 🔥',
      senderId: 'current_user',
      senderName: 'You',
      timestamp: new Date(Date.now() - 900000),
      type: 'text',
      status: 'delivered'
    }
  ]

  useEffect(() => {
    setChats(mockChats)
    if (mockChats.length > 0) {
      setActiveChat(mockChats[0])
      setMessages(mockMessages)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !user) return

    const message: Message = {
      id: `msg_${Date.now()}`,
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || 'You',
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // In production, send to Firebase
    try {
      await addDoc(collection(db, 'messages'), {
        chatId: activeChat.id,
        ...message,
        timestamp: serverTimestamp()
      })
      
      // Update message status to sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      )
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-cosmic-white/50" />
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-cosmic-white/50" />
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-cosmic-cyan" />
      case 'read':
        return <CheckCheck className="h-3 w-3 text-cosmic-purple" />
      default:
        return null
    }
  }

  const filteredChats = chats.filter(chat => 
    Object.values(chat.participantNames).some(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="h-screen bg-cosmic-space text-cosmic-white flex">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-cosmic-white/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-cosmic-white/20">
          <h2 className="text-xl font-bold text-gradient mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cosmic-white/50" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveChat(chat)}
                className={`p-4 rounded-lg cursor-pointer transition-all mb-2 ${
                  activeChat?.id === chat.id 
                    ? 'bg-cosmic-purple/20 border border-cosmic-purple/30' 
                    : 'hover:bg-cosmic-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar or Group Avatar */}
                  <div className="relative">
                    {chat.type === 'direct' ? (
                      <div className="w-12 h-12 bg-cosmic-cyan rounded-full flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-cosmic-purple rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{chat.participants.length}</span>
                      </div>
                    )}
                    
                    {/* Online indicator */}
                    {chat.type === 'direct' && Object.values(chat.isOnline).some(online => online) && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cosmic-green rounded-full border-2 border-cosmic-space" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-cosmic-white truncate">
                        {chat.type === 'direct' 
                          ? Object.entries(chat.participantNames)
                              .find(([id]) => id !== 'current_user')?.[1] || 'Unknown'
                          : `Group (${chat.participants.length})`
                        }
                      </h3>
                      <span className="text-xs text-cosmic-white/50">
                        {formatTime(chat.lastMessageTime)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-cosmic-white/70 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-cosmic-purple rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{chat.unreadCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-cosmic-white/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cosmic-cyan rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-cosmic-white">
                    {activeChat.type === 'direct' 
                      ? Object.entries(activeChat.participantNames)
                          .find(([id]) => id !== 'current_user')?.[1] || 'Unknown'
                      : `Group Chat (${activeChat.participants.length})`
                    }
                  </h3>
                  <p className="text-sm text-cosmic-white/70">
                    {activeChat.type === 'direct' && Object.values(activeChat.isOnline).some(online => online)
                      ? 'Online now'
                      : 'Last seen recently'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.senderId === 'current_user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.senderId === 'current_user' 
                      ? 'bg-cosmic-purple rounded-l-2xl rounded-tr-2xl' 
                      : 'bg-cosmic-white/10 rounded-r-2xl rounded-tl-2xl'
                  } p-4`}>
                    {message.type === 'world' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-cosmic-cyan mb-2">
                          <Globe className="h-4 w-4" />
                          <span className="text-sm font-medium">Shared World</span>
                        </div>
                        <div className="p-3 bg-cosmic-white/10 rounded-lg">
                          <p className="text-sm font-medium">Cyberpunk Metropolis</p>
                          <button className="mt-2 text-xs px-3 py-1 bg-cosmic-cyan/20 text-cosmic-cyan rounded-full">
                            Enter World
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-cosmic-white">{message.text}</p>
                    )}
                    
                    <div className={`flex items-center gap-2 mt-2 text-xs ${
                      message.senderId === 'current_user' 
                        ? 'text-cosmic-white/70 justify-end' 
                        : 'text-cosmic-white/50'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.senderId === 'current_user' && getMessageStatusIcon(message.status)}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-cosmic-white/20">
              {isTyping && (
                <div className="mb-4 text-sm text-cosmic-white/70">
                  Maya is typing...
                </div>
              )}
              
              <div className="flex items-end gap-4">
                <div className="flex gap-2">
                  <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                    <Image className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                    <Globe className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full p-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                    rows={1}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded transition-all">
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:opacity-50 rounded-lg transition-all"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-cosmic-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-12 w-12 text-cosmic-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-cosmic-white mb-2">Select a conversation</h3>
              <p className="text-cosmic-white/70">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}