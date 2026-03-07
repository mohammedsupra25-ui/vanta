import type { AnalysisPost } from '../types/analysis'

export const mockAnalyses: AnalysisPost[] = [
  {
    _id: 'mock-1',
    slug: 'wave-2-complete-targeting-2485',
    title: 'Wave (2) Complete — Targeting $2,485',
    date: new Date().toISOString(),
    status: 'Active',
    isFeatured: true,
    chartSvg: 'uptrend',
    waveCount:
      'Primary wave (1) completed at $2,195. Wave (2) retracement finished at $2,312 forming an irregular correction. Now entering wave (3) of the primary sequence. Internal structure suggests subwave 1 of (3) in progress. Wave (3) typically extends 1.618× wave (1) which projects to the $2,485–$2,520 zone.',
    scenarios: [
      {
        _key: 'a',
        label: 'Scenario A',
        probability: 72,
        description:
          'Wave (3) extends to $2,485 minimum, potential $2,520 if momentum sustains. Entry on first pullback in the $2,325–$2,335 zone.',
      },
      {
        _key: 'b',
        label: 'Scenario B',
        probability: 28,
        description:
          'Wave (2) not complete, possible double retracement to $2,290 before continuation. Invalidation below $2,285.',
      },
    ],
  },
  {
    _id: 'mock-2',
    slug: 'subwave-5-completion-short-setup',
    title: 'Subwave 5 Completion — Short Setup',
    date: new Date(Date.now() - 7 * 864e5).toISOString(),
    status: 'Target Hit',
    result: 'Win',
    chartSvg: 'reversal',
    waveCount:
      'Five-wave advance from $2,280 completing. Subwave 4 triangle confirmed. Subwave 5 extended with thrust targeting $2,387–$2,395 zone. Structure complete — all NEoWave rules satisfied. Short entry triggered at $2,391.',
    scenarios: [
      {
        _key: 'a',
        label: 'Scenario A',
        probability: 68,
        description: 'Short from $2,387–$2,395 targeting $2,340. Stop above $2,405.',
      },
      {
        _key: 'b',
        label: 'Scenario B',
        probability: 32,
        description: 'Extension continues to $2,415 before reversal. Wait for confirmation.',
      },
    ],
    postTradeNotes:
      'Target hit at $2,341. Clean five-wave structure played out exactly as labeled. Wave principle confirmed. Held short through minor bounce at $2,365 — structure remained intact.',
  },
  {
    _id: 'mock-3',
    slug: 'wave-b-triangle-long-entry',
    title: 'Wave B Triangle — Long Entry',
    date: new Date(Date.now() - 14 * 864e5).toISOString(),
    status: 'Invalidated',
    result: 'Loss',
    chartSvg: 'breakdown',
    waveCount:
      'Contracting triangle forming as wave B of larger correction. E-wave of triangle appearing to complete near $2,298. Post-triangle thrust expected toward $2,355.',
    scenarios: [
      {
        _key: 'a',
        label: 'Scenario A',
        probability: 65,
        description: 'Triangle complete at $2,298, wave C thrust to $2,355. Entry above $2,310.',
      },
      {
        _key: 'b',
        label: 'Scenario B',
        probability: 35,
        description: 'Triangle extends with additional x-wave. Wait for new structure.',
      },
    ],
    postTradeNotes:
      'Invalidated. Wave count was incorrect — the move labeled as E-wave extended significantly beyond the A-wave, violating triangle rules. Updated count suggests larger flat correction still in progress. Lesson: waited too long before exiting.',
  },
  {
    _id: 'mock-4',
    slug: 'monitoring-wave-4-correction-depth',
    title: 'Monitoring Wave (4) Correction Depth',
    date: new Date(Date.now() - 3 * 864e5).toISOString(),
    status: 'Watching',
    chartSvg: 'sideways',
    waveCount:
      'Wave (3) of primary sequence completed at $2,431. Now monitoring wave (4) correction. Expecting zigzag or flat. Key support zone: $2,380–$2,395. No entry until structure is confirmed — patience is the edge here.',
    scenarios: [
      {
        _key: 'a',
        label: 'Scenario A',
        probability: 60,
        description:
          'Flat correction bottoms near $2,385, wave (5) targets $2,510+. Long entry on completion of wave B of the flat.',
      },
      {
        _key: 'b',
        label: 'Scenario B',
        probability: 40,
        description:
          'Deeper correction to $2,355 as double zigzag. Would alter the wave (5) projection to $2,490.',
      },
    ],
  },
]
