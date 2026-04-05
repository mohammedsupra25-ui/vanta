require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const { createClient } = require('@sanity/client');
const client = createClient({ 
  projectId: process.env.VITE_SANITY_PROJECT_ID, 
  dataset: process.env.VITE_SANITY_DATASET || 'production', 
  useCdn: false, 
  apiVersion: '2024-03-14', 
  token: process.env.SANITY_WRITE_TOKEN 
});

async function fix() {
  const docs = await client.fetch('*[_type == "education" && order >= 3 && order <= 12]{ _id, _updatedAt, title }');
  
  for (const doc of docs) {
    if (doc._updatedAt > '2026-03-29T03:00:00Z') {
      console.log('Fixing modified module:', doc._id, doc.title);
      
      const goodStateRes = await client.request({ uri: `/data/history/production/documents/${doc._id}?time=2026-03-29T03:00:00Z` });
      const goodState = goodStateRes.documents[0];
      
      const currentState = await client.getDocument(doc._id);
      
      if (!goodState || !currentState) continue;
      
      // Preserve user's new sections (anything length > goodState length)
      const mergedSections = [...goodState.sections];
      if (currentState.sections && currentState.sections.length > goodState.sections.length) {
         for (let i = goodState.sections.length; i < currentState.sections.length; i++) {
           mergedSections.push(currentState.sections[i]);
         }
      }
      
      currentState.sections = mergedSections;
      await client.createOrReplace(currentState);
      console.log('✓ Fixed', doc._id);
    }
  }
}
fix().catch(console.error);
