/**
 * Fuente única de la navegación del sitio.
 * Header y Footer consumen de aquí para que los rótulos no diverjan.
 */

export interface EnlaceNav {
  href: string;
  texto: string;
}

/** Mapa completo del sitio (lo usa el pie de página). */
export const navegacionCompleta: EnlaceNav[] = [
  { href: '/', texto: 'Inicio' },
  { href: '/#somos', texto: 'Nosotros' },
  { href: '/historia', texto: 'Historia' },
  { href: '/#identidad', texto: 'Identidad' },
  { href: '/#actividades', texto: 'Actividades' },
  { href: '/formacion', texto: 'Formación' },
  { href: '/centros', texto: 'Centros' },
  { href: '/blog', texto: 'Bitácora' },
  { href: '/#contacto', texto: 'Contacto' },
];

/** Subconjunto compacto para la barra superior de escritorio y el menú móvil. */
export const navegacionPrincipal: EnlaceNav[] = navegacionCompleta.filter(
  (enlace) => !['Historia', 'Identidad'].includes(enlace.texto)
);
