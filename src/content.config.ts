import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección de promociones. Es lo único que el administrador externo edita
// desde el panel, así que el esquema es deliberadamente corto: cuantos menos
// campos, menos ocasiones de publicar algo a medias.
const promociones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/contenido/promociones' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    // Fechas obligatorias: sin ellas no hay forma de que una promoción caduque
    // sola, y una oferta vencida a la vista cuesta más que no tener sección.
    fechaInicio: z.date(),
    fechaFin: z.date(),
    // Texto que se envía por WhatsApp al pulsar. Si se omite, se arma con el título.
    mensajeWhatsApp: z.string().optional(),
    destacada: z.boolean().default(false),
  }),
});

export const collections = { promociones };
