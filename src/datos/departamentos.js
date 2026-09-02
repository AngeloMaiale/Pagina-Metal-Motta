// Los doce departamentos de la ferretería.
// El nombre usado es el que emplea la clientela local, no el término técnico
// del catálogo del proveedor. `destacado: true` marca los de mayor venta.
//
// Sin códigos numéricos: la empresa no numera sus departamentos, así que
// numerarlos aquí era inventar un dato. El icono cumple la función real de
// ayudar a reconocer cada departamento de un vistazo.

export const departamentos = [
  {
    ruta: 'plomeria',
    nombre: 'Plomería',
    resumen: 'Tubería, llaves, griferías, conexiones y todo para instalaciones de agua.',
    destacado: true,
  },
  {
    ruta: 'electricidad',
    nombre: 'Electricidad',
    resumen: 'Cable, tableros, breakers, tomacorrientes e iluminación.',
    destacado: true,
  },
  {
    ruta: 'herramientas-electricas',
    nombre: 'Equipos y herramientas eléctricas',
    resumen: 'Taladros, esmeriles, sierras, compresores y equipo de taller.',
    destacado: true,
  },
  {
    ruta: 'construccion',
    nombre: 'Materiales de construcción',
    resumen: 'Cemento, cabillas, bloques y material para obra gris.',
    destacado: true,
  },
  {
    ruta: 'herramienta-manual',
    nombre: 'Herramienta manual',
    resumen: 'Llaves, alicates, martillos, destornilladores y medición.',
    destacado: false,
  },
  {
    ruta: 'pinturas',
    nombre: 'Pinturas y solventes',
    resumen: 'Pintura de caucho y aceite, esmaltes, thinner, brochas y rodillos.',
    destacado: false,
  },
  {
    ruta: 'tornilleria',
    nombre: 'Tornillería y fijaciones',
    resumen: 'Tornillos, pernos, tuercas, anclajes y ramplugs por unidad o por caja.',
    destacado: false,
  },
  {
    ruta: 'cerrajeria',
    nombre: 'Cerrajería',
    resumen: 'Cerraduras, candados, bisagras y herrajes.',
    destacado: false,
  },
  {
    ruta: 'seguridad-industrial',
    nombre: 'Seguridad industrial',
    resumen: 'Cascos, guantes, lentes, botas y protección para el trabajo.',
    destacado: false,
  },
  {
    ruta: 'adhesivos',
    nombre: 'Adhesivos y selladores',
    resumen: 'Pegas, siliconas, cintas y sellantes para cada material.',
    destacado: false,
  },
  {
    ruta: 'jardineria',
    nombre: 'Jardinería',
    resumen: 'Manguera, aspersores, herramienta de jardín y cuidado de plantas.',
    destacado: false,
  },
  {
    ruta: 'ferreteria-general',
    nombre: 'Ferretería general',
    resumen: 'Lo que no entra en un solo departamento y siempre hace falta.',
    destacado: false,
  },
];

export const departamentosDestacados = departamentos.filter((d) => d.destacado);
export const departamentosRestantes = departamentos.filter((d) => !d.destacado);
