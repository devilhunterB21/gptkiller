import { useState, useEffect } from 'react';

export default function StatsCounter() {
  const [counts, setCounts] = useState({ nodes: 0, signals: 0, breaches: 0 });

  useEffect(() => {
    const targets = { nodes: 47832, signals: 128456, breaches: 9234 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        nodes: Math.floor(targets.nodes * progress),
        signals: Math.floor(targets.signals * progress),
        breaches: Math.floor(targets.breaches * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        { label: 'ACTIVE NODES', value: counts.nodes, suffix: '+' },
        { label: 'SIGNALS SENT', value: counts.signals, suffix: '+' },
        { label: 'SYSTEMS BREACHED', value: counts.breaches, suffix: '+' },
      ].map((stat, i) => (
        <div key={i} className="text-center p-8 bg-black/60 border-2 border-cyan-500/30 backdrop-blur-sm">
          <div className="text-5xl font-bold text-red-500 mb-2 font-mono">
            {stat.value.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-cyan-400 font-mono text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
