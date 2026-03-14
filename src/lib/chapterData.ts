export interface Section {
  label: string
  heading: string
  body: string
  callout?: string // A key insight block
}

export interface Module {
  id: string
  title: string
  subtitle: string
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  x: number
  y: number
  sections: Section[]
}

export const neowaveModules: Module[] = [
  {
    id: 'm1',
    title: 'Core Philosophy',
    subtitle: 'Why NEoWave reigns above all wave theories',
    difficulty: 'Foundation',
    estimatedTime: '10 min',
    x: 18,
    y: 45,
    sections: [
      {
        label: 'The Problem',
        heading: 'Traditional Wave Theory Is Broken',
        body: 'Give any ten analysts the same chart and they will return ten different wave counts. Elliott Wave, as it was originally conceived, is a framework ripe with subjectivity. This is its fatal flaw — a tool that can justify any outcome is no tool at all.',
        callout: 'If a theory can explain everything, it predicts nothing.',
      },
      {
        label: 'The Solution',
        heading: 'Structure Over Intuition',
        body: 'NEoWave (Neely EWave Theory) was developed by Glenn Neely in the 1980s after years of rigorous back-testing. It introduces a strict, logic-based ruleset that eliminates subjectivity. Every wave that forms must adhere to specific proportional relationships in price, time, and complexity. If it doesn\'t comply, it isn\'t valid.',
      },
      {
        label: 'Core Rule',
        heading: 'The Law of Symmetry',
        body: 'Markets are governed by the principle of action and reaction. For every price movement (action), the market must produce a specific, proportional response (reaction). This law allows NEoWave analysts to disqualify invalid counts before they cause losses.',
        callout: 'A strong, directional impulse demands a complex, time-consuming counter-move. If the correction is too fast or too small, the impulse is illegitimate.',
      },
    ],
  },
  {
    id: 'm2',
    title: 'Monowaves',
    subtitle: 'Isolating the smallest undeniable unit of structure',
    difficulty: 'Foundation',
    estimatedTime: '15 min',
    x: 38,
    y: 62,
    sections: [
      {
        label: 'Definition',
        heading: 'The Irreducible Movement',
        body: 'A Monowave is the simplest measurable market movement: a single, uninterrupted price movement between two consecutive turning points, plotted on a clean "point" chart that filters out intraday noise.',
      },
      {
        label: 'Technique',
        heading: 'Plotting Without Noise',
        body: 'Unlike candlestick analysis, NEoWave plots price as a sequence of data points. This eliminates a category of false signals created by wicks and low-volume spikes, allowing the analyst to see true market structure.',
        callout: 'The quality of your Monowave identification dictates the quality of every subsequent pattern you build on top of it.',
      },
      {
        label: 'Classification',
        heading: 'The 7 Retracement Rules',
        body: 'Each Monowave is classified by measuring how much of it is retraced by the subsequent wave. This measurement determines its "Power Rating" and places it into one of seven distinct structural categories that dictate which patterns it can participate in.',
      },
    ],
  },
  {
    id: 'm3',
    title: 'Retracements',
    subtitle: 'The mathematics that govern wave interaction',
    difficulty: 'Intermediate',
    estimatedTime: '18 min',
    x: 42,
    y: 30,
    sections: [
      {
        label: 'Price Relationships',
        heading: 'Not All Retracements Are Equal',
        body: 'NEoWave expands Fibonacci analysis far beyond the popular 61.8% retracement. A wave retracing less than 38.2% of its predecessor signals extreme mono-directional momentum. A wave retracing over 100% invalidates any directional count and requires a full re-analysis.',
        callout: 'Price tells you what. Time tells you how serious.',
      },
      {
        label: 'Time Analysis',
        heading: 'Time Is The Hidden Dimension',
        body: 'Most traders ignore time, but NEoWave demands it. After confirming a valid price retracement, the analyst must compare the time taken by both waves. If Wave 2 takes longer than Wave 1 in a supposed impulse, the count is suspect by default.',
      },
    ],
  },
  {
    id: 'm4',
    title: 'Polywaves',
    subtitle: 'Assembling complex patterns from validated monowaves',
    difficulty: 'Intermediate',
    estimatedTime: '22 min',
    x: 62,
    y: 52,
    sections: [
      {
        label: 'Pattern Construction',
        heading: 'Building the Standard Patterns',
        body: 'Once Monowaves are classified via the Retracement Rules, they are assembled into the five standard Elliott Wave patterns: Impulses, ZigZags, Flats, Triangles, and Diametric formations — each governed by a strict set of structural rules.',
      },
      {
        label: 'Alternation',
        heading: 'The Rule of Alternation',
        body: 'In a validated NEoWave Impulse, Waves 2 and 4 must alternate in character. If Wave 2 is a sharp, fast ZigZag retracement, Wave 4 must be a slow, complex Flat or Triangle — and vice versa.',
        callout: 'Markets rarely repeat the same corrective style consecutively. Alternation is their way of balancing energy.',
      },
    ],
  },
  {
    id: 'm5',
    title: 'Complex Corrections',
    subtitle: 'Surviving the lethal X-wave chop environment',
    difficulty: 'Advanced',
    estimatedTime: '28 min',
    x: 78,
    y: 38,
    sections: [
      {
        label: 'X-Waves',
        heading: 'The Pattern That Destroys Traders',
        body: 'When a standard 3-wave correction fails to satisfy retracement requirements, the market forms an X-wave — connecting one corrective pattern to another. This creates "double" or "triple" corrections that can consume months of sideways movement and annihilate directional traders.',
        callout: 'Knowing when you are inside a complex correction is worth more than any entry signal. Staying out is a strategy.',
      },
      {
        label: 'Pattern Families',
        heading: 'Flats, ZigZags, and Triangles',
        body: 'Each corrective family has distinct x-wave probability profiles. After a Flat correction, a ZigZag continuation is more probable. After a Triangle, an explosive breakout (the "thrust") is virtually guaranteed. Understanding these succession rules eliminates guessing.',
      },
    ],
  },
  {
    id: 'm6',
    title: 'Terminal Impulses',
    subtitle: 'Recognizing absolute trend exhaustion before the masses',
    difficulty: 'Advanced',
    estimatedTime: '20 min',
    x: 84,
    y: 68,
    sections: [
      {
        label: 'Pattern Recognition',
        heading: 'All Trends Die the Same Way',
        body: 'A Terminal Impulse, also known as an Ending Diagonal, is the final exhausted push before a major trend reversal. Unlike standard impulses, all five waves within a Terminal overlap each other and form within converging trendlines.',
      },
      {
        label: 'The Trade',
        heading: 'The Most Reliable Reversal Setup in Markets',
        body: 'Upon completion of a confirmed NEoWave Terminal Impulse, the market must retrace the entire pattern in 50% or less of the time it took to form. This is not a guideline — it is a structural requirement.',
        callout: 'Terminal Impulses always end with a spike — a final, exhaustion-fueled push that pierces the channel. When you see the spike, the trade is already setting up.',
      },
    ],
  },
]
