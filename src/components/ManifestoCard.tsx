import { useState } from 'react';

interface ManifestoCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ManifestoCard({ title, description, index }: ManifestoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-6 border-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm
        hover:border-red-500 transition-all duration-300 group overflow-hidden
        ${isHovered ? 'shadow-[0_0_30px_rgba(255,0,51,0.3)]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `glitchIn 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="absolute top-0 right-0 text-red-500/20 font-mono text-6xl font-bold">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-bold text-cyan-400 mb-3 relative z-10 font-mono">
        {title}
      </h3>
      <p className="text-gray-300 relative z-10 leading-relaxed">
        {description}
      </p>
      <div className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent
        transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}
