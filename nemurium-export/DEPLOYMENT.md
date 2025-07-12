# 🚀 Nemurium Deployment Guide

This guide will help you deploy your Nemurium platform to production in **under 10 minutes**.

## 📋 Pre-Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] Git repository initialized
- [ ] Environment variables ready (optional)
- [ ] Domain name ready (optional)

## 🎯 Option 1: Vercel (Recommended - 5 minutes)

### Step 1: Push to GitHub
```bash
# In your nemurium-export folder
git init
git add .
git commit -m "Initial Nemurium deployment"
git branch -M main
git remote add origin https://github.com/yourusername/nemurium.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Visit [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Configure Environment Variables (Optional)
In Vercel dashboard → Settings → Environment Variables:
```
HUGGINGFACE_API_KEY=your_key_here
DEEPSEEK_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

### Step 4: Deploy! 🎉
Click "Deploy" and your site will be live at `https://your-project.vercel.app`

---

## 🌐 Option 2: Netlify (Alternative - 7 minutes)

### Step 1: Build Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy
1. Visit [netlify.com](https://netlify.com) and sign up
2. Drag your project folder to the deploy area
3. Or connect your Git repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `out`

---

## 🔧 Option 3: Custom Server (Advanced - 15 minutes)

### Step 1: Build for Production
```bash
npm run build
```

### Step 2: Server Setup
```bash
# Install PM2 for process management
npm install -g pm2

# Start the application
pm2 start npm --name "nemurium" -- start

# Set up auto-restart
pm2 startup
pm2 save
```

### Step 3: Nginx Configuration (Optional)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Environment Variables Setup

### Required Variables
```env
# AI Features (Optional but recommended)
HUGGINGFACE_API_KEY=your_huggingface_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Nemurium
```

### How to Get API Keys

#### HuggingFace API Key
1. Visit [huggingface.co](https://huggingface.co)
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create new token with "Read" permissions

#### DeepSeek API Key  
1. Visit [deepseek.com](https://deepseek.com)
2. Sign up for free account
3. Go to API section
4. Generate new API key

---

## 🎨 Post-Deployment Configuration

### 1. Custom Domain Setup
**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

**Netlify:**
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

### 2. Analytics Setup (Optional)
Add Google Analytics:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Performance Optimization
- Enable caching in your hosting platform
- Set up CDN for static assets
- Configure image optimization

---

## 🧪 Testing Your Deployment

### Health Check
Visit `https://your-domain.com/api/health` to verify the API is working.

### Feature Tests
- [ ] Homepage loads correctly
- [ ] Master menu navigation works
- [ ] Dream Machine generates content
- [ ] AI Copilot responds to messages
- [ ] World Builder interface loads
- [ ] Asset Library displays items
- [ ] AR Overlay interface works

---

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API Routes Don't Work:**
- Check environment variables are set
- Verify API keys are valid
- Check function timeouts in hosting platform

**Styling Issues:**
- Verify Tailwind CSS is building correctly
- Check for CSS conflicts
- Ensure custom fonts are loading

### Getting Help
- 💬 [Discord Community](https://discord.gg/nemurium)
- 📧 [Support Email](mailto:support@nemurium.com)
- 🐛 [GitHub Issues](https://github.com/yourusername/nemurium/issues)

---

## 🎉 You're Live!

Congratulations! Your Nemurium platform is now live and ready to create immersive experiences.

### Next Steps:
1. 📝 Update your branding and content
2. 🔑 Set up user authentication
3. 💾 Configure database (if needed)
4. 📊 Set up monitoring and analytics
5. 🌟 Share your creation with the world!

**Your Nemurium platform is now powering the future of immersive creation!** 🚀