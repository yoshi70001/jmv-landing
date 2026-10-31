/**
 * Centros locales de la JMV Perú, agrupados por región.
 *
 * Fuente única: /centros (índice), /centros/[slug] y los enlaces del home
 * leen solo de este archivo. Para agregar un centro:
 *
 * 1. Fotos → suéltalas en `src/assets/fotos/centros/<slug>/1.jpg, 2.jpg …`
 *    e impórtalas aquí (ver ejemplo comentado al final).
 * 2. Agrega el objeto del centro al array `centros`.
 * 3. Si la región es nueva, agrégala a `regiones`.
 *
 * Un centro sin canales ni fotos se publica igual: la ficha muestra el
 * contacto nacional y un motivo tipográfico en lugar de foto.
 *
 * Igual que en contacto.ts, cada canal lleva `verificado`: el build de
 * producción falla si queda alguno en false.
 */

import type { Foto } from '../fotos';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Region {
  /** Identificador estable: vive en URLs del filtro y en cada centro. */
  id: string;
  nombre: string;
  /** Contexto geográfico que se muestra bajo el nombre de la región. */
  ambito: string;
  /** Punto de referencia de la ciudad principal (detección de zona). */
  coords: Coordenadas;
}

export interface CanalCentro {
  etiqueta: string;
  /** Valor visible (número formateado, correo, @usuario…). */
  valor: string;
  enlace: string;
  verificado: boolean;
}

export interface CentroLocal {
  slug: string;
  /** Nombre del centro (parroquia, grupo o casa). */
  nombre: string;
  regionId: string;
  /** Distrito, ciudad o localidad dentro de la región. */
  zona: string;
  descripcion: string;
  /** Horario del encuentro semanal, si es fijo. */
  encuentro?: string;
  direccion?: string;
  canales: CanalCentro[];
  fotos: Foto[];
  /** Ubicación del local; si falta, se usa la de su región. */
  coords?: Coordenadas;
}

export const regiones: Region[] = [
  {
    id: 'lima',
    nombre: 'Lima',
    ambito: 'Lima Metropolitana',
    coords: { lat: -12.046, lng: -77.043 },
  },
  {
    id: 'jauja',
    nombre: 'Jauja',
    ambito: 'Junín, sierra central',
    coords: { lat: -11.775, lng: -75.496 },
  },
  {
    id: 'chiclayo',
    nombre: 'Chiclayo',
    ambito: 'Lambayeque, norte del país',
    coords: { lat: -6.771, lng: -79.841 },
  },
];

export const centros: CentroLocal[] = [
  {
    slug: 'corpus-christi',
    nombre: 'Corpus Christi',
    regionId: 'lima',
    zona: 'San Juan de Miraflores',
    descripcion:
      'Grupo de la JMV reunido en la zona de San Juan de Miraflores: encuentros semanales, formación mariana y servicio vicenciano en el barrio.',
    // encuentro: 'Sábados de 4:00 a 5:30 p. m.',
    // direccion: 'Av. Los Héroes 000, San Juan de Miraflores',
    canales: [],
    fotos: [],
    coords: { lat: -12.163, lng: -76.968 },
  },
  {
    slug: 'nueva-esperanza',
    nombre: 'Nueva Esperanza',
    regionId: 'lima',
    zona: 'Villa María del Triunfo',
    descripcion:
      'Comunidad de jóvenes de Villa María del Triunfo: compartimos la fe, nos formamos juntos y servimos a quienes más lo necesitan.',
    canales: [],
    fotos: [],
    coords: { lat: -12.166, lng: -76.928 },
  },
];

/* ── Utilidades ─────────────────────────────────────────────── */

export function obtenerRegion(id: string): Region | undefined {
  return regiones.find((region) => region.id === id);
}

export function obtenerCentro(slug: string): CentroLocal | undefined {
  return centros.find((centro) => centro.slug === slug);
}

