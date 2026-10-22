/**
 * Voces JUMAVI — testimonios de la comunidad.
 *
 * ⚠️ Los tres testimonios actuales son DEMOSTRATIVOS (texto de maqueta
 * con [Nombre] como autor). Por eso tienen `autorizado: false` y NO se
 * publican: el componente muestra una invitación mientras tanto.
 *
 * Al contar con testimonios reales y autorizados por sus protagonistas,
 * agregarlos aquí con `autorizado: true`. Formato recomendado:
 *   quote     — texto textual autorizado (no parafrasear)
 *   nombre    — nombre real (o inicial + edad si prefiere anonimato)
 *   detalle   — edad, parroquia, colegio o ciudad
 *   autorizado— true solo con consentimiento explícito
 */

export interface Voz {
  quote: string;
  nombre: string;
  detalle: string;
  autorizado: boolean;
}

export const voces: Voz[] = [
  {
    quote:
      'Llegué por una amiga y me quedé por la gente. Aquí encontré amigos que me empujan a ser mejor.',
    nombre: '[Nombre]',
    detalle: '17 años · [Parroquia]',
    autorizado: false,
  },
  {
    quote: 'Pensaba que la fe era aburrida. Después serví en una obra vicenciana y cambió todo.',
    nombre: '[Nombre]',
    detalle: '21 años · [Colegio vicentino]',
    autorizado: false,
  },
  {
    quote: 'Ser JUMAVI es tener una segunda familia que celebra contigo y te acompaña cuando cuesta.',
    nombre: '[Nombre]',
    detalle: '24 años · [Ciudad]',
    autorizado: false,
  },
];

export const vocesAutorizadas = voces.filter((v) => v.autorizado);
