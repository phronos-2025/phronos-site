import { defineCollection, z } from 'astro:content';

const dispatches = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    author: z.string().default('Vishal Patel'),
    reading_time: z.number().optional(),
    version: z.string().optional(),
    data_source: z.string().optional(),
    topics: z.array(z.string()).optional(),
    references: z.object({
      methods: z.array(z.string()).optional(),
      library: z.array(z.string()).optional(),
      instruments: z.array(z.string()).optional(),
    }).optional(),
  }),
});

const library = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    abstract: z.string().optional(),
    version: z.string().optional(),
  }),
});

const methods = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    abstract: z.string().optional(),
    version: z.string().optional(),
    related_instruments: z.array(z.string()).optional(),
  }),
});

const instruments = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['live', 'calibrating', 'planned', 'archived']),
    order: z.number(),
    related_method: z.string().optional(),
    version: z.string().optional(),
  }),
});

export const collections = { dispatches, library, methods, instruments };

