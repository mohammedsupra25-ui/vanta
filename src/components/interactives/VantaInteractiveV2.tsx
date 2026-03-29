// @ts-nocheck
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════
const C = {
  bg: "#0a0a0f", card: "#0d0d14", border: "rgba(201,168,76,0.12)",
  gold: "#c9a84c", goldBright: "#e8d06a", goldDim: "rgba(201,168,76,0.35)", goldGlow: "rgba(201,168,76,0.08)",
  blue: "#5b9cf5", blueBright: "#7cb8ff", blueDim: "rgba(91,156,245,0.2)", blueGlow: "rgba(91,156,245,0.08)",
  green: "#4ade80", greenDim: "rgba(74,222,128,0.12)",
  red: "#f87171", redDim: "rgba(248,113,113,0.12)",
  white: "#e4e0d8", whiteDim: "rgba(228,224,216,0.6)", muted: "#5a5750", mutedLight: "#7a756c",
};
const F = { mono: "'JetBrains Mono','SF Mono',monospace", serif: "'EB Garamond','Georgia',serif" };

const Card = ({ title, tag, children, tagColor = C.gold }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", width: "100%", maxWidth: 920, margin: "0 auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>{title}</span>
      {tag && <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: tagColor, border: `1px solid ${tagColor}33`, borderRadius: 4, padding: "3px 10px" }}>{tag}</span>}
    </div>
    {children}
  </div>
);

const StepBtn = ({ onClick, children, color = C.gold, disabled = false }) => (
  <button onClick={disabled ? undefined : onClick} style={{
    fontFamily: F.mono, fontSize: 11, letterSpacing: 1, padding: "10px 24px",
    border: `1px solid ${color}`, borderRadius: 6, background: `${color}18`,
    color, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.3 : 1,
    transition: "all 0.3s", whiteSpace: "nowrap",
  }}>{children}</button>
);

