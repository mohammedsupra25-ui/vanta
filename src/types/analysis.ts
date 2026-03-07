export type AnalysisStatus = 'Active' | 'Target Hit' | 'Invalidated' | 'Watching'
export type AnalysisResult = 'Win' | 'Loss' | 'Breakeven' | 'Still Running'

export interface Scenario {
  _key: string
  label: string
  probability: number
  description: string
}

export interface AnalysisPost {
  _id: string
  slug: string
  title: string
  date: string
  status: AnalysisStatus
  chart?: unknown          // Sanity image asset
  chartSvg?: string        // for mock data: which SVG variant to render
  waveCount: string
  scenarios: Scenario[]
  postTradeNotes?: string
  result?: AnalysisResult
  isFeatured?: boolean
}
