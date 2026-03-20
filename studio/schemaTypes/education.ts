import { defineType, defineField, defineArrayMember } from 'sanity'

export const educationSchema = defineType({
  name: 'education',
  title: 'Education Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metaLine',
      title: 'Meta Line (e.g. 25 min read)',
      type: 'string',
      placeholder: '⏱ 25 min read · 4 sections',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Foundation', value: 'Foundation' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
      placeholder: 'e.g., 10 min',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'The order in which this module appears (1, 2, 3...)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'x',
      title: 'X Position (%)',
      type: 'number',
      description: 'Horizontal position in the constellation map (0-100)',
      validation: Rule => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'y',
      title: 'Y Position (%)',
      type: 'number',
      description: 'Vertical position in the constellation map (0-100)',
      validation: Rule => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                defineArrayMember({ type: 'block' }),
                defineArrayMember({
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                    defineField({ name: 'alt', title: 'Alternative Text', type: 'string', validation: Rule => Rule.required() }),
                  ],
                }),
                defineArrayMember({
                  name: 'callout',
                  title: 'Callout',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Type',
                      type: 'string',
                      options: { list: ['truth', 'danger', 'info'] },
                      initialValue: 'truth',
                    }),
                    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
                  ],
                }),
                defineArrayMember({
                  name: 'comparison',
                  title: 'Comparison (Side-by-Side)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'left',
                      title: 'Left Side (Negative/Red)',
                      type: 'object',
                      fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'bullets', type: 'array', of: [{ type: 'string' }] }),
                      ],
                    }),
                    defineField({
                      name: 'right',
                      title: 'Right Side (Positive/Green)',
                      type: 'object',
                      fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'bullets', type: 'array', of: [{ type: 'string' }] }),
                      ],
                    }),
                  ],
                }),
                defineArrayMember({
                  name: 'steps',
                  title: 'Numbered Steps',
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', type: 'string' }),
                    defineField({ name: 'items', type: 'array', of: [{ type: 'string' }] }),
                  ],
                }),
                defineArrayMember({
                  name: 'learningList',
                  title: 'Learning List (Will/Won\'t)',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Type',
                      type: 'string',
                      options: { list: ['will', 'wont'] },
                    }),
                    defineField({ name: 'title', type: 'string' }),
                    defineField({ name: 'items', type: 'array', of: [{ type: 'string' }] }),
                  ],
                }),
                defineArrayMember({
                  name: 'interactive',
                  title: 'Interactive Component',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Zone Myth', value: 'zone-myth' },
                          { title: 'Failure Cycle', value: 'failure-cycle' },
                          { title: '12-Week Journey', value: 'journey' },
                          { title: 'Monowave Atom (2.1)', value: 'monowave-atom' },
                          { title: 'Candle vs Line (2.2)', value: 'candle-line' },
                          { title: 'Neutrality Rule (2.3)', value: 'neutrality-rule' },
                          { title: 'Fractal Zoom (2.4)', value: 'fractal-zoom' },
                          { title: 'Movement Types (2.5)', value: 'movement-types' },
                          { title: 'Wave Degrees (2.6)', value: 'wave-degrees' },
                          { title: 'Degree Mismatch (2.7)', value: 'degree-mismatch' },
                          { title: 'Context Meaning (2.8)', value: 'context-meaning' },
                          { title: 'Analysis Order (2.9)', value: 'analysis-order' },
                          { title: 'Foundation Summary', value: 'foundation-summary' },
                        ],
                      },
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'callout',
              title: 'Overlay Callout',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'quiz',
      title: 'Module Quiz',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'question',
          fields: [
            defineField({ name: 'text', type: 'text', rows: 2 }),
            defineField({
              name: 'options',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'text', type: 'string' }),
                    defineField({ name: 'isCorrect', type: 'boolean' }),
                    defineField({ name: 'explanation', type: 'string' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'difficulty',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `[${subtitle}]`,
      }
    },
  },
})
