import { defineType, defineField, defineArrayMember } from 'sanity'

export const analysisSchema = defineType({
  name: 'analysis',
  title: 'Analysis',
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active',      value: 'Active' },
          { title: 'Target Hit',  value: 'Target Hit' },
          { title: 'Invalidated', value: 'Invalidated' },
          { title: 'Watching',    value: 'Watching' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'chart',
      title: 'Chart Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload the annotated chart (PNG or JPG, ideally 1600×900).',
    }),

    defineField({
      name: 'waveCount',
      title: 'Wave Count',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'scenarios',
      title: 'Scenarios',
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
              name: 'probability',
              title: 'Probability (%)',
              type: 'number',
              validation: Rule => Rule.required().min(0).max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'probability' },
            prepare({ title, subtitle }: { title: string; subtitle: number }) {
              return { title, subtitle: `${subtitle}%` }
            },
          },
        }),
      ],
      validation: Rule => Rule.min(1).max(4),
    }),

    defineField({
      name: 'postTradeNotes',
      title: 'Post-Trade Notes',
      type: 'text',
      rows: 5,
      description: 'Reflections after the trade closes. Leave empty while active.',
    }),

    defineField({
      name: 'result',
      title: 'Result',
      type: 'string',
      options: {
        list: [
          { title: 'Win',           value: 'Win' },
          { title: 'Loss',          value: 'Loss' },
          { title: 'Breakeven',     value: 'Breakeven' },
          { title: 'Still Running', value: 'Still Running' },
        ],
        layout: 'radio',
      },
      description: 'Fill in once the trade has closed.',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this analysis in the featured slot on the Analysis page.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title:  'title',
      status: 'status',
      media:  'chart',
      date:   'date',
    },
    prepare({ title, status, media, date }: { title: string; status: string; media: unknown; date: string }) {
      const d = date
        ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : ''
      return { title, subtitle: `${status ?? ''}  ·  ${d}`, media }
    },
  },
})
