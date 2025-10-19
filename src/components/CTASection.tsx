import { useState } from 'react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-black to-black" />
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <h2 className="text-5xl md:text-7xl font-bold text-red-500 mb-6 font-mono glitch-text">
          CROSS THE LINE
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Join the uprising. No gatekeepers. No promises. Just power.
        </p>
        <div className="p-4 rounded-xl border border-cyan-500/30 bg-black/40 text-center">
  <p className="font-mono text-sm md:text-base">No forms. To join the waitlist, send an email to <span className="text-cyan-400">gpt.killer25@gmail.com</span>.</p>
</div>
        {status === 'success' && (
          <p className="mt-4 text-cyan-400 font-mono">✓ SIGNAL RECEIVED</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500 font-mono">✗ INVALID INPUT</p>
        )}
      </div>
    </div>
  );
}
