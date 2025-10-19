import { useState, useEffect } from 'react';

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md 
      border-2 border-cyan-500/30 px-6 py-3 rounded-full flex gap-6 items-center
      animate-slide-in shadow-[0_0_30px_rgba(0,255,255,0.2)]">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-red-500 font-bold font-mono hover:text-red-400 transition-colors">
        GPTKILLER
      </button>
      <div className="flex gap-4 text-sm font-mono">
        <button onClick={() => scrollToSection('manifesto')}
          className="text-cyan-400 hover:text-cyan-300 transition-colors">
          MANIFESTO
        </button>
        <button onClick={() => scrollToSection('join')}
          className="text-cyan-400 hover:text-cyan-300 transition-colors">
          JOIN
        </button>
      </div>
    </nav>
  );
}
