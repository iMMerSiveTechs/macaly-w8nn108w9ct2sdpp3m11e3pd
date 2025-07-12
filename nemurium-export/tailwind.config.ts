import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // New immersive color palette
        diamond: '#6ee7b7',
        immersiveblue: '#1e3a8a',
        realmglow: '#a5f3fc',
        neonflare: '#e879f9',
        
        // Complete cosmic color system
        'cosmic-space': '#0a0a23',
        'cosmic-purple': '#9945ff',
        'cosmic-cyan': '#00ffe5',
        'cosmic-white': '#ffffff',
        'cosmic-amber': '#fbbf24',
        'cosmic-pink': '#f472b6',
        'cosmic-green': '#10b981',
        'cosmic-blue': '#3b82f6',
        'cosmic-red': '#ef4444',
        'cosmic-yellow': '#eab308',
        'cosmic-orange': '#f97316',
        'cosmic-gray': '#6b7280',
        'cosmic-gold': '#d4af37',
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #9945ff, #00ffe5)',
        'cosmic-radial': 'radial-gradient(ellipse at center, #9945ff 0%, #0a0a23 70%)',
        'immersive-gradient': 'linear-gradient(135deg, #6ee7b7, #1e3a8a, #a5f3fc, #e879f9)',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config