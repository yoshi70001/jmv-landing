/**
 * Próximos encuentros y actividades de JMV Perú.
 *
 * Fuente de datos local estructurada, diseñada para conectarse más
 * adelante a un CMS sin cambiar el componente `Encuentros.astro`.
 *
 * Formato de cada evento:
 *   nombre      — nombre de la actividad
 *   fecha       — ISO 'YYYY-MM-DD' (obligatorio)
 *   hora        — 'HH:mm' 24h (opcional)
 *   lugar       — parroquia, colegio o dirección (opcional)
 *   descripcion — una o dos frases
 *   imagen      — import de src/assets (opcional)
 *   enlace      — URL de inscripción o más información (opcional)
 *
 * ⚠️ NO inventar eventos: solo agregar actividades confirmadas.
 * El componente oculta automáticamente los vencidos y ordena los
 * próximos por fecha. Si no hay ninguno, muestra una invitación general.
 */

// import imagenEjemplo from '../../assets/fotos/galeria-01.jpg';

export interface Encuentro {
  nombre: string;
  fecha: string; // 'YYYY-MM-DD'
  hora?: string; // 'HH:mm'
  lugar?: string;
  descripcion: string;
  imagen?: ImageMetadata;
  enlace?: string;
}

/**
 * Ejemplo de estructura (comentado — no se publica):
 *
 * const ejemplo: Encuentro = {
 *   nombre: 'Encuentro semanal',
 *   fecha: '2026-11-07',
 *   hora: '17:00',
 *   lugar: 'Parroquia — confirmar sede',
 *   descripcion: 'Dinámica, reflexión y celebración entre amigos.',
 *   imagen: imagenEjemplo,
 *   enlace: '/#contacto',
 * };
 */

export const encuentros: Encuentro[] = [];
