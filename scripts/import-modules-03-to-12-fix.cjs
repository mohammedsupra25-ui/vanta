require('dotenv').config();
const fs = require('fs');
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

const content = fs.readFileSync('/Users/supra/Downloads/VANTA_MODULES_3_TO_12_FIX.md', 'utf8');

// ─── FIGURE PLACEMENT MAP ───────────────────────────────────────────
// Maps: moduleOrder → sectionIndex (0-based) → array of old figure IDs to append
const figureMapping = {
  3:  { 3: ['figure-3-3'], 4: ['figure-3-4'] },
  4:  { 1: ['figure-4-1', 'figure-4-2', 'figure-4-3'], 2: ['figure-4-4'] },
  5:  { 0: ['figure-8-1'] },
  6:  { 0: ['figure-5-1', 'figure-5-2', 'figure-5-3'], 2: ['figure-5-4'] },
  7:  { 0: ['figure-7-1'], 2: ['figure-4-5', 'figure-7-2'] },
  8:  { 0: ['figure-9-1'], 1: ['figure-9-2'] },
  9:  { 1: ['figure-3-2'] },
  10: { 1: ['figure-10-1'] },
  11: {},
  12: { 1: ['figure-11-1'] },
};

// ─── FORMATTING LABELS TO STRIP ─────────────────────────────────────
function isFormatLabel(line) {
  const t = line.trim();
  if (!t) return false;
  const patterns = [
    /^\*\*Section label:\*\*$/,
    /^`?SECTION \d+`?$/,
    /^\*\*Heading:\*\*$/,
    /^\*\*Body:\*\*$/,
    /^\*\*Small label \(mono/,
    /^\*\*Smaller label \(mono/,
    /^\*\*Title \(large serif/,
    /^\*\*Subtitle \(smaller, dimmed\):\*\*$/,
    /^\*\*Meta \(mono, tiny, muted\):\*\*$/,
    /^# HERO SECTION$/,
    /^Gold-tinted background.*border\.?$/,
    /^\*\*\d+ questions:\*\*$/,
  ];
  return patterns.some(p => p.test(t));
}

// ─── SPLIT ON MODULE SEPARATORS ─────────────────────────────────────
const parts = content.split(/# ═+/g);
const rawModules = [];
for (let i = 1; i < parts.length; i += 2) {
  if (parts[i + 1]) rawModules.push(parts[i] + '\n' + parts[i + 1]);
}

const modules = [];

for (const rawMod of rawModules) {
  const modNumMatch = rawMod.match(/MODULE (\d+)/);
  if (!modNumMatch) continue;
  const order = parseInt(modNumMatch[1], 10);

  const allLines = rawMod.split('\n');

  // ── Title (line after **Title (…):**) ──
  const titleIdx = allLines.findIndex(l => l.trim().startsWith('**Title ('));
  let title = `Module ${order}`;
  if (titleIdx !== -1) {
    const tl = allLines.slice(titleIdx + 1).find(l => l.trim().startsWith('# '));
    if (tl) title = tl.replace('# ', '').replace(/\*/g, '').trim();
  }

  // ── Subtitle (line after **Subtitle (…):**) ──
  const subIdx = allLines.findIndex(l => l.trim().startsWith('**Subtitle ('));
  let subtitle = '';
  if (subIdx !== -1) {
    const sl = allLines.slice(subIdx + 1).find(l => l.trim() && !l.trim().startsWith('**') && l.trim() !== '---');
    if (sl) subtitle = sl.trim();
  }

  // ── Meta / estimated time (line after **Meta (…):**) ──
  const metaIdx = allLines.findIndex(l => l.trim().startsWith('**Meta ('));
  let metaLine = '⏱ 30 min read';
  let estimatedTime = '30 min';
  if (metaIdx !== -1) {
    const ml = allLines.slice(metaIdx + 1).find(l => l.trim().startsWith('⏱'));
    if (ml) {
      metaLine = ml.trim();
      const tm = metaLine.match(/(\d+) min/);
      if (tm) estimatedTime = tm[1] + ' min';
    }
  }

  // ── Phase / Difficulty (hardcoded, verified against MD) ──
  let phase;
  if (order <= 5) phase = 'Phase 2 — The Framework';
  else if (order <= 7) phase = 'Phase 3 — The Patterns';
  else phase = 'Phase 4 — The Edge';

  let difficulty = 'Foundation';
  if (order >= 4 && order <= 8) difficulty = 'Intermediate';
  if (order >= 9) difficulty = 'Advanced';

  // ── Slug / ID ──
  const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const _id = `module-${order > 9 ? order : '0' + order}-${titleSlug}`;

  // ── Split into sections ──
  const sectionsRaw = rawMod.split(/# SECTION/);
  sectionsRaw.shift(); // drop everything before first SECTION

  let sections = [];
  let allQuizzes = [];

  for (let si = 0; si < sectionsRaw.length; si++) {
    const sRaw = sectionsRaw[si];
    const sLines = sRaw.split('\n');

    // First non-empty line has " 01 — Five Waves"
    const firstLine = sLines.find(l => l.trim())?.trim() || '';
    const labelMatch = firstLine.match(/(\d+)/);
    const label = labelMatch ? `SECTION ${labelMatch[1].padStart(2, '0')}` : `SECTION ${String(si + 1).padStart(2, '0')}`;

    // Heading (## line) or fallback from first line
    const headingLine = sLines.find(l => l.trim().startsWith('## '));
    let heading = headingLine ? headingLine.replace('## ', '').trim() : firstLine.replace(/\d+\s*[—–-]\s*/, '').trim();

    // ── Extract quiz if present ──
    const quizPart = sRaw.split(/\*\*\[DESIGN SPEC: QUIZ BLOCK/)[1];
    if (quizPart) {
      const qSplits = quizPart.split(/\*\*Q\d+\.\*\*/).filter(q => q.trim());
      for (const qBlock of qSplits) {
        const qLines = qBlock.split('\n').filter(l => l.trim());
        const text = qLines.shift()?.trim();
        const options = [];
        for (const optLine of qLines) {
          if (optLine.trim().startsWith('-')) {
            const isCorrect = optLine.includes('✓');
            let optText = optLine.trim()
              .replace(/^- \*\*/, '').replace(/^- /, '')
              .replace(/^[A-D]\)\s*/, '')
              .replace(/\*\* ✓$/, '').replace(/ ✓$/, '').replace(/\*\*$/, '')
              .trim();
            options.push({ text: optText, isCorrect, explanation: isCorrect ? 'Correct!' : null });
          }
        }
        if (text && options.length) allQuizzes.push({ text, options });
      }
    }

    // Skip quiz-only sections (no real body content)
    if (heading.toLowerCase() === 'quiz' || heading.toLowerCase().startsWith('quiz')) continue;

    // ── Process content lines ──
    const contentPart = sRaw.split(/\*\*\[DESIGN SPEC: QUIZ BLOCK/)[0];
    const cLines = contentPart.split('\n');

    let contentBlocks = [];
    let currentParagraph = [];
    let insideDesignSpec = false; // true while inside an INTERACTIVE FIGURE spec block

    for (let li = 1; li < cLines.length; li++) {
      const line = cLines[li].trim();

      // Skip empty lines (flush current paragraph)
      if (!line) {
        if (currentParagraph.length) {
          contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
          currentParagraph = [];
        }
        continue;
      }

      // --- separator
      if (line === '---') {
        if (currentParagraph.length) {
          contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
          currentParagraph = [];
        }
        if (insideDesignSpec) insideDesignSpec = false;
        continue;
      }

      // Skip formatting instruction labels
      if (isFormatLabel(line)) continue;

      // Skip the ## heading line (already captured above)
      if (line.startsWith('## ')) continue;

      // ── DESIGN SPEC: INTERACTIVE FIGURE → enter skip mode ──
      if (line.startsWith('**[DESIGN SPEC: INTERACTIVE FIGURE')) {
        if (currentParagraph.length) {
          contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
          currentParagraph = [];
        }
        insideDesignSpec = true;
        continue;
      }

      // ── DESIGN SPEC: CALLOUT BLOCK label → skip just this line ──
      if (line.startsWith('**[DESIGN SPEC: CALLOUT BLOCK')) {
        if (currentParagraph.length) {
          contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
          currentParagraph = [];
        }
        continue;
      }

      // Skip everything inside a figure design spec block
      if (insideDesignSpec) continue;

      // ── Callout text (> lines) ──
      if (line.startsWith('>')) {
        if (currentParagraph.length) {
          contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
          currentParagraph = [];
        }
        let calloutText = line.replace(/^>\s*/, '').replace(/\*\*/g, '').trim();
        let nextIdx = li + 1;
        while (nextIdx < cLines.length && cLines[nextIdx].trim().startsWith('>')) {
          const nextLine = cLines[nextIdx].trim().replace(/^>\s*/, '').replace(/\*\*/g, '').trim();
          if (nextLine) calloutText += ' ' + nextLine;
          nextIdx++;
        }
        li = nextIdx - 1;
        if (calloutText) {
          const isDanger = calloutText.toLowerCase().includes('critical') || calloutText.toLowerCase().includes('warning');
          contentBlocks.push({ _type: 'callout', type: isDanger ? 'danger' : 'truth', text: calloutText });
        }
        continue;
      }

      // ── Regular body text ──
      currentParagraph.push(line);
    }

    // Flush remaining paragraph
    if (currentParagraph.length) {
      contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
    }

    // ── Inject mapped interactive figures at end of this section ──
    const moduleFigs = figureMapping[order] || {};
    const sectionFigs = moduleFigs[si] || [];
    for (const figId of sectionFigs) {
      contentBlocks.push({ _type: 'interactive', type: figId });
    }

    if (contentBlocks.length > 0) {
      sections.push({ label, heading, content: contentBlocks });
    }
  }

  modules.push({
    _id,
    _type: 'education',
    title,
    slug: { _type: 'slug', current: _id },
    subtitle,
    metaLine,
    difficulty,
    estimatedTime,
    order,
    x: 50 + (order * 10),
    y: 40 + (order * 5),
    phase,
    sections,
    quiz: allQuizzes,
  });
}

// ─── PUSH TO SANITY ─────────────────────────────────────────────────
async function importContent() {
  for (const m of modules) {
    console.log(`\nPushing Module ${m.order}: ${m.title}`);
    console.log(`  → ${m.sections.length} sections, ${m.quiz.length} quiz questions`);
    for (let i = 0; i < m.sections.length; i++) {
      const s = m.sections[i];
      const figs = s.content.filter(b => b._type === 'interactive').map(b => b.type);
      const blocks = s.content.filter(b => b._type === 'block').length;
      const callouts = s.content.filter(b => b._type === 'callout').length;
      console.log(`  Section ${i}: "${s.heading}" — ${blocks} text blocks, ${callouts} callouts, figures: [${figs.join(', ')}]`);
    }
    try {
      const result = await client.createOrReplace(m);
      console.log(`  ✓ Success: ${result._id}`);
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`);
    }
  }
}

importContent();
