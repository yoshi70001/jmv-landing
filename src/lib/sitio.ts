/**
 * Fuente única de la URL base del sitio.
 *
 * El dominio vive solo aquí: si cambia, se edita un archivo.
 * `urlAbsoluta()` devuelve la forma canónica SIN barra final,
 * la misma que usan los enlaces internos, para que canonical,
 * Open Graph y JSON-LD no diverjan.
 */

export function urlAbsoluta(ruta = '/'): string {
  const base = import.meta.env.SITE.replace(/\/+$/, '');
  const normalizada = (ruta.startsWith('/') ? ruta : `/${ruta}`).replace(/\/+$/, '');
  return normalizada === '' ? base : `${base}${normalizada}`;
}
