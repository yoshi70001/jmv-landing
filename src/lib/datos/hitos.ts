/**
 * Hitos históricos de la JMV — única fuente de verdad.
 * La portada muestra un resumen (3 hitos) y la página /historia
 * muestra la cronología completa. No eliminar información histórica.
 */

import aparicionCatalina from '../../assets/aparicion-catalina.jpg';
import sanVicente from '../../assets/san-vicente.jpg';

export interface Hito {
  anio: string;
  titulo: string;
  tag: string;
  texto: string;
  imagen?: { src: ImageMetadata; alt: string; caption: string };
}

/** Portada: los hitos más significativos en orden cronológico. */
export const hitosResumen: Hito[] = [
  {
    anio: '1830',
    titulo: 'Las apariciones',
    tag: 'Origen histórico',
    texto:
      'Todo empezó en París: la Virgen María se aparece a Santa Catalina Labouré, una joven como tú, y le pide fundar una asociación de jóvenes bajo su protección. El 27 de noviembre le entrega la Medalla Milagrosa.',
    imagen: {
      src: aparicionCatalina,
      alt: 'Pintura de la aparición de la Virgen María a Santa Catalina Labouré arrodillada, por José María Romero López, 1854',
      caption: 'La aparición ✦ 1854',
    },
  },
  {
    anio: '1858',
    titulo: 'La Familia Vicentina llega al Perú',
    tag: '2 de febrero',
    texto:
      'Las Hijas de la Caridad y los Padres Vicentinos desembarcan en el Perú un 2 de febrero. Nace la raíz vicentina que, con los años, nos incluiría a nosotros.',
  },
  {
    anio: '1999',
    titulo: 'Nace la JMV internacional',
    tag: 'Formalización internacional',
    texto:
      'La Santa Sede aprueba los Estatutos Internacionales y el nombre oficial: Juventud Mariana Vicentina. Lo que empezó como un llamado a una joven, hoy es un movimiento mundial.',
  },
];

/** Página /historia: cronología completa (incluye 1847 y los hitos resumidos). */
export const hitosCompletos: Hito[] = [
  hitosResumen[0],
  {
    anio: '1847',
    titulo: 'Aprobación de la Iglesia',
    tag: 'Rescriptos 1847 / 1850',
    texto:
      'La Iglesia aprueba la asociación de Hijos e Hijas de María. Se consolidan los dos pilares que aún nos mueven: María como modelo de vida y San Vicente de Paúl como maestro de servicio.',
    imagen: {
      src: sanVicente,
      alt: 'Retrato clásico de San Vicente de Paúl con bonete negro y cuello blanco, pintura del Musée Carnavalet',
      caption: 'San Vicente de Paúl',
    },
  },
  hitosResumen[1],
  hitosResumen[2],
];

export const presente = {
  texto: 'Presentes en 78 países con más de +30 000 jóvenes que viven el carisma mariano y vicenciano.',
};
