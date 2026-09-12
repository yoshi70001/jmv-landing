import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entradas = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Bitácora JUMAVI',
    description:
      'Crónicas de actividades de la Juventud Mariana Vicentina: encuentros, servicio, retiros y formación.',
    site: context.site!,
    items: entradas.map((entrada) => ({
      title: entrada.data.title,
      description: entrada.data.description,
      pubDate: entrada.data.pubDate,
      link: `/blog/${entrada.id}/`,
      categories: entrada.data.tags,
    })),
    customData: '<language>es-pe</language>',
  });
}
