'use client';
import { useState } from 'react';
import { Volume2, VolumeX, Mic, Sparkles } from 'lucide-react';

interface VoicePersonality {
  id: string;
  name: string;
  description: string;
  tone: string;
  voiceId?: string;
  color: string;
}

const voicePersonalities: VoicePersonality[] = [
  {
    id: 'sage',
    name: 'Sage',
    description: 'Wise and thoughtful guide',
    tone: 'calm, philosophical, inspiring',
    color: 'bg-blue-500/20 border-blue-500/50 text-blue-300'
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'Energetic creative companion',
    tone: 'enthusiastic, creative, upbeat',
    color: 'bg-purple-500/20 border-purple-500/50 text-purple-300'
  },
  {
    id: 'echo',
    name: 'Echo',
    description: 'Professional assistant',
    tone: 'professional, clear, efficient',
    color: 'bg-green-500/20 border-green-500/50 text-green-300'
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Minimalist and peaceful',
    tone: 'peaceful, minimal, focused',
    color: 'bg-gray-500/20 border-gray-500/50 text-gray-300'
  }
];

export default function VoiceSelector({ 
  onVoiceChange, 
  currentVoice = 'sage' 
}: { 
  onVoiceChange?: (voice: VoicePersonality) => void;
  currentVoice?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedVoice = voicePersonalities.find(v => v.id === currentVoice) || voicePersonalities[0];

  const testVoice = (voice: VoicePersonality) => {
    if (!window.speechSynthesis) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(
      `Hello! I'm ${voice.name}, your ${voice.description.toLowerCase()}. I'm here to help you build amazing immersive worlds.`
    );
    
    utterance.onend = () => setIsPlaying(false);
    
    // Try to select a voice that matches the personality
    const voices = speechSynthesis.getVoices();
    if (voice.id === 'sage') {
      utterance.voice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex')) || voices[0];
    } else if (voice.id === 'nova') {
      utterance.voice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Karen')) || voices[1];
    } else if (voice.id === 'echo') {
      utterance.voice = voices.find(v => v.name.includes('Google') || v.name.includes('Microsoft')) || voices[2];
    }
    
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Voice Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-105 ${selectedVoice.color} backdrop-blur-md border`}
        title={`Voice: ${selectedVoice.name}`}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Voice Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-black/90 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              AI Voice Personality
            </h3>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:bg-white/10 rounded"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div className="space-y-3">
            {voicePersonalities.map((voice) => (
              <div
                key={voice.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                  voice.id === currentVoice 
                    ? voice.color 
                    : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => {
                  onVoiceChange?.(voice);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{voice.name}</h4>
                    <p className="text-xs opacity-80 mt-1">{voice.description}</p>
                    <p className="text-xs opacity-60 mt-1 italic">{voice.tone}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      testVoice(voice);
                    }}
                    disabled={isPlaying}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Test voice"
                  >
                    <Mic className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 text-xs text-gray-400">
            Choose a voice personality that matches your creative style
          </div>
        </div>
      )}
    </div>
  );
}