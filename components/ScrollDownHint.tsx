"use client"

export default function ScrollDownHint() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-b-2 border-r-2 rotate-45 border-white/60 animate-pulse" />
        <span className="text-white/50 text-xs tracking-wider">SCROLL</span>
      </div>
    </div>
  );
}