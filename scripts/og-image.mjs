import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Misma paleta que src/styles/global.css (tokens del sitio).
const colores = {
  marfil: '#f8f5ef',
  marino: '#174782',
  marinoNoche: '#0e315e',
  celeste: '#76b6dd',
  dorado: '#e5b75b',
  doradoTinta: '#a97e1f',
  tinta: '#243246',
};

const textoPrincipal = 'JUMAVI';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo marfil del sitio -->
  <rect width="1200" height="630" fill="${colores.marfil}"/>

  <!-- Bloque marino de fondo (inspirado en el Hero) -->
  <path d="M0 0 H1200 V430 Q1200 470 1160 470 H40 Q0 470 0 430 Z" fill="${colores.marino}"/>

  <!-- Badge superior -->
  <g transform="translate(64,72)">
    <rect x="8" y="8" width="572" height="64" fill="${colores.tinta}"/>
    <rect width="572" height="64" fill="${colores.dorado}" stroke="${colores.tinta}" stroke-width="6"/>
    <text x="28" y="44" font-family="Space Grotesk, Arial, sans-serif" font-size="30" font-weight="700" fill="${colores.tinta}" letter-spacing="2">PARA JÓVENES DE 15 A 35</text>
  </g>

  <!-- Título gigante con sombra dura (tipografía display del sitio) -->
  <g>
    <text x="58" y="392" font-family="Fraunces, Georgia, serif" font-size="220" font-weight="600" fill="${colores.tinta}" letter-spacing="2">${textoPrincipal}</text>
    <text x="52" y="386" font-family="Fraunces, Georgia, serif" font-size="220" font-weight="600" fill="${colores.marfil}" stroke="${colores.tinta}" stroke-width="4" letter-spacing="2">${textoPrincipal}</text>
  </g>

  <!-- Subtítulo -->
  <rect x="64" y="502" width="14" height="52" fill="${colores.doradoTinta}"/>
  <text x="98" y="542" font-family="Space Grotesk, Arial, sans-serif" font-size="38" font-weight="700" fill="${colores.tinta}" letter-spacing="8">JUVENTUD MARIANA VICENTINA</text>

  <!-- Cinta inferior -->
  <g>
    <defs>
      <pattern id="rayas" width="36" height="36" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <rect width="36" height="36" fill="${colores.dorado}"/>
        <rect width="18" height="36" fill="${colores.marino}"/>
      </pattern>
    </defs>
    <rect x="24" y="576" width="1152" height="30" fill="url(#rayas)" stroke="${colores.tinta}" stroke-width="6"/>
  </g>

  <!-- Datos de la esquina superior derecha -->
  <g transform="translate(1136,150)" text-anchor="end" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" fill="${colores.marfil}">
    <text x="0" y="0" font-size="34">DESDE 1830</text>
    <text x="0" y="52" font-size="34" fill="${colores.dorado}">✦ 78 PAÍSES</text>
    <text x="0" y="104" font-size="34">✦ +30 000 JÓVENES</text>
  </g>
</svg>`;

// Ícono de manzana / manifest (180×180): rasteriza el logo real (public/logo-jmv.svg)
// sobre fondo blanco, como pide Apple para los touch icons.
const logoJmv = await readFile(path.join(raiz, 'public', 'logo-jmv.svg'));

await mkdir(path.join(raiz, 'public'), { recursive: true });
// JPG en vez de PNG: la imagen es opaca y los rastreadores sociales lo
// aceptan igual; baja de ~940 KB a ~150 KB.
await sharp(Buffer.from(svg))
  .flatten({ background: colores.marfil })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(raiz, 'public', 'og.jpg'));

await sharp(logoJmv)
  .resize(180, 180, { fit: 'contain', background: '#ffffff' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(raiz, 'public', 'apple-touch-icon.png'));

console.log('✓ public/og.jpg generado (1200×630)');
console.log('✓ public/apple-touch-icon.png generado (180×180)');
