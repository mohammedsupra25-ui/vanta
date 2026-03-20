import { client } from './sanityClient'

export interface SanityEducationSection {
  label: string
  heading: string
  content: any[] // Portable Text
  callout?: string
}

export interface SanityEducationModule {
  _id: string
  title: string
  slug: { current: string }
  subtitle: string
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  order: number
  x: number
  y: number
  sections: SanityEducationSection[]
}

export async function getEducationModules(): Promise<SanityEducationModule[]> {
  const query = `*[_type == "education"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    difficulty,
    estimatedTime,
    order,
    x,
    y,
    sections[] {
      label,
      heading,
      content,
      callout
    }
  }`
  return await client.fetch(query)
}
