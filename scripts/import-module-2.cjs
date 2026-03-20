const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

const module02 = {
  _id: 'the-smallest-truth',
  _type: 'education',
  title: 'The Smallest Truth',
  subtitle: 'The building blocks that everything in this system is made of',
  slug: { _type: 'slug', current: 'the-smallest-truth' },
  moduleNumber: 2,
  phase: 'Phase 1 — The Unlearning',
  duration: '30 min read',
  sectionsCount: 5,
  difficulty: 'Foundation',
  metaLine: '⏱ 30 min read · 5 sections',
  content: [
    // --- SECTION 01 ---
    {
      _type: 'block',
      _key: 's1h',
      children: [{ _type: 'span', text: 'SECTION 01' }],
      style: 'h4',
    },
    {
      _type: 'block',
      _key: 's1t',
      children: [{ _type: 'span', text: 'Meet the Monowave' }],
      style: 'h2',
    },
    {
      _type: 'block',
      _key: 'p1',
      children: [{ _type: 'span', text: 'In Module 01, we burned everything down. Prediction is broken. Zones are a lie. The whole industry profits from your losses.\n\nNow we build. From the absolute bottom. From the smallest thing that exists in a market.\n\nIt\'s called a ' }, { _type: 'span', text: 'monowave.', marks: ['strong'] }],
      style: 'normal',
    },
    {
      _type: 'block',
      _key: 'p2',
      children: [{ _type: 'span', text: 'Here\'s what a monowave is — and I promise you, this is the simplest thing you\'ll learn in this entire curriculum.\n\nPrice is going up. Then it stops going up and starts going down. That upward movement — from the moment it started going up to the moment it stopped — is one monowave.\n\nThe downward movement that follows? That\'s another monowave.\n\nThat\'s it. A monowave is just price moving in one direction until it changes direction. Nothing more.' }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig21',
      type: 'monowave-atom',
    },
    {
      _type: 'block',
      _key: 'p3',
      children: [{ _type: 'span', text: '"Okay, but that\'s literally just... price going up then down. How is that useful?"\n\nGood question. Here\'s the answer.\n\nA single monowave by itself tells you almost nothing. Price went up 200 pips. Cool. So what?\n\nBut the moment you start looking at the monowave ' }, { _type: 'span', text: 'next to it', marks: ['em'] }, { _type: 'span', text: ' — what it did compared to the one before — now you have information. Real, measurable, mathematical information.\n\nHow much did the second wave retrace the first? How long did it take? How does it compare in size?\n\nThose relationships aren\'t random. They follow specific rules. And those rules tell you what the wave actually IS — whether you\'re looking at a trend move or a pullback, the start of a pattern or the end of one.\n\nWe\'ll get into those rules in Module 03. For now, just understand this: ' }, { _type: 'span', text: 'the monowave is the atom. Everything is made of atoms. Get the atoms wrong and everything you build on top of them falls apart.', marks: ['strong'] }],
      style: 'normal',
    },
    {
      _type: 'callout',
      _key: 'c1',
      type: 'truth',
      text: 'A monowave is objective. Two analysts looking at the same chart will identify the same monowaves every time. That alone separates this framework from everything else in retail trading — where two people can\'t even agree on where a wave starts.',
    },
    {
      _type: 'block',
      _key: 'p4',
      children: [{ _type: 'span', text: 'Now — one practical thing before we move on. How do you actually identify monowaves on a chart?' }],
      style: 'normal',
    },
    {
      _type: 'steps',
      _key: 'steps1',
      items: [
        'Switch to a line chart. Not candlesticks, not bars. A line chart using closing prices. Line charts give you one point per period. Zero ambiguity.',
        'Use spot/cash data. If you\'re trading gold or forex, use spot prices. Futures contracts have time decay baked into them that distorts the natural structure.',
        'Start at the left side of your chart. Follow price forward. Every time direction changes — up becomes down, or down becomes up — mark that point.',
        'Connect the marks with straight lines. Each line segment between two marks is one monowave.'
      ],
    },
    {
      _type: 'block',
      _key: 'p5',
      children: [{ _type: 'span', text: 'That\'s the whole process. No indicators. No special tools. Just price, direction changes, and straight lines.' }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig22',
      type: 'candle-line',
    },
    {
      _type: 'block',
      _key: 'p6',
      children: [{ _type: 'span', text: 'One more thing. There\'s a situation where identifying monowaves gets slightly tricky — when price goes sideways. Not up, not down, just flat. Horizontal.\n\nThere\'s a specific rule for resolving this called the ' }, { _type: 'span', text: 'Rule of Neutrality.', marks: ['strong'] }, { _type: 'span', text: ' We don\'t need to deep-dive it now, but here\'s the short version:\n\nIf the flat section sits between two waves going in ' }, { _type: 'span', text: 'opposite', marks: ['strong'] }, { _type: 'span', text: ' directions (up, flat, down) — the flat belongs to the first wave. The first wave extends through the sideways part.\n\nIf the flat section sits between two waves going in the ' }, { _type: 'span', text: 'same', marks: ['strong'] }, { _type: 'span', text: ' direction (up, flat, up) — the flat splits into three smaller segments.' }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig23',
      type: 'neutrality-rule',
    },

    // --- SECTION 02 ---
    {
      _type: 'block',
      _key: 's2h',
      children: [{ _type: 'span', text: 'SECTION 02' }],
      style: 'h4',
    },
    {
      _type: 'block',
      _key: 's2t',
      children: [{ _type: 'span', text: 'The Fractal Market' }],
      style: 'h2',
    },
    {
      _type: 'block',
      _key: 'p7',
      children: [{ _type: 'span', text: 'Okay. You can identify monowaves now. Let\'s zoom out — because what you\'re about to learn is one of those concepts that, once you see it, you can never unsee it.\n\nHere\'s the concept: ' }, { _type: 'span', text: 'every wave is made of smaller waves.', marks: ['strong'] }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig24',
      type: 'fractal-zoom',
    },
    {
      _type: 'block',
      _key: 'p8',
      children: [{ _type: 'span', text: 'This is called the ' }, { _type: 'span', text: 'fractal', marks: ['strong'] }, { _type: 'span', text: ' nature of markets. "Fractal" just means self-similar at different scales — the same patterns repeat whether you\'re looking at a 5-minute chart or a monthly chart.\n\nWhy does this matter to you practically?\n\nBecause it means the system you\'re learning works everywhere. The rules for identifying patterns on M15 are the same rules on H4. The confirmation requirements on M5 are the same on the daily.\n\nBut it also means something else — something that trips up almost every wave analyst alive:\n\n' }, { _type: 'span', text: 'You can be looking at waves from two completely different scales and not realize it.', marks: ['strong'] }],
      style: 'normal',
    },
    {
      _type: 'callout',
      _key: 'c2',
      type: 'danger',
      text: 'This is the #1 mistake in wave analysis: confusing waves from different scales. If you\'re combining a large wave with a tiny wave and calling them part of the same pattern — your count is wrong. Not all waves on your screen are the same size, even if they look like they are.',
    },

    // --- SECTION 03 ---
    {
      _type: 'block',
      _key: 's3h',
      children: [{ _type: 'span', text: 'SECTION 03' }],
      style: 'h4',
    },
    {
      _type: 'block',
      _key: 's3t',
      children: [{ _type: 'span', text: 'Impulsions and Corrections — There Is No Third Option' }],
      style: 'h2',
    },
    {
      _type: 'block',
      _key: 'p9',
      children: [{ _type: 'span', text: 'Every move the market makes — every single one, on every timeframe, in every instrument — is one of exactly two things:\n\n1. An Impulsion — a move WITH the trend\n2. A Correction — a move AGAINST the trend\n\nThere is no third category. Every period where the market looks like it\'s doing nothing? That\'s a correction.' }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig25',
      type: 'movement-types',
    },
    {
      _type: 'comparison',
      _key: 'comp1',
      left: {
        tag: 'IMPULSION (GOLD)',
        title: 'Moves WITH the trend',
        bullets: [
          'Pushes price forward',
          'When complex: 5 segments',
          'Structure label: :5',
          'The engine of all trends'
        ]
      },
      right: {
        tag: 'CORRECTION (SILVER)',
        title: 'Moves AGAINST the trend',
        bullets: [
          'Pulls price back temporarily',
          'When complex: 3 segments',
          'Structure label: :3',
          'Where most traders lose money'
        ]
      }
    },
    {
      _type: 'callout',
      _key: 'c3',
      type: 'truth',
      text: 'Every move is either :5 or :3. If you get this classification right, you know the structure of what you\'re looking at. This binary is the single most important determination you\'ll make at every stage of analysis.',
    },

    // --- SECTION 04 ---
    {
      _type: 'block',
      _key: 's4h',
      children: [{ _type: 'span', text: 'SECTION 04' }],
      style: 'h4',
    },
    {
      _type: 'block',
      _key: 's4t',
      children: [{ _type: 'span', text: 'The Concept of Degree' }],
      style: 'h2',
    },
    {
      _type: 'block',
      _key: 'p10',
      children: [{ _type: 'span', text: 'Degree = scale. A large wave is a higher degree than a small wave. But here\'s the critical part — degree is ' }, { _type: 'span', text: 'relative, not absolute.', marks: ['strong'] }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig26',
      type: 'wave-degrees',
    },
    {
      _type: 'interactive',
      _key: 'fig27',
      type: 'degree-mismatch',
    },

    // --- SECTION 05 ---
    {
      _type: 'block',
      _key: 's5h',
      children: [{ _type: 'span', text: 'SECTION 05' }],
      style: 'h4',
    },
    {
      _type: 'block',
      _key: 's5t',
      children: [{ _type: 'span', text: 'How Waves Tell You What They Are' }],
      style: 'h2',
    },
    {
      _type: 'block',
      _key: 'p11',
      children: [{ _type: 'span', text: 'You can\'t tell what a wave is by looking at it alone. You classify it by examine what\'s around it. This is the m0/m1/m2 system.' }],
      style: 'normal',
    },
    {
      _type: 'interactive',
      _key: 'fig28',
      type: 'context-meaning',
    },
    {
      _type: 'interactive',
      _key: 'fig29',
      type: 'analysis-order',
    },
    {
      _type: 'block',
      _key: 's6t',
      children: [{ _type: 'span', text: 'What You Now Have' }],
      style: 'h2',
    },
    {
      _type: 'interactive',
      _key: 'fig-end',
      type: 'foundation-summary',
    },
  ],
  quiz: [
    {
      _key: 'q1',
      question: 'What is a monowave?',
      options: ['A candlestick pattern', 'The movement of price from one direction change to the next', 'A wave that lasts exactly one time period', 'The space between support and resistance'],
      answerIndex: 1,
    },
    {
      _key: 'q2',
      question: 'Why does NEoWave require line charts instead of candlestick charts?',
      options: ['Line charts have more data', 'Candlesticks have four data points per period, creating ambiguity', 'Line charts show volume better', 'None of the above'],
      answerIndex: 1,
    },
    {
      _key: 'q3',
      question: 'What does the "fractal" nature of markets mean?',
      options: ['Markets follow Fibonacci', 'Charts look the same at all resolutions', 'Every wave contains smaller waves, repeating patterns at scales', 'Fractals are a type of indicator'],
      answerIndex: 2,
    },
    {
      _key: 'q4',
      question: 'Every move in the market is either:',
      options: ['Bullish or bearish', 'Trending or ranging', 'An impulsion (:5) or a correction (:3)', 'A breakout or a fakeout'],
      answerIndex: 2,
    },
    {
      _key: 'q5',
      question: 'How many segments does a complex impulsive pattern have?',
      options: ['3', '5', '7', 'Infinite'],
      answerIndex: 1,
    },
    {
      _key: 'q6',
      question: 'What does "degree" mean in wave analysis?',
      options: ['Wave angle', 'Pips covered', 'Scale of wave relative to surrounding waves', 'Timeframe'],
      answerIndex: 2,
    },
    {
      _key: 'q7',
      question: 'Can you determine if a wave is impulsive or corrective in isolation?',
      options: ['Yes', 'No — you must examine context around it', 'Only on H4+', 'Only with indicators'],
      answerIndex: 1,
    },
    {
      _key: 'q8',
      question: 'In NEoWave analysis, what comes FIRST?',
      options: ['Labeling 1,2,3', 'Identifying pattern name', 'Determining Structure Labels (:5 or :3)', 'Setting entry/stops'],
      answerIndex: 2,
    },
  ]
};

async function importModule() {
  try {
    const result = await client.createOrReplace(module02);
    console.log(`Success! Module 02 created with ID: ${result._id}`);
  } catch (err) {
    console.error('Import failed:', err.message);
  }
}

importModule();
