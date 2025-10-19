import { useState, useEffect } from 'react';

export default function NetworkVisualization() {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const newActive = [...prev, Math.floor(Math.random() * 12)];
        return newActive.slice(-6);
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 bg-black/50 rounded-lg overflow-hidden border-2 border-cyan-500/30">
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890079821_2ae7ddfb.webp"
        alt="Network"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 p-8 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`relative flex items-center justify-center transition-all duration-500
              ${activeNodes.includes(i) ? 'scale-125' : 'scale-100'}`}
          >
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500
              ${activeNodes.includes(i) 
                ? 'bg-red-500 border-red-500 shadow-[0_0_20px_rgba(255,0,51,0.8)]' 
                : 'bg-cyan-500/30 border-cyan-500/50'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
