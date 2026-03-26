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

const content = fs.readFileSync('/Users/supra/Downloads/VANTA_MODULES_03_TO_12_COMPLETE.md', 'utf8');

// The separator for each module is the decorative border
const parts = content.split(/# ═══════════════════════════════════════════════════════════════/g);
const rawModules = [];
for (let i = 1; i < parts.length; i += 2) {
  if (parts[i] && parts[i+1]) {
    rawModules.push(parts[i] + '\n' + parts[i+1]);
  }
}

const modules = [];

for (const rawMod of rawModules) {
  // Grab module number from the first few lines
  const modNumMatch = rawMod.match(/MODULE (\d+)/);
  if (!modNumMatch) continue;
  const order = parseInt(modNumMatch[1], 10);
  
  const phaseMatch = rawMod.match(/\*\*Phase \d+.*?\| Module \d+\*\*/);
  const phase = phaseMatch ? phaseMatch[0].replace(/\*\*/g, '').split(' | ')[0] : 'Phase 2 — The Framework';

  // # Title
  const titleLine = rawMod.split('\n').find(l => l.startsWith('# ') && !l.includes('MODULE ') && !l.includes('After this:'));
  let title = titleLine ? titleLine.replace('# ', '').replace(/\*/g, '').trim() : `Module ${order} Title`;

  // **Subtitle:** ...
  const subtitleMatch = rawMod.match(/\*\*Subtitle:\*\* (.*?)\n/);
  const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

  // **⏱ 35 min · 4 sections**
  const timeMatch = rawMod.match(/\*\*⏱ (.*?)\*\*/);
  const metaLine = timeMatch ? `⏱ ${timeMatch[1]}` : '⏱ 30 min';
  const estimatedTime = metaLine.includes('min') ? metaLine.split('min')[0].replace('⏱', '').trim() + ' min' : '30 min';
  
  // Create an explicit ID
  const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const _id = `module-${order > 9 ? order : '0'+order}-${titleSlug}`;
  
  let difficulty = 'Foundation';
  if (order >= 4 && order <= 8) difficulty = 'Intermediate';
  if (order >= 9) difficulty = 'Advanced';

  let sectionsRaw = rawMod.split(/## SECTION/);
  const introPart = sectionsRaw.shift(); // remove the stuff before Section 01
  
  let sections = [];
  let usedInteractiveIds = new Set();
  
  // if sections weren't split properly by '## SECTION', we can try another split
  for (let i = 0; i < sectionsRaw.length; i++) {
    const sRaw = 'SECTION' + sectionsRaw[i];
    // Split on quiz
    const quizSplit = sRaw.split(/## QUIZ/);
    const secContent = quizSplit[0];
    
    // label and heading
    // First line should be like "SECTION 01 — Title"
    const lines = secContent.split('\n').map(l => l.trim()).filter(l => l);
    const firstLine = lines.shift();
    const labelMatch = firstLine.match(/(SECTION \d+)/);
    const label = labelMatch ? labelMatch[1] : `SECTION 0${i+1}`;
    
    let heading = firstLine.replace(/SECTION \d+ — /, '').trim();
    if (heading.startsWith('### Heading:')) {
        heading = heading.replace('### Heading:', '').trim();
    } else if (lines.length > 0 && lines[0].startsWith('### Heading:')) {
        heading = lines.shift().replace('### Heading:', '').trim();
    }

    let contentBlocks = [];
    
    let currentParagraph = [];
    let currentCallout = null;
    let interactiveIdx = 1;
    
    for (const line of lines) {
       if (line === '---') {
           if (currentParagraph.length) {
               contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
               currentParagraph = [];
           }
           continue;
       }
       
       if (line.startsWith('**[INTERACTIVE FIGURE') || line.startsWith('**[INTERACTIVE') || line.startsWith('**[FIGURE')) {
           if (currentParagraph.length) {
               contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
               currentParagraph = [];
           }
            const idMatch = line.match(/FIGURE (\d+)\.(\d+)/);
            // create a safe type from the label or just generic
            const genericType = idMatch ? `figure-${idMatch[1]}-${idMatch[2]}` : `figure-${order}-${interactiveIdx++}`;
            if (!usedInteractiveIds.has(genericType)) {
                contentBlocks.push({ _type: 'interactive', type: genericType });
                usedInteractiveIds.add(genericType);
            }
            continue;
       }
       
       if (line.startsWith('**[CALLOUT') || line.startsWith('> **') || line.startsWith('> *')) {
           if (currentParagraph.length) {
               contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
               currentParagraph = [];
           }
           const isDanger = line.toLowerCase().includes('danger') || line.toLowerCase().includes('warning');
           const cleanText = line.replace(/\*\*\[CALLOUT.*?\]\*\*/g, '').replace(/> \*\*(.*?)\*\*/g, '$1').replace(/> \*(.*?)\*/g, '$1').replace(/>/g, '').trim();
           if (cleanText) {
               contentBlocks.push({ _type: 'callout', type: isDanger ? 'danger' : 'truth', text: cleanText });
           }
           continue;
       }
       
       if (line.startsWith('**[PULL QUOTE]**')) continue;
       if (line.startsWith('**[NUMBERED STEPS')) continue;
       
       if (line.match(/^(\*\*.*?\*\*|[-•])/)) { 
           // Probably a bullet or bolded start
           currentParagraph.push(line);
       } else if (line.match(/^[A-Z]/)) {
           if (currentParagraph.length) {
               contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
               currentParagraph = [];
           }
           currentParagraph.push(line);
       } else {
           currentParagraph.push(line);
       }
    }
    
    if (currentParagraph.length) {
       contentBlocks.push({ _type: 'block', children: [{ _type: 'span', text: currentParagraph.join(' ') }] });
    }
    
    sections.push({
       label,
       heading,
       content: contentBlocks
    });
  }

  // Quiz parsing
  const quizMatches = rawMod.split(/## QUIZ.*?\n/)[1];
  let quizzes = [];
  if (quizMatches) {
     const qSplits = quizMatches.split(/\*\*Q\d+\.\*\*/).filter(q => q.trim());
     for (const qBlock of qSplits) {
        const qLines = qBlock.split('\n').filter(l => l.trim());
        const text = qLines.shift().trim();
        const options = [];
        for (const optLine of qLines) {
           if (optLine.startsWith('-')) {
              const isCorrect = optLine.includes('✓');
              const optText = optLine.replace(/^- \*\*?[A-D]\)\s*/, '').replace(/\*\* ✓$/, '').replace(/ ✓$/, '').replace(/\*\*$/, '').replace(/^- [A-D]\)\s*/, '').trim();
              options.push({
                 text: optText,
                 isCorrect,
                 explanation: isCorrect ? 'Correct!' : null
              });
           }
        }
        if (text && options.length) {
           quizzes.push({ text, options });
        }
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
     x: 50 + (order * 10), // dummy positions, can adjust later
     y: 40 + (order * 5),
     phase,
     sections,
     quiz: quizzes
  });
}

// Push to Sanity
async function importContent() {
  // First, delete the bad ones from previous run
  for (let i = 3; i <= 12; i++) {
     const badId = `module-${i < 10 ? '0'+i : i}-module-${i}-title`;
     try {
         await client.delete(badId);
         console.log(`Deleted bad duplicate: ${badId}`);
     } catch (err) {
         // ignore if it doesn't exist
     }
  }

  for (const m of modules) {
    try {
      console.log(`Pushing Module ${m.order}: ${m.title}...`);
      const result = await client.createOrReplace(m);
      console.log(`Success! ${m.title} created with ID: ${result._id}`);
    } catch (err) {
      console.error(`Import failed for Module ${m.order}:`, err.message);
    }
  }
}

importContent();
