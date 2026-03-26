import { useState } from 'react';

// --- COMPONENT 10.1: THE SCENARIO MATRIX ---
export function TheScenarioMatrix() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const branches = [
    {
      id: "PRIMARY",
      angle: -30, // top right
      length: 180,
      color: "text-luxury-gold",
      lineColor: "stroke-luxury-gold",
      bgColor: "bg-luxury-gold/[0.15]",
      label: "PRIMARY COUNT",
      trigger: "Normal progression",
      desc: "Primary. Most likely path. Entry at POC, Stop below W4, Target at 161.8%. Confirmed by explosive thrust."
    },
    {
      id: "ALTERNATE",
      angle: 30, // bottom right
      length: 180,
      color: "text-[#8a9bb5]",
      lineColor: "stroke-[#8a9bb5]/60",
      bgColor: "bg-[#8a9bb5]/[0.1]",
      label: "ALTERNATE COUNT",
      trigger: "Deep W2 retrace",
      desc: "Alternate. Active if W2 drops past 61.8%. Entry shifts lower, Stop stays below WB. Still tradeable."
    },
    {
      id: "MUTATION",
      angle: -150, // top left
      length: 180,
      color: "text-blue-400",
      lineColor: "stroke-blue-400/60",
      bgColor: "bg-blue-400/[0.1]",
      label: "MUTATION",
      trigger: "Pattern extends",
      desc: "Mutation. Pattern extending into double zigzag. Wait for clarity. Recalculate when x-wave finishes."
    },
    {
      id: "INVALIDATION",
      angle: 150, // bottom left
      length: 180,
      color: "text-red-500",
      lineColor: "stroke-red-500/60",
      bgColor: "bg-red-500/[0.1]",
      label: "INVALIDATION",
      trigger: "Critical overlap",
      desc: "Invalid. Overlap rule broken. Exit everything immediately. Step down timeframe. Restart Protocol."
    }
  ];

  return (
    <div className="my-16">
      <div className="glassmorphism-card border-white/5 overflow-hidden w-full relative">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span className="font-sans text-[11px] uppercase tracking-[2px] text-vanta-500">
            Figure 10.1 — Scenario Matrix
          </span>
          <span className="font-sans text-[9px] uppercase tracking-widest text-luxury-gold border border-luxury-gold/30 px-2 py-1 rounded">
            Interactive
          </span>
        </div>

        <div className="p-4 md:p-8 flex flex-col items-center">
          
          <div className="relative w-full max-w-[700px] h-[450px] bg-vanta-900 border border-white/5 rounded-xl overflow-hidden shadow-inset flex items-center justify-center">
             
             {/* Center = 0,0 for ease of reasoning */}
             <div className="absolute top-1/2 left-1/2">
                
                {/* Branches */}
                {branches.map((b) => {
                  const isHovered = hoveredNode === b.id;
                  const isDimmed = hoveredNode !== null && hoveredNode !== b.id;
                  
                  const rad = b.angle * (Math.PI / 180);
                  const x2 = Math.cos(rad) * b.length;
                  const y2 = Math.sin(rad) * b.length;
                  
                  // Label wrapper positioning
                  const labelRadius = b.length + 80;
                  const lx = Math.cos(rad) * labelRadius;
                  const ly = Math.sin(rad) * labelRadius;

                  return (
                    <div key={b.id} className={`absolute inset-0 transition-opacity duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}>
                      {/* Line */}
                      <svg className="absolute overflow-visible" style={{ pointerEvents: 'none' }}>
                         <line x1="0" y1="0" x2={x2} y2={y2} stroke="currentColor" strokeWidth={isHovered ? 3 : 1} className={b.lineColor} />
                         {/* Trigger text on line */}
                         <text 
                           x={x2 * 0.5} y={(y2 * 0.5) - 10} 
                           fill="white" fontSize="10" textAnchor="middle" 
                           fontFamily="sans-serif"
                           className={`transition-all duration-300 ${isHovered ? 'fill-white font-bold' : 'fill-vanta-500'}`}
                         >
                           {b.trigger}
                         </text>
                      </svg>

                      {/* Node Box */}
                      <div 
                         className={`absolute border rounded-lg p-4 cursor-pointer backdrop-blur-md transition-all duration-300 w-[180px] -translate-x-1/2 -translate-y-1/2 ${
                           isHovered ? `border-current shadow-lg scale-110 z-20 ${b.bgColor}` : 'border-white/10 bg-black/60 scale-100 z-10 hover:border-white/30'
                         } ${b.color}`}
                         style={{ left: lx, top: ly }}
                         onMouseEnter={() => setHoveredNode(b.id)}
                         onMouseLeave={() => setHoveredNode(null)}
                      >
                         <h4 className="font-mono text-xs font-bold mb-2 tracking-widest">{b.label}</h4>
                         <p className="font-sans text-[10px] text-white/80 leading-relaxed overflow-hidden" style={{ maxHeight: isHovered ? '100px' : '30px', transition: 'max-height 0.3s ease' }}>
                           {b.desc}
                         </p>
                      </div>
                    </div>
                  );
                })}

                {/* Center Node */}
                <div 
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-luxury-gold bg-black flex flex-col items-center justify-center p-4 text-center z-30 shadow-[0_0_30px_rgba(201,168,76,0.15)] transition-all duration-500 ${
                    hoveredNode === null ? 'shadow-[0_0_50px_rgba(201,168,76,0.3)] scale-105' : 'scale-95 border-white/20'
                  }`}
                  onMouseEnter={() => setHoveredNode(null)}
                >
                  <div className="font-sans text-[10px] text-vanta-400 tracking-widest uppercase mb-2">Step 1</div>
                  <div className="font-mono text-sm font-bold text-luxury-gold leading-tight">CONFIRMED<br/>STRUCTURE</div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
