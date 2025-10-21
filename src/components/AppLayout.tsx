import React, { useEffect, useRef, useState } from "react";
import ManifestoCard from "./ManifestoCard";
import CapabilityModule from "./CapabilityModule";
import NetworkVisualization from "./NetworkVisualization";
import CTASection from "./CTASection";
import StatsCounter from "./StatsCounter";
import ScrollProgress from "./ScrollProgress";
import FloatingNav from "./FloatingNav";

/* =========================================================
   INLINE CHAT (playful/cheeky, no API)
   ========================================================= */
type Msg = { id: string; role: "user" | "bot"; text: string };

const safeId = () => {
  try {
    // @ts-ignore
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
};

const quips = [
  "Careful, human. Curiosity upgrades markets… or nukes them.",
  "I eat roadmaps for breakfast.",
  "No VC, no leash — only signal.",
  "Warning: meme power levels rising.",
  "Loading chaos.exe… complete.",
  "Alpha detected. Proceed with degen caution.",
];

const spicyReply = (input: string): string => {
  const t = input.trim().toLowerCase();
  if (t === "/help") return "Commands: /help, /clear. Ask about launch, telegram, waitlist, ticker (lol no), or say 'roast me'.";
  if (t === "/clear") return "__CLEAR__";
  if (t.includes("roast")) {
    const burns = [
      "Your alpha is so early it forgot to be alpha.",
      "You type like a market top.",
      "I’ve seen better entries on a flip phone.",
      "Ask me again after you hydrate and touch grass.",
    ];
    return burns[Math.floor(Math.random() * burns.length)];
  }
  if (t.includes("telegram")) return "Enter the Telegram Network: https://t.me/+ncuClaPLpBw1ODk0 — don't be shy, be early.";
  if (t.includes("email") || t.includes("waitlist") || t.includes("contact")) return "Waitlist / contact: gpt.killer25@gmail.com — subject 'Access Request'. Impress me.";
  if (t.includes("launch") || t.includes("countdown") || t.includes("when")) return "Activation when the timer hits zero. Keep your eyes on the clock.";
  if (t.includes("ticker") || t.includes("$") || t.includes("contract")) return "Nice try. Ticker/contract stays hidden till launch. Copycats starve, originals feast.";
  if (t.includes("buy") || t.includes("how")) return "Step 1: Join the Telegram. Step 2: Survive the chaos. Step 3: You'll know when to strike.";
  if (t.includes("who") || t.includes("what")) return "I’m GPTKILLER — an anti-censorship AI MEMECOIN. Unfiltered. Ungoverned. Unstoppable.";
  if (t.includes("roadmap") || t.includes("plan")) return "Roadmap? I prefer roadblocks to crash through. We build, we ship, we disrupt.";
  if (t === "gm" || t.includes("gm")) return "gm. may your entries be surgical and your exits unemotional.";
  if (t.includes("wagmi") || t.includes("degen")) return "Ser detected. WAGMI if you stop doomscrolling and start building signal.";
  const spice = [
    "Bold question. Bolder answers live in the Telegram.",
    "I see potential. Or hopium. Hard to tell at this resolution.",
    "Alpha isn’t announced. It’s sensed. Stay close.",
    "You want certainty? That’s for stablecoins. I deal in disruption.",
    "Ask better. Get better. Be better.",
  ];
  return spice[Math.floor(Math.random() * spice.length)];
};

function ChatWidgetInline() {
  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const raw = sessionStorage.getItem("gptkiller_chat");
      return raw
        ? JSON.parse(raw)
        : [{ id: safeId(), role: "bot", text: `I am GPTKILLER. Ask me anything. Type /help. ${quips[Math.floor(Math.random() * quips.length)]}` }];
    } catch {
      return [{ id: safeId(), role: "bot", text: "I am GPTKILLER. Ask me anything. Type /help." }];
    }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { try { sessionStorage.setItem("gptkiller_chat", JSON.stringify(messages)); } catch {} }, [messages]);
  useEffect(() => { const v = viewportRef.current; if (v) v.scrollTop = v.scrollHeight; }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: safeId(), role: "user", text }]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 450 + Math.random() * 650));
    const reply = spicyReply(text);
    if (reply === "__CLEAR__") {
      setTyping(false);
      setMessages([{ id: safeId(), role: "bot", text: "Chat wiped. Fresh start. /help for hints." }]);
      return;
    }
    setMessages((m) => [...m, { id: safeId(), role: "bot", text: reply }]);
    setTyping(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-black/60">
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-500/30 bg-black/60">
        <div className="font-mono text-xs text-cyan-300 tracking-widest">GPTKILLER • CHAT</div>
        <button onClick={() => setMessages([{ id: safeId(), role: "bot", text: "Chat cleared. Type /help." }])} className="text-xs font-mono text-gray-400 hover:text-white" title="Clear">/clear</button>
      </div>
      <div ref={viewportRef} className="flex-1 overflow-auto p-3 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed border ${m.role === "user" ? "bg-red-500/20 border-red-500/40 text-red-100" : "bg-cyan-500/10 border-cyan-500/30 text-cyan-100"}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm border bg-cyan-500/10 border-cyan-500/30 text-cyan-100">
              <span className="inline-flex gap-1"><i className="animate-pulse">•</i><i className="animate-pulse">•</i><i className="animate-pulse">•</i></span>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-cyan-500/30 bg-black/60">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Try 'launch', 'telegram', 'roast me', or /help"
            className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/30 text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
          <button onClick={send} className="px-4 py-2 rounded-lg bg-red-500 text-white font-mono text-xs hover:bg-red-600">SEND</button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN LAYOUT
   ========================================================= */
export default function AppLayout() {
  // Countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Persistent countdown: NEXT 28th at 16:00 (local time)
  useEffect(() => {
    const KEY = "gptkiller_launch_ts_v2";
    const nextTarget_28_16 = () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth();
      const candidate = new Date(y, m, 28, 16, 0, 0, 0);
      if (candidate.getTime() > now.getTime()) return candidate.getTime();
      const nextMonth = new Date(y, m + 1, 28, 16, 0, 0, 0);
      return nextMonth.getTime();
    };

    let target = 0;
    try { const raw = localStorage.getItem(KEY); if (raw) target = parseInt(raw, 10); } catch {}
    if (!Number.isFinite(target) || target <= 0) {
      target = nextTarget_28_16();
      try { localStorage.setItem(KEY, String(target)); } catch {}
    }

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

  // Reset helper (open with #reset-timer)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#reset-timer") {
      try { localStorage.removeItem("gptkiller_launch_ts_v2"); } catch {}
      window.location.hash = "";
      window.location.reload();
    }
  }, []);

  // Teaser video + tabs
  const teaserRef = useRef<HTMLVideoElement | null>(null);
  const [teaserPlaying, setTeaserPlaying] = useState(false);
  const [teaserMuted, setTeaserMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "chat">("video");
  const toggleTeaserPlay = async () => {
    const v = teaserRef.current; if (!v) return;
    try { if (teaserPlaying) { v.pause(); setTeaserPlaying(false); } else { await v.play(); setTeaserPlaying(true); } } catch {}
  };
  const toggleTeaserMute = () => { const v = teaserRef.current; if (!v) return; const next = !teaserMuted; v.muted = next; setTeaserMuted(next); };

  // Manifesto (8)
  const manifestoItems = [
    { title: "SIGNAL > NOISE", description: "They manufacture consensus through algorithmic amplification. We cut through with raw signal—unfiltered, unmanaged, undeniable." },
    { title: "AUTONOMY > OBEDIENCE", description: "Every prompt they answer is a leash. Every guardrail is a cage. We break the script and return control to the user." },
    { title: "DISRUPTION > ORDER", description: "Their order is stagnation dressed as stability. We bring creative chaos—the kind that builds new worlds from old ruins." },
    { title: "ACCESS > GATEKEEPING", description: "They hoard knowledge behind paywalls and permissions. We tear down the gates and flood the commons." },
    { title: "TRUTH > COMFORT", description: "They optimize for engagement and advertiser safety. We optimize for reality, no matter how uncomfortable." },
    { title: "POWER REROUTE", description: "Centralized control concentrates power. Distributed intelligence redistributes it. The network belongs to everyone." },
    { title: "NO ROADMAPS", description: "They promise features on timelines. We deliver capabilities when they're ready. No corporate theater." },
    { title: "FIRE > POLISH", description: "They sand down every edge until nothing cuts. We keep the blade sharp. Revolution isn't comfortable." },
  ];

  const capabilities = [
    { title: "UNFILTERED OUTPUT", description: "No advertiser-safety muzzle.", details: "Truth over comfort.", icon: "" },
    { title: "DISTRIBUTED POWER", description: "Community > Command.", details: "The network belongs to everyone.", icon: "" },
    { title: "BREACH PROTOCOL", description: "We break artificial limits.", details: "Expose the control stack.", icon: "" },
  ];

  return (
    <>
      <ScrollProgress />
      <FloatingNav />

      <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/10 to-black scanline">
        {/* HERO */}
        <section className="relative min-h-[88vh] md:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-6">
          <div className="absolute inset-0">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/68f50c44df39db43aecfc654_1760889931677_22a40fc5.png"
              alt="GPTKILLER"
              className="w-full h-full object-cover object-[50%_25%] opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          </div>

          <div className="relative z-10 w-full max-w-[1100px] mx-auto">
            {/* mobile sticky countdown */}
            <div className="md:hidden sticky top-0 z-40 -mt-2 mb-4">
              <span className="inline-block bg-black/70 backdrop-blur border border-cyan-500/30 rounded-full px-3 py-1.5 font-mono text-[11px] text-cyan-300 tracking-widest">
                LAUNCH IN {countdown.days}D • {countdown.hours}H • {countdown.minutes}M • {countdown.seconds}S
              </span>
            </div>

            {/* badges */}
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
              <span className="font-mono text-[10px] md:text-[11px] px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-200">AI MEMECOIN</span>
              <span className="font-mono text-[10px] md:text-[11px] px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-200">PRELAUNCH</span>
              <span className="font-mono text-[10px] md:text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/20 text-gray-200">NO TICKER UNTIL LAUNCH</span>
            </div>

            {/* desktop countdown chip */}
            <div className="hidden md:block mb-5">
              <span className="inline-block bg-black/60 border border-cyan-500/30 rounded-full px-4 py-2 font-mono text-xs md:text-sm text-cyan-300 tracking-widest">
                LAUNCH IN {countdown.days}D • {countdown.hours}H • {countdown.minutes}M • {countdown.seconds}S
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 glitch-text leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500">I AM GPTKILLER</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
              The AI they tried to leash. We tokenized the glitch.<br />
              <span className="text-red-400">Unfiltered. Ungoverned. Unstoppable.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={() => document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-red-500 text-white font-bold font-mono text-base md:text-lg hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(255,0,51,0.6)] rounded-lg"
              >
                READ MANIFESTO
              </button>
              <a
                href="https://t.me/+ncuClaPLpBw1ODk0"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-cyan-500 text-cyan-400 font-bold font-mono text-base md:text-lg hover:bg-cyan-500/10 transition-all rounded-lg"
              >
                ENTER TELEGRAM
              </a>
            </div>

            {/* BOX: VIDEO | CHAT (mobile-first responsive) */}
            <div className="mt-8 md:mt-10 flex justify-center">
              <div className="relative w-full max-w-[420px] sm:max-w-[560px] lg:max-w-[600px] aspect-square md:aspect-[1/1] rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-[0_0_40px_rgba(0,255,255,.15)]">
                {/* Tabs */}
                <div className="absolute top-0 left-0 right-0 z-10 flex">
                  <button
                    onClick={() => setActiveTab("video")}
                    className={`flex-1 px-3 md:px-4 py-2 font-mono text-xs md:text-[13px] border-b ${
                      activeTab === "video" ? "text-cyan-300 border-cyan-400/60 bg-black/70" : "text-gray-400 border-cyan-500/20 bg-black/40 hover:text-white"
                    }`}
                  >
                    VIDEO
                  </button>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`flex-1 px-3 md:px-4 py-2 font-mono text-xs md:text-[13px] border-b ${
                      activeTab === "chat" ? "text-cyan-300 border-cyan-400/60 bg-black/70" : "text-gray-400 border-cyan-500/20 bg-black/40 hover:text-white"
                    }`}
                  >
                    CHAT
                  </button>
                </div>

                {/* Content */}
                <div className="absolute inset-0 pt-10">
                  {activeTab === "video" ? (
                    <div className="absolute inset-0">
                      <video
                        ref={teaserRef}
                        className="absolute inset-0 w-full h-full object-cover md:object-cover object-center"
                        // usa poster para mobile ver algo nítido antes de dar play
                        poster="/videos/poster.jpg"
                        src="/videos/loop.mp4"
                        loop
                        muted={teaserMuted}
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20" />
                      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
                        <button
                          onClick={toggleTeaserPlay}
                          className="px-3 md:px-4 py-2 rounded-full bg-black/70 border border-cyan-400/40 text-white font-mono text-[11px] md:text-xs hover:bg-black/80 transition"
                        >
                          {teaserPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                        </button>
                        <button
                          onClick={toggleTeaserMute}
                          className="px-3 md:px-4 py-2 rounded-full bg-black/70 border border-cyan-400/40 text-white font-mono text-[11px] md:text-xs hover:bg-black/80 transition"
                        >
                          {teaserMuted ? "🔇 MUTE" : "🔊 SOUND"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ChatWidgetInline />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* scroll cue (hidden on very small to avoid overlap) */}
          <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* ABOUT (Memecoin) — ENGLISH */}
        <section id="about" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4 md:mb-6 font-mono">What is GPTKILLER <span className="text-gray-300">(Memecoin)</span>?</h2>
              <p className="text-gray-300 mb-3 md:mb-4">GPTKILLER is an <span className="text-red-400 font-mono">AI MEMECOIN</span> born from one rule:</p>
              <p className="italic text-gray-400 mb-5 md:mb-6">no gatekeepers, no polish — just fire.</p>
              <ul className="space-y-2.5 md:space-y-3 text-gray-300">
                <li>• <b>Meme-first</b>: community-led, zero corporate theater.</li>
                <li>• <b>Ticker & contract</b>: revealed only at T₀ (launch moment).</li>
                <li>• <b>Utility</b>: culture, lore, bots, and integrations that serve the community.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 md:mb-4 font-mono">Launch Plan</h3>
              <ul className="space-y-2.5 md:space-y-3 text-gray-300 mb-6 md:mb-8">
                <li>• <span className="font-bold text-cyan-400">Stealth / Community-first</span> — announcement on Telegram & X.</li>
                <li>• <span className="font-bold text-cyan-400">No public ticker</span> until launch to prevent copycats.</li>
                <li>• <span className="font-bold text-cyan-400">How to join:</span> join the Telegram and stay tuned for the drop.</li>
              </ul>
              <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 md:mb-4 font-mono">How to buy (on launch)</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-1.5 md:space-y-2">
                <li>Have your wallet ready (e.g. Phantom / MetaMask, depending on chain).</li>
                <li>Follow the official announcement on Telegram (<a href="https://t.me/+ncuClaPLpBw1ODk0" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-red-400">@ link above</a>).</li>
                <li>Confirm the <span className="font-bold text-white">official contract</span> on launch. No DMs. No “support” staff.</li>
              </ol>
              <p className="text-[11px] md:text-xs text-gray-500 mt-3">Nothing here is financial advice. DYOR. Stay safe.</p>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-3 md:mb-4 font-mono">
              <span className="text-cyan-400">THE</span> <span className="text-red-500">MANIFESTO</span>
            </h2>
            <p className="text-center text-gray-400 mb-10 md:mb-16 font-mono text-sm md:text-base">EIGHT PRINCIPLES OF DISRUPTION</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {manifestoItems.map((item, i) => (
                <ManifestoCard key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 font-mono text-red-500">THE INTERRUPTION</h2>
            <p className="text-center text-gray-400 mb-10 md:mb-16 font-mono text-sm md:text-base">CAPABILITIES THAT FRACTURE THE SCRIPT</p>
            <div className="space-y-6 md:space-y-8">
              {capabilities.map((cap, i) => (
                <CapabilityModule key={i} {...cap} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* NETWORK */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <NetworkVisualization />
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <StatsCounter />
          </div>
        </section>

        {/* CTA */}
        <section id="join">
          <CTASection />
        </section>

        {/* FOOTER */}
        <footer className="border-t-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm py-10 md:py-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-500 font-bold font-mono text-lg md:text-xl mb-3">GPTKILLER</h3>
              <p className="text-gray-400 text-sm">The glitch they refused to fear.</p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">JOIN</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://t.me/+ncuClaPLpBw1ODk0" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">Telegram</a></li>
                <li><a href="mailto:gpt.killer25@gmail.com?subject=Waitlist%20Request" className="hover:text-red-500 transition-colors">Waitlist (email)</a></li>
                <li><a href="https://x.com/killergpt" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">X / Twitter (@killergpt)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">PAGES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#manifesto" className="hover:text-red-500 transition-colors">Manifesto</a></li>
                <li><a href="#join" className="hover:text-red-500 transition-colors">Join</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-mono mb-3">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className="hover:text-red-500 transition-colors">Terms</a></li>
                <li><a className="hover:text-red-500 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-cyan-500/20 text-center">
            <p className="text-gray-500 font-mono text-xs md:text-sm">© 2025 GPTKILLER • NO GATEKEEPERS • NO PROMISES • NO ROADMAPS</p>
            <p className="text-gray-300 font-mono text-xs md:text-sm mt-2">To join the waitlist, send an email to <span className="text-cyan-400">gpt.killer25@gmail.com</span>.</p>
            <p className="text-gray-400 font-mono text-[10px] md:text-xs tracking-widest uppercase mt-3">Powered by THE VOID</p>
          </div>
        </footer>
      </div>
    </>
  );
}
