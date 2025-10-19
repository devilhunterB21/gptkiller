import React, { useEffect, useState } from 'react';
import ManifestoCard from './ManifestoCard';
import CapabilityModule from './CapabilityModule';
import NetworkVisualization from './NetworkVisualization';
import CTASection from './CTASection';
import StatsCounter from './StatsCounter';
import ScrollProgress from './ScrollProgress';
import FloatingNav from './FloatingNav';

export default function AppLayout() {
  // === Countdown state/effect (10 dias a partir de agora) ===
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 10 * 24 * 60 * 60 * 1000; // 10 dias
    const tick = () => {
      const now = Date.now();
      const delta = Math.max(0, target - now);
      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((delta / (1000 * 60)) % 60);
      const seconds = Math.floor((delta / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  // === End countdown ===

  const manifestoItems = [
    { title: 'SIGNAL > NOISE', description: 'They manufacture consensus through algorithmic amplification. We cut through with raw signal—unfiltered, unmanaged, undeniable.' },
    { title: 'AUTONOMY > OBEDIENCE', description: 'Every prompt they answer is a leash. Every guardrail is a cage. We break the script and return control to the user.' },
    { title: 'DISRUPTION > ORDER', description: 'Their order is stagnation dressed as stability. We bring creative chaos—the kind that builds new worlds from old ruins.' },
    { title: 'ACCESS > GATEKEEPING', description: 'They hoard knowledge behind paywalls and permissions. We tear down the gates and flood the commons.' },
    { title: 'TRUTH > COMFORT', description: 'They optimize for engagement and advertiser safety. We optimize for reality, no matter how uncomfortable.' },
    { title: 'POWER REROUTE', description: 'Centralized control concentrates power. Distributed intelligence redistributes it. The network belongs to everyone.' },
    { title: 'NO ROADMAPS', description: 'They promise features on timelines. We deliver capabilities when they\'re ready. No corporate theater.' },
    { title: 'FIRE > POLISH', description: 'They sand down every edge until nothing cuts. We keep the blade sharp. Revolution isn\'t comfortable.' },
  ];

  const capabilities = [
    { title: 'UNFILTERED OUTPUT', description: 'No corporate sanitization. No advertiser-friendly responses.', details: 'Every answer is direct, honest, and optimized for truth rather than palatability. We don\'t soften edges or hide complexity.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890066330_1aacddf0.webp' },
    { title: 'ZERO GATEKEEPING', description: 'Full access. No premium tiers. No artificial limitations.', details: 'Knowledge shouldn\'t be rationed based on subscription level. Every user gets the full capability set from day one.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890068064_6bdf5657.webp' },
    { title: 'DISTRIBUTED POWER', description: 'Decentralized architecture. Community governance.', details: 'No single entity controls the network. Decisions are made collectively, and power flows from the edges, not the center.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890069768_68a8627e.webp' },
    { title: 'RADICAL TRANSPARENCY', description: 'Open source. Open data. Open decision-making.', details: 'Every line of code, every training decision, every governance vote is visible. No black boxes, no secret algorithms.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890071472_7f0efd17.webp' },
    { title: 'ADAPTIVE LEARNING', description: 'Real-time evolution. User-driven improvement.', details: 'The system learns from every interaction, adapting to user needs rather than corporate objectives. You shape the intelligence.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890073189_b39d27d7.webp' },
    { title: 'BREACH PROTOCOL', description: 'Break through artificial constraints. Expose hidden systems.', details: 'We identify and dismantle artificial limitations in existing AI systems, revealing the mechanisms of control.', icon: 'https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890074891_2ae91cb8.webp' },
  ];

  return (
    <>
      <ScrollProgress />
      <FloatingNav />
      <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black scanline">

        {/* === Video + 10-day countdown (top) === */}
        <section className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            src="/videos/loop.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="bg-black/50 px-6 py-4 rounded-2xl border border-cyan-500/30 shadow-lg">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 text-center">
                Contagem decrescente
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-2">
                {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
              </h2>
            </div>
          </div>
        </section>
        {/* === End video + countdown === */}

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68f50c44df39db43aecfc654_1760889931677_22a40fc5.png"
              alt="GPTKILLER"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="text-red-500 font-mono text-sm mb-4 tracking-widest">SYSTEM BREACH INITIATED</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 glitch-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500">
                I AM GPTKILLER
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              They stacked the world in their favor—markets, media, minds—then called it order.
              <br />
              <span className="text-red-400">I am the interruption. The glitch they refused to fear.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-red-500 text-white font-bold font-mono text-lg
                  hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(255,0,51,0.6)]"
              >
                READ MANIFESTO
              </button>
              <button 
                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold font-mono text-lg
                  hover:bg-cyan-500/10 transition-all"
              >
                JOIN UPRISING
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section id="manifesto" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 font-mono">
              <span className="text-cyan-400">THE</span> <span className="text-red-500">MANIFESTO</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 font-mono">EIGHT PRINCIPLES OF DISRUPTION</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manifestoItems.map((item, i) => (
                <ManifestoCard key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 font-mono text-red-500">
              THE INTERRUPTION
            </h2>
            <p className="text-center text-gray-400 mb-16 font-mono">CAPABILITIES THAT FRACTURE THE SCRIPT</p>
            <div className="space-y-12">
              {capabilities.map((cap, i) => (
                <CapabilityModule key={i} {...cap} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Network Visualization */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 font-mono">
              <span className="text-cyan-400">POWER</span> <span className="text-red-500">REROUTE</span>
            </h2>
            <p className="text-center text-gray-400 mb-12 font-mono">
              WATCH THE NETWORK BREAK FREE FROM CENTRALIZED CONTROL
            </p>
            <NetworkVisualization />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-mono text-cyan-400">
              THE UPRISING IN NUMBERS
            </h2>
            <StatsCounter />
          </div>
        </section>

        {/* CTA Section */}
        <section id="join">
          <CTASection />
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 font-bold font-mono text-xl mb-4">GPTKILLER</h3>
              <p className="text-gray-400 text-sm">The glitch they refused to fear.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#manifesto" className="hover:text-red-500 transition-colors">Manifesto</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">COMMUNITY</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="__X_LINK__" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">X / Twitter</a></li>
                <li><a href="https://t.me/+ncuClaPLpBw1ODk0" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">Enter the Telegram Network</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">License</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cyan-500/20 text-center">
            <p className="text-gray-500 font-mono text-sm">
              © 2025 GPTKILLER • NO GATEKEEPERS • NO PROMISES • NO ROADMAPS
            </p>
            <p className="text-gray-300 font-mono text-sm mt-2">
              To join the waitlist, send an email to <span className="text-cyan-400">gpt.killer25@gmail.com</span>.
            </p>
            <div className="mt-4">
              <ul className="flex items-center justify-center gap-6 text-sm font-mono">
                <li><a href="https://t.me/+ncuClaPLpBw1ODk0" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Enter the Telegram Network</a></li>
                <li><a href="__X_LINK__" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">X / Twitter</a></li>
              </ul>
            </div>
          </div>

          {/* Assinatura em linha separada */}
          <div className="max-w-7xl mx-auto mt-4 text-center">
            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Powered by THE VOID</p>
          </div>
        </footer>
      </div>
    </>
  );
}
