const { createClient } = require('@sanity/client')

const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || 'YOUR_WRITE_TOKEN_HERE'

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  apiVersion: '2024-03-20',
  useCdn: false,
  token: SANITY_WRITE_TOKEN,
})

const module01 = {
  _id: 'the-lie-you-were-sold',
  _type: 'education',
  title: 'The Lie You Were Sold',
  slug: { _type: 'slug', current: 'the-lie-you-were-sold' },
  subtitle: 'Why every prediction-based system is designed to lose your money',
  metaLine: '⏱ 25 min read · 4 sections',
  difficulty: 'Foundation',
  estimatedTime: '25 min',
  order: 1,
  x: 20,
  y: 30,
  sections: [
    {
      label: 'SECTION 01',
      heading: 'The Prediction Trap',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "Let's start with something uncomfortable." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Every trading system you've been taught — every single one — runs on the same broken idea. That you can predict where price is going next." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Think about it. Supply and demand zones. Order blocks. Fair value gaps. Fibonacci levels drawn from random swing points. \"Liquidity grabs.\" They all ask you to do the same thing: draw a line on the chart, then hope price respects it." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Price does not care about your line." }] },
        { _type: 'callout', type: 'truth', text: "The price on your chart is the last agreed-upon transaction between a buyer and a seller. That's it. It's a receipt — not a prediction." },
        { _type: 'block', children: [{ _type: 'span', text: "Here's what actually happens when your favourite SMC guru draws a supply zone and says \"price will reject here.\"" }] },
        { _type: 'block', children: [{ _type: 'span', text: "Sometimes it does. Coincidence. He screenshots it. Posts it. Gets 4,000 likes." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Sometimes it doesn't. Price blasts straight through without a single hesitation candle. He deletes the chart. Pretends it never happened." }] },
        { _type: 'block', children: [{ _type: 'span', text: "You've seen this. You know exactly what I'm talking about." }] },
        { _type: 'block', children: [{ _type: 'span', text: "That's not analysis. That's survivorship bias in a hoodie selling you a Discord subscription." }] },
        { _type: 'interactive', type: 'zone-myth' },
        { _type: 'block', children: [{ _type: 'span', text: "Now think about what these systems actually ask you to do." }] },
        {
          _type: 'steps',
          title: 'The Prediction Process',
          items: [
            'Identify a zone on the chart based on what price did in the past',
            'Assume that zone will hold again in the future',
            'Enter a trade based on that assumption',
            'Set a stop based on that assumption',
            'Set a target based on that assumption'
          ]
        },
        { _type: 'block', children: [{ _type: 'span', text: "Every step is built on prediction. Not one single step involves reading what price is actually doing right now." }] },
        { _type: 'callout', type: 'danger', text: "Prediction-based trading has a built-in failure rate that cannot be fixed by discipline, risk management, or psychology. The failure is structural. The framework itself is broken." },
        { _type: 'block', children: [{ _type: 'span', text: "And no one will tell you this — because telling you this doesn't sell courses." }] }
      ]
    },
    {
      label: 'SECTION 02',
      heading: 'A Different Way to See Markets',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "So if prediction doesn't work, what does? Reading." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Not chart patterns. Not candlestick formations. Not \"reading the market\" the way your favourite Twitter trader means it when he's trying to sound deep." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Actual reading. Of what price has already done. Of the structural evidence it left behind." }] },
        { _type: 'callout', type: 'truth', text: "Price can do whatever it wants. But it cannot erase what it has already done." },
        { _type: 'block', children: [{ _type: 'span', text: "This is what we call Supra's Trend Law. And it's the foundation everything at VANTA is built on." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Here's what it means in practice: Price can continue a trend. It can reverse. It can consolidate for three weeks and bore you to death. It can spike 200 pips in ten minutes then retrace the whole thing before you finish your coffee. It can fail to complete what looked like a textbook pattern." }] },
        { _type: 'block', children: [{ _type: 'span', text: "There are zero guarantees about what price will do next. Ever. Anyone who tells you otherwise is selling you something." }] },
        { _type: 'block', children: [{ _type: 'span', text: "But — and this is the shift — every move price makes leaves structural evidence behind. Like footprints. That evidence doesn't tell you what will happen. It tells you what has happened. And if you can accurately read what has happened, you can identify:" }] },
        {
          _type: 'block',
          children: [
            { _type: 'span', text: "1. The conditions where certain outcomes become " },
            { _type: 'span', text: "structurally likely", marks: ['strong'] }
          ]
        },
        {
          _type: 'block',
          children: [
            { _type: 'span', text: "2. The conditions where certain outcomes become " },
            { _type: 'span', text: "structurally impossible", marks: ['strong'] }
          ]
        },
        { _type: 'block', children: [{ _type: 'span', text: "That second one is the edge. Knowing what can't happen is worth more than guessing what might." }] },
        {
          _type: 'comparison',
          left: {
            title: "Price will bounce from this zone.",
            bullets: [
              'Draws zones from historical price',
              'Assumes zones hold in the future',
              'Enters based on assumption',
              'Manages based on assumption',
              'No structural verification',
              'Hope-based execution'
            ]
          },
          right: {
            title: "Price completed a structural pattern. The rules say the next move must meet specific requirements.",
            bullets: [
              'Reads what price already did',
              'Classifies structure using rules',
              'Enters only with confirmation',
              'Stops at structural invalidation',
              'Every rule is verifiable',
              'Evidence-based execution'
            ]
          }
        },
        { _type: 'block', children: [{ _type: 'span', text: "The evidence-based trader never tells the market what to do. They wait for the market to tell them what it did. Then they act." }] },
        { _type: 'block', children: [{ _type: 'span', text: "This is what we teach at VANTA. Not a strategy. Not a setup. Not \"my personal confluences.\" A complete framework for reading structural evidence, built on rules that have been refined for decades and verified through mathematical relationships that actually hold up under pressure." }] }
      ]
    },
    {
      label: 'SECTION 03',
      heading: 'Why Most Traders Can\'t Be Saved',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "I'm going to be direct with you here." }] },
        { _type: 'block', children: [{ _type: 'span', text: "The trading education industry is not designed to make you profitable. It's designed to sell you hope." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Think about it from their side. If you actually became profitable, you'd stop buying courses. You'd stop paying for signals. You'd stop joining Discords. You'd stop being their customer." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Their business model depends on your failure. Not your success. Your failure." }] },
        { _type: 'interactive', type: 'failure-cycle' },
        { _type: 'block', children: [{ _type: 'span', text: "Every single popular retail methodology operates inside this loop. SMC. ICT. Price action zones. Indicator systems. Harmonic patterns. They're all flavours of the same broken thing." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Switching between them is like changing seats on a sinking ship. The problem isn't which seat you're in. The problem is the ship." }] },
        { _type: 'callout', type: 'truth', text: "The traders who survive long-term share one characteristic: they abandoned prediction entirely." },
        { _type: 'block', children: [{ _type: 'span', text: "You're here because something told you the standard approach is broken. That instinct is correct." }] },
        { _type: 'block', children: [{ _type: 'span', text: "The question is whether you're willing to unlearn everything you think you know and start from zero. Genuinely zero. Not \"zero but I'll keep my order blocks just in case.\" Zero." }] },
        { _type: 'block', children: [{ _type: 'span', text: "If you are — keep going." }] },
        { _type: 'block', children: [{ _type: 'span', text: "If you're still attached to your supply and demand zones, your fair value gaps, your \"confluences\" — respectfully, this is not for you. We don't blend prediction with evidence-based analysis. They're fundamentally incompatible. You can't half-commit to this." }] }
      ]
    },
    {
      label: 'SECTION 04',
      heading: 'What You\'ll Learn (And What You Won\'t)',
      content: [
        { _type: 'block', children: [{ _type: 'span', text: "Over the next 12 weeks, you're going to learn a structural analysis framework that most retail traders don't even know exists." }] },
        { _type: 'block', children: [{ _type: 'span', text: "It's based on NEoWave — the most advanced evolution of Elliott Wave Theory, developed by Glenn Neely over decades of obsessive refinement." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Before you cringe — no. This is not the Elliott Wave your uncle draws on TradingView with five random lines and a dream. That version of Elliott Wave is subjective, vague, and gets it wrong more often than right. NEoWave is the opposite." }] },
        {
          _type: 'learningList',
          type: 'will',
          title: "WHAT YOU'LL LEARN",
          items: [
            'How to identify the smallest undeniable unit of market structure and build upward from there',
            'How the math between adjacent waves reveals what you\'re actually looking at',
            'How to assemble waves into complex patterns using rule-based classification — not guesswork',
            'How to tell when a correction is real vs when it\'s a complex structure pretending to be simpler',
            'How to recognize when a trend is exhausted before anyone else sees it',
            'The complete protocol that takes you from raw chart to trade decision with zero ambiguity',
            'How to integrate AI into your analysis so you never skip a rule under pressure'
          ]
        },
        {
          _type: 'learningList',
          type: 'wont',
          title: "WHAT YOU WON'T LEARN",
          items: [
            'Where to draw zones',
            'Which indicator to use',
            'When to \"feel\" the market is ready',
            'Any system that relies on prediction, intuition, or hope'
          ]
        },
        { _type: 'interactive', type: 'journey' },
        { _type: 'block', children: [{ _type: 'span', text: "This is structural engineering applied to financial markets. It's precise. It's rule-governed. And it's completely learnable — but it requires patience, discipline, and the willingness to say \"I don't know\" when the structure is unclear." }] },
        { _type: 'block', children: [{ _type: 'span', text: "Because an unclear structure means no trade. And \"no trade\" is the most important trade you'll ever make." }] }
      ]
    }
  ],
  quiz: [
    {
      text: "What is the core problem with prediction-based trading systems like SMC and supply/demand zones?",
      options: [
        { text: "They use the wrong indicators", isCorrect: false },
        { text: "They require too much screen time", isCorrect: false },
        { text: "They assume historical zones will hold in the future — which is prediction, not analysis", isCorrect: true, explanation: "Prediction assumes the future repeats the past blindly." },
        { text: "They don't use enough confluences", isCorrect: false }
      ]
    },
    {
      text: "What does Supra's Trend Law state?",
      options: [
        { text: "Price always follows the trend", isCorrect: false },
        { text: "Price can do whatever it wants, but it cannot erase what it has already done", isCorrect: true, explanation: "Historical structure is immutable evidence." },
        { text: "Price respects zones 70% of the time", isCorrect: false },
        { text: "Price is controlled by institutions", isCorrect: false }
      ]
    },
    {
      text: "What is the fundamental difference between a prediction-based trader and an evidence-based trader?",
      options: [
        { text: "The evidence-based trader uses more indicators", isCorrect: false },
        { text: "The prediction-based trader doesn't use stop losses", isCorrect: false },
        { text: "The prediction-based trader tells the market what to do; the evidence-based trader reads what the market already did", isCorrect: true, explanation: "Evidence-based traders are reactive to structural data." },
        { text: "There is no real difference", isCorrect: false }
      ]
    },
    {
      text: "Why does the trading education industry benefit from your failure?",
      options: [
        { text: "They make money from refunds", isCorrect: false },
        { text: "A profitable trader stops buying courses, signals, and subscriptions", isCorrect: true, explanation: "Success removes the need for their core business model." },
        { text: "They want you to switch to a different market", isCorrect: false },
        { text: "They don't benefit from failure", isCorrect: false }
      ]
    },
    {
      text: "What does NEoWave require before any trade is considered?",
      options: [
        { text: "A minimum of 3 confluences", isCorrect: false },
        { text: "Indicator confirmation", isCorrect: false },
        { text: "Pattern completion that satisfies specific construction rules AND post-constructive confirmation", isCorrect: true, explanation: "Strict rules and confirmation are mandatory markers." },
        { text: "A signal from the analysis feed", isCorrect: false }
      ]
    }
  ]
}

async function importContent() {
  if (SANITY_WRITE_TOKEN === 'YOUR_WRITE_TOKEN_HERE') {
    console.error('Error: Please provide a SANITY_WRITE_TOKEN in your environment or the script.')
    process.exit(1)
  }

  try {
    console.log('Pushing Module 01 to Sanity...')
    const result = await client.createOrReplace(module01)
    console.log(`Success! Module 01 created with ID: ${result._id}`)
  } catch (err) {
    console.error('Import failed:', err.message)
  }
}

importContent()
