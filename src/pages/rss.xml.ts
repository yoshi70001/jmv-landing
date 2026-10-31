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
      link: `/blog/${entrada.id}`,
      categories: entrada.data.tags,
      author: entrada.data.author,
      customData: `<content:encoded><![CDATA[${entrada.body ?? ''}]]></content:encoded>`,
    })),
    customData: '<language>es-PE</language>',
    xmlns: { content: 'http://purl.org/rss/1.0/modules/content/' },
  });
}
