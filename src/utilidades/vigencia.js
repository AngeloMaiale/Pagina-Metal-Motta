// Vigencia de las promociones.
//
// Se compara por fecha de calendario en la zona del negocio (America/Caracas),
// no por marca de tiempo. Así "válida hasta el 15" incluye el día 15 completo,
// y no caduca a medianoche UTC, que en Venezuela son las 20:00 del día anterior.
//
// Las fechas de entrada y salida son cadenas 'AAAA-MM-DD', que se ordenan
// alfabéticamente igual que cronológicamente. Eso evita toda la aritmética de
// husos horarios.

export const ZONA_NEGOCIO = 'America/Caracas';

/**
 * Fecha de hoy en la zona del negocio, como 'AAAA-MM-DD'.
 * @param {Date} [instante] Momento a convertir; por defecto, ahora.
 */
export function fechaEnZonaNegocio(instante = new Date()) {
  // 'en-CA' produce directamente el formato AAAA-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA_NEGOCIO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instante);
}

/** Normaliza una fecha (Date o cadena) a 'AAAA-MM-DD'. */
export function aFechaSimple(valor) {
  if (!valor) return null;
  if (valor instanceof Date) {
    if (Number.isNaN(valor.getTime())) return null;
    return valor.toISOString().slice(0, 10);
  }
  const texto = String(valor).trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(texto) ? texto : null;
}

/**
 * ¿La promoción está vigente en la fecha indicada?
 *
 * - Sin fecha de inicio válida, no se publica: preferimos no mostrar nada antes
 *   que mostrar algo con datos incompletos.
 * - Sin fecha de fin, la promoción es indefinida y sigue vigente.
 * - Ambos extremos son inclusivos.
 *
 * @param {{fechaInicio?: any, fechaFin?: any}} promocion
 * @param {string} [hoy] Fecha 'AAAA-MM-DD'; por defecto, hoy en Venezuela.
 */
export function estaVigente(promocion, hoy = fechaEnZonaNegocio()) {
  if (!promocion) return false;

  const inicio = aFechaSimple(promocion.fechaInicio);
  const fin = aFechaSimple(promocion.fechaFin);

  if (!inicio) return false;
  if (hoy < inicio) return false;
  if (fin && hoy > fin) return false;

  // Una fecha de fin anterior a la de inicio es un error de captura: no se muestra.
  if (fin && fin < inicio) return false;

  return true;
}

/**
 * Promociones vigentes, de la que caduca antes a la que caduca después.
 * Las indefinidas van al final.
 */
export function filtrarVigentes(promociones = [], hoy = fechaEnZonaNegocio()) {
  return promociones
    .filter((promocion) => estaVigente(promocion, hoy))
    .sort((a, b) => {
      const finA = aFechaSimple(a.fechaFin);
      const finB = aFechaSimple(b.fechaFin);
      if (!finA && !finB) return 0;
      if (!finA) return 1;
      if (!finB) return -1;
      return finA.localeCompare(finB);
    });
}
