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
      alt: 'Jóvenes de la JMV llenando la avenida en la peregrinación mariana',
      caption: 'Comunidad JUMAVI',
    } as Foto,
    columna: {
      src: heroColumna,
      alt: 'Jóvenes de la JMV compartiendo juegos con globos en un encuentro al aire libre',
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
      alt: 'Lector proclamando la Palabra en el ambón junto al retablo de mosaicos',
    } as Foto,
    laical: {
      src: pilarLaical,
      alt: 'Jóvenes de la JMV conversando sentadas bajo un árbol en el patio',
    } as Foto,
    mariana: {
      src: pilarMariana,
      alt: 'Estatua de la Virgen María sobre una anda decorada con flores en la calle',
    } as Foto,
    vicenciana: {
      src: pilarVicenciana,
      alt: 'Servidor de la JMV con su chaleco entre los jóvenes en una jornada',
    } as Foto,
  },

  peru: [
    { src: peru1, alt: 'Jóvenes marchando por la avenida con banderas blancas' },
    { src: peru2, alt: 'Grupo de jóvenes caminando juntos por un sendero durante una caminata' },
    { src: peru3, alt: 'Encuentro masivo de jóvenes de la JMV en un salón' },
    { src: peru4, alt: 'Procesión de la Virgen con guirnaldas y globos avanzando por la calle' },
  ] as Foto[],

  galeria: {
    filaA: [
      { src: galeria01, alt: 'Jóvenes celebrando y saltando con pancartas al aire libre' },
      { src: galeria03, alt: 'Jóvenes alzando el arco floral de la Virgen en la procesión' },
      { src: galeria05, alt: 'Hijas de la Caridad y voluntarios de la JMV preparando ayuda' },
      { src: galeria07, alt: 'Grupo de jóvenes reunidos en el templo' },
      { src: peru1, alt: 'Jóvenes marchando por la avenida' },
      { src: heroMarco, alt: 'Jóvenes con marco de cartón en la marcha' },
    ] as Foto[],
    filaB: [
      { src: galeria02, alt: 'Sacerdote celebrando la eucaristía en el altar' },
      { src: galeria04, alt: 'Jóvenes abrazados durante una misión vicenciana' },
      { src: galeria06, alt: 'Procesión de la Virgen avanzando por la avenida entre la multitud' },
      { src: peru3, alt: 'Encuentro masivo de jóvenes en un salón' },
      { src: peru4, alt: 'Procesión de la Virgen con guirnaldas por la calle' },
    ] as Foto[],
  },
};
