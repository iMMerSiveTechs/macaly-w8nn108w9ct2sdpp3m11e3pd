'use client';
import { useEffect, useState } from 'react';

export default function ImmersiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Simple custom cursor dot */}
      <div
        className="fixed w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}