require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function cleanupOldModules() {
  try {
    const modules = await client.fetch('*[_type == "education" && order >= 3 && order <= 12]');
    
    // The NEW, correct slugs/IDs are:
    const newIds = [
      'module-03-the-cycle',
      'module-04-the-rules',
      'module-05-the-playbook',
      'module-06-the-shapes',
      'module-07-the-lock',
      'module-08-the-trigger',
      'module-09-the-trap',
      'module-10-the-full-picture',
      'module-11-the-discipline',
      'module-12-the-partner',
    ];
    
    for (const m of modules) {
      if (!newIds.includes(m._id)) {
        console.log(`Deleting old module: ${m._id} ("${m.title}")`);
        await client.delete(m._id);
      } else {
        console.log(`Keeping new module: ${m._id}`);
      }
    }
    console.log('Cleanup complete!');
  } catch (err) {
    console.error('Error during cleanup:', err.message);
  }
}

cleanupOldModules();
