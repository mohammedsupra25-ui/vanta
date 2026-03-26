require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function cleanup() {
  for (let i = 3; i <= 12; i++) {
    const id = `module-${i > 9 ? i : '0'+i}-hero-section`;
    try {
      await client.delete(id);
      console.log(`Deleted ${id}`);
    } catch (e) {
      console.log(`Failed to delete ${id}: ${e.message}`);
    }
  }
}
cleanup();
