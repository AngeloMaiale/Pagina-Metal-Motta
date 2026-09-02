// Datos de la empresa. Fuente única de verdad para todo el sitio.
// Origen: docs/datos-empresa.md — no modificar sin actualizar ese documento.

export const empresa = {
  nombreComercial: 'Metal Motta',
  nombreCompleto: 'Ferretería y Maquinarias Metal Motta S.A.',
  razonSocial: 'Metal Motta S.A.',
  anioFundacion: 1976,

  contacto: {
    // Número en formato internacional sin signos, para enlaces wa.me
    whatsapp: '584246688201',
    whatsappVisible: '+58 424-6688201',
    correo: 'contactometalmotta@gmail.com',
    // El teléfono fijo aún no está disponible (ver pendientes en docs/datos-empresa.md)
    telefonoFijo: null,
  },

  direccion: {
    calle: 'Av. 58 con Calle 99, No. 98D-300',
    referencia: 'Entrada principal al Barrio Bolívar',
    ciudad: 'Maracaibo',
    region: 'Zulia',
    codigoPostal: '4001',
    pais: 'Venezuela',
    paisCodigo: 'VE',
    latitud: 10.6301521,
    longitud: -71.6642189,
    enlaceMapa: 'https://www.google.com/maps/place/Metal+Motta+S.A/@10.6301521,-71.6642189,1085m',
  },

  // El negocio opera en hora de Venezuela; el estado abierto/cerrado se calcula
  // siempre en esta zona, no en la del visitante.
  zonaHoraria: 'America/Caracas',

  // Índice del arreglo = día de la semana (0 = domingo). Horas en formato 24 h.
  horarios: [
    { dia: 'Domingo', abre: null, cierra: null },
    { dia: 'Lunes', abre: '08:00', cierra: '17:00' },
    { dia: 'Martes', abre: '08:00', cierra: '17:00' },
    { dia: 'Miércoles', abre: '08:00', cierra: '17:00' },
    { dia: 'Jueves', abre: '08:00', cierra: '17:00' },
    { dia: 'Viernes', abre: '08:00', cierra: '17:00' },
    { dia: 'Sábado', abre: '09:00', cierra: '14:00' },
  ],

  redes: {
    instagram: 'https://www.instagram.com/metalmotta',
    facebook: 'https://www.facebook.com/p/Metal-Motta-SA-61557362441525/',
  },

  formasDePago: [
    'Efectivo',
    'Tarjeta de débito y crédito',
    'Transferencia',
    'Zelle',
    'Criptomonedas',
    'Crédito a clientes frecuentes',
  ],

  instalaciones: ['Estacionamiento', 'Patio y galpón para carga'],
};

// Años cumplidos, calculado en tiempo de compilación para que no envejezca solo.
export const aniosDeTrayectoria = new Date().getFullYear() - empresa.anioFundacion;

/**
 * Construye un enlace de WhatsApp con mensaje prellenado.
 * El mensaje contextual reduce fricción y mejora la calidad de la consulta.
 */
export function enlaceWhatsApp(mensaje = '') {
  const base = `https://wa.me/${empresa.contacto.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
