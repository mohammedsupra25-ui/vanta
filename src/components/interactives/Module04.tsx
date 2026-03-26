import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT 4.1: THE SEVEN RULES ---
export function SevenRules() {
  const [activeRule, setActiveRule] = useState<number | 'all' | null>(null);

  const rules = [
    {
      id: 1,
      title: "Five segments present",
      description: "A valid impulsive wave must have exactly five internal sub-waves. Not three, not seven.",
      highlight: 'all' // We'll highlight all segments
    },
    {
      id: 2,
      title: "Three thrust same direction",
      description: "Waves 1, 3, and 5 must all advance in the primary direction of the larger trend.",
      highlight: 'thrust' // We'll highlight 1, 3, 5
    },
    {
      id: 3,
      title: "Wave 2 ≠ all of Wave 1",
      description: "Wave 2 can retrace deeply, but it must never move completely beyond the starting point of Wave 1.",
      highlight: 'w2-limit'
    },
    {
      id: 4,
      title: "Wave 3 > Wave 2",
      description: "The length of Wave 3 must exceed the distance traveled by Wave 2. If it's shorter, it's not Wave 3.",
      highlight: 'w3-w2'
    },
    {
      id: 5,
      title: "Wave 4 ≠ all of Wave 3",
      description: "Often called the 'Overlap Rule'. The bottom of Wave 4 cannot drop into the price territory of Wave 2.",
      highlight: 'overlap'
    },
    {
      id: 6,
      title: "Wave 5 ≥ 38.2% of Wave 4",
      description: "Wave 5 must have some substantive size. It must retrace at least 38.2% of Wave 4's length.",
      highlight: 'w5-w4'
    },
    {
      id: 7,
      title: "Wave 3 ≠ shortest",
      description: "Of the three thrusting waves (1, 3, 5), Wave 3 can never be the shortest. It doesn't have to be the longest, but it cannot be the shortest.",
      highlight: 'no-shortest'
    }
  ];

  const renderHighlights = () => {
    // Determine opacity of base chart
    const baseOpacity = activeRule === null || activeRule === 'all' ? 1 : 0.3;
    
    return (
      <svg width="100%" height="320" viewBox="0 0 500 320" className="overflow-visible">
        {/* Base 5-wave diagram */}
        <g stroke="#c9a84c" strokeWidth="3" fill="none" opacity={baseOpacity} className="transition-opacity duration-300">
          <polyline points="40,280 120,180" /> {/* W1 */}
          <polyline points="120,180 160,240" stroke="#8a9bb5" /> {/* W2 */}
          <polyline points="160,240 320,60" /> {/* W3 */}
          <polyline points="320,60 380,140" stroke="#8a9bb5" /> {/* W4 */}
          <polyline points="380,140 450,40" /> {/* W5 */}
        </g>
        
        {/* Labels Base */}
        <g opacity={baseOpacity} className="transition-opacity duration-300" fontSize="12" fontFamily="monospace" fill="rgba(255,255,255,0.7)">
          <text x="110" y="170">1</text>
          <text x="150" y="260">2</text>
          <text x="310" y="50">3</text>
          <text x="370" y="160">4</text>
          <text x="440" y="30">5</text>
        </g>

        {/* Dynamic Highlights */}
        {activeRule !== 'all' && activeRule !== null && (
          <g className="animate-in fade-in duration-300">
            {rules[activeRule - 1].highlight === 'all' && (
              <g stroke="#c9a84c" strokeWidth="4" fill="none">
                <polyline points="40,280 120,180 160,240 320,60 380,140 450,40" />
                <text x="240" y="20" fill="white" stroke="none" textAnchor="middle" fontSize="11" fontFamily="sans-serif">Five clear segments</text>
              </g>
            )}
            
            {rules[activeRule - 1].highlight === 'thrust' && (
              <g stroke="#c9a84c" strokeWidth="4" fill="none">
                <polyline points="40,280 120,180" />
                <polyline points="160,240 320,60" />
                <polyline points="380,140 450,40" />
                <text x="240" y="20" fill="white" stroke="none" textAnchor="middle" fontSize="11">All advancing upwards</text>
              </g>
            )}

            {rules[activeRule - 1].highlight === 'w2-limit' && (
              <g>
                <polyline points="120,180 160,240" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                <line x1="20" y1="280" x2="200" y2="280" stroke="#c0392b" strokeWidth="2" strokeDasharray="4 4" />
                <text x="180" y="275" fill="#c0392b" fontSize="11" fontFamily="sans-serif">Wave 1 Start (Invalidation Limit)</text>
              </g>
            )}

            {rules[activeRule - 1].highlight === 'w3-w2' && (
              <g>
                <polyline points="160,240 320,60" stroke="#c9a84c" strokeWidth="4" fill="none" />
                <polyline points="120,180 160,240" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                <path d="M 240,60 L 250,60 L 250,240 L 240,240" fill="none" stroke="white" opacity="0.5" />
                <text x="260" y="150" fill="white" fontSize="11">W3 visibly much larger than W2</text>
              </g>
            )}

            {rules[activeRule - 1].highlight === 'overlap' && (
              <g>
                <polyline points="320,60 380,140" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                <line x1="100" y1="180" x2="480" y2="180" stroke="#c0392b" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="360" y="140" width="40" height="40" fill="rgba(192,57,43,0.2)" />
                <text x="400" y="200" fill="#c0392b" fontSize="11">Wave 1 Peak (Overlap limit)</text>
              </g>
            )}

            {rules[activeRule - 1].highlight === 'w5-w4' && (
              <g>
                <polyline points="380,140 450,40" stroke="#c9a84c" strokeWidth="4" fill="none" />
                <polyline points="320,60 380,140" stroke="#8a9bb5" strokeWidth="4" fill="none" />
                <text x="400" y="100" fill="white" fontSize="11">W5 pushes well beyond 38%</text>
              </g>
            )}

            {rules[activeRule - 1].highlight === 'no-shortest' && (
              <g>
                <polyline points="40,280 120,180" stroke="#c9a84c" strokeWidth="4" fill="none" />
                <polyline points="160,240 320,60" stroke="#ffffff" strokeWidth="5" fill="none" />
                <polyline points="380,140 450,40" stroke="#c9a84c" strokeWidth="4" fill="none" />
                <text x="180" y="40" fill="white" fontSize="11">W3 is the longest (clearly not shortest)</text>
              </g>
            )}
          </g>
        )}
        
        {/* ALL mode checkmarks */}
        {activeRule === 'all' && (
          <g>
            <text x="100" y="230" fill="#27ae60" fontSize="16" fontWeight="bold">✓</text>
            <text x="240" y="140" fill="#27ae60" fontSize="16" fontWeight="bold">✓</text>
            <text x="360" y="100" fill="#27ae60" fontSize="16" fontWeight="bold">✓</text>
            <text x="180" y="275" fill="#27ae60" fontSize="12">✓ Safe</text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 4.1 — The Seven Rules
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="flex flex-col lg:flex-row border-b border-white/5">
          {/* Main Chart Area */}
          <div className="flex-[2] p-8 border-r border-white/5 relative bg-vanta-900 flex items-center justify-center">
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative z-10 w-full max-w-[500px]">
              {renderHighlights()}
            </div>
          </div>

          {/* Rules List Area */}
          <div className="flex-1 p-6 bg-white/[0.02]">
            <div className="font-mono text-[10px] text-vanta-500 uppercase tracking-widest mb-4 flex justify-between items-center">
              <span>Impulse Rules</span>
              <button 
                onClick={() => setActiveRule(activeRule === 'all' ? null : 'all')}
                className={`px-3 py-1 rounded-sm border transition-colors ${activeRule === 'all' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/10' : 'border-white/10 text-vanta-300 hover:text-white hover:border-white/30'}`}
              >
                ALL
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {rules.map((rule) => {
                const isActive = activeRule === rule.id;
                return (
                  <button
                    key={rule.id}
                    onClick={() => setActiveRule(isActive ? null : rule.id)}
                    className={`text-left p-3 rounded-lg border transition-all duration-300 flex items-start gap-4 ${
                      isActive 
                        ? 'border-luxury-gold bg-luxury-gold/[0.08] shadow-[0_0_15px_rgba(201,168,76,0.1)]' 
                        : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`font-mono text-sm mt-0.5 ${isActive ? 'text-luxury-gold' : 'text-vanta-500'}`}>
                      {rule.id}.
                    </span>
                    <div>
                      <span className={`block font-sans text-[13px] font-bold ${isActive ? 'text-white' : 'text-vanta-300'}`}>
                        {rule.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description Panel */}
        <div className="h-24 bg-black/40 px-8 py-5 flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeRule !== null ? activeRule.toString() : 'empty'}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -5 }}
               className="text-center"
             >
               {activeRule === null && (
                 <span className="font-sans text-sm text-vanta-500">
                   Click any rule to see it applied on the chart.
                 </span>
               )}
               {activeRule === 'all' && (
                 <span className="font-sans text-sm text-emerald-400">
                   When all seven rules are satisfied, the impulse is geometrically validated.
                 </span>
               )}
               {typeof activeRule === 'number' && (
                 <span className="font-sans text-sm text-vanta-200">
                   {rules[activeRule - 1].description}
                 </span>
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 4.2: SPOT THE VIOLATION EXERCISE ---
export function SpotTheViolation() {
  const diagrams = [
    {
      id: "A",
      correctAnswer: "Rule 7", // Wave 3 is shortest
      title: "Diagram A",
      points: "40,160 80,110 100,130 140,105 160,115 200,80",
      description: "W3 shortest"
    },
    {
      id: "B",
      correctAnswer: "Rule 5", // Overlap (Wave 4 drops into Wave 1)
      title: "Diagram B",
      points: "40,160 80,80 120,130 160,40 180,140 220,20",
      description: "W4 overlaps W1"
    },
    {
      id: "C",
      correctAnswer: "Rule 3", // Wave 2 drops below start
      title: "Diagram C",
      points: "40,120 100,70 140,140 180,40 200,60 240,20",
      description: "W2 drops below start"
    },
    {
      id: "D",
      correctAnswer: "Valid ✓", // Perfectly valid
      title: "Diagram D",
      points: "40,160 80,100 110,120 170,40 200,70 240,20",
      description: "Valid"
    }
  ];

  const ruleOptions = [
    "Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5", "Rule 6", "Rule 7", "Valid ✓"
  ];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSelect = (diagId: string, value: string) => {
    if (isChecked) return;
    setAnswers(prev => ({ ...prev, [diagId]: value }));
  };

  const handleCheckAll = () => {
    setIsChecked(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsChecked(false);
  };

  const score = Object.keys(answers).filter(k => answers[k] === diagrams.find(d => d.id === k)?.correctAnswer).length;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-luxury-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Exercise 4.1 — Spot the Violation
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/30 px-3 py-1 rounded-sm">
            Exercise
          </span>
        </div>

        <div className="p-8">
          <p className="font-sans text-sm text-vanta-300 text-center mb-10 max-w-lg mx-auto">
            Three of these patterns violate one of the seven rules. One is a valid impulse. Select the broken rule for each (or Valid).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {diagrams.map((diag) => {
              const selected = answers[diag.id] || "";
              const correct = diag.correctAnswer;
              const isRight = selected === correct;
              
              let borderClass = "border-white/10";
              if (isChecked) {
                borderClass = isRight ? "border-emerald-500/50" : "border-red-500/50";
              }

              return (
                <div key={diag.id} className={`bg-vanta-900 border rounded-xl p-6 relative ${borderClass} transition-colors`}>
                  <div className="font-mono text-sm text-luxury-gold mb-4 relative z-10">{diag.title}</div>
                  
                  {/* The Mini Chart */}
                  <div className="w-full h-[120px] mb-6 flex justify-center items-center relative">
                     {/* Horizontal line marker for start/peak references */}
                     <svg width="260" height="180" viewBox="0 0 260 180" className="absolute">
                       {diag.id === "B" && <line x1="0" y1="80" x2="260" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />}
                       {diag.id === "C" && <line x1="0" y1="120" x2="260" y2="120" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />}
                       
                       <polyline points={diag.points} stroke={isChecked && isRight ? "#27ae60" : "#c9a84c"} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                       
                       {/* Labels */}
                       <text x="75" y="15" fill="rgba(255,255,255,0.3)" fontSize="10">1</text>
                       <text x="160" y="25" fill="rgba(255,255,255,0.3)" fontSize="10">3</text>
                     </svg>
                  </div>

                  {/* Dropdown / Output */}
                  <div className="relative z-10">
                    <select 
                      value={selected}
                      onChange={(e) => handleSelect(diag.id, e.target.value)}
                      disabled={isChecked}
                      className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-2 text-sm text-white font-sans outline-none focus:border-luxury-gold disabled:opacity-80"
                    >
                      <option value="" disabled>Select violation...</option>
                      {ruleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>

                    {/* Result Overlay */}
                    {isChecked && (
                      <div className={`mt-3 font-sans text-xs flex justify-between items-center px-2 py-1.5 rounded bg-black/50 ${isRight ? 'text-emerald-400' : 'text-red-400'}`}>
                        <span>{isRight ? 'Correct ✓' : 'Incorrect ✗'}</span>
                        {!isRight && <span className="text-white opacity-80">Answer: {correct}</span>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-white/5 pt-8">
            <div className="flex gap-4">
              <button 
                onClick={handleCheckAll}
                disabled={Object.keys(answers).length < 4 || isChecked}
                className="btn-primary py-2 px-8 text-xs disabled:opacity-30 disabled:border-white/10 disabled:bg-transparent disabled:text-vanta-500"
              >
                CHECK ALL
              </button>
              {isChecked && (
                <button 
                  onClick={handleReset}
                  className="px-8 py-2 border border-white/20 text-white font-sans text-xs uppercase tracking-widest rounded hover:bg-white/10 transition-colors"
                >
                  TRY AGAIN
                </button>
              )}
            </div>

            {isChecked && (
              <div className="font-mono text-sm">
                Score: <strong className={score === 4 ? "text-emerald-400" : "text-white"}>{score} of 4</strong> correct.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 4.3: THE EXTENSION TEST ---
export function ExtensionTest() {
  const [w1, setW1] = useState(120);
  const [w3, setW3] = useState(120);
  const [w5, setW5] = useState(120);

  // Hardcode W2 and W4 pullbacks for visual stability
  const w2Down = 40;
  const w4Down = 40;

  // Find the longest and next longest
  const waves = [
    { name: 'Wave 1', val: w1 },
    { name: 'Wave 3', val: w3 },
    { name: 'Wave 5', val: w5 }
  ];
  const sorted = [...waves].sort((a,b) => b.val - a.val);
  const longest = sorted[0];
  const nextLongest = sorted[1];
  
  const ratio = (longest.val / nextLongest.val) * 100;
  const hasExtension = ratio >= 161.8;

  // Calculate coordinates for SVG
  const startX = 50;
  const startY = 320;
  const dx = 40; // horizontal step per wave part
  
  const p1y = startY - w1;
  const p2y = p1y + w2Down;
  const p3y = p2y - w3;
  const p4y = p3y + w4Down;
  const p5y = p4y - w5;

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 4.3 — The Extension Test
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center">
            
            {/* Presets */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <button onClick={() => { setW1(100); setW3(250); setW5(100); }} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-sans text-vanta-300 hover:text-white uppercase tracking-wider hover:bg-white/5">3rd Extension</button>
              <button onClick={() => { setW1(250); setW3(140); setW5(100); }} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-sans text-vanta-300 hover:text-white uppercase tracking-wider hover:bg-white/5">1st Extension</button>
              <button onClick={() => { setW1(100); setW3(120); setW5(250); }} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-sans text-vanta-300 hover:text-white uppercase tracking-wider hover:bg-white/5">5th Extension</button>
              <button onClick={() => { setW1(120); setW3(130); setW5(120); }} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-sans text-vanta-400 opacity-60 hover:opacity-100 uppercase tracking-wider hover:bg-white/5">No Extension</button>
            </div>

            {/* Result Area */}
            <div className={`w-full max-w-[620px] p-4 rounded-xl border mb-8 flex justify-between items-center transition-colors ${
              hasExtension ? 'bg-luxury-gold/10 border-luxury-gold/40 shadow-[0_0_20px_rgba(201,168,76,0.15)]' : 'bg-red-500/10 border-red-500/40 shadow-[0_0_20px_rgba(192,57,43,0.1)]'
            }`}>
              <div className="font-sans text-sm font-bold text-white">
                {longest.name} is {ratio.toFixed(1)}% of {nextLongest.name}
              </div>
              <div className={`px-3 py-1 text-xs font-sans uppercase tracking-[2px] font-bold rounded ${hasExtension ? 'text-luxury-gold' : 'text-red-400'}`}>
                {hasExtension ? '✓ EXTENSION FOUND' : '✗ NO EXTENSION'}
              </div>
            </div>

            {/* Chart */}
            <div className="relative w-full max-w-[620px] h-[340px] border border-white/5 rounded-xl bg-vanta-900 overflow-hidden flex items-end justify-center mb-8">
               <svg width="400" height="340" className="overflow-visible">
                 <polyline points={`
                    ${startX},${startY} 
                    ${startX+dx},${p1y} 
                    ${startX+dx*2},${p2y} 
                    ${startX+dx*3},${p3y} 
                    ${startX+dx*4},${p4y} 
                    ${startX+dx*5},${p5y}
                  `} fill="none" stroke="#e8e6e1" strokeWidth="4" strokeLinejoin="round" />
                 
                 {/* Wave labels */}
                 <text x={startX+dx - 10} y={p1y - 10} fill="#c9a84c" fontSize="12" fontFamily="monospace">1</text>
                 <text x={startX+dx*3 - 10} y={p3y - 10} fill="#c9a84c" fontSize="12" fontFamily="monospace">3</text>
                 <text x={startX+dx*5 - 10} y={p5y - 10} fill="#c9a84c" fontSize="12" fontFamily="monospace">5</text>
                 
                 {/* Visual bracket for longest wave */}
                 {hasExtension && longest.name === 'Wave 3' && (
                   <g>
                     <line x1={startX+dx*2-10} y1={p2y} x2={startX+dx*2-20} y2={p2y} stroke="#c9a84c" />
                     <line x1={startX+dx*3-10} y1={p3y} x2={startX+dx*3-20} y2={p3y} stroke="#c9a84c" />
                     <line x1={startX+dx*2-15} y1={p2y} x2={startX+dx*3-15} y2={p3y} stroke="#c9a84c" strokeDasharray="4 4" />
                     <text x={startX+dx*2 - 80} y={p2y - (p2y-p3y)/2} fill="#c9a84c" fontSize="10">EXTENDED</text>
                   </g>
                 )}
                 {hasExtension && longest.name === 'Wave 1' && (
                   <g>
                     <line x1={startX-10} y1={startY} x2={startX-20} y2={startY} stroke="#c9a84c" />
                     <line x1={startX+dx-10} y1={p1y} x2={startX+dx-20} y2={p1y} stroke="#c9a84c" />
                     <line x1={startX-15} y1={startY} x2={startX+dx-15} y2={p1y} stroke="#c9a84c" strokeDasharray="4 4" />
                     <text x={startX-70} y={startY - (startY-p1y)/2} fill="#c9a84c" fontSize="10">EXTENDED</text>
                   </g>
                 )}
                 {hasExtension && longest.name === 'Wave 5' && (
                   <g>
                     <line x1={startX+dx*4-10} y1={p4y} x2={startX+dx*4-20} y2={p4y} stroke="#c9a84c" />
                     <line x1={startX+dx*5-10} y1={p5y} x2={startX+dx*5-20} y2={p5y} stroke="#c9a84c" />
                     <line x1={startX+dx*4-15} y1={p4y} x2={startX+dx*5-15} y2={p5y} stroke="#c9a84c" strokeDasharray="4 4" />
                     <text x={startX+dx*4 - 70} y={p4y - (p4y-p5y)/2} fill="#c9a84c" fontSize="10">EXTENDED</text>
                   </g>
                 )}
               </svg>
            </div>

            {/* Sliders Area */}
            <div className="w-full max-w-[620px] flex gap-8 justify-between">
              {[
                { label: 'Wave 1 Size', val: w1, set: setW1 },
                { label: 'Wave 3 Size', val: w3, set: setW3 },
                { label: 'Wave 5 Size', val: w5, set: setW5 }
              ].map(slider => (
                <div key={slider.label} className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between font-mono text-xs text-vanta-400">
                    <span>{slider.label}</span>
                    <span className="text-white">{slider.val}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="280" 
                    value={slider.val}
                    onChange={(e) => slider.set(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-luxury-gold [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              ))}
            </div>

          </div>
          <p className="font-sans text-sm text-vanta-400 text-center mt-12 italic max-w-lg mx-auto">
            "Drag the sliders. If no wave reaches 161.8% of the next longest — it's not an impulse."
          </p>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 4.4: ALTERNATION CHECK ---
export function AlternationCheck() {
  const [mode, setMode] = useState<'real' | 'none'>('real');

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 4.4 — Alternation Check
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setMode('real')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                mode === 'real'
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30'
                  : 'text-vanta-400 hover:text-white border border-transparent'
              }`}
            >
              Real Alternation
            </button>
            <button
              onClick={() => setMode('none')}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                mode === 'none'
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'text-vanta-400 hover:text-white border border-transparent'
              }`}
            >
              No Alternation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Wave 2 Panel */}
            <div className={`p-6 bg-vanta-900 border rounded-xl transition-all duration-500 ${mode === 'real' ? 'border-luxury-gold/30' : 'border-red-500/30'}`}>
              <div className="font-sans text-[10px] text-vanta-400 uppercase tracking-[3px] mb-6">Wave 2</div>
              <div className="h-[100px] flex items-center justify-center mb-6">
                <svg width="150" height="80" className="overflow-visible">
                  {/* Sharp Zigzag */}
                  <polyline points="20,20 75,70 130,20" stroke="#8a9bb5" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <p className="font-mono text-sm text-center text-white">
                Zigzag. Sharp.<br/>
                <span className="text-vanta-400">50% retrace. 4 hours.</span>
              </p>
            </div>

            {/* Wave 4 Panel */}
            <div className={`p-6 bg-vanta-900 border rounded-xl transition-all duration-500 ${mode === 'real' ? 'border-luxury-gold/30' : 'border-red-500/30'}`}>
              <div className="font-sans text-[10px] text-vanta-400 uppercase tracking-[3px] mb-6">Wave 4</div>
              <div className="h-[100px] flex items-center justify-center mb-6">
                <svg width="150" height="80" className="overflow-visible transition-all duration-500">
                  {mode === 'real' ? (
                    /* Sideways Flat */
                    <polyline points="20,20 60,60 100,10 140,60" stroke="#8a9bb5" strokeWidth="3" fill="none" />
                  ) : (
                    /* Same Sharp Zigzag again */
                    <polyline points="20,20 75,65 130,20" stroke="#8a9bb5" strokeWidth="3" fill="none" />
                  )}
                </svg>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-sm text-center text-white"
                >
                  {mode === 'real' ? (
                    <>
                      Flat. Slow.<br/>
                      <span className="text-vanta-400">30% retrace. 12 hours.</span>
                    </>
                  ) : (
                    <>
                      Zigzag. Sharp.<br/>
                      <span className="text-vanta-400">45% retrace. 5 hours.</span>
                    </>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full max-w-[500px] mx-auto bg-black/50 p-6 rounded-lg border border-white/5">
            <h4 className="font-sans text-xs uppercase tracking-widest text-vanta-500 mb-4 text-center">Alternation Checklist</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Price / Depth', real: true },
                { name: 'Time Duration', real: true },
                { name: 'Severity', real: true },
                { name: 'Complexity', real: false }, // Flat isn't strictly more complex than a zigzag in basic terms, but let's just make it visually distinct
                { name: 'Pattern Type', real: true }
              ].map((item, i) => {
                const checked = mode === 'real' && item.real;
                const failed = mode === 'none';
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors ${checked ? 'bg-emerald-500/20 text-emerald-400' : failed ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-transparent'}`}>
                      {checked || failed ? (checked ? '✓' : '✗') : ''}
                    </div>
                    <span className={`font-mono text-sm ${checked || failed ? 'text-white' : 'text-vanta-500'}`}>{item.name}</span>
                  </div>
                );
              })}
            </div>
            
            <div className={`mt-8 text-center font-sans text-sm font-bold uppercase transition-colors ${mode === 'real' ? 'text-emerald-400' : 'text-red-400'}`}>
               {mode === 'real' ? '✓ Waves alternate — Supports Impulse' : '✗ No alternation — Invalid Impulse'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 4.5: THREE CHANNEL TYPES ---
export function ThreeChannelTypes() {
  const channels = [
    {
      title: "3rd Extension",
      points: "30,140 50,110 70,120 120,40 140,55 170,30",
      upper: "20,130 180,20",
      lower: "50,120 160,50",
      label: "Parallel. Wave 3 is the beast."
    },
    {
      title: "1st Extension",
      points: "30,140 70,60 90,80 120,30 140,45 160,20",
      upper: "20,80 180,10",
      lower: "60,90 180,45",
      label: "Contracting. Wave 1 dominates."
    },
    {
      title: "5th Extension",
      points: "30,140 60,110 80,120 120,80 140,100 180,20",
      upper: "20,130 180,-10",
      lower: "50,120 180,95",
      label: "Expanding. Wave 5 is the monster."
    }
  ];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 4.5 — Three Channel Types
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {channels.map((ch, i) => (
              <div 
                key={i} 
                className="group relative bg-vanta-900 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-luxury-gold/40 hover:bg-luxury-gold/5 flex flex-col items-center"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black border border-luxury-gold/30 px-3 py-2 text-[10px] font-sans text-vanta-200 uppercase tracking-widest rounded shadow-xl whitespace-nowrap z-20">
                  Channel shape reveals the extension
                </div>

                <div className="font-mono text-sm text-luxury-gold mb-8">{ch.title}</div>
                
                <div className="h-[160px] w-[200px] relative mb-6">
                  <svg width="200" height="160" viewBox="0 0 200 160" className="overflow-visible">
                    {/* The lines */}
                    <polyline points={ch.points} fill="none" stroke="#e8e6e1" strokeWidth="3" strokeLinejoin="round" />
                    
                    {/* Trendlines visible on hover */}
                    <line 
                      x1={ch.upper.split(' ')[0].split(',')[0]} 
                      y1={ch.upper.split(' ')[0].split(',')[1]} 
                      x2={ch.upper.split(' ')[1].split(',')[0]} 
                      y2={ch.upper.split(' ')[1].split(',')[1]} 
                      stroke="#c9a84c" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      className="opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <line 
                      x1={ch.lower.split(' ')[0].split(',')[0]} 
                      y1={ch.lower.split(' ')[0].split(',')[1]} 
                      x2={ch.lower.split(' ')[1].split(',')[0]} 
                      y2={ch.lower.split(' ')[1].split(',')[1]} 
                      stroke="#c9a84c" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      className="opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </svg>
                </div>

                <p className="font-sans text-xs text-vanta-300 text-center leading-relaxed h-12">
                  {ch.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
