const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

const module02Definitive = {
  _id: 'the-smallest-truth',
  _type: 'education',
  title: 'The Smallest Truth',
  slug: { _type: 'slug', current: 'the-smallest-truth' },
  subtitle: 'How markets actually move — and the pattern hiding inside every chart',
  metaLine: '⏱ 30 min read · 5 sections',
  difficulty: 'Foundation',
  estimatedTime: '30 min',
  order: 2,
  x: 50,
  y: 40,
  sections: [
    {
      label: 'SECTION 01',
      heading: 'Every Market Moves the Same Way',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "In Module 01, we talked about what doesn't work. Prediction. Zones. Hope." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Now let's talk about what actually does work. And it starts with one observation that will change how you look at every chart for the rest of your life." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Markets move in cycles.", marks: ['strong'] }] },
        { _type: 'block', children: [{ _type: 'span', text: "Not randomly. Not chaotically. In repeating cycles that follow a specific shape. And that shape is the same whether you're looking at gold, forex, stocks, crypto — it doesn't matter. Same shape. Every time." }] },
        { _type: 'block', children: [{ _type: 'span', text: "The shape is this:", marks: ['strong'] }] },
        { _type: 'block', children: [{ _type: 'span', text: "5 waves in the direction of the trend. Then a correction. Then it starts again.", marks: ['strong'] }] },
        { _type: 'interactive', type: 'market-cycle' },
        { _type: 'block', children: [{ _type: 'span', text: "Take a second with that image. Five waves pushing forward. A three-wave correction. Then a fresh start." }] }
      ]
    },
    {
      label: 'SECTION 02',
      heading: 'What Each Wave Actually Does',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "You've seen the shape. Five waves forward, correction, repeat. Now let's meet each wave individually — because they're not all the same. Each one has its own personality. Its own job. Its own rules." }] },
        { _type: 'interactive', type: 'wave-personalities-tour' },
        { _type: 'callout', type: 'truth', text: "Wave 2 can NEVER retrace all of Wave 1. If it does, the count is wrong. This is not a guideline — it is an absolute rule." },
        { _type: 'block', children: [{ _type: 'span', text: "Wave 3 is the engine. The freight train. There's a hard rule: Wave 3 can never be the shortest of waves 1, 3, and 5." }] },
        { _type: 'callout', type: 'truth', text: "Wave 4 cannot enter the price territory of Wave 2. This \"overlap rule\" is one of the fastest ways to confirm or invalidate a wave count." },
        { _type: 'interactive', type: 'wave-personalities-cards' }
      ]
    },
    {
      label: 'SECTION 03',
      heading: 'What Happens After the 5 Waves',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "The 5 waves pushed price in one direction. Now the market corrects." }] },
        { _type: 'block', children: [{ _type: 'span', text: "The correction has 3 waves, labeled A, B, and C." }] },
        {
           _type: 'block',
           children: [
             { _type: 'span', text: "Wave A", marks: ['strong'] },
             { _type: 'span', text: " — the first move against the trend. " },
             { _type: 'span', text: "Wave B", marks: ['strong'] },
             { _type: 'span', text: " — a bounce that tricks people. It's a trap. " },
             { _type: 'span', text: "Wave C", marks: ['strong'] },
             { _type: 'span', text: " — the final leg of the correction." }
           ]
        },
        { _type: 'interactive', type: 'market-cycle-rich' },
        { _type: 'callout', type: 'truth', text: "The full cycle is 5 + 3 = 8 waves. Five in the trend direction, three correcting it. When the correction is done, a new set of 5 waves begins." }
      ]
    },
    {
      label: 'SECTION 04',
      heading: 'Impulsive and Corrective — The Two Building Blocks',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "Waves 1, 3, and 5 are the ones pushing price forward. They're moving WITH the trend. We call these impulsive waves.", marks: ['strong'] }] },
        { _type: 'block', children: [{ _type: 'span', text: "Waves 2 and 4 are the pullbacks. They're moving AGAINST the trend. We call these corrective waves.", marks: ['strong'] }] },
        { _type: 'interactive', type: 'impulsive-corrective-toggle' },
        { _type: 'block', children: [{ _type: 'span', text: "Impulsive waves and corrective waves are built differently on the inside. This is the concept that makes the whole system work." }] }
      ]
    },
    {
      label: 'SECTION 05',
      heading: 'Waves Have Waves Inside Them',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "This is called the fractal nature of markets. The same pattern repeats at different sizes." }] },
        { _type: 'block', children: [{ _type: 'span', text: "All impulsive waves have 5 waves inside them. But corrective waves look different — they have 3-wave structures inside them." }] },
        { _type: 'interactive', type: 'zoom-wave-3' },
        { _type: 'interactive', type: 'zoom-wave-2' },
        { _type: 'block', children: [{ _type: 'span', text: "What looked like 5 simple waves is actually 21 smaller waves when you zoom in one level. 15 impulsive (3x5) + 6 corrective (2x3) = 21 total." }] },
        { _type: 'interactive', type: 'full-internal-structure' },
        { _type: 'block', children: [{ _type: 'span', text: "A single trend move contains waves inside waves inside waves — all following the same rules. Learn the rules once, and they work at every scale.", marks: ['italic'] }] },
        { _type: 'interactive', type: 'foundation-summary-definitive' }
      ]
    }
  ],
  quiz: [
    {
      text: "How does a market cycle work?",
      options: [
        { text: "3 waves forward, 5 waves back", isCorrect: false },
        { text: "Random moves up and down", isCorrect: false },
        { text: "5 waves in the trend direction, then a 3-wave correction, then a new cycle begins", isCorrect: true, explanation: "The 5+3 cycle is the fundamental rhythm of markets." },
        { text: "It depends on the instrument", isCorrect: false }
      ]
    },
    {
      text: "Which wave in a 5-wave trend is typically the longest and strongest?",
      options: [
        { text: "Wave 1", isCorrect: false },
        { text: "Wave 5", isCorrect: false },
        { text: "Wave 3", isCorrect: true, explanation: "Wave 3 is the engine of the trend." },
        { text: "Wave 2", isCorrect: false }
      ]
    },
    {
      text: "What happens if Wave 2 retraces ALL of Wave 1?",
      options: [
        { text: "It's a strong buying opportunity", isCorrect: false },
        { text: "It means the trend is extra powerful", isCorrect: false },
        { text: "The wave count is wrong — Wave 2 can never retrace all of Wave 1", isCorrect: true, explanation: "This is a hard rule of Wave Theory." },
        { text: "It's normal and expected", isCorrect: false }
      ]
    },
    {
      text: "What is the 'overlap rule' for Wave 4?",
      options: [
        { text: "Wave 4 must be shorter than Wave 2", isCorrect: false },
        { text: "Wave 4 can never enter the price territory of Wave 2", isCorrect: true, explanation: "Overlap between 4 and 2 invalidates an impulsive count." },
        { text: "Wave 4 must overlap with Wave 3", isCorrect: false },
        { text: "There is no overlap rule", isCorrect: false }
      ]
    },
    {
      text: "In a 5-wave trend, which waves are 'impulsive' (pushing with the trend)?",
      options: [
        { text: "Waves 2 and 4", isCorrect: false },
        { text: "Waves 1, 2, and 3", isCorrect: false },
        { text: "Waves 1, 3, and 5", isCorrect: true, explanation: "Impulsive waves move with the trend." },
        { text: "All five waves", isCorrect: false }
      ]
    },
    {
      text: "What's inside an impulsive wave when you zoom in?",
      options: [
        { text: "3 smaller waves", isCorrect: false },
        { text: "Random noise", isCorrect: false },
        { text: "5 smaller waves following the same 1-2-3-4-5 pattern", isCorrect: true, explanation: "Fractal nature dictates the same structure at smaller scales." },
        { text: "It depends on the timeframe", isCorrect: false }
      ]
    },
    {
      text: "What's inside a corrective wave when you zoom in?",
      options: [
        { text: "5 smaller waves", isCorrect: false },
        { text: "3 waves (a-b-c) or more complex corrective patterns", isCorrect: true, explanation: "Corrective waves have a different internal structure than impulsive waves." },
        { text: "The same as impulsive waves", isCorrect: false },
        { text: "Nothing — corrective waves have no internal structure", isCorrect: false }
      ]
    },
    {
      text: "How many total smaller waves are inside a 5-wave trend when you zoom in one level?",
      options: [
        { text: "5", isCorrect: false },
        { text: "15", isCorrect: false },
        { text: "21 (three impulsive waves x 5 + two corrective waves x 3)", isCorrect: true, explanation: "3x5 + 2x3 = 21 waves." },
        { text: "8", isCorrect: false }
      ]
    }
  ]
};

async function importContent() {
  try {
    console.log('Pushing Definitive Module 02 to Sanity...');
    const result = await client.createOrReplace(module02Definitive);
    console.log(`Success! Definitive Module 02 created with ID: ${result._id}`);
  } catch (err) {
    console.error('Import failed:', err.message);
  }
}

importContent();
