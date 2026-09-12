import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Prensa JMV'),
    draft: z.boolean().default(false),
  }),
});

const formacion = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/formacion' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tema: z.enum(['mariana', 'vicenciana', 'eclesial', 'laical', 'general']),
    autor: z.string().default('Equipo de Formación JMV'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, formacion };
