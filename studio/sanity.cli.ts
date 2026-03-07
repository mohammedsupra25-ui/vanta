import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'dsif98nr',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  autoUpdates: true,
})
