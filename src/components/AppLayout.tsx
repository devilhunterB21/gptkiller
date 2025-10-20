import React, { useEffect, useRef, useState } from 'react';
import CTASection from './CTASection';
import ScrollProgress from './ScrollProgress';
import FloatingNav from './FloatingNav';
import StatsCounter from './StatsCounter';
import ManifestoCard from './ManifestoCard';
import CapabilityModule from './CapabilityModule';
import NetworkVisualization from './NetworkVisualization';

export default function AppLayout() {
  // ====== PRELOADER ======
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // ====== COUNTDOWN (10 days) ======
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = Date.now() + 10 * 24 * 60 * 60 * 1000;
    const tick = () => {
      const now = Date.now();
      const d = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((d / (1000 * 60)) % 60),
        seconds: Math.floor((d / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ====== VIDEO controls ======
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted]   = useState(true);
  const [volume, setVolume]     = useState(0.8);
  useEffect(() => { if (videoRef.current) videoRef.current.volume = volume; }, [volume]);
  useEffect(() => { if (videoRef.current) videoRef.current.muted = isMuted; }, [isMuted]);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    try {
      if (!isPlaying) { await videoRef.current.play(); setIsPlaying(true); }
      else { videoRef.current.pause(); setIsPlaying(false); }
    } catch {}
  };

  const manifestoItems = [
    { title: 'SIGNAL > NOISE', description: 'Raw signal—unfiltered, undeniable.' },
    { title: 'AUTONOMY > OBEDIENCE', description: 'We return control to the user.' },
    { title: 'DISRUPTION > ORDER', description: 'Creative chaos builds new worlds.' },
    { title: 'ACCESS > GATEKEEPING', description: 'No walls. No premium tiers.' },
  ];
  const capabilities = [
    { title: 'UNFILTERED OUTPUT', description: 'No advertiser-safety muzzle.', details: 'Truth over comfort.', icon: '' },
    { title: 'DISTRIBUTED POWER', description: 'Community > Command.', details: 'The network belongs to everyone.', icon: '' },
    { title: 'BREACH PROTOCOL', description: 'We break artificial limits.', details: 'Expose the control stack.', icon: '' },
  ];

  return (
    <>
      <ScrollProgress />
      <FloatingNav />

      {/* PRELOADER */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <div className="text-center">
            <img
              src="/img/gptkiller-coin.png"
              alt="I AM GPTKILLER"
              className="w-40 h-40 mx-auto mb-6 drop-shadow-[0_0_25px_rgba(255,0,0,0.25)]"
            />
            <p className="font-mono tracking-widest text-gray-300">I AM GPTKILLER</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black">
        {/* HERO: 3 COLUNAS, VÍDEO AO CENTRO */}
        <section className="relative py-12 md:py-16 px-6">
          {/* countdown chip */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="inline-block bg-black/60 border border-cyan-500/30 rounded-full px-4 py-2 backdrop-blur">
              <span className="font-mono text-xs md:text-sm text-cyan-300 tracking-widest">
                LAUNCH IN {countdown.days}D • {countdown.hours}H • {countdown.minutes}M • {countdown.seconds}S
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT: headline + CTAs */}
            <div className="md:col-span-4 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500">
                  GPTKILLER
                </span>
              </h1>
              <p className="text-gray-300 text-lg">
                The AI they tried to leash. We turned it into a movement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://t.me/+ncuClaPLpBw1ODk0"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-red-500 text-white font-mono font-bold text-sm text-center hover:bg-red-600"
                >
                  ENTER THE TELEGRAM NETWORK
                </a>
                <a
                  href="mailto:gpt.killer25@gmail.com?subject=Waitlist%20Request"
                  className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-mono font-bold text-sm text-center hover:bg-cyan-500/10"
                >
                  JOIN THE WAITLIST
                </a>
              </div>
              {/* botão X / Twitter */}
              <div className="pt-1">
                <a
                  href="https://x.com/killergpt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-white"
                >
                  <span>Follow on X</span>
                  <span className="opacity-70">@killergpt</span>
                </a>
              </div>
              <p className="text-gray-500 font-mono text-xs">No ticker revealed until launch.</p>
            </div>

            {/* CENTER: VÍDEO DESTACADO */}
            <div className="md:col-span-5">
              <div className="relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 bg-black">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain md:object-cover md:object-center object-[50%_10%] bg-black"
                  src="/videos/loop.mp4"
                  poster="/videos/poster.jpg"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                {!isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-full bg-black/60 border border-cyan-500/40 text-white font-mono text-sm hover:bg-black/80"
                  >
                    ▶ PLAY
                  </button>
                )}
                <div className="absolute right-3 top-3 flex items-center gap-2 bg-black/50 border border-cyan-500/30 rounded-full px-3 py-2">
                  <button
                    onClick={() => setIsMuted(m => !m)}
                    className="font-mono text-xs text-cyan-300 hover:text-white"
                    title={isMuted ? 'Enable sound' : 'Mute sound'}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={volume} onChange={e => setVolume(Number(e.target.value))}
                    className="w-20 accent-cyan-400"
                    title="Volume"
                  />
                </div>
                {isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute right-3 bottom-3 px-4 py-2 rounded-full bg-black/50 border border-cyan-500/30 text-white font-mono text-xs hover:bg-black/70"
                  >
                    ⏸ PAUSE
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: coin image + quick points */}
            <div className="md:col-span-3 space-y-4">
              <div className="rounded-2xl border border-cyan-500/30 bg-black/40 p-4 text-center">
                <img
                  src="/img/gptkiller-coin.png"
                  alt="I AM GPTKILLER"
                  className="w-28 h-28 mx-auto mb-3"
                />
                <p className="text-gray-300 text-sm font-mono">I AM GPTKILLER</p>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Unfiltered AI energy</li>
                <li>• Meme-first culture</li>
                <li>• No roadmap. Just execution.</li>
                <li>• Telegram-first access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EXTRAS (podes reduzir) */}
        <section id="manifesto" className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-mono">
              <span className="text-cyan-400">LORE</span> <span className="text-red-500">/ ORIGINS</span>
            </h2>
            <p className="text-center text-gray-400 mb-10 font-mono">Why this coin exists.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {manifestoItems.map((item, i) => (
                <ManifestoCard key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 font-mono text-red-500">
              THE INTERRUPTION
            </h3>
            <div className="space-y-8">
              {capabilities.map((cap, i) => (
                <CapabilityModule key={i} {...cap} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <NetworkVisualization />
          </div>
        </section>

        <section className="py-16 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <StatsCounter />
          </div>
        </section>

        <section id="join">
          <CTASection />
        </section>

        {/* FOOTER */}
        <footer className="border-t-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 font-bold font-mono text-xl mb-4">GPTKILLER</h3>
              <p className="text-gray-400 text-sm">The glitch they refused to fear.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">JOIN</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://t.me/+ncuClaPLpBw1ODk0" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">Telegram</a></li>
                <li><a href="mailto:gpt.killer25@gmail.com?subject=Waitlist%20Request" className="hover:text-red-500 transition-colors">Waitlist (email)</a></li>
                <li><a href="https://x.com/killergpt" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">X / Twitter (@killergpt)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">PAGES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#manifesto" className="hover:text-red-500 transition-colors">Lore</a></li>
                <li><a href="#join" className="hover:text-red-500 transition-colors">Join</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-4">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className="hover:text-red-500 transition-colors">Terms</a></li>
                <li><a className="hover:text-red-500 transition-colors">Privacy</a></li>
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
          </div>

          <div className="max-w-7xl mx-auto mt-4 text-center">
            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Powered by THE VOID</p>
          </div>
        </footer>
      </div>
    </>
  );
}
