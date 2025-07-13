'use client';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Globe, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Handle login
      console.log('Logging in with:', { email: formData.email, password: formData.password });
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Handle registration
      console.log('Registering with:', formData);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const socialProviders = [
    { name: 'Google', icon: '🌐', color: 'from-red-500 to-red-600' },
    { name: 'Discord', icon: '🎮', color: 'from-indigo-500 to-purple-600' },
    { name: 'GitHub', icon: '💻', color: 'from-gray-700 to-gray-800' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="text-purple-400 hover:text-white transition-colors absolute left-6 top-6"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="text-4xl mb-4">🌌</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome to Nemurium
          </h1>
          <p className="text-gray-300">
            {isLogin ? 'Sign in to your immersive world' : 'Create your creator account'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Toggle Between Login/Register */}
            <div className="flex bg-black/20 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md transition text-sm font-medium ${
                  isLogin 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md transition text-sm font-medium ${
                  !isLogin 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Username (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Choose a username"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Terms Agreement (Register only) */}
            {!isLogin && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-black/30 border-white/20 rounded focus:ring-purple-500"
                  required={!isLogin}
                />
                <label className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-purple-400 hover:text-purple-300 underline"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-bold transition flex items-center justify-center gap-3"
            >
              <Sparkles className="h-5 w-5" />
              {isLogin ? 'Sign In to Nemurium' : 'Create Your Account'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.name}
                  className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r ${provider.color} hover:scale-105 transition-all duration-200 rounded-lg text-white font-medium`}
                >
                  <span className="text-lg mr-2">{provider.icon}</span>
                  <span className="hidden sm:inline text-sm">{provider.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Creator Benefits */}
          {!isLogin && (
            <div className="mt-8 p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg">
              <h3 className="font-bold text-sm mb-2 text-purple-400">✨ Creator Benefits</h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Build unlimited immersive realms</li>
                <li>• Access premium AI tools and assets</li>
                <li>• Monetize your creations instantly</li>
                <li>• Join the creator community</li>
              </ul>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}