/**
 * Datos de contacto oficiales del Centro Nacional JMV Perú.
 *
 * Confirmados institucionalmente (WhatsApp, correo y redes del centro general).
 * Si algo cambia, actualizar solo este archivo: todas las secciones
 * (Hero, Contacto, Header, CtaMovil) leen de aquí.
 */

export const contacto = {
  whatsapp: {
    numero: '+51 995 918 780',
    enlace: 'https://wa.me/51995918780',
    verificado: true,
  },
  correo: {
    direccion: 'jmv.cnperu@gmail.com',
    enlace: 'mailto:jmv.cnperu@gmail.com',
    verificado: true,
  },
  instagram: {
    usuario: '@jmv_peru',
    enlace: 'https://www.instagram.com/jmv_peru/',
    verificado: true,
  },
  facebook: {
    nombre: 'Juventud Mariana Vicentina',
    enlace: 'https://www.facebook.com/jumavi.peru/',
    verificado: true,
  },
};

/** Canales sin confirmar institucionalmente: el build de producción falla si queda alguno. */
const sinConfirmar = Object.entries(contacto)
  .filter(([, canal]) => !canal.verificado)
  .map(([nombre]) => nombre);

if (sinConfirmar.length > 0 && import.meta.env.PROD) {
  throw new Error(
    `contacto.ts: canales sin confirmar → ${sinConfirmar.join(', ')}. ` +
      'Verifica los datos con el centro antes de publicar.'
  );
}
