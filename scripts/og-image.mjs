import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Paleta mariana (equivalentes hex de los tokens OKLCH del sitio)
const colores = {
  tinta: '#1c2032',
  azul: '#3d50aa',
  azulProfundo: '#24306e',
  azulCielo: '#9fb1e0',
  dorado: '#f2c349',
  papel: '#f5efe1',
};

const textoPrincipal = 'JUMAVI';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo -->
  <rect width="1200" height="630" fill="${colores.azulProfundo}"/>

  <!-- Marco brutalista -->
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${colores.papel}" stroke-width="8"/>

  <!-- Badge superior -->
  <g transform="translate(64,72)">
    <rect x="8" y="8" width="572" height="64" fill="${colores.tinta}"/>
    <rect width="572" height="64" fill="${colores.dorado}" stroke="${colores.tinta}" stroke-width="6"/>
    <text x="28" y="44" font-family="Archivo Black, Arial Black, Impact, sans-serif" font-size="30" fill="${colores.tinta}" letter-spacing="2">PARA JÓVENES DE 15 A 35</text>
  </g>

  <!-- Título gigante con sombra dura -->
  <g>
    <text x="58" y="400" font-family="Archivo Black, Arial Black, Impact, sans-serif" font-size="230" fill="${colores.tinta}" letter-spacing="4">${textoPrincipal}</text>
    <text x="64" y="394" font-family="Archivo Black, Arial Black, Impact, sans-serif" font-size="230" fill="${colores.papel}" stroke="${colores.tinta}" stroke-width="4" letter-spacing="4">${textoPrincipal}</text>
  </g>

  <!-- Subtítulo -->
  <rect x="64" y="430" width="14" height="52" fill="${colores.dorado}"/>
  <text x="98" y="470" font-family="Space Grotesk, Arial, sans-serif" font-size="40" font-weight="700" fill="${colores.dorado}" letter-spacing="10">JUVENTUD MARIANA VICENTINA</text>

  <!-- Cinta inferior -->
  <g>
    <defs>
      <pattern id="rayas" width="36" height="36" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <rect width="36" height="36" fill="${colores.dorado}"/>
        <rect width="18" height="36" fill="${colores.tinta}"/>
      </pattern>
    </defs>
    <rect x="24" y="512" width="1152" height="52" fill="url(#rayas)" stroke="${colores.tinta}" stroke-width="6"/>
    <rect x="24" y="564" width="1152" height="42" fill="${colores.azul}" stroke="${colores.papel}" stroke-width="6"/>
    <text x="600" y="593" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="26" font-weight="700" fill="${colores.papel}" letter-spacing="6">DESDE 1830 ✦ 78 PAÍSES ✦ +30 000 JÓVENES</text>
  </g>
</svg>`;

// Ícono de manzana / manifest (180×180)
const iconoSvg = `
<svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="${colores.azulProfundo}"/>
  <rect x="4" y="4" width="56" height="56" fill="none" stroke="${colores.dorado}" stroke-width="6"/>
  <path d="M14 46V18h8l10 14 10-14h8v28h-8V32l-10 14-10-14v14z" fill="${colores.papel}"/>
</svg>`;

await mkdir(path.join(raiz, 'public'), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(raiz, 'public', 'og.png'));

await sharp(Buffer.from(iconoSvg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(path.join(raiz, 'public', 'apple-touch-icon.png'));

console.log('✓ public/og.png generado (1200×630)');
console.log('✓ public/apple-touch-icon.png generado (180×180)');
