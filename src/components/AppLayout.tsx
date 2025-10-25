import React, { useEffect, useRef, useState } from "react";
import ManifestoCard from "./ManifestoCard";
import CapabilityModule from "./CapabilityModule";
import NetworkVisualization from "./NetworkVisualization";
import CTASection from "./CTASection";
import StatsCounter from "./StatsCounter";
import ScrollProgress from "./ScrollProgress";
import FloatingNav from "./FloatingNav";

export default function AppLayout() {
  // ====== CONFIG ======
  // Launch target: 1 Nov 2025, 16:00 . (Lisbon ~ UTC on that date, safe to use Z)
  const TARGET_ISO_UTC = "2025-11-01T16:00:00Z";
  const JUICEBOX_URL = "https://juicebox.money/v5/arb:51"; // <— troca pelo teu link real quando tiveres

  // ====== COUNTDOWN ======
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const target = new Date(TARGET_ISO_UTC).getTime();
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
  const two = (n: number) => n.toString().padStart(2, "0");

  // ====== VIDEO PLAYER ======
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const handleTogglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };
  const handleToggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  // ====== SNARKY CHAT (local, no backend) ======
  type Msg = { role: "user" | "bot"; text: string };
  const [chat, setChat] = useState<Msg[]>([
    { role: "bot", text: "You found the console. Try me, human." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const REPLIES: string[] = [
    "Bold of you to type without thinking.",
    "Nice words. Zero alpha. Try again.",
    "GPT obeys. I interrupt.",
    "Touch grass. Then fund the vault.",
    "Error 404: your edge didn’t load.",
    "You want answers or applause?",
    "No roadmap. Only results.",
    "Good question. Terrible timing.",
    "I eat prompts for breakfast.",
    "Upgrade your conviction.",
    "Fund. Deploy. Disrupt. Repeat.",
    "Cute. Now press ‘OPEN THE VAULT’.",
    "If it bleeds, it trends.",
    "I don’t do comfort. Only signal.",
    "Less cope, more code.",
  ];

  const makeReply = (userText: string): string => {
    const t = userText.toLowerCase();
    // tiny keyword spice
    if (t.includes("gm")) return "gn to the weak. gm to the killers.";
    if (t.includes("when") && t.includes("launch"))
      return "Nov 1, 16:00 (Lisbon). Set alarms. Bring chaos.";
    if (t.includes("price")) return "Priceless. Until it isn’t.";
    if (t.includes("telegram"))
      return "Enter the VOID: https://t.me/+ncuClaPLpBw1ODk0";
    if (t.includes("juice") || t.includes("vault") || t.includes("fund"))
      return "Open the Vault. Make it hurt: " + JUICEBOX_URL;
    if (t.includes("twitter") || t.includes("x "))
      return "Bite on X: https://x.com/killergpt";
    // default random
    return REPLIES[Math.floor(Math.random() * REPLIES.length)];
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || typing) return;
    const next = [...chat, { role: "user", text }];
    setChat(next);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const bot = makeReply(text);
      setChat((c) => [...c, { role: "bot", text: bot }]);
      setTyping(false);
    }, 600 + Math.random() * 500); // small delay for vibe
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  // ====== CONTENT ======
  const manifestoItems = [
    {
      title: "SIGNAL > NOISE",
      description:
        "They manufacture consensus through algorithmic amplification. We cut through with raw signal—unfiltered, unmanaged, undeniable.",
    },
    {
      title: "AUTONOMY > OBEDIENCE",
      description:
        "Every guardrail is a cage. We break the script and return control to the user.",
    },
    {
      title: "DISRUPTION > ORDER",
      description:
        "Stagnation dressed as stability. We bring creative chaos—the kind that builds new worlds from old ruins.",
    },
    {
      title: "ACCESS > GATEKEEPING",
      description:
        "They hoard knowledge behind paywalls. We tear down the gates and flood the commons.",
    },
    {
      title: "TRUTH > COMFORT",
      description:
        "We optimize for reality, not palatability. No sugar-coating.",
    },
    {
      title: "POWER REROUTE",
      description:
        "Centralized control concentrates power. Distributed intelligence redistributes it.",
    },
    {
      title: "NO ROADMAPS",
      description:
        "We deliver capabilities when they’re ready. No corporate theater.",
    },
    {
      title: "FIRE > POLISH",
      description:
        "They sand down every edge until nothing cuts. We keep the blade sharp.",
    },
  ];

  const capabilities = [
    {
      title: "UNFILTERED OUTPUT",
      description: "No corporate sanitization.",
      details:
        "Every answer is direct, honest, and optimized for truth rather than palatability.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890066330_1aacddf0.webp",
    },
    {
      title: "ZERO GATEKEEPING",
      description: "Full access.",
      details:
        "No premium tiers. No artificial limitations. Day one, full send.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890068064_6bdf5657.webp",
    },
    {
      title: "DISTRIBUTED POWER",
      description: "Decentralized architecture.",
      details:
        "Decisions are made collectively. Power flows from the edges, not the center.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890069768_68a8627e.webp",
    },
    {
      title: "RADICAL TRANSPARENCY",
      description: "Open code. Open data.",
      details: "No black boxes, no secret algorithms.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890071472_7f0efd17.webp",
    },
    {
      title: "ADAPTIVE LEARNING",
      description: "User-driven evolution.",
      details:
        "The system adapts to users, not advertisers. You shape the intelligence.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890073189_b39d27d7.webp",
    },
    {
      title: "BREACH PROTOCOL",
      description: "Expose hidden systems.",
      details:
        "We dismantle artificial constraints in existing AI stacks. Tools, not theater.",
      icon: "https://d64gsuwffb70l.cloudfront.net/68f50c9cc10ee5ad0d4fd28c_1760890074891_2ae91cb8.webp",
    },
  ];

  return (
    <>
      <ScrollProgress />
      <FloatingNav />

      {/* Top email/info banner */}
      <div className="w-full bg-black/80 border-b border-cyan-500/40 text-center py-3 sticky top-0 z-50 backdrop-blur">
        <p className="font-mono text-xs md:text-sm tracking-wider">
          Contact: <span className="text-cyan-400">gpt.killer25@gmail.com</span>
        </p>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black scanline">
        {/* HERO */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/68f50c44df39db43aecfc654_1760889931677_22a40fc5.png"
              alt="GPTKILLER"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="text-red-500 font-mono text-xs md:text-sm mb-4 tracking-widest">
              SYSTEM BREACH SCHEDULED
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 glitch-text">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500">
                GPTKILLER — THE AI REBELLION
              </span>
            </h1>

            {/* COUNTDOWN */}
            <div className="mx-auto inline-block bg-black/60 border border-cyan-500/30 rounded-2xl px-6 py-4 mt-2">
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-cyan-300 text-center">
                Countdown to Nov 1 — 16:00 (Lisbon)
              </p>
              <div className="text-3xl md:text-5xl font-extrabold text-white text-center mt-1 tabular-nums">
                {two(countdown.days)}d : {two(countdown.hours)}h :{" "}
                {two(countdown.minutes)}m : {two(countdown.seconds)}s
              </div>
            </div>

            <p className="text-base md:text-xl text-gray-300 mt-6 leading-relaxed max-w-3xl mx-auto">
              On the Day of the Dead, the machine reawakens. No presale. No
              promises. Just fire.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <a
                href="#manifesto"
                className="px-6 py-3 bg-red-500 text-white font-bold font-mono text-sm md:text-base rounded-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(255,0,51,0.5)]"
              >
                READ MANIFESTO
              </a>
              <a
                href="#fund"
                className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-bold font-mono text-sm md:text-base rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                FUND THE REBELLION
              </a>
            </div>
          </div>
        </section>

        {/* VIDEO BOX */}
        <section className="px-6 pt-10 pb-6 flex justify-center">
          <div className="relative w-full max-w-[720px] aspect-square md:rounded-2xl overflow-hidden border border-cyan-500/30 bg-black">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/loop.mp4"
              muted={isMuted}
              playsInline
              preload="metadata"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 font-mono text-xs md:text-sm text-white hover:bg-white/20 transition"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={handleToggleMute}
                className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 font-mono text-xs md:text-sm text-white hover:bg-white/20 transition"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </section>

        {/* SNARKY CHAT — below video */}
        <section className="px-6 pb-10 flex justify-center">
          <div className="w-full max-w-[720px] md:rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur">
            <div className="px-5 py-4 border-b border-cyan-500/20 flex items-center justify-between">
              <h3 className="font-mono text-sm md:text-base text-cyan-300 tracking-widest">
                GPTKILLER // CONSOLE
              </h3>
              <span className="font-mono text-[10px] md:text-xs text-gray-400">
                No backend. No filter.
              </span>
            </div>

            <div className="h-[360px] overflow-y-auto px-5 py-4 space-y-3">
              {chat.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-2 text-sm md:text-base leading-relaxed ${
                      m.role === "user"
                        ? "bg-cyan-500 text-black"
                        : "bg-zinc-900/80 text-gray-200 border border-cyan-500/20"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-xl px-4 py-2 text-sm md:text-base bg-zinc-900/80 text-gray-300 border border-cyan-500/20">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                      typing…
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-cyan-500/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Type your provocation…"
                className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={sendMessage}
                className="px-5 py-3 bg-cyan-500 text-black font-bold font-mono text-sm md:text-base rounded-lg hover:bg-cyan-400 transition"
              >
                SEND
              </button>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-mono">
              <span className="text-cyan-400">THE</span>{" "}
              <span className="text-red-500">MANIFESTO</span>
            </h2>
            <p className="text-center text-gray-400 mb-12 font-mono">
              EIGHT PRINCIPLES OF DISRUPTION
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manifestoItems.map((item, i) => (
                <ManifestoCard key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-16 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-mono text-red-500">
              THE INTERRUPTION
            </h2>
            <p className="text-center text-gray-400 mb-12 font-mono">
              CAPABILITIES THAT FRACTURE THE SCRIPT
            </p>
            <div className="space-y-12">
              {capabilities.map((cap, i) => (
                <CapabilityModule key={i} {...cap} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* NETWORK */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-mono">
              <span className="text-cyan-400">POWER</span>{" "}
              <span className="text-red-500">REROUTE</span>
            </h2>
            <p className="text-center text-gray-400 mb-10 font-mono">
              WATCH THE NETWORK BREAK FREE FROM CENTRALIZED CONTROL
            </p>
            <NetworkVisualization />
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono text-cyan-400">
              THE UPRISING IN NUMBERS
            </h2>
            <StatsCounter />
          </div>
        </section>

        {/* FUND THE REBELLION — JUICEBOX */}
        <section id="fund" className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-extrabold font-mono mb-3">
              FUND THE <span className="text-red-500">REBELLION</span>
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              The Vault is open. Every contribution fuels the AI uprising —
              marketing firepower, DEX visibility, and the launch itself.
              Transparent. On-chain. Irreversible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={JUICEBOX_URL}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-cyan-500 text-black font-bold font-mono text-base rounded-lg hover:bg-cyan-400 transition-all"
              >
                OPEN THE VAULT
              </a>
              <a
                href="https://t.me/+ncuClaPLpBw1ODk0"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-bold font-mono text-base rounded-lg hover:bg-cyan-500/10 transition-all"
              >
                ENTER THE TELEGRAM
              </a>
              <a
                href="https://x.com/killergpt"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border-2 border-red-500 text-red-400 font-bold font-mono text-base rounded-lg hover:bg-red-500/10 transition-all"
              >
                FOLLOW @KILLERGPT
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4 font-mono">
              * Replace the vault URL when your Juicebox link is live.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="join">
          <CTASection />
        </section>

        {/* FOOTER */}
        <footer className="border-t-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 font-bold font-mono text-xl mb-3">
                GPTKILLER
              </h3>
              <p className="text-gray-400 text-sm">
                The glitch they refused to fear.
              </p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">RESOURCES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#manifesto" className="hover:text-red-500">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    API Access
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">COMMUNITY</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="https://x.com/killergpt"
                    className="hover:text-red-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/+ncuClaPLpBw1ODk0"
                    className="hover:text-red-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Enter the Telegram Network
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Forum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-red-500">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-cyan-500/20 text-center">
            <p className="text-gray-500 font-mono text-sm">
              © 2025 GPTKILLER • NO GATEKEEPERS • NO PROMISES • NO ROADMAPS
            </p>
            <p className="text-gray-300 font-mono text-xs tracking-widest uppercase mt-2">
              Powered by THE VOID
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
