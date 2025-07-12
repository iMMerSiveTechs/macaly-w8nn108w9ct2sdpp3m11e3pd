# 🌟 Nemurium - The Future of Immersive Creation

> *Turn thought into world. Dream in HD.*

Nemurium is a cutting-edge platform for creating, connecting, and sharing immersive experiences. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Dream Machine** - AI-powered content generation
- 🌐 **World Builder** - 3D environment creation tools
- 🗺️ **Realm Network** - Interconnected world mapping
- 📚 **Asset Library** - Comprehensive resource marketplace
- 🥽 **AR Overlay** - Spatial computing interface
- 🤖 **AI Copilot** - Intelligent creation assistant

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nemurium.git
cd nemurium

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your Nemurium platform!

## 🌐 Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nemurium)

### Option 2: Manual Deploy
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy! 🎉

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Required for AI features
HUGGINGFACE_API_KEY=your_huggingface_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here

# Optional
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=your_database_url_here
```

## 📁 Project Structure

```
nemurium/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── world-builder/     # World builder page
│   ├── realm-map/         # Realm network page
│   ├── asset-library/     # Asset library page
│   └── ar-overlay/        # AR interface page
├── components/            # React components
│   ├── master-menu.tsx    # Navigation menu
│   ├── dream-machine.tsx  # AI generation
│   ├── ai-copilot.tsx     # AI assistant
│   └── ...
├── lib/                   # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Colors & Theming
Edit `tailwind.config.ts` to customize the cosmic theme:

```typescript
colors: {
  'cosmic-space': '#0a0a0f',
  'cosmic-purple': '#6d28d9',
  'cosmic-cyan': '#06b6d4',
  'cosmic-pink': '#ec4899',
  // ... add your colors
}
```

### Brand Configuration
Update branding in `app/layout.tsx` and component files.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Built By

**iMMerSive Technologies™**
- 🧠 **Nemura™** - Visual AI Engine
- 🎧 **Sonarium™** - Audio Landscape Generator  
- 🌐 **Nemurium™** - Core Platform
- 🏢 **iMMerSive™** - Parent Company

---

*Powering the Immersive Internet™*

## 🆘 Support

- 💬 [Discord Community](https://discord.gg/nemurium)
- 📚 [Documentation](https://docs.nemurium.com)
- 🐛 [Report Issues](https://github.com/yourusername/nemurium/issues)
- 📧 [Contact Support](mailto:support@nemurium.com)