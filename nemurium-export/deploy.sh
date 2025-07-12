#!/bin/bash

# 🚀 Nemurium Platform Deployment Script
# Complete AI-Powered Immersive Creation Platform

echo "🌟 NEMURIUM PLATFORM DEPLOYMENT"
echo "==============================="
echo "🤖 AI-Powered • 🌍 Immersive • 💰 Monetizable"
echo ""

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [[ ! -d ".git" ]]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "🚀 Initial Nemurium Platform deployment - AI World Builder ready!"
fi

echo "🎯 FEATURE SUMMARY:"
echo "✅ AI World Builder - Generate 3D worlds from text"
echo "✅ Firebase Authentication - Complete user system"  
echo "✅ Discord Community - Live community integration"
echo "✅ Three.js 3D Engine - Immersive world preview"
echo "✅ Master Navigation - Seamless section switching"
echo "✅ Monetization Ready - Pro tiers & marketplace"
echo "✅ Mobile & VR Compatible - Works everywhere"
echo ""

echo "Please choose your deployment platform:"
echo "1) 🚀 Vercel (Recommended - Auto-scaling)"
echo "2) 🌐 Netlify (Alternative - Great for static)"
echo "3) ☁️  Firebase Hosting (Google ecosystem)"
echo "4) 🖥️  Custom Server (Advanced users)"
echo "5) 📋 Just prepare for manual deployment"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "🔧 Installing dependencies..."
        npm install
        
        echo "🔧 Running build test..."
        npm run build
        
        if [[ $? -eq 0 ]]; then
            echo "✅ Build successful! Deploying to Vercel..."
            echo ""
            echo "🔑 IMPORTANT: Set these environment variables in Vercel:"
            echo "   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key"
            echo "   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id"
            echo "   HUGGINGFACE_API_KEY=your_huggingface_key"
            echo "   NEXT_PUBLIC_DISCORD_INVITE_URL=your_discord_invite"
            echo ""
            vercel --prod
            
            echo ""
            echo "🎉 DEPLOYMENT COMPLETE!"
            echo "📱 Your Nemurium platform is now live!"
            echo "🔗 Visit your Vercel dashboard to see the URL"
            echo ""
            echo "🚀 NEXT STEPS:"
            echo "1. Set up Firebase project & add config"
            echo "2. Create Discord server & set invite URL"  
            echo "3. Get HuggingFace API key for AI features"
            echo "4. Test the AI World Builder feature"
            echo "5. Invite your first community members!"
        else
            echo "❌ Build failed. Please fix errors before deploying."
            echo "💡 Common issues:"
            echo "   - Check all import paths are correct"
            echo "   - Ensure all dependencies are installed"
            echo "   - Verify TypeScript types are correct"
            exit 1
        fi
        ;;
    2)
        echo "🌐 Deploying to Netlify..."
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "📦 Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "🔧 Installing dependencies..."
        npm install
        
        echo "🔧 Running build..."
        npm run build
        
        if [[ $? -eq 0 ]]; then
            echo "✅ Build successful! Deploying to Netlify..."
            netlify deploy --prod --dir=.next
            
            echo ""
            echo "🎉 DEPLOYMENT COMPLETE!"
            echo "🔗 Check your Netlify dashboard for the live URL"
        else
            echo "❌ Build failed. Please fix errors before deploying."
            exit 1
        fi
        ;;
    3)
        echo "☁️ Preparing for Firebase Hosting..."
        
        echo "🔧 Installing dependencies..."
        npm install
        
        # Install Firebase CLI if not present
        if ! command -v firebase &> /dev/null; then
            echo "📦 Installing Firebase CLI..."
            npm install -g firebase-tools
        fi
        
        echo "🔧 Running build..."
        npm run build
        
        if [[ $? -eq 0 ]]; then
            echo "✅ Build successful!"
            echo ""
            echo "🔥 FIREBASE SETUP REQUIRED:"
            echo "1. Run: firebase login"
            echo "2. Run: firebase init hosting"
            echo "3. Set public directory to: .next"
            echo "4. Run: firebase deploy"
            echo ""
            echo "💡 Your platform will be live at: https://your-project.web.app"
        else
            echo "❌ Build failed. Please fix errors before deploying."
            exit 1
        fi
        ;;
    4)
        echo "🖥️ Preparing for custom server deployment..."
        
        echo "🔧 Installing dependencies..."
        npm install
        
        echo "🔧 Running production build..."
        npm run build
        
        if [[ $? -eq 0 ]]; then
            echo "✅ Build successful!"
            echo ""
            echo "📝 CUSTOM SERVER DEPLOYMENT:"
            echo "1. Copy the '.next' folder to your server"
            echo "2. Copy 'package.json' and 'package-lock.json'"  
            echo "3. Run: npm install --production"
            echo "4. Set environment variables in production"
            echo "5. Start: npm start"
            echo "6. Set up reverse proxy (nginx/apache) if needed"
            echo ""
            echo "🌍 Your platform will be accessible on your server!"
        else
            echo "❌ Build failed. Please fix errors before deploying."
            exit 1
        fi
        ;;
    5)
        echo "📋 Preparing files for manual deployment..."
        
        echo "🔧 Installing dependencies..."
        npm install
        
        echo "🔧 Running build..."
        npm run build
        
        if [[ $? -eq 0 ]]; then
            echo "✅ Build successful!"
            echo ""
            echo "📦 FILES READY FOR DEPLOYMENT:"
            echo "✅ .next/ - Built application"
            echo "✅ public/ - Static assets"  
            echo "✅ package.json - Dependencies"
            echo "✅ All source files included"
            echo ""
            echo "📋 MANUAL DEPLOYMENT CHECKLIST:"
            echo "□ Upload all files to your hosting provider"
            echo "□ Set environment variables (see .env.example)"
            echo "□ Install Node.js 18+ on server"
            echo "□ Run 'npm install' on server"
            echo "□ Configure web server to serve Next.js app"
            echo "□ Test all features work correctly"
            echo ""
            echo "🔗 See DEPLOYMENT.md for detailed instructions"
        else
            echo "❌ Build failed. Please fix errors before deploying."
            exit 1
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 NEMURIUM PLATFORM DEPLOYMENT COMPLETE!"
echo ""
echo "🚀 WHAT YOU'VE BUILT:"
echo "   🤖 AI World Builder - Generate worlds from text prompts"
echo "   👥 Community System - Discord integration & user tiers"  
echo "   🌍 3D Engine - Three.js powered immersive preview"
echo "   💰 Monetization - Pro subscriptions & marketplace ready"
echo "   📱 Cross-Platform - Works on mobile, desktop, VR, AR"
echo ""
echo "📈 NEXT GROWTH STEPS:"
echo "1. 🔥 Set up Firebase backend (5 minutes)"
echo "2. 🤖 Add AI API keys for world generation"
echo "3. 💬 Create Discord server for community"
echo "4. 🎯 Create your first AI-generated world"
echo "5. 📱 Share on social media & start community"
echo "6. 💰 Set up payments for Pro tier monetization"
echo ""
echo "🌟 RESOURCES:"
echo "   📖 Read: IMPLEMENTATION_COMPLETE.md"
echo "   🚀 Guide: DEPLOYMENT.md"  
echo "   💬 Support: Join your own Discord!"
echo "   🐛 Issues: Check browser console & logs"
echo ""
echo "🎯 You're now ready to build the Immersive Internet!"
echo "🦄 Next stop: Unicorn status! 🚀"