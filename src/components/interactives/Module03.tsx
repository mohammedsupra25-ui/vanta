import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 3.1: CLEAN IT UP ---
export function CleanItUp() {
  const [view, setView] = useState<'candle' | 'line'>('candle');

  // Generate some realistic looking candle data
  const numDataPoints = 40;
  const candleData = Array.from({ length: numDataPoints }).map((_, i) => {
    // some sine wave + noise
    const base = Math.sin(i * 0.3) * 50 + i * 2;
    const isUp = Math.random() > 0.4;
    const bodySize = Math.random() * 20 + 5;
    const wickUp = Math.random() * 15;
    const wickDown = Math.random() * 15;

    const open = isUp ? base : base + bodySize;
    const close = isUp ? base + bodySize : base;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;

    return { open, close, high, low, isUp, x: (i / (numDataPoints - 1)) * 100 };
  });

  // Simplified line version (just the closes smoothed)
  const linePoints = candleData.map((d) => `${d.x}% ${100 - (d.close / 150) * 100}%`).join(', ');
  
  // Pick some major direction changes for the dots
  const turningPoints = [0, 8, 15, 22, 29, 39];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 3.1 — Clean It Up
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setView('candle')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                view === 'candle'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-vanta-400 hover:text-white border border-transparent'
              }`}
            >
              Candlestick
            </button>
            <button
              onClick={() => setView('line')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                view === 'line'
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30'
                  : 'text-vanta-400 hover:text-white border border-transparent'
              }`}
            >
              Line Chart
            </button>
          </div>

          <div className="relative w-full max-w-[620px] mx-auto h-[300px] border border-white/5 rounded-xl bg-vanta-900 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Label Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
              >
                {view === 'candle' ? (
                  <span className="font-sans text-xs text-red-300 bg-black/50 px-3 py-1 rounded backdrop-blur border border-red-500/20">
                    What most traders stare at
                  </span>
                ) : (
                  <span className="font-sans text-xs text-emerald-300 bg-black/50 px-3 py-1 rounded backdrop-blur border border-emerald-500/20">
                    What's actually happening. See the direction changes?
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Chart Area */}
            <div className="absolute inset-x-8 inset-y-12">
              <AnimatePresence>
                {view === 'candle' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 flex justify-between items-end"
                  >
                    {candleData.map((d, i) => {
                      const top = 100 - (d.high / 150) * 100;
                      const bottom = 100 - (d.low / 150) * 100;
                      const bodyTop = 100 - (Math.max(d.open, d.close) / 150) * 100;
                      const bodyBottom = 100 - (Math.min(d.open, d.close) / 150) * 100;
                      const height = Math.max(bodyBottom - bodyTop, 1);
                      const color = d.isUp ? 'bg-emerald-500' : 'bg-red-500';

                      return (
                        <div key={i} className="relative w-[8px] h-full group flex justify-center">
                          {/* Wick */}
                          <div
                            className={`absolute w-[1px] ${color} opacity-40`}
                            style={{ top: `${top}%`, bottom: `${100 - bottom}%` }}
                          />
                          {/* Body */}
                          <div
                            className={`absolute w-full ${color} rounded-[1px] opacity-80`}
                            style={{ top: `${bodyTop}%`, height: `${height}%` }}
                          />
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line Chart Transition */}
              <AnimatePresence>
                {view === 'line' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <motion.polyline
                        points={linePoints}
                        fill="none"
                        stroke="#e8e6e1"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      
                      {turningPoints.map((idx, i) => {
                         const pt = candleData[idx];
                         const cx = `${pt.x}%`;
                         const cy = `${100 - (pt.close / 150) * 100}%`;
                         return (
                           <motion.circle
                             key={i}
                             cx={cx}
                             cy={cy}
                             r="4"
                             fill="#c9a84c"
                             initial={{ opacity: 0, scale: 0 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.8 + (i * 0.1) }}
                           />
                         )
                      })}
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <p className="font-sans text-sm text-vanta-400 text-center mt-8 italic max-w-lg mx-auto">
            "Same data. The line chart strips away the noise and reveals the structure underneath. From this point forward, you analyze on line charts."
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 3.2: THE 1/3 TEST IN ACTION ---
export function OneThirdTest() {
  const [pullbackSlider, setPullbackSlider] = useState(15);
  const passesTest = pullbackSlider >= 33;
  
  // Math for drawing
  const mainWaveHeight = 240; 
  const pullbackHeight = (pullbackSlider / 100) * mainWaveHeight;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 3.2 — The 1/3 Test
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center">
            
            {/* Chart Area */}
            <div className="relative w-full max-w-[620px] h-[340px] border border-white/5 rounded-xl bg-vanta-900/50 mb-10 overflow-hidden flex items-end justify-center pb-8 border-b-2">
              <svg width="400" height="260" className="overflow-visible">
                {/* Main Up Wave */}
                <path 
                  d={`M 50,250 L 200,${250 - mainWaveHeight}`} 
                  stroke="#e8e6e1" 
                  strokeWidth="3" 
                  fill="none" 
                />
                <circle cx="50" cy="250" r="4" fill="#666" />
                <circle cx="200" cy={`${250 - mainWaveHeight}`} r="4" fill="#e8e6e1" />
                
                {/* Pullback Wave */}
                <path 
                  d={`M 200,${250 - mainWaveHeight} L 300,${250 - mainWaveHeight + pullbackHeight}`} 
                  stroke={passesTest ? "#c9a84c" : "#c0392b"} 
                  strokeWidth="3" 
                  fill="none" 
                  style={{ transition: 'all 0.2s' }}
                />
                <circle 
                  cx="300" 
                  cy={`${250 - mainWaveHeight + pullbackHeight}`} 
                  r="4" 
                  fill={passesTest ? "#c9a84c" : "#c0392b"} 
                  style={{ transition: 'all 0.2s' }}
                />

                {/* 33% Threshold Line */}
                <line 
                  x1="20" 
                  y1={250 - mainWaveHeight + (mainWaveHeight * 0.333)} 
                  x2="380" 
                  y2={250 - mainWaveHeight + (mainWaveHeight * 0.333)} 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x="20" 
                  y={250 - mainWaveHeight + (mainWaveHeight * 0.333) - 6} 
                  fill="rgba(255,255,255,0.3)" 
                  fontSize="10" 
                  fontFamily="monospace"
                >
                  1/3 THRESHOLD
                </text>
              </svg>
            </div>

            {/* Result Badge & Label */}
            <div className="flex items-center gap-6 mb-6 w-full max-w-[500px] justify-between">
              <span className="font-mono text-xs text-vanta-300">
                Pullback: {pullbackSlider}% of main wave
              </span>
              <div className={`px-3 py-1.5 rounded-sm font-sans text-[10px] uppercase font-bold tracking-widest ${passesTest ? 'bg-luxury-gold text-black' : 'bg-red-500 text-white'}`}>
                {passesTest ? 'PASSES 1/3 TEST ✓' : 'FAILS 1/3 TEST ✗'}
              </div>
            </div>

            {/* Slider */}
            <div className="w-full max-w-[500px] flex items-center gap-4">
              <span className="font-mono text-[10px] text-vanta-500">5%</span>
              <input 
                type="range" 
                min="5" 
                max="60" 
                value={pullbackSlider}
                onChange={(e) => setPullbackSlider(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-luxury-gold [&::-webkit-slider-thumb]:rounded-full"
              />
              <span className="font-mono text-[10px] text-vanta-500">60%</span>
            </div>

          </div>
          <p className="font-sans text-sm text-vanta-400 text-center mt-10 italic max-w-lg mx-auto">
            "Drag the slider. Watch the pullback grow. The moment it crosses the 1/3 threshold — it goes from noise to a potential real wave."
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 3.3: BIG AND SUB ---
export function BigAndSub() {
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | 'arrow' | null>(null);

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 3.3 — Big and Sub
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="flex flex-col md:flex-row relative">
          
          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hoveredPanel && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-vanta-900 border border-luxury-gold/40 px-4 py-3 rounded-lg shadow-[0_0_20px_rgba(201,168,76,0.15)] pointer-events-none whitespace-nowrap"
              >
                <p className="font-sans text-xs text-luxury-gold m-0">
                  {hoveredPanel === 'left' && "The compass. Tells you which way."}
                  {hoveredPanel === 'right' && "The map. Tells you when to act."}
                  {hoveredPanel === 'arrow' && "Never trade sub against big. Big says long → only longs in sub."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LEFT PANEL - BIG PICTURE */}
          <div 
            className={`flex-1 p-8 border-r border-white/5 transition-colors duration-500 relative overflow-hidden ${hoveredPanel === 'left' ? 'bg-luxury-gold/[0.05]' : 'bg-luxury-gold/[0.02]'}`}
            onMouseEnter={() => setHoveredPanel('left')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="font-mono text-xs text-luxury-gold mb-6 tracking-widest leading-none">THE BIG PICTURE (H4)</div>
            
            <div className="relative h-[200px] w-full mb-8">
              <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none" className="overflow-visible">
                {/* Completed Waves 1, 2, 3 */}
                <polyline points="20,180 60,120 100,150 180,40" fill="none" stroke="#c9a84c" strokeWidth="3" />
                {/* Developing Wave 4 */}
                <polyline points="180,40 240,110" fill="none" stroke="#c9a84c" strokeWidth="3" strokeDasharray="6 4" />
                {/* Projected Wave 5 */}
                <polyline points="240,110 290,20" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="2" strokeDasharray="2 4" />
                
                {/* Labels */}
                <text x="50" y="110" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="monospace">1</text>
                <text x="90" y="165" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="monospace">2</text>
                <text x="170" y="30" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="monospace">3</text>
                <text x="240" y="125" fill="#c9a84c" fontSize="12" fontFamily="monospace">4?</text>

                {/* We're Here Bracket */}
                <path d="M 175,20 L 175,10 L 245,10 L 245,20" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.6"/>
                <text x="210" y="-2" fill="#c9a84c" fontSize="10" fontFamily="sans-serif" textAnchor="middle" opacity="0.9">We're HERE</text>
              </svg>
            </div>

            <p className="font-sans text-xs text-vanta-300 leading-relaxed border-l-2 border-luxury-gold/50 pl-4">
              BIG tells you <strong className="text-white">DIRECTION</strong> → Bullish.<br/>
              Currently in Wave 4 correction.
            </p>
          </div>

          {/* ARROW OVERLAY */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-vanta-900 border border-white/10 rounded-full flex items-center justify-center text-luxury-gold cursor-help transition-all duration-300 hover:scale-110 hover:border-luxury-gold/50 hover:bg-luxury-gold/10 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
            onMouseEnter={() => setHoveredPanel('arrow')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>

          {/* RIGHT PANEL - SUB PICTURE */}
          <div 
            className={`flex-1 p-8 transition-colors duration-500 relative overflow-hidden ${hoveredPanel === 'right' ? 'bg-[#8a9bb5]/[0.05]' : 'bg-[#8a9bb5]/[0.02]'}`}
            onMouseEnter={() => setHoveredPanel('right')}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <div className="font-mono text-xs text-[#8a9bb5] mb-6 tracking-widest leading-none">THE SUB PICTURE (H1)</div>
            
            <div className="relative h-[200px] w-full mb-8">
              <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none" className="overflow-visible">
                {/* Zoomed in Wave 4 ABC */}
                <polyline points="20,20 120,140 180,80" fill="none" stroke="#8a9bb5" strokeWidth="3" />
                <polyline points="180,80 270,170" fill="none" stroke="#8a9bb5" strokeWidth="3" strokeDasharray="6 4" />
                
                {/* Labels */}
                <text x="70" y="80" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="monospace">A</text>
                <text x="175" y="70" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="monospace">B</text>
                <text x="220" y="135" fill="#8a9bb5" fontSize="12" fontFamily="monospace">C?</text>

                {/* Entry Target Box */}
                <rect x="250" y="160" width="40" height="30" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="270" y="205" fill="#c9a84c" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Long Entry Zone</text>
              </svg>
            </div>

            <p className="font-sans text-xs text-vanta-300 leading-relaxed border-l-2 border-[#8a9bb5]/50 pl-4">
              SUB tells you <strong className="text-white">TIMING</strong> → ABC developing.<br/>
              When C finishes = safe entry zone.
            </p>
          </div>

        </div>
        <div className="bg-black/40 px-8 py-5 border-t border-white/5">
           <p className="font-sans text-sm text-vanta-400 text-center italic m-0">
             "H4 tells you what's happening. H1 tells you when to act. Always check both."
           </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 3.4: FIND THE WAVES EXERCISE ---
export function FindTheWaves() {
  const [markers, setMarkers] = useState<{ x: number; y: number; label: string; isCorrect?: boolean }[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  
  // A realistic looking price path
  const pathData = "M 20,280 L 45,260 L 55,270 L 80,180 L 100,210 L 115,200 L 130,220 L 190,40 L 210,70 L 230,50 L 250,90 L 280,30 L 320,150 L 360,90 L 410,240 L 440,220 L 470,250";
  
  // The correct wave points on the path (simplified mapping for exercise)
  const correctPoints = [
    { x: 80, y: 180, label: '1' },
    { x: 130, y: 220, label: '2' },
    { x: 190, y: 40, label: '3' },
    { x: 250, y: 90, label: '4' },
    { x: 280, y: 30, label: '5' },
    { x: 320, y: 150, label: 'A' },
    { x: 360, y: 90, label: 'B' },
    { x: 410, y: 240, label: 'C' },
  ];

  const waveLabels = ['1', '2', '3', '4', '5', 'A', 'B', 'C'];

  const handleChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (showAnswers || markers.length >= 8) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking near an existing marker to remove it
    const existingIdx = markers.findIndex(m => Math.hypot(m.x - x, m.y - y) < 20);
    if (existingIdx >= 0) {
      setMarkers(markers.filter((_, i) => i !== existingIdx));
      return;
    }

    const nextLabel = waveLabels[markers.length];
    setMarkers([...markers, { x, y, label: nextLabel }]);
  };

  const handleCheck = () => {
    if (markers.length === 0) return;
    
    // Simple proximity check for correct answers
    const checked = markers.map(m => {
      // Find closest correct point
      let minDistance = Infinity;
      let closestPt = null;
      for (const cp of correctPoints) {
        const dist = Math.hypot(cp.x - m.x, cp.y - m.y);
        if (dist < minDistance) {
          minDistance = dist;
          closestPt = cp;
        }
      }
      return {
        ...m,
        isCorrect: minDistance < 30 && closestPt?.label === m.label
      };
    });
    setMarkers(checked);
  };

  const score = markers.filter(m => m.isCorrect).length;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-luxury-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Exercise 3.1 — Find the Waves
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/30 px-3 py-1 rounded-sm">
            Exercise
          </span>
        </div>

        <div className="p-8">
          <div className="w-full max-w-[620px] mx-auto bg-vanta-900 border border-white/10 rounded-xl overflow-hidden mb-8 relative select-none">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <svg 
              width="100%" 
              height="350" 
              viewBox="0 0 500 350" 
              className="relative z-10 cursor-crosshair"
              onClick={handleChartClick}
            >
              {/* The Price Line */}
              <path d={pathData} fill="none" stroke="#e8e6e1" strokeWidth="2" strokeLinejoin="round" />

              {/* Show Answers */}
              <AnimatePresence>
                {showAnswers && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Connecting lines for answers */}
                    <polyline points="20,280 80,180 130,220 190,40 250,90 280,30" fill="none" stroke="#c9a84c" strokeWidth="2" opacity="0.6" />
                    <polyline points="280,30 320,150 360,90 410,240" fill="none" stroke="#8a9bb5" strokeWidth="2" opacity="0.6" />
                    
                    {correctPoints.map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="6" fill={i < 5 ? "#c9a84c" : "#8a9bb5"} />
                        <text x={pt.x} y={pt.y - 12} fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* User Markers */}
              {!showAnswers && markers.map((m, i) => (
                <g key={i} className="pointer-events-none">
                  <circle 
                    cx={m.x} 
                    cy={m.y} 
                    r="8" 
                    fill={m.isCorrect === undefined ? "#fff" : m.isCorrect ? "#27ae60" : "#c0392b"} 
                    className="transition-colors duration-300"
                  />
                  <text 
                    x={m.x} 
                    y={m.y + 4} 
                    fill="#000" 
                    fontSize="10" 
                    fontFamily="sans-serif" 
                    textAnchor="middle" 
                    fontWeight="bold"
                  >
                    {m.label}
                  </text>
                  {m.isCorrect !== undefined && (
                    <text x={m.x + 12} y={m.y - 12} fill={m.isCorrect ? "#27ae60" : "#c0392b"} fontSize="14" fontWeight="bold">
                      {m.isCorrect ? '✓' : '✗'}
                    </text>
                  )}
                </g>
              ))}
            </svg>

            {/* Hint Overlay */}
            {markers.length === 0 && !showAnswers && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-vanta-400 font-sans text-sm border border-white/5 shadow-2xl">
                  Click the major turning points on the chart
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="font-sans text-sm text-vanta-300 mt-0 text-center max-w-lg">
              Click on the chart where you think each wave starts and ends. Label them 1, 2, 3, 4, 5, A, B, C.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleCheck}
                disabled={markers.length === 0 || showAnswers}
                className="px-6 py-2.5 border border-luxury-gold text-luxury-gold font-sans text-xs uppercase tracking-widest rounded hover:bg-luxury-gold/10 transition-colors disabled:opacity-30 disabled:border-vanta-600 disabled:text-vanta-600"
              >
                Check
              </button>
              <button 
                onClick={() => setShowAnswers(true)}
                disabled={showAnswers}
                className="px-6 py-2.5 border border-white/20 text-white font-sans text-xs uppercase tracking-widest rounded hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                Show Answer
              </button>
              <button 
                onClick={() => { setMarkers([]); setShowAnswers(false); }}
                className="px-6 py-2.5 border border-white/20 text-white font-sans text-xs uppercase tracking-widest rounded hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
            </div>

            {markers.length > 0 && markers[0].isCorrect !== undefined && !showAnswers && (
              <div className="mt-4 font-mono text-xs text-vanta-300">
                Score: <strong className={score === 8 ? "text-emerald-400" : "text-white"}>{score} of {markers.length}</strong> identified correctly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