/** Regiones en su orden original, conservando las que aún no tienen centros. */
export function centrosDeRegion(regionId: string): CentroLocal[] {
  return centros.filter((centro) => centro.regionId === regionId);
}

/** Búsqueda en Google Maps con los datos que ya tiene el centro. */
export function enlaceMapa(centro: CentroLocal): string {
  const consulta = centro.direccion ?? `${centro.nombre}, ${centro.zona}, Perú`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

/* ── Detección de zona (la usa la sección "Tu centro más cercano") ── */

const RADIO_TIERRA_KM = 6371;
/** Distancia máxima a la que un centro se considera "cercano". */
const RADIO_CENTRO_KM = 60;
/** Distancia máxima para sugerir una región aunque aún no tenga centros. */
const RADIO_REGION_KM = 120;

export function distanciaKm(a: Coordenadas, b: Coordenadas): number {
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(h));
}

function coordenadasDeCentro(centro: CentroLocal): Coordenadas | undefined {
  return centro.coords ?? obtenerRegion(centro.regionId)?.coords;
}

/** Centro a menos de RADIO_CENTRO_KM del punto; null si no hay ninguno. */
export function centroMasCercano(
  lat: number,
  lng: number
): { centro: CentroLocal; distanciaKm: number } | null {
  const punto = { lat, lng };
  let mejor: { centro: CentroLocal; distanciaKm: number } | null = null;
  for (const centro of centros) {
    const coords = coordenadasDeCentro(centro);
    if (!coords) continue;
    const d = distanciaKm(punto, coords);
    if (d <= RADIO_CENTRO_KM && (!mejor || d < mejor.distanciaKm)) {
      mejor = { centro, distanciaKm: d };
    }
  }
  return mejor;
}

/** Región a menos de RADIO_REGION_KM del punto; null si no hay ninguna. */
export function regionMasCercana(
  lat: number,
  lng: number
): { region: Region; distanciaKm: number } | null {
  const punto = { lat, lng };
  let mejor: { region: Region; distanciaKm: number } | null = null;
  for (const region of regiones) {
    const d = distanciaKm(punto, region.coords);
    if (d <= RADIO_REGION_KM && (!mejor || d < mejor.distanciaKm)) {
      mejor = { region, distanciaKm: d };
    }
  }
  return mejor;
}

/* ── Guardia de datos confirmados (solo producción) ─────────── */

if (import.meta.env.PROD) {
  const dudosos = centros.flatMap((centro) =>
    centro.canales
      .filter((canal) => !canal.verificado)
      .map((canal) => `${centro.slug}: ${canal.etiqueta}`)
  );

  if (dudosos.length > 0) {
    throw new Error(
      `centros.ts: canales sin confirmar → ${dudosos.join(', ')}. ` +
        'Confirma los datos con cada centro y marca verificado: true.'
    );
  }
}

/* ── Ejemplo de centro completo con fotos ─────────────────────
 *
 * import corpus1 from '../../assets/fotos/centros/corpus-christi/1.jpg';
 * import corpus2 from '../../assets/fotos/centros/corpus-christi/2.jpg';
 *
 * {
 *   slug: 'corpus-christi',
 *   nombre: 'Corpus Christi',
 *   regionId: 'lima',
 *   zona: 'San Juan de Miraflores',
 *   descripcion: '…',
 *   encuentro: 'Sábados de 4:00 a 5:30 p. m.',
 *   direccion: 'Av. Los Héroes 000, San Juan de Miraflores',
 *   canales: [
 *     {
 *       etiqueta: 'WhatsApp',
 *       valor: '+51 987 654 321',
 *       enlace: 'https://wa.me/51987654321',
 *       verificado: true,
 *     },
 *   ],
 *   fotos: [
 *     { src: corpus1, alt: 'Encuentro del centro Corpus Christi' },
 *     { src: corpus2, alt: 'Servicio del centro en el barrio' },
 *   ],
 * },
 */
