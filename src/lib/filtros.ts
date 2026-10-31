/**
 * Filtrado de colecciones: comparten contrato y lógica.
 *
 * - Botones: `[data-filtro]` con `data-filtro=""` para "todo".
 *   Deben estar dentro de un `role="group"` con `aria-label`.
 * - Tarjetas: `[data-filtro-valor]` con uno o varios valores separados
 *   por coma (el blog filtra por varias etiquetas; formación por un tema).
 * - Vacío: elemento con el `id` pasado, oculto mientras haya resultados.
 *
 * Usado por /blog y /formación; el script se registra una sola vez por
 * página (navegaciones internas lo vuelven a disparar con nodos frescos).
 */

export function conectarFiltro(idVacio?: string): void {
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-filtro]');
  const tarjetas = document.querySelectorAll<HTMLElement>('[data-filtro-valor]');
  const vacio = idVacio ? document.getElementById(idVacio) : null;
  if (botones.length === 0) return;

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const valor = boton.dataset.filtro ?? '';
      botones.forEach((b) => b.setAttribute('aria-pressed', String(b === boton)));

      let visibles = 0;
      tarjetas.forEach((tarjeta) => {
        const valores = (tarjeta.dataset.filtroValor ?? '').split(',');
        const mostrar = valor === '' || valores.includes(valor);
        tarjeta.toggleAttribute('hidden', !mostrar);
        if (mostrar) visibles++;
      });

      vacio?.toggleAttribute('hidden', visibles > 0);
    });
  });
}
