import { useState } from 'react';

interface CapabilityModuleProps {
  title: string;
  description: string;
  details: string;
  icon: string;
  index: number;
}

export default function CapabilityModule({ title, description, details, icon, index }: CapabilityModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex gap-6 items-start group">
      <div className="relative flex-shrink-0">
        <img src={icon} alt={title} className="w-20 h-20 object-cover rounded-lg border-2 border-cyan-500/50" />
        <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-red-500 mb-2 font-mono">{title}</h3>
        <p className="text-gray-300 mb-3">{description}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-cyan-300 font-mono text-sm flex items-center gap-2 transition-colors"
        >
          {isExpanded ? '[-] COLLAPSE' : '[+] EXPAND'}
        </button>
        {isExpanded && (
          <div className="mt-4 p-4 bg-cyan-500/10 border-l-4 border-red-500 animate-slideDown">
            <p className="text-gray-400">{details}</p>
          </div>
        )}
      </div>
    </div>
  );
}
