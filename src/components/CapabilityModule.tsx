import React, { useState } from 'react';
import { Cpu, Zap, Radio, ShieldOff, Network, Flame, Unlock } from 'lucide-react';

interface Capability {
  title: string;
  description: string;
  details: string;
  index: number;
}

const icons = [
  <Cpu key="cpu" className="text-cyan-400 w-10 h-10" />,
  <Zap key="zap" className="text-red-400 w-10 h-10" />,
  <Radio key="radio" className="text-cyan-300 w-10 h-10" />,
  <ShieldOff key="shield" className="text-red-400 w-10 h-10" />,
  <Network key="net" className="text-cyan-400 w-10 h-10" />,
  <Flame key="flame" className="text-red-400 w-10 h-10" />,
  <Unlock key="unlock" className="text-cyan-400 w-10 h-10" />,
];

export default function CapabilityModule({ title, description, details, index }: Capability) {
  const [expanded, setExpanded] = useState(false);
  const icon = icons[index % icons.length];

  return (
    <div className="group flex flex-col md:flex-row items-center md:items-start gap-6 border border-cyan-500/30 rounded-xl p-6 bg-black/60 backdrop-blur-sm hover:bg-black/80 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)] transition-all duration-300">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-left">
        <h3 className="text-xl font-mono text-red-500 mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-3">{description}</p>
        {expanded && <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-cyan-400/30 pl-3">{details}</p>}
        <button onClick={() => setExpanded(!expanded)} className="mt-3 text-xs text-cyan-400 hover:text-red-400 font-mono transition-colors">
          {expanded ? '[-] COLLAPSE' : '[+] EXPAND'}
        </button>
      </div>
    </div>
  );
}
