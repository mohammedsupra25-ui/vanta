import { useState } from 'react';

// --- COMPONENT 11.1: GOOD VS BAD AI COMMUNICATION ---
export function GoodVsBadAI() {
  const [hoveredPanel, setHoveredPanel] = useState<'bad' | 'good' | null>(null);

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 11.1 — How to Talk to Your AI
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-[#8a9bb5] border border-[#8a9bb5]/30 px-2 py-1 rounded">
            Compare
          </span>
        </div>

        <div className="flex flex-col lg:flex-row w-full h-full min-h-[400px]">
          
          {/* BAD PANEL */}
          <div 
            className={`flex-1 p-8 border-b lg:border-b-0 lg:border-r border-white/5 transition-colors duration-500 flex flex-col relative ${
              hoveredPanel === 'bad' ? 'bg-red-500/[0.02]' : 'bg-transparent hover:bg-white/[0.01]'
            }`}
            onMouseEnter={() => setHoveredPanel('bad')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
             <div className="font-mono text-lg text-red-500 mb-8 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-sm">✗</span>
               BAD PROMPT
             </div>

             <div className="flex-1 flex flex-col gap-6 font-sans text-sm pb-12">
               {/* User */}
               <div className="self-end bg-vanta-700/50 text-vanta-200 p-4 rounded-2xl rounded-tr-none max-w-[85%] border border-white/5">
                 Is this a Wave 3?
               </div>
               {/* AI */}
               <div className="self-start bg-vanta-900 border border-red-500/20 text-vanta-300 p-4 rounded-2xl rounded-tl-none max-w-[95%] shadow-[0_0_20px_rgba(192,57,43,0.05)]">
                 I can't determine that without measurements. What's the price distance? What timeframe? How does it relate to the surrounding waves? Please provide more context.
               </div>
             </div>

             <div className={`mt-auto p-4 rounded-lg border-l-2 transition-all duration-300 ${
               hoveredPanel === 'bad' ? 'border-red-500 bg-red-500/10' : 'border-red-500/30'
             }`}>
               <span className="text-red-400 font-bold block mb-1">Missing Elements:</span>
               <span className="text-red-400/70 text-xs">No measurements. No timeframe. No context. AI cannot apply NEoWave rules geometry to a single word.</span>
             </div>
          </div>

          {/* GOOD PANEL */}
          <div 
            className={`flex-1 p-8 transition-colors duration-500 flex flex-col relative ${
              hoveredPanel === 'good' ? 'bg-luxury-gold/[0.02]' : 'bg-transparent hover:bg-white/[0.01]'
            }`}
            onMouseEnter={() => setHoveredPanel('good')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
             <div className="font-mono text-lg text-luxury-gold mb-8 flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-luxury-gold/20 text-luxury-gold flex items-center justify-center text-sm">✓</span>
               GOOD PROMPT
             </div>

             <div className="flex-1 flex flex-col gap-6 font-sans text-sm pb-12">
               {/* User */}
               <div className="self-end bg-luxury-gold/10 text-white p-4 rounded-2xl rounded-tr-none max-w-[95%] border border-luxury-gold/30 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                 H1 gold. Move up from 2,900 to 3,050 = 150 pips over 12H. Pullback from 3,050 to 2,990 = 60 pips over 3H. That's 40% retrace in price, 25% in time.
               </div>
               {/* AI */}
               <div className="self-start bg-vanta-900 border border-white/10 text-vanta-200 p-4 rounded-2xl rounded-tl-none max-w-[95%]">
                 The pullback passes the 1/3 test in price (40% {'>'} 33%). This is a potential same-degree wave. If this is a Wave 2, it must hold above 2,900. If we are starting Wave 3, the minimum 100% projection is 3,140.
               </div>
             </div>

             <div className={`mt-auto p-4 rounded-lg border-l-2 transition-all duration-300 ${
               hoveredPanel === 'good' ? 'border-luxury-gold bg-luxury-gold/10' : 'border-luxury-gold/30'
             }`}>
               <span className="text-luxury-gold font-bold block mb-1">Excellent Inputs:</span>
               <span className="text-luxury-gold/70 text-xs">Exact measurements. Time and Price. Absolute context. AI immediately processes the logic and builds scenarios.</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