// ═══════════════════════════════════════════════════════
// MODULE 3: THE CYCLE — narrated step-by-step
// ═══════════════════════════════════════════════════════
const CycleExplainer = () => {
  const [step, setStep] = useState(0);

  const waves = [
    { pts: [[40, 250]], label: null, msg: null },
    { pts: [[40, 250], [130, 170]], label: "1", color: C.gold, msg: "Wave 1 — the trend begins. Most people don't notice it yet. It's quiet, unassuming. But it's the first sign that something is changing." },
    { pts: [[40, 250], [130, 170], [175, 210]], label: "2", color: C.mutedLight, msg: "Wave 2 — the pullback. Tests whether wave 1 was real. Scary if you're in a trade. But it can't erase wave 1 entirely. If it does, there is no trend." },
    { pts: [[40, 250], [130, 170], [175, 210], [380, 40]], label: "3", color: C.goldBright, msg: "Wave 3 — the engine. This is the move everyone sees. Strongest, longest, most powerful. This is where the money is made. It can't be the shortest of 1, 3, and 5. Ever." },
    { pts: [[40, 250], [130, 170], [175, 210], [380, 40], [440, 110]], label: "4", color: C.mutedLight, msg: "Wave 4 — the pause. The market catches its breath. Frustrating if you're holding from wave 3. But it can't drop into wave 1's territory — if it does, your count is wrong." },
    { pts: [[40, 250], [130, 170], [175, 210], [380, 40], [440, 110], [540, 25]], label: "5", color: C.gold, msg: "Wave 5 — the final push. Last gasp of the trend. Often weaker than wave 3. When this ends, the trend is exhausted. What comes next is the correction." },
    { pts: [[40, 250], [130, 170], [175, 210], [380, 40], [440, 110], [540, 25], [600, 95], [640, 60], [690, 155]], label: "ABC", color: C.blue, msg: "The correction. 5 waves done, trend exhausted. Now the market pulls back — A, B, C. Different shapes, different structures. When THIS finishes, the whole cycle starts again. New wave 1. New cycle." },
  ];

  const s = waves[step];
  const pts = s.pts;

  // Determine which labels to show
  const visibleLabels = waves.slice(1, step + 1);

  return (
    <Card title="Module 3 — The 5-Wave Cycle" tag="STEP BY STEP">
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 720 270" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Subtle grid */}
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`gx${i}`} x1={i * 40} y1="0" x2={i * 40} y2="270" stroke={C.muted} strokeOpacity="0.05" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`gy${i}`} x1="0" y1={i * 40} x2="720" y2={i * 40} stroke={C.muted} strokeOpacity="0.05" />
          ))}

          {/* Wave line */}
          {pts.length > 1 && (
            <polyline
              points={pts.map(p => p.join(",")).join(" ")}
              fill="none"
              stroke={step === 6 ? C.blue : C.gold}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "all 0.6s ease" }}
            />
          )}

          {/* Dots and labels for all visible waves */}
          {visibleLabels.map((w, i) => {
            const waveIndex = i + 1;
            const p = waves[waveIndex].pts[waves[waveIndex].pts.length - 1];
            const isThrust = ["1", "3", "5"].includes(w.label);
            const isCorrection = w.label === "ABC";
            const isCurrent = waveIndex === step;

            // Don't show individual ABC labels
            if (isCorrection) {
              // Show A, B, C labels for the correction
              const corrPts = [[600, 95], [640, 60], [690, 155]];
              const corrLabels = ["A", "B", "C"];
              return corrPts.map((cp, ci) => (
                <g key={`corr${ci}`}>
                  <circle cx={cp[0]} cy={cp[1]} r="4" fill={C.blue} opacity={isCurrent ? 1 : 0.4} style={{ transition: "opacity 0.3s" }} />
                  <text x={cp[0]} y={ci === 1 ? cp[1] - 14 : cp[1] + 20} textAnchor="middle"
                    fontFamily={F.mono} fontSize="14" fontWeight="700" fill={C.blue}
                    opacity={isCurrent ? 1 : 0.4} style={{ transition: "opacity 0.3s" }}>
                    {corrLabels[ci]}
                  </text>
                </g>
              ));
            }

            return (
              <g key={i}>
                {/* Outer ring */}
                <circle cx={p[0]} cy={p[1]} r={isCurrent ? 14 : 8}
                  fill="none" stroke={w.color} strokeWidth="1" opacity={isCurrent ? 0.4 : 0.15}
                  style={{ transition: "all 0.4s" }} />

                {/* Dot */}
                <circle cx={p[0]} cy={p[1]} r="5"
                  fill={isThrust ? w.color : C.card}
                  stroke={w.color} strokeWidth="2"
                  opacity={isCurrent ? 1 : 0.5}
                  style={{ transition: "all 0.3s" }} />

                {/* Label */}
                <text x={p[0]} y={isThrust ? p[1] - 20 : p[1] + 26}
                  textAnchor="middle" fontFamily={F.mono}
                  fontSize={isCurrent ? 20 : 15} fontWeight="700"
                  fill={w.color} opacity={isCurrent ? 1 : 0.4}
                  style={{ transition: "all 0.3s" }}>
                  {w.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Message */}
        <div style={{
          padding: "20px 0", minHeight: 90,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          {s.msg && (
            <p style={{
              fontFamily: F.serif, fontSize: 16, color: C.white, textAlign: "center",
              lineHeight: 1.7, maxWidth: 640, margin: "0 0 20px",
              opacity: 1, transition: "opacity 0.3s",
            }}>
              {s.msg}
            </p>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {step > 0 && (
              <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>
            )}
            {step === 0 && (
              <StepBtn onClick={() => setStep(1)} color={C.gold}>Watch the cycle →</StepBtn>
            )}
            {step > 0 && step < waves.length - 1 && (
              <StepBtn onClick={() => setStep(step + 1)} color={step === 5 ? C.blue : C.gold}>
                {step === 5 ? "Now the correction →" : "Next wave →"}
              </StepBtn>
            )}
            {step === waves.length - 1 && (
              <StepBtn onClick={() => setStep(0)} color={C.gold}>Watch again</StepBtn>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 4: RULE VIOLATIONS — watch rules break one by one
// ═══════════════════════════════════════════════════════
const RuleViolations = () => {
  const [activeRule, setActiveRule] = useState(null);

  const scenarios = [
    {
      id: "overlap",
      name: "Wave 4 enters Wave 1 territory",
      validPts: [[50, 250], [140, 165], [185, 205], [370, 45], [440, 130], [560, 25]],
      brokenPts: [[50, 250], [140, 165], [185, 205], [370, 45], [440, 215], [560, 25]],
      zone: { y: 165, h: 85 },
      msg: "Wave 4 dropped into wave 1's price range. One pip of overlap and the trending impulse count is dead.",
      rule: "Rule: Wave 4 can NEVER enter Wave 1's price territory in a Trending Impulse.",
    },
    {
      id: "shortest",
      name: "Wave 3 is the shortest",
      validPts: [[50, 250], [130, 190], [170, 215], [350, 45], [410, 110], [530, 30]],
      brokenPts: [[50, 250], [130, 160], [170, 195], [250, 145], [310, 175], [530, 30]],
      zone: null,
      msg: "Wave 3 is shorter than both wave 1 and wave 5. The engine of the trend can't be the weakest move.",
      rule: "Rule: Wave 3 can NEVER be the shortest of waves 1, 3, and 5.",
      highlightW3: true,
    },
    {
      id: "retrace",
      name: "Wave 2 retraces all of Wave 1",
      validPts: [[50, 250], [150, 150], [190, 210], [380, 40], [440, 110], [560, 25]],
      brokenPts: [[50, 250], [150, 150], [190, 260], [380, 40], [440, 110], [560, 25]],
      zone: null,
      msg: "Wave 2 went below the start of wave 1. If it retraces everything, wave 1 never happened. There is no trend start.",
      rule: "Rule: Wave 2 can NEVER retrace 100% or more of Wave 1.",
      highlightW2: true,
    },
  ];

  const active = scenarios.find(s => s.id === activeRule);

  return (
    <Card title="Module 4 — Watch Rules Break" tag="INTERACTIVE">
      <div style={{ padding: "24px" }}>
        {/* Rule selector */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setActiveRule(activeRule === s.id ? null : s.id)} style={{
              fontFamily: F.mono, fontSize: 10, letterSpacing: 0.5, padding: "8px 16px",
              border: `1px solid ${activeRule === s.id ? C.red : C.border}`,
              borderRadius: 6, background: activeRule === s.id ? C.redDim : "transparent",
              color: activeRule === s.id ? C.red : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>
              {s.name}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 620 280" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Grid */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="280" stroke={C.muted} strokeOpacity="0.05" />
          ))}

          {/* Zone for overlap rule */}
          {active?.zone && (
            <rect x="45" y={active.zone.y} width="530" height={active.zone.h} rx="3"
              fill={C.redDim} stroke={C.red} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
          )}
          {active?.zone && (
            <text x="310" y={active.zone.y + active.zone.h + 15} textAnchor="middle"
              fontFamily={F.mono} fontSize="8" letterSpacing="1.5" fill={C.red} opacity="0.5">
              WAVE 1 TERRITORY
            </text>
          )}

          {/* Wave line */}
          {(() => {
            const pts = active ? active.brokenPts : (scenarios[0].validPts);
            const isViolated = !!active;
            return (
              <>
                <polyline
                  points={pts.map(p => p.join(",")).join(" ")}
                  fill="none" stroke={isViolated ? C.red : C.gold}
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: "all 0.5s" }}
                />
                {/* Dots and labels */}
                {pts.slice(1).map((p, i) => {
                  const labels = ["1", "2", "3", "4", "5"];
                  const isThrust = i % 2 === 0;
                  return (
                    <g key={i}>
                      <circle cx={p[0]} cy={p[1]} r="5"
                        fill={isThrust ? (isViolated ? C.red : C.gold) : C.card}
                        stroke={isThrust ? (isViolated ? C.red : C.gold) : C.mutedLight}
                        strokeWidth="2" style={{ transition: "all 0.5s" }} />
                      <text x={p[0]} y={isThrust ? p[1] - 16 : p[1] + 24}
                        textAnchor="middle" fontFamily={F.mono} fontSize="16" fontWeight="700"
                        fill={isThrust ? (isViolated ? C.red : C.gold) : C.mutedLight}
                        style={{ transition: "fill 0.5s" }}>
                        {labels[i]}
                      </text>
                    </g>
                  );
                })}

                {/* Verdict */}
                <rect x="200" y="5" width="220" height="26" rx="5"
                  fill={isViolated ? C.redDim : C.greenDim}
                  style={{ transition: "fill 0.5s" }} />
                <text x="310" y="23" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600"
                  fill={isViolated ? C.red : C.green} style={{ transition: "fill 0.5s" }}>
                  {isViolated ? "✗ RULE VIOLATED" : "✓ ALL RULES PASS"}
                </text>
              </>
            );
          })()}
        </svg>

        {/* Explanation */}
        <div style={{ minHeight: 100, padding: "20px 0", textAlign: "center" }}>
          {active ? (
            <>
              <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.red, lineHeight: 1.7, margin: "0 0 12px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                {active.msg}
              </p>
              <div style={{ display: "inline-block", padding: "8px 16px", borderRadius: 6, background: C.redDim, border: `1px solid ${C.red}22` }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.red, letterSpacing: 0.5 }}>{active.rule}</span>
              </div>
            </>
          ) : (
            <p style={{ fontFamily: F.serif, fontSize: 15, color: C.muted, fontStyle: "italic" }}>
              Click a rule above to see what happens when it breaks.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 6: THE THREE SHAPES — narrated with structure tags
// ═══════════════════════════════════════════════════════
const ShapeExplainer = () => {
  const [shape, setShape] = useState("zigzag");
  const [step, setStep] = useState(0);

  const shapes = {
    zigzag: {
      steps: [
        { pts: [[40, 50], [220, 220]], label: "A", tag: ":5", msg: "Wave A drops sharply. Fast, decisive, impulsive — 5 subwaves inside. This correction means business.", color: C.blue },
        { pts: [[40, 50], [220, 220], [320, 130]], label: "B", tag: ":3", msg: "Wave B bounces — but weakly. It barely retraces 40% of A. Only 3 subwaves inside. This isn't a reversal. It's a dead cat bounce.", color: C.mutedLight },
        { pts: [[40, 50], [220, 220], [320, 130], [500, 270]], label: "C", tag: ":5", msg: "Wave C drives past the end of A. Impulsive again — 5 subwaves inside. Sharp, final push. Correction complete.", color: C.blue },
      ],
      summary: "Zigzag (5-3-5): Fast. Sharp. Gets the correction done and moves on.",
      structure: "5 - 3 - 5",
    },
    flat: {
      steps: [
        { pts: [[40, 60], [200, 180]], label: "A", tag: ":3", msg: "Wave A drops — but not sharply. It's corrective internally, 3 subwaves. Moderate. Almost lazy.", color: C.blue },
        { pts: [[40, 60], [200, 180], [380, 70]], label: "B", tag: ":3", msg: "Wave B bounces almost ALL the way back to where A started. This is what makes a Flat — B retraces most or all of A. Price goes nowhere.", color: C.mutedLight },
        { pts: [[40, 60], [200, 180], [380, 70], [530, 195]], label: "C", tag: ":5", msg: "Wave C pushes down — about equal to A. Impulsive, 5 subwaves. But the net result? Price barely moved. Sideways grind. Flat.", color: C.blue },
      ],
      summary: "Flat (3-3-5): Sideways. Deceptive. Looks like nothing is happening until C hits you.",
      structure: "3 - 3 - 5",
    },
    triangle: {
      steps: [
        { pts: [[30, 80], [130, 200]], label: "A", tag: ":3", msg: "Wave A drops. Moderate size. Corrective internally — 3 subwaves.", color: C.blue },
        { pts: [[30, 80], [130, 200], [240, 95]], label: "B", tag: ":3", msg: "Wave B bounces — but not as high as the start. The range is already contracting.", color: C.mutedLight },
        { pts: [[30, 80], [130, 200], [240, 95], [320, 185]], label: "C", tag: ":3", msg: "Wave C drops — but not as low as A. Each wave is getting smaller. Price is coiling.", color: C.blue },
        { pts: [[30, 80], [130, 200], [240, 95], [320, 185], [390, 115]], label: "D", tag: ":3", msg: "Wave D bounces — smaller than B. The triangle is tightening. Energy is building like a compressed spring.", color: C.mutedLight },
        { pts: [[30, 80], [130, 200], [240, 95], [320, 185], [390, 115], [430, 155]], label: "E", tag: ":3", msg: "Wave E — the smallest. The last move before the explosion. Remember: the thrust follows the PRE-TRIANGLE trend direction, not wave E.", color: C.blue },
        {
          pts: [[30, 80], [130, 200], [240, 95], [320, 185], [390, 115], [430, 155], [530, 30]],
          label: "THRUST", tag: "", msg: "THRUST — the triangle breaks. Energy released. Direction follows the trend BEFORE the triangle, not wave E. Powerful, fast, decisive.",
          color: C.goldBright, isThrust: true,
        },
      ],
      summary: "Triangle (3-3-3-3-3): Coiling energy. Five waves, each smaller. Then — explosion.",
      structure: "3 - 3 - 3 - 3 - 3",
    },
  };

  const sh = shapes[shape];
  const s = sh.steps[step];
  const pts = s.pts;
  const isDone = step === sh.steps.length - 1;

  const switchShape = (newShape) => {
    setShape(newShape);
    setStep(0);
  };

  const showTrendlines = shape === "triangle" && step >= 2;

  return (
    <Card title="Module 6 — The Three Shapes" tag="VISUAL EXPLANATION" tagColor={C.blue}>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {[
            { id: "zigzag", label: "Zigzag (5-3-5)" },
            { id: "flat", label: "Flat (3-3-5)" },
            { id: "triangle", label: "Triangle (3-3-3-3-3)" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => switchShape(id)} style={{
              fontFamily: F.mono, fontSize: 10, letterSpacing: 0.5, padding: "8px 16px",
              border: `1px solid ${shape === id ? C.blue : C.border}`,
              borderRadius: 6, background: shape === id ? C.blueDim : "transparent",
              color: shape === id ? C.blue : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>
              {label}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 580 290" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Grid */}
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="290" stroke={C.muted} strokeOpacity="0.04" />
          ))}

          {/* Triangle trendlines */}
          {showTrendlines && (
            <>
              <line x1="130" y1="200" x2="480" y2="170" stroke={C.muted} strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />
              {step >= 4 && (
                <line x1="240" y1="95" x2="480" y2="105" stroke={C.muted} strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />
              )}
            </>
          )}

          {/* Wave line */}
          <polyline
            points={pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.5s" }}
          />

          {/* Thrust line in gold */}
          {s.isThrust && pts.length >= 2 && (
            <polyline
              points={`${pts[pts.length - 2].join(",")},${pts[pts.length - 1].join(",")}`}
              fill="none" stroke={C.goldBright} strokeWidth="3" strokeLinecap="round"
            />
          )}

          {/* ALL labels up to current step — visible with proper opacity */}
          {sh.steps.slice(0, step + 1).map((stepData, i) => {
            const p = stepData.pts[stepData.pts.length - 1];
            const isCurrent = i === step;
            const isDown = i % 2 === 0;

            if (stepData.label === "THRUST") {
              return (
                <g key={i}>
                  <circle cx={p[0]} cy={p[1]} r="5" fill={C.goldBright} />
                  <text x={p[0]} y={p[1] - 14} textAnchor="middle" fontFamily={F.mono} fontSize="12" fontWeight="700" letterSpacing="2" fill={C.goldBright}>THRUST</text>
                </g>
              );
            }

            return (
              <g key={i} style={{ transition: "opacity 0.3s" }}>
                {/* Outer ring on current */}
                {isCurrent && (
                  <circle cx={p[0]} cy={p[1]} r="14" fill="none" stroke={stepData.color} strokeWidth="1" opacity="0.3" />
                )}

                {/* Dot */}
                <circle cx={p[0]} cy={p[1]} r="5"
                  fill={stepData.color === C.mutedLight ? C.card : stepData.color}
                  stroke={stepData.color} strokeWidth="2"
                  opacity={isCurrent ? 1 : 0.6} />

                {/* Label + structure tag */}
                <text x={p[0]} y={isDown ? p[1] + 26 : p[1] - 18}
                  textAnchor="middle" fontFamily={F.mono}
                  fontSize={isCurrent ? 19 : 15} fontWeight="700"
                  fill={stepData.color} opacity={isCurrent ? 1 : 0.5}>
                  {stepData.label}
                </text>
                {stepData.tag && (
                  <text x={p[0] + (isCurrent ? 16 : 13)} y={isDown ? p[1] + 26 : p[1] - 18}
                    fontFamily={F.mono} fontSize={isCurrent ? 12 : 10} fontWeight="600"
                    fill={stepData.color} opacity={isCurrent ? 0.6 : 0.3}>
                    {stepData.tag}
                  </text>
                )}
              </g>
            );
          })}

          {/* Structure badge on completion */}
          {isDone && (
            <g>
              <rect x="190" y="4" width="200" height="24" rx="5" fill={C.blueDim} />
              <text x="290" y="21" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill={C.blue}>
                {sh.structure}
              </text>
            </g>
          )}
        </svg>

        {/* Narration */}
        <div style={{ padding: "20px 0", textAlign: "center", minHeight: 120 }}>
          <p style={{
            fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7,
            maxWidth: 580, margin: "0 auto 16px",
          }}>
            {s.msg}
          </p>

          {isDone && (
            <div style={{
              display: "inline-block", padding: "8px 20px", borderRadius: 6, marginBottom: 16,
              background: C.blueDim, border: `1px solid ${C.blue}22`,
            }}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.blue }}>{sh.summary}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {!isDone && (
              <StepBtn onClick={() => setStep(step + 1)} color={C.blue}>
                {step === 0 ? "Watch it form →" : "Next wave →"}
              </StepBtn>
            )}
            {isDone && <StepBtn onClick={() => setStep(0)} color={C.blue}>Watch again</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 7: CONFIRMATION — narrated explanation
// ═══════════════════════════════════════════════════════
const ConfirmationExplainer = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      msg: "An impulse just completed — 5 waves done. But is it ACTUALLY done? We need confirmation.",
      pts: [[40, 250], [120, 175], [155, 205], [350, 40], [420, 110], [520, 30]],
      trendline: null, timer: null, verdict: null,
    },
    {
      msg: "Draw the 2-4 trendline — a line through the end of wave 2 and wave 4. This is the confirmation line.",
      pts: [[40, 250], [120, 175], [155, 205], [350, 40], [420, 110], [520, 30]],
      trendline: { x1: 100, y1: 215, x2: 620, y2: 145 }, timer: null, verdict: null,
    },
    {
      msg: "Now the clock starts. The rule: price must break this trendline in equal or less time than wave 5 took to form. Wave 5 took 12 hours. The clock is ticking.",
      pts: [[40, 250], [120, 175], [155, 205], [350, 40], [420, 110], [520, 30], [540, 50], [560, 70]],
      trendline: { x1: 100, y1: 215, x2: 620, y2: 145 }, timer: "12h remaining", verdict: null,
    },
    {
      msg: "Price drops toward the trendline... getting closer... breaks through with 4 hours to spare.",
      pts: [[40, 250], [120, 175], [155, 205], [350, 40], [420, 110], [520, 30], [540, 50], [560, 80], [590, 130], [615, 160]],
      trendline: { x1: 100, y1: 215, x2: 620, y2: 145 }, timer: "4h remaining", verdict: "confirmed",
    },
  ];

  const s = steps[step];

  return (
    <Card title="Module 7 — How Confirmation Works" tag="VISUAL EXPLANATION" tagColor={C.green}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 650 270" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Grid */}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="270" stroke={C.muted} strokeOpacity="0.04" />
          ))}

          {/* Trendline */}
          {s.trendline && (
            <line x1={s.trendline.x1} y1={s.trendline.y1} x2={s.trendline.x2} y2={s.trendline.y2}
              stroke={s.verdict === "confirmed" ? C.green : C.gold}
              strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6"
              style={{ transition: "stroke 0.5s" }} />
          )}
          {s.trendline && (
            <text x={s.trendline.x2 - 5} y={s.trendline.y2 - 8} textAnchor="end"
              fontFamily={F.mono} fontSize="9" fill={s.verdict === "confirmed" ? C.green : C.gold} opacity="0.6">
              2-4 TRENDLINE
            </text>
          )}

          {/* Wave line */}
          <polyline
            points={s.pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.5s" }}
          />

          {/* Post-impulse line in different color */}
          {step >= 2 && (
            <polyline
              points={s.pts.slice(5).map(p => p.join(",")).join(" ")}
              fill="none" stroke={s.verdict === "confirmed" ? C.green : C.blue}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "all 0.5s" }}
            />
          )}

          {/* Wave labels */}
          {["1", "2", "3", "4", "5"].map((label, i) => {
            const p = s.pts[i + 1];
            if (!p) return null;
            const isThrust = i % 2 === 0;
            return (
              <g key={i}>
                <circle cx={p[0]} cy={p[1]} r="4" fill={isThrust ? C.gold : C.card} stroke={isThrust ? C.gold : C.mutedLight} strokeWidth="2" />
                <text x={p[0]} y={isThrust ? p[1] - 14 : p[1] + 22} textAnchor="middle"
                  fontFamily={F.mono} fontSize="15" fontWeight="700" fill={isThrust ? C.gold : C.mutedLight}>
                  {label}
                </text>
              </g>
            );
          })}

          {/* Timer */}
          {s.timer && (
            <g>
              <rect x="460" y="5" width="130" height="24" rx="5"
                fill={s.verdict === "confirmed" ? C.greenDim : `${C.gold}15`} />
              <text x="525" y="22" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600"
                fill={s.verdict === "confirmed" ? C.green : C.gold}>
                ⏱ {s.timer}
              </text>
            </g>
          )}

          {/* Verdict */}
          {s.verdict === "confirmed" && (
            <g>
              <rect x="200" y="240" width="250" height="26" rx="5" fill={C.greenDim} />
              <text x="325" y="258" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill={C.green}>
                ✓ CONFIRMED — Broke trendline in time
              </text>
            </g>
          )}
        </svg>

        {/* Message */}
        <div style={{ padding: "20px 0", textAlign: "center", minHeight: 100 }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 16px" }}>
            {s.msg}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && (
              <StepBtn onClick={() => setStep(step + 1)} color={C.green}>
                {step === 0 ? "Draw the trendline →" : "Next →"}
              </StepBtn>
            )}
            {step === steps.length - 1 && <StepBtn onClick={() => setStep(0)} color={C.green}>Watch again</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 9: DON'T GET TRAPPED (kept from previous)
// ═══════════════════════════════════════════════════════
const DontGetTrapped = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { msg: "5 waves completed on M15. Clean impulse up.", svg: "impulse" },
    { msg: "A dump starts. You check the 30% test — it passes. This is a real correction at M15 degree.", svg: "dump" },
    { msg: "You zoom into M5. You see A-B-C inside the dump. Three waves. \"Correction done!\"", svg: "abc" },
    { msg: "You click BUY.", svg: "buy" },
    { msg: "Price bounces — wave B at M15 degree forms. Feels good...", svg: "bounce" },
    { msg: "WAVE C HITS. Price crashes through your entry. Position destroyed.", svg: "crash" },
    { msg: "What happened: the A-B-C on M5 was INSIDE wave A at M15 degree. The full correction still needed B and C at M15. You called it done one degree too early.", svg: "explain" },
  ];

  const s = steps[step];
  const isCrash = step === 5;
  const isExplain = step === 6;

  const getWaveData = () => {
    switch (s.svg) {
      case "impulse": return { lines: [{ pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.gold }] };
      case "dump": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [530, 150]], c: C.red },
      ]};
      case "abc": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [470, 110], [495, 80], [530, 150]], c: C.blue },
      ], labels: [{ x: 470, y: 125, t: "a" }, { x: 495, y: 68, t: "b" }, { x: 530, y: 165, t: "c" }] };
      case "buy": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [470, 110], [495, 80], [530, 150]], c: C.blue },
      ], labels: [{ x: 470, y: 125, t: "a" }, { x: 495, y: 68, t: "b" }, { x: 530, y: 165, t: "c" }], entry: { x: 530, y: 150 } };
      case "bounce": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [470, 110], [495, 80], [530, 150]], c: `${C.blue}66` },
        { pts: [[530, 150], [580, 90]], c: C.green },
      ], entry: { x: 530, y: 150 } };
      case "crash": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [470, 110], [495, 80], [530, 150]], c: `${C.blue}44` },
        { pts: [[530, 150], [580, 90], [660, 250]], c: C.red },
      ], entry: { x: 530, y: 150 } };
      case "explain": return { lines: [
        { pts: [[40, 240], [120, 190], [140, 210], [300, 50], [340, 100], [420, 30]], c: C.goldDim },
        { pts: [[420, 30], [530, 150]], c: C.blue },
        { pts: [[530, 150], [580, 90]], c: C.muted },
        { pts: [[580, 90], [660, 250]], c: C.blue },
      ], bigLabels: [{ x: 475, y: 100, t: "A", c: C.blue }, { x: 555, y: 78, t: "B", c: C.muted }, { x: 620, y: 245, t: "C", c: C.blue }] };
      default: return { lines: [] };
    }
  };

  const data = getWaveData();

  return (
    <Card title="Module 9 — Don't Get Trapped" tag="⚠ CRITICAL" tagColor={C.red}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 700 280" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {data.lines.map((l, i) => (
            <polyline key={i} points={l.pts.map(p => p.join(",")).join(" ")}
              fill="none" stroke={l.c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "all 0.5s" }} />
          ))}
          {data.labels?.map((l, i) => (
            <text key={i} x={l.x} y={l.y} textAnchor="middle" fontFamily={F.mono} fontSize="13" fontWeight="600" fill={C.blue}>{l.t}</text>
          ))}
          {data.bigLabels?.map((l, i) => (
            <text key={i} x={l.x} y={l.y} textAnchor="middle" fontFamily={F.mono} fontSize="22" fontWeight="700" fill={l.c}>{l.t}</text>
          ))}
          {data.entry && (
            <>
              <line x1={data.entry.x} y1={data.entry.y} x2={data.entry.x} y2="0" stroke={isCrash ? C.red : C.green} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <text x={data.entry.x + 8} y="12" fontFamily={F.mono} fontSize="9" fill={isCrash ? C.red : C.green} letterSpacing="1">ENTRY</text>
              <circle cx={data.entry.x} cy={data.entry.y} r="6" fill="none" stroke={isCrash ? C.red : C.green} strokeWidth="2" />
            </>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0", minHeight: 100 }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: isCrash ? C.red : isExplain ? C.blue : C.white, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            {s.msg}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && (
              <StepBtn onClick={() => setStep(step + 1)} color={step === 2 ? C.green : step >= 4 ? C.red : C.gold}>
                {step === 2 ? "BUY!" : step === 3 ? "What happens next..." : "Next →"}
              </StepBtn>
            )}
            {isExplain && (
              <div style={{ padding: "8px 16px", borderRadius: 6, background: C.blueDim, border: `1px solid ${C.blue}22` }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.blue }}>
                  Can I see A, B, C on the SAME timeframe I counted the impulse on?
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 11: STOP SHOWDOWN (kept from previous)
// ═══════════════════════════════════════════════════════
const StopShowdown = () => {
  const [phase, setPhase] = useState("intro");
  const [tick, setTick] = useState(0);
  const intervalRef = useRef(null);

  const priceAt = (t) => {
    if (t < 30) return 100 - t * 1.2;
    if (t < 50) return 64 + (t - 30) * 1.5;
    if (t < 80) return 94 + (t - 50) * 2.5;
    return 169;
  };

  const maxTick = 82;
  const tightStop = 80;
  const structStop = 40;
  const target = 169;

  const start = () => { setPhase("running"); setTick(0); };

  useEffect(() => {
    if (phase !== "running") return;
    intervalRef.current = setInterval(() => {
      setTick(prev => { if (prev >= maxTick) { clearInterval(intervalRef.current); return maxTick; } return prev + 1; });
    }, 80);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  useEffect(() => { if (tick >= maxTick) setPhase("result"); }, [tick]);

  const currentPrice = priceAt(tick);
  const tightStoppedAt = (() => { for (let t = 0; t <= tick; t++) { if (priceAt(t) <= tightStop) return t; } return null; })();
  const pxScale = (price) => 250 - (price / 180) * 230;

  const PricePanel = ({ label, stopLevel, stopLabel, stopped, color }) => (
    <div style={{ flex: 1, minWidth: 280, padding: 16, background: C.bg, borderRadius: 8, border: `1px solid ${stopped ? `${C.red}44` : `${color}22`}` }}>
      <div style={{ fontFamily: F.mono, fontSize: 10, color: stopped ? C.red : color, marginBottom: 12, letterSpacing: 1 }}>{label}</div>
      <svg viewBox="0 0 300 260" style={{ width: "100%" }}>
        <line x1="0" y1={pxScale(100)} x2="300" y2={pxScale(100)} stroke={C.muted} strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="5" y={pxScale(100) - 5} fontFamily={F.mono} fontSize="8" fill={C.muted}>Entry</text>
        <line x1="0" y1={pxScale(stopLevel)} x2="300" y2={pxScale(stopLevel)} stroke={C.red} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
        <text x="5" y={pxScale(stopLevel) + 12} fontFamily={F.mono} fontSize="8" fill={C.red} opacity="0.5">{stopLabel}</text>
        <line x1="0" y1={pxScale(target)} x2="300" y2={pxScale(target)} stroke={C.green} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
        <text x="5" y={pxScale(target) - 5} fontFamily={F.mono} fontSize="8" fill={C.green} opacity="0.5">Target</text>

        <polyline
          points={Array.from({ length: (stopped !== null ? stopped : tick) + 1 }, (_, t) =>
            `${(t / maxTick) * 290 + 5},${pxScale(priceAt(t))}`).join(" ")}
          fill="none" stroke={stopped !== null ? C.red : color} strokeWidth="2" strokeLinecap="round"
        />

        {stopped !== null && (
          <polyline
            points={Array.from({ length: Math.max(0, tick - stopped + 1) }, (_, i) => {
              const t = stopped + i;
              return `${(t / maxTick) * 290 + 5},${pxScale(priceAt(t))}`;
            }).join(" ")}
            fill="none" stroke={C.muted} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.25"
          />
        )}

        {stopped !== null && (
          <>
            <circle cx={(stopped / maxTick) * 290 + 5} cy={pxScale(stopLevel)} r="6" fill="none" stroke={C.red} strokeWidth="2" />
            <text x="150" y="25" textAnchor="middle" fontFamily={F.mono} fontSize="14" fontWeight="700" fill={C.red}>✗ STOPPED OUT</text>
          </>
        )}
        {phase === "result" && stopped === null && (
          <text x="150" y="25" textAnchor="middle" fontFamily={F.mono} fontSize="14" fontWeight="700" fill={C.green}>✓ HIT TARGET</text>
        )}
      </svg>
    </div>
  );

  return (
    <Card title="Module 11 — Stop Showdown" tag="STRUCTURAL vs TIGHT" tagColor={C.gold}>
      <div style={{ padding: "24px" }}>
        {phase === "intro" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.whiteDim, marginBottom: 8 }}>
              Two identical trades. Same entry. Same analysis. Same target.
            </p>
            <p style={{ fontFamily: F.serif, fontSize: 15, color: C.muted, marginBottom: 24 }}>
              One uses a structural stop (60 pips). The other uses a tight stop (20 pips). Watch what happens.
            </p>
            <StepBtn onClick={start} color={C.gold}>Run Simulation →</StepBtn>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <PricePanel label="STRUCTURAL STOP — 60 PIPS" stopLevel={structStop} stopLabel="Stop -60" stopped={null} color={C.green} />
              <PricePanel label="TIGHT STOP — 20 PIPS" stopLevel={tightStop} stopLabel="Stop -20" stopped={tightStoppedAt} color={C.blue} />
            </div>
            {phase === "result" && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <p style={{ fontFamily: F.serif, fontSize: 15, color: C.whiteDim, marginBottom: 16 }}>
                  Same trade. Same analysis. The tight stop got shaken out by a normal pullback. The structural stop survived and hit the target.
                </p>
                <StepBtn onClick={start} color={C.gold}>Run Again</StepBtn>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 3b: FRACTAL ZOOM — wave 3 expands to show internals
// ═══════════════════════════════════════════════════════
const FractalZoom = () => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Card title="Module 3 — Waves Inside Waves" tag="FRACTAL" tagColor={C.gold}>
      <div style={{ padding: "24px" }}>
        {/* H4 VIEW — always visible */}
        <div style={{ marginBottom: zoomed ? 0 : 0 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.gold, letterSpacing: 1.5, marginBottom: 8 }}>H4 — THE BIG PICTURE</div>
          <svg viewBox="0 0 640 180" style={{ width: "100%", background: `${C.bg}66`, borderRadius: zoomed ? "8px 8px 0 0" : 8 }}>
            {/* Full impulse */}
            <polyline points="40,155 130,100 160,120 380,20 445,70 560,10"
              fill="none" stroke={zoomed ? C.goldDim : C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "stroke 0.5s" }} />

            {/* Wave 3 segment highlighted */}
            <polyline points="160,120 380,20"
              fill="none" stroke={C.gold} strokeWidth={zoomed ? "3" : "2.5"} strokeLinecap="round"
              style={{ transition: "all 0.5s" }} />

            {/* Labels */}
            {[[130,100,"1",true],[160,120,"2",false],[380,20,"3",true],[445,70,"4",false],[560,10,"5",true]].map(([x,y,l,t],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={l==="3" ? 6 : 4}
                  fill={t ? (l==="3" ? C.gold : (zoomed ? C.goldDim : C.gold)) : C.card}
                  stroke={t ? (l==="3" ? C.gold : (zoomed ? C.goldDim : C.gold)) : C.mutedLight}
                  strokeWidth="2" style={{ transition: "all 0.5s" }} />
                <text x={x} y={t ? y-14 : y+20} textAnchor="middle" fontFamily={F.mono}
                  fontSize={l==="3" ? 18 : 14} fontWeight="700"
                  fill={l==="3" ? C.goldBright : t ? (zoomed ? C.goldDim : C.gold) : C.mutedLight}
                  style={{ transition: "fill 0.5s" }}>{l}</text>
              </g>
            ))}

            {/* Bracket under wave 3 when zoomed */}
            {zoomed && (
              <>
                <line x1="160" y1="140" x2="380" y2="140" stroke={C.blue} strokeWidth="1.5" opacity="0.5" />
                <line x1="160" y1="135" x2="160" y2="145" stroke={C.blue} strokeWidth="1.5" opacity="0.5" />
                <line x1="380" y1="135" x2="380" y2="145" stroke={C.blue} strokeWidth="1.5" opacity="0.5" />
                <line x1="270" y1="140" x2="270" y2="175" stroke={C.blue} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                <text x="270" y="160" textAnchor="middle" fontFamily={F.mono} fontSize="8" fill={C.blue} opacity="0.6" letterSpacing="1">ZOOM IN</text>
              </>
            )}

            {/* Zoom prompt when not zoomed */}
            {!zoomed && (
              <text x="270" y="155" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill={C.gold} opacity="0.5" letterSpacing="1">
                WHAT'S INSIDE WAVE 3?
              </text>
            )}
          </svg>
        </div>

        {/* H1 VIEW — slides in when zoomed */}
        <div style={{
          maxHeight: zoomed ? 300 : 0, overflow: "hidden",
          transition: "max-height 0.6s ease",
        }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.blue, letterSpacing: 1.5, marginTop: 0, marginBottom: 8, paddingTop: 12 }}>H1 — INSIDE WAVE 3</div>
          <svg viewBox="0 0 640 200" style={{ width: "100%", background: `${C.bg}66`, borderRadius: "0 0 8px 8px" }}>
            {/* Connector from H4 */}
            <line x1="270" y1="0" x2="270" y2="15" stroke={C.blue} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

            {/* 5 subwaves inside wave 3 */}
            <polyline points="50,170 150,110 180,135 370,20 430,65 560,10"
              fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Labels with "of 3" notation */}
            {[[150,110,"1",true],[180,135,"2",false],[370,20,"3",true],[430,65,"4",false],[560,10,"5",true]].map(([x,y,l,t],i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill={t ? C.blue : C.card} stroke={t ? C.blue : C.mutedLight} strokeWidth="2" />
                <text x={x} y={t ? y-14 : y+22} textAnchor="middle" fontFamily={F.mono} fontSize="14" fontWeight="700" fill={t ? C.blue : C.mutedLight}>{l}</text>
              </g>
            ))}

            {/* Context arrows */}
            <text x="25" y="175" fontFamily={F.mono} fontSize="8" fill={C.muted} opacity="0.4">wave 2 end ↗</text>
            <text x="575" y="25" fontFamily={F.mono} fontSize="8" fill={C.muted} opacity="0.4">→ wave 4</text>

            {/* Badge */}
            <rect x="200" y="175" width="240" height="22" rx="4" fill={C.blueDim} />
            <text x="320" y="190" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={C.blue}>
              5 SUBWAVES INSIDE WAVE 3
            </text>
          </svg>
        </div>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 16px" }}>
            {zoomed
              ? "Inside wave 3 on H1 — another complete 5-wave cycle. The same structure at a smaller scale. Every impulsive wave contains this. That's the fractal."
              : "On H4 you see the 5-wave cycle. Wave 3 is the longest. But it's not one solid move — zoom in and there's a complete 5-wave cycle inside it."}
          </p>
          <StepBtn onClick={() => setZoomed(!zoomed)} color={zoomed ? C.gold : C.blue}>
            {zoomed ? "← Zoom Out" : "Zoom into Wave 3 →"}
          </StepBtn>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 4b: FIBONACCI MEASUREMENT TOOL
// ═══════════════════════════════════════════════════════
const FiboTool = () => {
  const [step, setStep] = useState(0);

  // Wave 1: from y=230 (bottom) to y=40 (top). Height = 190px.
  const w1Bot = 230;
  const w1Top = 40;
  const h = w1Bot - w1Top; // 190

  const fiboLevels = [
    { pct: 0.30, label: "30%", note: "Degree test line — must reach here to be same-degree", color: C.goldDim },
    { pct: 0.382, label: "38.2%", note: "Shallow. Common wave 4 retracement", color: C.goldDim },
    { pct: 0.50, label: "50%", note: "Middle ground", color: C.goldDim },
    { pct: 0.618, label: "61.8%", note: "Deep. Common wave 2 retracement", color: C.gold },
    { pct: 0.70, label: "70%", note: "Very deep. Structure weakening", color: C.red },
  ];

  const levelY = (pct) => w1Top + h * pct;

  const steps = [
    { msg: "Wave 1 completed — a clear move up. You need to measure how the next wave relates to it.", w2y: null, activeLevel: -1 },
    { msg: "Apply the Fibonacci retracement tool from the bottom of wave 1 to the top. Five key levels appear on the chart.", w2y: null, activeLevel: -1 },
    { msg: "Wave 2 starts pulling back. It passes the 30% level — this pullback is big enough to be a real wave at this degree. The 1/3 test passes.", w2y: levelY(0.30), activeLevel: 0 },
    { msg: "Drops further... passes 38.2%. A shallow retracement — if it stopped here, it would be typical for a wave 4.", w2y: levelY(0.382), activeLevel: 1 },
    { msg: "Still dropping... reaches 50%. Right in the middle.", w2y: levelY(0.50), activeLevel: 2 },
    { msg: "Hits 61.8% and reverses. This is the classic wave 2 retracement. Deep but valid. The trend start (wave 1) is still intact.", w2y: levelY(0.618), activeLevel: 3 },
  ];

  const s = steps[step];

  return (
    <Card title="Module 4 — The Fibonacci Tool" tag="MEASUREMENT" tagColor={C.gold}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 600 270" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Wave 1 */}
          <polyline points={`80,${w1Bot} 240,${w1Top}`}
            fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy={w1Bot} r="5" fill={C.gold} />
          <circle cx="240" cy={w1Top} r="5" fill={C.gold} />
          <text x="140" y={135} textAnchor="middle" fontFamily={F.mono} fontSize="18" fontWeight="700" fill={C.gold}>1</text>

          {/* Fibo levels — appear at step 1+ */}
          {step >= 1 && fiboLevels.map((fl, i) => {
            const y = levelY(fl.pct);
            const isActive = s.activeLevel >= i;
            const isCurrent = s.activeLevel === i;
            return (
              <g key={i}>
                <line x1="240" y1={y} x2="500" y2={y}
                  stroke={isCurrent ? C.gold : isActive ? C.green : fl.color}
                  strokeWidth={isCurrent ? "1.5" : "0.8"}
                  strokeDasharray={isCurrent ? "none" : "4 4"}
                  opacity={isActive ? 0.7 : 0.3}
                  style={{ transition: "all 0.4s" }} />
                <text x="505" y={y + 4} fontFamily={F.mono} fontSize="10" fontWeight={isCurrent ? "700" : "400"}
                  fill={isCurrent ? C.gold : isActive ? C.green : C.muted}
                  style={{ transition: "fill 0.4s" }}>
                  {fl.label}
                </text>
                {/* Note appears only for current level */}
                {isCurrent && (
                  <text x="340" y={y - 10} textAnchor="middle" fontFamily={F.mono} fontSize="8" fill={C.gold} letterSpacing="0.5" opacity="0.7">
                    {fl.note}
                  </text>
                )}
              </g>
            );
          })}

          {/* Wave 2 pullback */}
          {s.w2y !== null && (
            <>
              <polyline points={`240,${w1Top} 380,${s.w2y}`}
                fill="none" stroke={C.mutedLight} strokeWidth="2.5" strokeLinecap="round"
                style={{ transition: "all 0.4s" }} />
              <circle cx="380" cy={s.w2y} r="5" fill={C.card} stroke={C.mutedLight} strokeWidth="2"
                style={{ transition: "all 0.4s" }} />
              <text x="395" y={s.w2y + 5} fontFamily={F.mono} fontSize="15" fontWeight="700" fill={C.mutedLight}>2</text>
            </>
          )}

          {/* Wave 2 reversal arrow on last step */}
          {step === 5 && (
            <>
              <polyline points={`380,${s.w2y} 430,${s.w2y - 40}`}
                fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
              <text x="440" y={s.w2y - 45} fontFamily={F.mono} fontSize="9" fill={C.green} letterSpacing="1">REVERSAL</text>
            </>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px" }}>{s.msg}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={C.gold}>Next →</StepBtn>}
            {step === steps.length - 1 && <StepBtn onClick={() => setStep(0)} color={C.gold}>Watch again</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 4c: OVERLAP RULE — storytelling
// ═══════════════════════════════════════════════════════
const OverlapStory = () => {
  const [step, setStep] = useState(0);
  const [violated, setViolated] = useState(false);

  const steps = [
    { pts: [[50, 250], [140, 165]], msg: "Wave 1 starts the trend. Remember this price zone — wave 1's territory.", zone: true },
    { pts: [[50, 250], [140, 165], [185, 210]], msg: "Wave 2 pulls back. Doesn't erase wave 1. Trend is still alive." },
    { pts: [[50, 250], [140, 165], [185, 210], [370, 42]], msg: "Wave 3 pushes hard. The engine." },
    { pts: [[50, 250], [140, 165], [185, 210], [370, 42], [440, 130]], msg: "Wave 4 pulls back... but stays ABOVE wave 1's territory. Valid impulse.", verdict: "valid" },
  ];

  const s = violated
    ? { pts: [[50,250],[140,165],[185,210],[370,42],[440,220]], msg: "Wave 4 dropped into wave 1's territory. Count is dead. This is NOT an impulse.", verdict: "invalid" }
    : steps[Math.min(step, steps.length - 1)];

  return (
    <Card title="Module 4 — The Overlap Rule" tag="STEP BY STEP" tagColor={violated ? C.red : C.gold}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 560 280" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Wave 1 territory zone */}
          {(step >= 0 || violated) && (
            <rect x="45" y="165" width="470" height="85" rx="3"
              fill={violated ? C.redDim : C.goldGlow}
              stroke={violated ? C.red : C.goldDim} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5"
              style={{ transition: "all 0.5s" }} />
          )}
          {(step >= 0 || violated) && (
            <text x="280" y="265" textAnchor="middle" fontFamily={F.mono} fontSize="8" letterSpacing="2"
              fill={violated ? C.red : C.muted} opacity="0.5" style={{ transition: "fill 0.5s" }}>
              WAVE 1 TERRITORY
            </text>
          )}

          {/* Boundary line */}
          <line x1="45" y1="165" x2="515" y2="165"
            stroke={violated ? C.red : C.green} strokeWidth="1" strokeDasharray="6 4" opacity="0.4"
            style={{ transition: "stroke 0.5s" }} />

          {/* Wave line */}
          <polyline points={s.pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={violated ? C.red : C.gold}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.5s" }} />

          {/* Labels */}
          {s.pts.slice(1).map((p, i) => {
            const labels = ["1", "2", "3", "4"];
            if (i >= labels.length) return null;
            const isT = i % 2 === 0;
            return (
              <g key={i}>
                <circle cx={p[0]} cy={p[1]} r="5" fill={isT ? (violated ? C.red : C.gold) : C.card}
                  stroke={isT ? (violated ? C.red : C.gold) : C.mutedLight} strokeWidth="2" style={{ transition: "all 0.5s" }} />
                <text x={p[0]} y={isT ? p[1]-14 : p[1]+22} textAnchor="middle"
                  fontFamily={F.mono} fontSize="16" fontWeight="700"
                  fill={isT ? (violated ? C.red : C.gold) : C.mutedLight} style={{ transition: "fill 0.5s" }}>
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {/* Verdict badge */}
          {s.verdict && (
            <g>
              <rect x="180" y="5" width="200" height="26" rx="5"
                fill={s.verdict === "valid" ? C.greenDim : C.redDim} />
              <text x="280" y="23" textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600"
                fill={s.verdict === "valid" ? C.green : C.red}>
                {s.verdict === "valid" ? "✓ STAYS ABOVE — VALID" : "✗ ENTERED TERRITORY — DEAD"}
              </text>
            </g>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: violated ? C.red : C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px" }}>{s.msg}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {(step > 0 || violated) && <StepBtn onClick={() => { setStep(0); setViolated(false); }} color={C.muted}>Reset</StepBtn>}
            {!violated && step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={C.gold}>Next →</StepBtn>}
            {!violated && step === steps.length - 1 && (
              <StepBtn onClick={() => setViolated(true)} color={C.red}>What if wave 4 goes too deep?</StepBtn>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 5: ANALYSIS FLOW — Big → Sub → Read → Decide
// ═══════════════════════════════════════════════════════
const AnalysisFlow = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { phase: "BIG", tf: "H4", color: C.gold,
      msg: "Step 1 — Open H4. What's the big structure? You see a 5-wave impulse with wave 3 extended. Currently in wave 4 correction. Direction: BULLISH.",
      pts: [[30,230],[100,160],[130,190],[300,35],[380,110],[470,20]], labels: ["1","2","3","4?","5?"] },
    { phase: "SUB", tf: "H1", color: C.blue,
      msg: "Step 2 — Drop to H1. Look inside wave 4. What's developing? You see an A-B-C zigzag forming. Wave C is in progress.",
      pts: [[30,30],[180,180],[280,100],[430,220]], labels: ["A","B","C..."] },
    { phase: "READ", tf: "H1", color: C.blue,
      msg: "Step 3 — What did sub already do? Wave A completed sharply (impulsive). Wave B bounced to 45% of A (weak). Wave C is pushing past A's end. Structure is consistent with a Zigzag.",
      pts: [[30,30],[180,180],[280,100],[430,220]], labels: ["A :5","B :3","C :5"] },
    { phase: "DECIDE", tf: "—", color: C.green,
      msg: "Step 4 — Decision. Big says bullish (wave 5 next). Sub shows zigzag correction nearing completion. If C confirms done (0-B trendline breaks in time) and behavior is impulsive — ENTRY for wave 5 long.",
      pts: null, labels: null },
  ];

  const s = steps[step];

  return (
    <Card title="Module 5 — The Analysis Flow" tag="BIG → SUB → READ → DECIDE" tagColor={s.color}>
      <div style={{ padding: "24px" }}>
        {/* Phase indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 20 }}>
          {steps.map((st, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{
                fontFamily: F.mono, fontSize: 9, padding: "4px 10px", borderRadius: 4, letterSpacing: 1,
                background: i === step ? `${st.color}20` : "transparent",
                border: `1px solid ${i === step ? st.color : i < step ? `${st.color}44` : C.border}`,
                color: i <= step ? st.color : C.muted, transition: "all 0.3s",
              }}>{st.phase}</div>
              {i < steps.length - 1 && <span style={{ color: C.muted, fontSize: 10 }}>→</span>}
            </div>
          ))}
        </div>

        {s.pts ? (
          <svg viewBox="0 0 500 240" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
            <polyline points={s.pts.map(p => p.join(",")).join(" ")}
              fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {s.pts.slice(1).map((p, i) => (
              <g key={i}>
                <circle cx={p[0]} cy={p[1]} r="4" fill={i % 2 === 0 ? s.color : C.card} stroke={s.color} strokeWidth="1.5" />
                {s.labels[i] && (
                  <text x={p[0]} y={i % 2 === 0 ? p[1]+20 : p[1]-12} textAnchor="middle"
                    fontFamily={F.mono} fontSize="13" fontWeight="600" fill={s.color}>
                    {s.labels[i]}
                  </text>
                )}
              </g>
            ))}
            <rect x="15" y="8" width="30" height="18" rx="3" fill={`${s.color}15`} />
            <text x="30" y="21" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={s.color}>{s.tf}</text>
          </svg>
        ) : (
          <div style={{ background: `${C.bg}66`, borderRadius: 8, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "12px 24px", borderRadius: 8, background: C.greenDim, border: `1px solid ${C.green}22` }}>
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.green }}>
                BIG = Bullish → SUB = Zigzag completing → ENTRY when confirmed
              </span>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px" }}>{s.msg}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={steps[step + 1].color}>Next step →</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 6b: MUTATION — watch a pattern mutate
// ═══════════════════════════════════════════════════════
const MutationExplainer = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { pts: [[30,40],[150,170],[220,100],[340,220]], msg: "A-B-C zigzag completes. Looks done. Correction over?", labels: [{x:150,y:185,t:"A"},{x:220,y:88,t:"B"},{x:340,y:235,t:"C"}], color: C.blue },
    { pts: [[30,40],[150,170],[220,100],[340,220],[400,175]], msg: "Wait — a small bounce. This is an x-wave forming. The correction isn't done.", labels: [{x:150,y:185,t:"W"},{x:220,y:88,t:""},{x:340,y:235,t:""},{x:400,y:163,t:"x"}], color: C.gold },
    { pts: [[30,40],[150,170],[220,100],[340,220],[400,175],[480,240],[520,200],[580,260]], msg: "A second corrective pattern starts after the x-wave. It mutated. What you thought was a completed Zigzag is now just the W of a W-X-Y Double Zigzag.", labels: [{x:150,y:185,t:"W"},{x:400,y:163,t:"x"},{x:580,y:260,t:"Y"}], color: C.red },
  ];

  const s = steps[step];

  return (
    <Card title="Module 6 — Mutations" tag="WATCH IT HAPPEN" tagColor={C.red}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 620 280" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          <polyline points={s.pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.5s" }} />
          {s.labels.filter(l => l.t).map((l, i) => (
            <text key={i} x={l.x} y={l.y} textAnchor="middle" fontFamily={F.mono}
              fontSize={l.t === "x" ? 13 : 18} fontWeight="700" fill={l.t === "x" ? C.gold : s.color}>
              {l.t}
            </text>
          ))}
          {step === 0 && (
            <g>
              <rect x="360" y="200" width="120" height="24" rx="5" fill={C.greenDim} />
              <text x="420" y="217" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={C.green}>Done... right?</text>
            </g>
          )}
          {step === 2 && (
            <g>
              <rect x="200" y="5" width="220" height="24" rx="5" fill={C.redDim} />
              <text x="310" y="22" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={C.red}>MUTATED — W-X-Y Double Zigzag</text>
            </g>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: step === 2 ? C.red : C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px" }}>{s.msg}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={step === 0 ? C.gold : C.red}>
              {step === 0 ? "Or is it...?" : "It mutated →"}
            </StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 6c: COMPLEX CORRECTIONS — WXY
// ═══════════════════════════════════════════════════════
const ComplexCorrections = () => {
  const [level, setLevel] = useState(1); // 1=single, 2=double, 3=triple

  const pts = {
    1: { points: [[30,40],[160,180],[240,100],[370,230]], labels: ["A","B","C"], badge: "Simple Zigzag", msg: "A single corrective pattern. A-B-C. This might be all there is — or it might be just the beginning." },
    2: { points: [[30,40],[120,150],[170,90],[250,200],[290,170],[360,210],[400,160],[470,230]], labels: ["W","","","x","","","","Y"], badge: "Double Zigzag (W-X-Y)", msg: "Two corrections connected by an x-wave. The x-wave is small — a bridge between W and Y. The correction needed more time/price." },
    3: { points: [[30,40],[90,120],[115,80],[170,170],[200,145],[250,175],[275,140],[330,200],[355,175],[390,195],[415,165],[460,230]], labels: ["W","","","x","","","","Y","","x","","Z"], badge: "Triple (W-X-Y-X-Z)", msg: "Three corrections connected by two x-waves. This is the MAXIMUM. The market cannot form more than a Triple. If your count needs more — your starting point is wrong." },
  };

  const p = pts[level];

  return (
    <Card title="Module 6 — Complex Corrections" tag="W-X-Y" tagColor={C.blue}>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {[{l:1,t:"Single"},{l:2,t:"Double (WXY)"},{l:3,t:"Triple (WXYXZ)"}].map(b => (
            <button key={b.l} onClick={() => setLevel(b.l)} style={{
              fontFamily: F.mono, fontSize: 10, padding: "8px 16px", borderRadius: 6,
              border: `1px solid ${level === b.l ? C.blue : C.border}`,
              background: level === b.l ? C.blueDim : "transparent",
              color: level === b.l ? C.blue : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>{b.t}</button>
          ))}
        </div>

        <svg viewBox="0 0 500 250" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          <polyline points={p.points.map(pt => pt.join(",")).join(" ")}
            fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.4s" }} />
          {p.points.slice(1).map((pt, i) => {
            const label = p.labels[i];
            if (!label) return null;
            const isX = label === "x";
            return (
              <text key={i} x={pt[0]} y={i % 2 === 0 ? pt[1]+20 : pt[1]-10} textAnchor="middle"
                fontFamily={F.mono} fontSize={isX ? 11 : 16} fontWeight="700"
                fill={isX ? C.gold : C.blue} style={{ transition: "all 0.3s" }}>
                {label}
              </text>
            );
          })}
          <rect x="140" y="5" width="220" height="22" rx="4" fill={C.blueDim} />
          <text x="250" y="20" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={C.blue}>{p.badge}</text>

          {level === 3 && (
            <text x="250" y="245" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill={C.red} letterSpacing="1">
              MAXIMUM — cannot go beyond Triple
            </text>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "16px 0 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15, color: C.whiteDim, lineHeight: 1.6, maxWidth: 540, margin: "0 auto" }}>{p.msg}</p>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 7b: 0-B TRENDLINE for corrections
// ═══════════════════════════════════════════════════════
const ZeroBTrendline = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { msg: "A correction just completed — A-B-C. Is it actually done, or will it mutate?", trendline: false, broken: false },
    { msg: "Draw the 0-B trendline — from the start of the correction (point 0) through the end of wave B.", trendline: true, broken: false },
    { msg: "Price must break this trendline in equal or less time than wave C took to form. If it does — correction confirmed done. It won't mutate.", trendline: true, broken: true },
  ];

  const s = steps[step];

  return (
    <Card title="Module 7 — The 0-B Trendline" tag="CORRECTION CONFIRMATION" tagColor={C.green}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 580 250" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Correction ABC */}
          <polyline points="60,40 200,170 290,90 430,210"
            fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Labels */}
          {[{x:60,y:30,t:"0"},{x:200,y:185,t:"A"},{x:290,y:78,t:"B"},{x:430,y:225,t:"C"}].map((l,i) => (
            <g key={i}>
              <circle cx={l.x} cy={l.y + (l.t === "A" || l.t === "C" ? -10 : 10)} r="4"
                fill={l.t === "0" ? C.muted : l.t === "B" ? C.card : C.blue}
                stroke={l.t === "B" ? C.muted : C.blue} strokeWidth="1.5" />
              <text x={l.x} y={l.y} textAnchor="middle" fontFamily={F.mono} fontSize="14" fontWeight="700"
                fill={l.t === "0" ? C.muted : l.t === "B" ? C.mutedLight : C.blue}>{l.t}</text>
            </g>
          ))}

          {/* 0-B Trendline */}
          {s.trendline && (
            <line x1="60" y1="50" x2="550" y2="115"
              stroke={s.broken ? C.green : C.gold} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6"
              style={{ transition: "stroke 0.5s" }} />
          )}
          {s.trendline && (
            <text x="520" y="108" fontFamily={F.mono} fontSize="9" fill={s.broken ? C.green : C.gold} opacity="0.6">0-B</text>
          )}

          {/* Post-C breakout */}
          {s.broken && (
            <>
              <polyline points="430,210 480,180 530,130"
                fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="440" y="105" width="100" height="22" rx="4" fill={C.greenDim} />
              <text x="490" y="120" textAnchor="middle" fontFamily={F.mono} fontSize="9" fontWeight="600" fill={C.green}>BROKE IN TIME ✓</text>
            </>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px" }}>{s.msg}</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={C.green}>Next →</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 7c: EXTENSION TYPES — what each looks like
// ═══════════════════════════════════════════════════════
const ExtensionTypes = () => {
  const [type, setType] = useState("w3");

  const types = {
    w1: { pts: [[30,250],[250,30],[290,120],[400,60],[440,95],[510,50]], label: "Wave 1 Extended", msg: "Wave 1 is the longest. The pattern contracts — each subsequent wave is smaller. Channels like a narrowing wedge. Wave 5 can't reach the upper trendline.", ext: 1 },
    w3: { pts: [[30,240],[100,190],[130,215],[370,30],[430,100],[530,45]], label: "Wave 3 Extended (most common)", msg: "Wave 3 is the longest — at least 161.8% of wave 1. Channels between parallel lines. Wave 1 and wave 5 tend toward equality. This is 80% of impulses you'll see.", ext: 3 },
    w5: { pts: [[30,240],[100,200],[125,215],[230,140],[270,160],[530,20]], label: "Wave 5 Extended", msg: "Wave 5 is the longest. The pattern expands — like a megaphone. Each thrust wave reaches further than expected. Correction after must retrace at least 61.8% of wave 5.", ext: 5 },
  };

  const t = types[type];

  return (
    <Card title="Module 7 — Which Wave Extended?" tag="EXTENSION TYPES" tagColor={C.gold}>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {[{id:"w1",t:"1st"},{id:"w3",t:"3rd"},{id:"w5",t:"5th"}].map(b => (
            <button key={b.id} onClick={() => setType(b.id)} style={{
              fontFamily: F.mono, fontSize: 11, padding: "8px 20px", borderRadius: 6,
              border: `1px solid ${type === b.id ? C.gold : C.border}`,
              background: type === b.id ? C.goldGlow : "transparent",
              color: type === b.id ? C.gold : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>{b.t} Extension</button>
          ))}
        </div>

        <svg viewBox="0 0 580 260" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          <polyline points={t.pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "all 0.5s" }} />

          {t.pts.slice(1).map((p, i) => {
            const isT = i % 2 === 0;
            const isExt = (i + 1) === t.ext || (t.ext === 3 && i === 2) || (t.ext === 5 && i === 4) || (t.ext === 1 && i === 0);
            return (
              <g key={i}>
                <circle cx={p[0]} cy={p[1]} r={isExt ? 7 : 4}
                  fill={isT ? C.gold : C.card} stroke={isExt ? C.goldBright : isT ? C.gold : C.muted}
                  strokeWidth={isExt ? 2.5 : 1.5} style={{ transition: "all 0.5s" }} />
                <text x={p[0]} y={isT ? p[1]-16 : p[1]+22} textAnchor="middle"
                  fontFamily={F.mono} fontSize={isExt ? 18 : 14} fontWeight="700"
                  fill={isExt ? C.goldBright : isT ? C.gold : C.muted} style={{ transition: "all 0.3s" }}>
                  {i + 1}
                </text>
              </g>
            );
          })}

          <rect x="160" y="5" width="260" height="22" rx="4" fill={C.goldGlow} />
          <text x="290" y="20" textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="600" fill={C.gold}>{t.label}</text>
        </svg>

        <div style={{ textAlign: "center", padding: "16px 0 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15, color: C.whiteDim, lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>{t.msg}</p>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 8: ENTRY TYPES — where exactly you enter
// ═══════════════════════════════════════════════════════
const EntryTypes = () => {
  const [type, setType] = useState("wave4");

  const types = {
    wave4: {
      label: "After Wave 4 Completes",
      pts: [[30,230],[100,160],[130,190],[300,30],[380,100]],
      entry: { x: 380, y: 100, stopY: 100, targetY: 15 },
      correction: [[300,30],[340,60],[355,45],[380,100]],
      corrLabels: [{x:340,y:72,t:"a"},{x:355,y:35,t:"b"},{x:380,y:112,t:"c"}],
      msg: "Sub wave 4 correction confirmed done. Enter long for wave 5. Stop below wave 4 low. Target based on big structure projection.",
    },
    triangle: {
      label: "Triangle Thrust",
      pts: [[30,130],[110,190],[180,120],[240,170],[290,135],[320,155]],
      entry: { x: 320, y: 155, stopY: 155, targetY: 30 },
      thrust: [[320,155],[450,40]],
      msg: "Triangle A-B-C-D-E complete. B-D trendline breaks. Enter the thrust direction. Stop at wave E. Target depends on Limiting vs Non-Limiting.",
    },
    correction: {
      label: "After Big Correction Done",
      pts: [[30,40],[170,180],[260,90],[400,220]],
      entry: { x: 400, y: 220, stopY: 220, targetY: 30 },
      postCorr: [[400,220],[500,140]],
      msg: "Big correction (e.g. wave 4 as ABC) confirmed done. Drop to sub, wait for first subwave setup, enter for wave 5 of the big cycle.",
    },
  };

  const t = types[type];

  return (
    <Card title="Module 8 — Entry Types" tag="WHERE TO ENTER" tagColor={C.green}>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {[{id:"wave4",t:"After Wave 4"},{id:"triangle",t:"Triangle Thrust"},{id:"correction",t:"After Correction"}].map(b => (
            <button key={b.id} onClick={() => setType(b.id)} style={{
              fontFamily: F.mono, fontSize: 10, padding: "8px 16px", borderRadius: 6,
              border: `1px solid ${type === b.id ? C.green : C.border}`,
              background: type === b.id ? C.greenDim : "transparent",
              color: type === b.id ? C.green : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>{b.t}</button>
          ))}
        </div>

        <svg viewBox="0 0 560 240" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Main structure */}
          <polyline points={t.pts.map(p => p.join(",")).join(" ")}
            fill="none" stroke={type === "correction" ? C.blue : C.gold}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.4s" }} />

          {/* Correction detail for wave4 type */}
          {t.correction && (
            <polyline points={t.correction.map(p => p.join(",")).join(" ")}
              fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {t.corrLabels?.map((l, i) => (
            <text key={i} x={l.x} y={l.y} textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="600" fill={C.blue}>{l.t}</text>
          ))}

          {/* Thrust for triangle type */}
          {t.thrust && (
            <polyline points={t.thrust.map(p => p.join(",")).join(" ")}
              fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
          )}

          {/* Post-correction for correction type */}
          {t.postCorr && (
            <polyline points={t.postCorr.map(p => p.join(",")).join(" ")}
              fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
          )}

          {/* Entry marker */}
          <circle cx={t.entry.x} cy={t.entry.y} r="8" fill="none" stroke={C.green} strokeWidth="2" />
          <text x={t.entry.x + 15} y={t.entry.y - 5} fontFamily={F.mono} fontSize="9" fontWeight="600" fill={C.green} letterSpacing="1">ENTRY</text>

          {/* Stop line */}
          <line x1={t.entry.x - 30} y1={t.entry.stopY + 10} x2={t.entry.x + 50} y2={t.entry.stopY + 10}
            stroke={C.red} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          <text x={t.entry.x + 55} y={t.entry.stopY + 14} fontFamily={F.mono} fontSize="8" fill={C.red} opacity="0.6">STOP</text>

          {/* Target line */}
          <line x1={t.entry.x - 30} y1={t.entry.targetY} x2={t.entry.x + 50} y2={t.entry.targetY}
            stroke={C.green} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          <text x={t.entry.x + 55} y={t.entry.targetY + 4} fontFamily={F.mono} fontSize="8" fill={C.green} opacity="0.4">TARGET</text>
        </svg>

        <div style={{ textAlign: "center", padding: "16px 0 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15, color: C.whiteDim, lineHeight: 1.6, maxWidth: 540, margin: "0 auto" }}>{t.msg}</p>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 9b: THE 30% TEST — step-by-step walkthrough
// ═══════════════════════════════════════════════════════
const DegreeTest = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { pullbackY: null, msg: "Wave 3 on H4. It's been pushing up — 300 pips so far over 3 days. Strong, clean impulse.", thresholdShow: false },
    { pullbackY: 195, msg: "Price dumps 40 pips in a few hours. Is this wave 4? Is wave 3 done?", thresholdShow: true },
    { pullbackY: 195, msg: "Check: 40 out of 300 = 13% in price. Less than 30%. Time: a few hours out of 3 days = about 8%. Also less than 30%. Both fail. This is NOT wave 4. It's a subwave correction — noise inside wave 3.", thresholdShow: true, verdict: "fail" },
    { pullbackY: 130, msg: "Now imagine the dump was 150 pips instead. 150 out of 300 = 50% in price. Took a full day = about 33% in time. Both pass the 30% test.", thresholdShow: true, verdict: "pass" },
    { pullbackY: 130, msg: "This IS potentially wave 4. It's big enough to be a same-degree wave. Now you watch it develop — what structure is forming inside it? Is it a zigzag? A flat? Let it play out.", thresholdShow: true, verdict: "pass" },
  ];

  const s = steps[step];
  const isFail = s.verdict === "fail";
  const isPass = s.verdict === "pass";

  return (
    <Card title="Module 9 — The 30% Test" tag="STEP BY STEP" tagColor={C.gold}>
      <div style={{ padding: "24px" }}>
        <svg viewBox="0 0 560 240" style={{ width: "100%", background: `${C.bg}66`, borderRadius: 8 }}>
          {/* Wave 3 */}
          <polyline points="60,220 350,30" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="220" r="4" fill={C.gold} />
          <circle cx="350" cy="30" r="5" fill={C.gold} />
          <text x="180" y="110" textAnchor="middle" fontFamily={F.mono} fontSize="16" fontWeight="700" fill={C.gold}>3</text>
          <text x="375" y="28" fontFamily={F.mono} fontSize="10" fill={C.muted}>300 pips</text>

          {/* 30% threshold line */}
          {s.thresholdShow && (
            <>
              <line x1="340" y1="87" x2="510" y2="87" stroke={C.goldDim} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <text x="515" y="91" fontFamily={F.mono} fontSize="9" fill={C.goldDim}>30%</text>
            </>
          )}

          {/* Pullback */}
          {s.pullbackY !== null && (
            <>
              <polyline points={`350,30 430,${s.pullbackY}`}
                fill="none" stroke={isFail ? C.muted : isPass ? C.gold : C.white}
                strokeWidth="2.5" strokeLinecap="round"
                style={{ transition: "all 0.5s" }} />
              <circle cx="430" cy={s.pullbackY} r="5"
                fill={C.card} stroke={isFail ? C.muted : isPass ? C.gold : C.white} strokeWidth="2"
                style={{ transition: "all 0.5s" }} />
              <text x="448" y={s.pullbackY + 5} fontFamily={F.mono} fontSize="11" fontWeight="600"
                fill={isFail ? C.muted : isPass ? C.gold : C.white}
                style={{ transition: "fill 0.5s" }}>
                {s.pullbackY === 195 ? "40 pips" : "150 pips"}
              </text>
            </>
          )}

          {/* Verdict badges */}
          {isFail && (
            <g>
              <rect x="60" y="5" width="200" height="35" rx="5" fill={C.redDim} />
              <text x="160" y="18" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill={C.red}>Price: 13% ✗ &nbsp; Time: 8% ✗</text>
              <text x="160" y="33" textAnchor="middle" fontFamily={F.mono} fontSize="9" fontWeight="600" fill={C.red}>NOT SAME DEGREE</text>
            </g>
          )}
          {isPass && (
            <g>
              <rect x="60" y="5" width="200" height="35" rx="5" fill={C.greenDim} />
              <text x="160" y="18" textAnchor="middle" fontFamily={F.mono} fontSize="9" fill={C.green}>Price: 50% ✓ &nbsp; Time: 33% ✓</text>
              <text x="160" y="33" textAnchor="middle" fontFamily={F.mono} fontSize="9" fontWeight="600" fill={C.green}>POTENTIALLY SAME DEGREE</text>
            </g>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p style={{ fontFamily: F.serif, fontSize: 15.5, color: isFail ? C.red : isPass ? C.green : C.white, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 16px",
            style: { transition: "color 0.5s" } }}>
            {s.msg}
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {step > 0 && <StepBtn onClick={() => setStep(0)} color={C.muted}>Reset</StepBtn>}
            {step < steps.length - 1 && <StepBtn onClick={() => setStep(step + 1)} color={C.gold}>Next →</StepBtn>}
            {step === steps.length - 1 && <StepBtn onClick={() => setStep(0)} color={C.gold}>Watch again</StepBtn>}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 10: PROTOCOL WALKTHROUGH
// ═══════════════════════════════════════════════════════
const ProtocolWalkthrough = () => {
  const [phase, setPhase] = useState(0);

  const phases = [
    { name: "PHASE 1", title: "Separate Big from Sub", color: C.gold,
      msg: "H4: 5-wave impulse, wave 3 extended, currently in wave 4 correction. Direction: bullish.\nH1: Wave 4 developing as a Zigzag. Wave C in progress.",
      verdict: "✓ Big and Sub identified" },
    { name: "PHASE 2", title: "Is Big Structure Clean?", color: C.gold,
      msg: "All 7 rules pass. Wave 3 extended (220% of wave 1). Alternation present (wave 2 sharp, wave 4 flat). 2-4 trendline intact. No violations.",
      verdict: "✓ Big structure is clean" },
    { name: "PHASE 3", title: "Origin Point Valid?", color: C.gold,
      msg: "Sub structure (the wave 4 zigzag) originated at the wave 3 peak — inside clean, unviolated big structure territory.",
      verdict: "✓ Origin point valid" },
    { name: "PHASE 4", title: "Sub Structure Check", color: C.blue,
      msg: "Zigzag: wave A is impulsive (5 subwaves confirmed). Wave B retraced 45% of A (under 61.8%). Wave C pushing past A's end. Structure consistent with Normal Zigzag.",
      verdict: "✓ Sub structure valid" },
    { name: "PHASE 5", title: "Behavior Check", color: C.blue,
      msg: "Wave C of the zigzag was sharp and decisive — not slow or choppy. Single clean move. No multiple retests of the same level. Behavior matches structure.",
      verdict: "✓ Behavior is clean" },
    { name: "PHASE 6", title: "Confirmation", color: C.green,
      msg: "0-B trendline drawn. Price broke it in 4 hours — wave C took 6 hours. Broke in less time. Stage 1 confirmed.",
      verdict: "✓ Pattern confirmed" },
    { name: "PHASE 7", title: "Trade Decision", color: C.green,
      msg: "Big: bullish, wave 5 next. Sub: zigzag correction confirmed done. Behavior: clean. Entry for wave 5 long. Stop below wave C low. Target based on wave 1/5 equality projection.",
      verdict: "→ LONG ENTRY" },
  ];

  const p = phases[phase];

  return (
    <Card title="Module 10 — Run the Protocol" tag="FULL WALKTHROUGH" tagColor={p.color}>
      <div style={{ padding: "24px" }}>
        {/* Phase progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
          {phases.map((ph, i) => (
            <div key={i} style={{
              fontFamily: F.mono, fontSize: 8, padding: "3px 8px", borderRadius: 3, letterSpacing: 0.5,
              background: i === phase ? `${ph.color}20` : i < phase ? `${C.green}10` : "transparent",
              border: `1px solid ${i === phase ? ph.color : i < phase ? `${C.green}33` : C.border}`,
              color: i <= phase ? (i < phase ? C.green : ph.color) : C.muted,
              transition: "all 0.3s",
            }}>{ph.name}</div>
          ))}
        </div>

        {/* Phase content */}
        <div style={{ background: `${C.bg}66`, borderRadius: 8, padding: "28px 24px", minHeight: 160 }}>
          <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: p.color, marginBottom: 8, letterSpacing: 1 }}>
            {p.title}
          </div>
          <p style={{ fontFamily: F.serif, fontSize: 15, color: C.white, lineHeight: 1.7, whiteSpace: "pre-line", margin: "0 0 16px" }}>
            {p.msg}
          </p>
          <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 5, background: phase === 6 ? C.greenDim : `${p.color}12` }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: phase === 6 ? C.green : p.color }}>{p.verdict}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
          {phase > 0 && <StepBtn onClick={() => setPhase(0)} color={C.muted}>Reset</StepBtn>}
          {phase < phases.length - 1 && <StepBtn onClick={() => setPhase(phase + 1)} color={phases[phase + 1].color}>Next phase →</StepBtn>}
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MODULE 12: AI COMMUNICATION — good vs bad
// ═══════════════════════════════════════════════════════
const AICommunication = () => {
  const [active, setActive] = useState("bad");

  const examples = {
    bad: {
      user: "I think wave 3 is done. Should I short?",
      ai: "I can't determine that without measurements. You gave me a conclusion, not structure. Tell me: what timeframe? How many pips did the move cover? How long did it take? What does the pullback look like?",
      problem: "You gave AI a conclusion and asked it to agree. AI can't verify anything without data.",
    },
    good: {
      user: "H1 gold. 5 waves up from 2,900 to 3,050 = 150 pips over 12 hours. Wave 3 was 80 pips (longest). Now pullback from 3,050 to 2,990 = 60 pips over 3 hours.",
      ai: "60 pips is 40% of the 150-pip move — passes the 1/3 price test. 3 hours is 25% of 12 hours — approaches but doesn't pass the time test. Price passes independently, so this is potentially wave 2 at this degree. If it holds above 2,900, the impulse count remains valid. Check: is wave 3 at least 161.8% of wave 1 for extension confirmation?",
      problem: null,
    },
  };

  const e = examples[active];

  return (
    <Card title="Module 12 — Talking to AI" tag="COMMUNICATION" tagColor={C.blue}>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {[{id:"bad",t:"❌ Bad Description",c:C.red},{id:"good",t:"✓ Good Description",c:C.green}].map(b => (
            <button key={b.id} onClick={() => setActive(b.id)} style={{
              fontFamily: F.mono, fontSize: 10, padding: "8px 16px", borderRadius: 6,
              border: `1px solid ${active === b.id ? b.c : C.border}`,
              background: active === b.id ? `${b.c}12` : "transparent",
              color: active === b.id ? b.c : C.muted, cursor: "pointer", transition: "all 0.3s",
            }}>{b.t}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 620, margin: "0 auto" }}>
          {/* User message */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{
              background: `${C.gold}15`, border: `1px solid ${C.goldDim}`, borderRadius: "12px 12px 4px 12px",
              padding: "12px 16px", maxWidth: "80%",
            }}>
              <div style={{ fontFamily: F.mono, fontSize: 8, color: C.muted, marginBottom: 4, letterSpacing: 1 }}>YOU</div>
              <p style={{ fontFamily: F.serif, fontSize: 14, color: C.white, margin: 0, lineHeight: 1.5 }}>{e.user}</p>
            </div>
          </div>

          {/* AI response */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: `${C.blue}10`, border: `1px solid ${C.blueDim}`, borderRadius: "12px 12px 12px 4px",
              padding: "12px 16px", maxWidth: "80%",
            }}>
              <div style={{ fontFamily: F.mono, fontSize: 8, color: C.blue, marginBottom: 4, letterSpacing: 1 }}>AI</div>
              <p style={{ fontFamily: F.serif, fontSize: 14, color: C.whiteDim, margin: 0, lineHeight: 1.5 }}>{e.ai}</p>
            </div>
          </div>
        </div>

        {e.problem && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <div style={{ display: "inline-block", padding: "8px 16px", borderRadius: 6, background: C.redDim, border: `1px solid ${C.red}22` }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.red }}>{e.problem}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════
export {
  CycleExplainer,
  FractalZoom,
  RuleViolations,
  OverlapStory,
  FiboTool,
  AnalysisFlow,
  ShapeExplainer,
  MutationExplainer,
  ComplexCorrections,
  ConfirmationExplainer,
  ZeroBTrendline,
  ExtensionTypes,
  EntryTypes,
  DegreeTest,
  DontGetTrapped,
  ProtocolWalkthrough,
  StopShowdown,
  AICommunication
};

export default function VantaInteractiveV2() {
  const Label = ({ children }) => (
    <div style={{ textAlign: "center" }}><span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, letterSpacing: 1 }}>{children}</span></div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "48px 20px", display: "flex", flexDirection: "column", gap: 48 }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 3, color: C.goldDim, textTransform: "uppercase" }}>
          Vanta — Interactive Explanations v2
        </span>
      </div>

      <Label>MODULE 3 — THE CYCLE</Label>
      <CycleExplainer />
      <FractalZoom />

      <Label>MODULE 4 — THE RULES</Label>
      <RuleViolations />
      <OverlapStory />
      <FiboTool />

      <Label>MODULE 5 — THE PLAYBOOK</Label>
      <AnalysisFlow />

      <Label>MODULE 6 — THE SHAPES</Label>
      <ShapeExplainer />
      <MutationExplainer />
      <ComplexCorrections />

      <Label>MODULE 7 — THE LOCK</Label>
      <ConfirmationExplainer />
      <ZeroBTrendline />
      <ExtensionTypes />

      <Label>MODULE 8 — THE TRIGGER</Label>
      <EntryTypes />

      <Label>MODULE 9 — THE TRAP</Label>
      <DontGetTrapped />
      <DegreeTest />

      <Label>MODULE 10 — THE FULL PICTURE</Label>
      <ProtocolWalkthrough />

      <Label>MODULE 11 — THE DISCIPLINE</Label>
      <StopShowdown />

      <Label>MODULE 12 — THE PARTNER</Label>
      <AICommunication />
    </div>
  );
}
