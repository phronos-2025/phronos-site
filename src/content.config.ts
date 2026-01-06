import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dispatches = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/dispatches' }),
  schema: ({ image }) => z.object({
    id: z.string(),
    slug: z.string(),                               // URL-friendly slug (e.g., dsp-001)
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
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/library' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    abstract: z.string().optional(),
    version: z.string().optional(),
  }),
});

// Method Families (MTH-NNN) - Framework-level methodology documents
const methodFamilies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/methodFamilies' }),
  schema: z.object({
    id: z.string(),                                 // MTH-001
    slug: z.string(),                               // observational-chat-analysis
    type: z.literal('family'),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    version: z.string(),
    abstract: z.string(),
    dataset: z.object({
      name: z.string(),
      source: z.string().optional(),
      size: z.string().optional(),
      collection_period: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
    related_instruments: z.array(z.string()).optional(),
    studies: z.array(z.string()).optional(),        // Auto-populated or manual
    description: z.string(),                        // SEO meta description
    keywords: z.array(z.string()).optional(),
    author: z.string().default('Vishal Patel'),
    contributors: z.array(z.string()).optional(),
  }),
});

// Method Studies (MTH-NNN.N) - Individual analyses within a family
const methodStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/methodStudies' }),
  schema: z.object({
    id: z.string(),                                 // MTH-001.3
    slug: z.string(),                               // model-upgrade-impact
    type: z.literal('study'),
    family: z.string(),                             // MTH-001
    family_slug: z.string(),                        // observational-chat-analysis
    order: z.number(),                              // Position in family
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    version: z.string(),
    abstract: z.string(),
    sections: z.array(z.object({                    // For deep linking
      anchor: z.string(),
      title: z.string(),
    })).optional(),
    supersedes: z.string().optional(),              // Previous version if major revision
    notebook: z.string().optional(),                // Source notebook filename
    description: z.string(),                        // SEO meta description
    keywords: z.array(z.string()).optional(),
    author: z.string().default('Vishal Patel'),
  }),
});

const instruments = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/instruments' }),
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

export const collections = { 
  dispatches, 
  library, 
  methodFamilies,
  methodStudies,
  instruments 
};

