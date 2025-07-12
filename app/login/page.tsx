'use client';
import { useState } from 'react';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo authentication - in production, use real auth
    if ((email === 'demo@nemurium.com' && password === 'demo123') || email.includes('@')) {
      localStorage.setItem('nemurium_auth', 'true');
      localStorage.setItem('nemurium_user', JSON.stringify({ 
        email, 
        name: email.split('@')[0],
        tier: 'pro',
        joined: new Date().toISOString()
      }));
      window.location.href = '/dashboard';
    } else {
      alert('Invalid credentials. Try demo@nemurium.com / demo123');
    }
    
    setIsLoading(false);
  };

  const demoLogin = () => {
    setEmail('demo@nemurium.com');
    setPassword('demo123');
    setTimeout(() => {
      document.querySelector('form')?.requestSubmit();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-black flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
          >
            ← Back to Home
          </button>
          
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Welcome to Nemurium
            </h1>
            <p className="text-gray-400">Enter the immersive internet</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          {/* Tab Switcher */}
          <div className="flex bg-black/20 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                isLogin 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                !isLogin 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 p-4 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {isLogin ? '🚀 Sign In' : '✨ Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Access */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={demoLogin}
              className="w-full bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg transition flex items-center justify-center gap-2 text-gray-300"
            >
              🎮 Quick Demo Access
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Use demo@nemurium.com / demo123
            </p>
          </div>

          {/* Additional Options */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-purple-400 hover:text-purple-300 text-sm transition">
                Forgot your password?
              </button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-bold text-center mb-4">🌟 What awaits you</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-purple-400">🌍</span>
              World Builder
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">🤖</span>
              AI Copilot
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-green-400">🎵</span>
              Sonarium Audio
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-orange-400">🎬</span>
              Nemura Cinema
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}