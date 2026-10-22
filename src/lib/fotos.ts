/**
 * Registro central de fotos reales de la comunidad JMV.
 *
 * Las imágenes viven en `src/assets/fotos/` con nombres semánticos.
 * Cuando el pipeline de clasificación termine la selección completa,
 * solo hay que reemplazar los archivos (mismos nombres) o editar aquí.
 */

import heroPrincipal from '../assets/fotos/hero-principal.jpg';
import heroColumna from '../assets/fotos/hero-columna.jpg';
import heroMarco from '../assets/fotos/hero-marco.jpg';
import pilarEclesial from '../assets/fotos/pilar-eclesial.jpg';
import pilarLaical from '../assets/fotos/pilar-laical.jpg';
import pilarMariana from '../assets/fotos/pilar-mariana.jpg';
import pilarVicenciana from '../assets/fotos/pilar-vicenciana.jpg';
import peru1 from '../assets/fotos/peru-1.jpg';
import peru2 from '../assets/fotos/peru-2.jpg';
import peru3 from '../assets/fotos/peru-3.jpg';
import peru4 from '../assets/fotos/peru-4.jpg';
import galeria01 from '../assets/fotos/galeria-01.jpg';
import galeria02 from '../assets/fotos/galeria-02.jpg';
import galeria03 from '../assets/fotos/galeria-03.jpg';
import galeria04 from '../assets/fotos/galeria-04.jpg';
import galeria05 from '../assets/fotos/galeria-05.jpg';
import galeria06 from '../assets/fotos/galeria-06.jpg';
import galeria07 from '../assets/fotos/galeria-07.jpg';

export interface Foto {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

export const fotos = {
  hero: {
    principal: {
      src: heroPrincipal,
      alt: 'Actividad masiva de jóvenes de la JMV reunidos en un patio durante un encuentro comunitario',
      caption: 'Comunidad JUMAVI',
    } as Foto,
    columna: {
      src: heroColumna,
      alt: 'Columna de jóvenes caminando juntos en la peregrinación',
      caption: 'Nadie camina solo',
    } as Foto,
    marco: {
      src: heroMarco,
      alt: 'Jóvenes sonrientes posando con un marco de cartón durante la marcha',
      caption: '#YoSoyJMV',
    } as Foto,
  },

  pilares: {
    eclesial: {
      src: pilarEclesial,
      alt: 'Sacerdotes concelebrando la misa en el altar de una iglesia con retablo de mosaicos',
    } as Foto,
    laical: {
      src: pilarLaical,
      alt: 'Jóvenes de la JMV compartiendo un momento cotidiano',
    } as Foto,
    mariana: {
      src: pilarMariana,
      alt: 'Estatua de la Virgen María sobre una anda decorada con flores en la calle',
    } as Foto,
    vicenciana: {
      src: pilarVicenciana,
      alt: 'Voluntarios de la JMV con polos blancos «Sirviendo con amor» en una jornada de servicio',
    } as Foto,
  },

  peru: [
    { src: peru1, alt: 'Multitud de escolares marchando con uniformes rojos y azules' },
    { src: peru2, alt: 'Jóvenes avanzando juntos por la avenida durante la peregrinación' },
    { src: peru3, alt: 'Tres jóvenes posando con un marco de cartón en la marcha' },
    { src: peru4, alt: 'Grupo de jóvenes en la marcha, sonrientes en primer plano' },
  ] as Foto[],

  galeria: {
    filaA: [
      { src: galeria01, alt: 'Grupo de jóvenes con estandarte y guirnaldas de globos frente a un arco' },
      { src: galeria03, alt: 'Fieles decorando con flores la estatua de la Virgen en una carroza procesional' },
      { src: galeria05, alt: 'Religiosa sosteniendo un marco de papel de la peregrinación' },
      { src: galeria07, alt: 'Predicador en el ambón durante una celebración con jóvenes' },
      { src: peru1, alt: 'Escolares en la marcha por la avenida' },
      { src: heroMarco, alt: 'Jóvenes con marco de cartón en la marcha' },
    ] as Foto[],
    filaB: [
      { src: galeria02, alt: 'Tres jóvenes sonrientes con marco de cartón' },
      { src: galeria04, alt: 'Selfie grupal con Hijas de la Caridad y un joven con polo de la JMV' },
      { src: galeria06, alt: 'Muchedumbre de jóvenes caminando en la marcha con banderas' },
      { src: peru3, alt: 'Jóvenes posando en la marcha' },
      { src: peru4, alt: 'Jóvenes en la marcha, sonrientes' },
    ] as Foto[],
  },
};
