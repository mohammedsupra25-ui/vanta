require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-03-14',
  token: process.env.SANITY_WRITE_TOKEN,
});

const sectionEndMapping = {
  4:  { 1: ['v2-RuleViolations'], 3: ['v2-FiboTool'] },
  5:  { 2: ['v2-AnalysisFlow'] },
  6:  { 0: ['v2-ShapeExplainer'], 1: ['v2-MutationExplainer', 'v2-ComplexCorrections'] },
  7:  { 0: ['v2-ZeroBTrendline', 'v2-ConfirmationExplainer'], 2: ['v2-ExtensionTypes'] },
  8:  { 1: ['v2-EntryTypes'] },
  9:  { 2: ['v2-DontGetTrapped'] },
  10: { 2: ['v2-ProtocolWalkthrough'] },
  12: { 1: ['v2-AICommunication'] },
};

const midSectionSnippets = {
  3: {
    "That's the heartbeat. That's what every market does. Over and over and over.": "v2-CycleExplainer",
    "It's waves inside waves inside waves. All the way down.": "v2-FractalZoom"
  },
  4: {
    "Something else is happening.": "v2-OverlapStory"
  },
  9: {
    "NOT wave 4. This is tiny. It's probably just the correction of the subwaves inside wave 3.": "v2-DegreeTest"
  },
  11: {
    "A tight stop on a correct analysis guarantees you get shaken out by noise. A structural stop on a correct analysis lets the trade work.": "v2-StopShowdown"
  }
};

async function recover() {
  console.log('Fetching module IDs...');
  const docs = await client.fetch('*[_type == "education" && order >= 3 && order <= 12]{ _id, order, title }');
  
  for (const mod of docs) {
    if (mod._id.startsWith('drafts.')) continue;
    
    console.log(`\\nRecovering Module ${mod.order}: ${mod.title}...`);
    try {
      // 1. Fetch from BEFORE the user talked to me (around 2026-03-29T01:00:00Z)
      const res = await client.request({ uri: `/data/history/production/documents/${mod._id}?time=2026-03-29T01:00:00Z` });
      let oldDoc = res.documents[0];
      
      if (!oldDoc) {
        console.log(`  No historical document found for ${mod._id}`);
        continue;
      }
      
      // Clean up system fields before push
      delete oldDoc._rev;
      delete oldDoc._updatedAt;
      delete oldDoc._system;

      // 2. Remove any old `figure-.*` blocks from the recovered sections
      if (oldDoc.sections) {
        for (let sIndex = 0; sIndex < oldDoc.sections.length; sIndex++) {
          let section = oldDoc.sections[sIndex];
          if (!section.content) continue;
          
          let newContent = [];
          for (let block of section.content) {
            // Drop old interactive figures
            if (block._type === 'interactive' && block.type && block.type.startsWith('figure-')) {
              continue;
            }
            
            newContent.push(block);
            
            // Check for mid-section snippet injections
            if (block._type === 'block' && block.children && block.children[0] && block.children[0].text) {
              const text = block.children[0].text;
              const snippets = midSectionSnippets[mod.order];
              if (snippets) {
                for (const [snippetText, compId] of Object.entries(snippets)) {
                  if (text.includes(snippetText)) {
                    // Inject right after the text block
                    newContent.push({
                      _key: Math.random().toString(36).substring(2, 10),
                      _type: 'interactive',
                      type: compId,
                    });
                  }
                }
              }
            }
          }
          
          // Add section end injections
          const moduleEndFigs = sectionEndMapping[mod.order] || {};
          if (moduleEndFigs[sIndex]) {
            moduleEndFigs[sIndex].forEach(figId => {
              newContent.push({
                _key: Math.random().toString(36).substring(2, 10),
                _type: 'interactive',
                type: figId,
              });
            });
          }
          
          section.content = newContent;
        }
      }
      
      await client.createOrReplace(oldDoc);
      console.log(`  ✓ Restored & Upgraded ${mod._id}`);
      
    } catch (err) {
      console.error(`  ERROR on ${mod._id}: ${err.message}`);
    }
  }
}

recover();
