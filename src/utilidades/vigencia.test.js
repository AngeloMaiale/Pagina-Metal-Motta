import { describe, it, expect } from 'vitest';
import {
  estaVigente,
  filtrarVigentes,
  aFechaSimple,
  fechaEnZonaNegocio,
} from './vigencia.js';

const promo = (fechaInicio, fechaFin, extra = {}) => ({ fechaInicio, fechaFin, ...extra });

describe('aFechaSimple', () => {
  it('acepta cadenas AAAA-MM-DD', () => {
    expect(aFechaSimple('2026-09-15')).toBe('2026-09-15');
  });

  it('recorta la parte horaria de una marca de tiempo', () => {
    expect(aFechaSimple('2026-09-15T18:30:00.000Z')).toBe('2026-09-15');
  });

  it('convierte objetos Date', () => {
    expect(aFechaSimple(new Date('2026-09-15T00:00:00Z'))).toBe('2026-09-15');
  });

  it('rechaza valores vacíos, inválidos o con formato distinto', () => {
    expect(aFechaSimple(null)).toBeNull();
    expect(aFechaSimple('')).toBeNull();
    expect(aFechaSimple('15/09/2026')).toBeNull();
    expect(aFechaSimple('mañana')).toBeNull();
    expect(aFechaSimple(new Date('fecha inválida'))).toBeNull();
  });
});

describe('estaVigente', () => {
  it('muestra una promoción dentro del rango', () => {
    expect(estaVigente(promo('2026-09-01', '2026-09-30'), '2026-09-15')).toBe(true);
  });

  it('incluye el primer día completo', () => {
    expect(estaVigente(promo('2026-09-01', '2026-09-30'), '2026-09-01')).toBe(true);
  });

  // El caso que más importa: "hasta el 30" debe cubrir el día 30 entero.
  it('incluye el último día completo', () => {
    expect(estaVigente(promo('2026-09-01', '2026-09-30'), '2026-09-30')).toBe(true);
  });

  it('caduca al día siguiente del cierre', () => {
    expect(estaVigente(promo('2026-09-01', '2026-09-30'), '2026-10-01')).toBe(false);
  });

  it('no se publica antes de su fecha de inicio', () => {
    expect(estaVigente(promo('2026-09-10', '2026-09-30'), '2026-09-09')).toBe(false);
  });

  it('sigue vigente si no tiene fecha de fin', () => {
    expect(estaVigente(promo('2026-09-01', null), '2027-05-20')).toBe(true);
  });

  it('no se publica sin fecha de inicio', () => {
    expect(estaVigente(promo(null, '2026-09-30'), '2026-09-15')).toBe(false);
  });

  it('descarta rangos invertidos, que son un error de captura', () => {
    expect(estaVigente(promo('2026-09-30', '2026-09-01'), '2026-09-15')).toBe(false);
  });

  it('admite una promoción de un solo día', () => {
    expect(estaVigente(promo('2026-09-15', '2026-09-15'), '2026-09-15')).toBe(true);
    expect(estaVigente(promo('2026-09-15', '2026-09-15'), '2026-09-16')).toBe(false);
  });

  it('funciona con objetos Date, que es lo que entrega el panel', () => {
    expect(
      estaVigente(
        promo(new Date('2026-09-01T00:00:00Z'), new Date('2026-09-30T00:00:00Z')),
        '2026-09-15'
      )
    ).toBe(true);
  });

  it('no falla con entradas nulas', () => {
    expect(estaVigente(null, '2026-09-15')).toBe(false);
    expect(estaVigente(undefined, '2026-09-15')).toBe(false);
    expect(estaVigente({}, '2026-09-15')).toBe(false);
  });

  it('cruza el cambio de año sin problemas', () => {
    expect(estaVigente(promo('2026-12-20', '2027-01-10'), '2027-01-05')).toBe(true);
    expect(estaVigente(promo('2026-12-20', '2027-01-10'), '2027-01-11')).toBe(false);
  });
});

describe('filtrarVigentes', () => {
  const lista = [
    promo('2026-09-01', '2026-12-31', { titulo: 'Larga' }),
    promo('2026-09-01', '2026-09-20', { titulo: 'Corta' }),
    promo('2026-01-01', '2026-02-01', { titulo: 'Caducada' }),
    promo('2027-01-01', '2027-02-01', { titulo: 'Futura' }),
    promo('2026-09-01', null, { titulo: 'Indefinida' }),
  ];

  it('deja fuera las caducadas y las que aún no empiezan', () => {
    const titulos = filtrarVigentes(lista, '2026-09-15').map((p) => p.titulo);
    expect(titulos).not.toContain('Caducada');
    expect(titulos).not.toContain('Futura');
  });

  it('ordena por cierre más próximo y deja las indefinidas al final', () => {
    expect(filtrarVigentes(lista, '2026-09-15').map((p) => p.titulo)).toEqual([
      'Corta',
      'Larga',
      'Indefinida',
    ]);
  });

  it('devuelve lista vacía cuando todas las que tienen cierre ya caducaron', () => {
    const conCierre = lista.filter((p) => p.fechaFin);
    expect(filtrarVigentes(conCierre, '2030-01-01')).toEqual([]);
  });

  // Una promoción sin fecha de cierre es indefinida a propósito y no caduca.
  // Es la única que puede quedarse publicada sola, así que conviene fijarlo.
  it('conserva la indefinida aunque pasen los años', () => {
    const titulos = filtrarVigentes(lista, '2030-01-01').map((p) => p.titulo);
    expect(titulos).toEqual(['Indefinida']);
  });

  it('tolera una colección vacía o ausente', () => {
    expect(filtrarVigentes([], '2026-09-15')).toEqual([]);
    expect(filtrarVigentes(undefined, '2026-09-15')).toEqual([]);
  });

  it('no altera el arreglo original', () => {
    const copia = [...lista];
    filtrarVigentes(lista, '2026-09-15');
    expect(lista).toEqual(copia);
  });
});

describe('fechaEnZonaNegocio', () => {
  it('entrega el formato AAAA-MM-DD', () => {
    expect(fechaEnZonaNegocio()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  // Venezuela va cuatro horas por detrás de UTC: a las 02:00 UTC del día 16,
  // en Maracaibo todavía es el día 15. Calcular en UTC retiraría la promoción
  // un día antes de tiempo.
  it('usa el día de Venezuela, no el de UTC', () => {
    const instante = new Date('2026-09-16T02:00:00Z');
    expect(fechaEnZonaNegocio(instante)).toBe('2026-09-15');
  });

  it('coincide con UTC cuando no hay cruce de medianoche', () => {
    expect(fechaEnZonaNegocio(new Date('2026-09-15T15:00:00Z'))).toBe('2026-09-15');
  });
});
