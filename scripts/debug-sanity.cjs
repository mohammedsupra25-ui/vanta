require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dsif98nr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function run() {
  try {
    const mods = await client.fetch('*[_type == "education" && order == 3]');
    if (mods && mods.length > 0) {
      console.log('Module found:', mods[0].title);
      if (mods[0].sections && mods[0].sections.length > 0) {
        console.log(JSON.stringify(mods[0].sections[0].content.slice(0, 5), null, 2));
      } else {
        console.log('No sections in module.');
      }
    } else {
      console.log('No modules found.');
    }
  } catch (err) {
    console.error(err);
  }
}
run();
