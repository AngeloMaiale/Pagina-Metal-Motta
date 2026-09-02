# Plan de proyecto — Sitio web Metal Motta

> Datos de la empresa: [`datos-empresa.md`](datos-empresa.md) — fuente única de verdad, no duplicar aquí.
> Actualizado: 2026-09-02

---

## 1. Objetivo

Convertir búsquedas locales en Maracaibo en **consultas por WhatsApp** y visitas al local.

**Conversión principal:** iniciar conversación por WhatsApp (+58 424-6688201).
**Secundarias:** llegar al local (mapa), seguir en Instagram.

**Pregunta que más recibe el negocio:** *"¿tienen disponible este producto?"* → toda la arquitectura del sitio debe desembocar en esa consulta, resuelta por WhatsApp.

## 2. Público

| Segmento | Peso | Qué necesita |
|---|---|---|
| Doméstico | 40 % | Saber que existe la categoría, horario, ubicación, preguntar sin sentirse ignorante |
| Profesional del oficio | 30 % | Disponibilidad, respuesta rápida, cercanía |
| Contratista / obra | 30 % | Cotizaciones, mayoreo, entrega a obra, línea industrial, capacidad de surtir volumen |

**El 60 % es público profesional.** El sitio no puede tratarse como una ferretería de barrio: debe transmitir escala, amplitud de departamentos y capacidad industrial.

---

## 3. Stack técnico

| Capa | Decisión | Razón |
|---|---|---|
| Generador | **Astro** | Salida HTML estático puro, cero JavaScript por defecto. Decisivo por la conectividad en Venezuela. |
| Gestor de contenido | **Decap CMS** | Panel visual gratuito para el administrador externo. Sin base de datos ni backend. |
| Repositorio | **GitHub** | Requisito de Decap; además da historial y respaldo. |
| Hosting | **Netlify** o **Cloudflare Pages** | Gratuitos, build automático, CDN, HTTPS incluido. |
| Dominio | **metalmotta.com** (permanece en GoDaddy) | Solo se reapuntan los DNS. |

> **Consecuencia a validar con el cliente:** el hosting contratado en GoDaddy deja de usarse. El dominio no se mueve; únicamente cambian los registros DNS. Conviene revisar si el plan de GoDaddy puede cancelarse o reducirse.

**Qué gestiona el CMS:** promociones (alta, edición, caducidad), horarios y datos de contacto. El resto del contenido es estable y vive en el código.

**Norma de código:** todo en español — variables, funciones, clases, archivos, comentarios y mensajes.

---

## 4. Estructura del sitio

```
Inicio
├─ Cabecera: logo "Metal Motta" · navegación · WhatsApp
├─ Principal: quiénes son + 50 años + [WhatsApp] + Abierto/Cerrado
├─ 4 categorías destacadas (Plomería · Electricidad · Herramientas eléctricas · Construcción)
├─ Servicios diferenciales (asesoría · corte · entrega a obra · cotizaciones)
├─ Promociones vigentes            ← gestionado por CMS, se oculta si no hay
├─ Confianza: 50 años · departamentos · mayoreo
├─ Formas de pago (incluye Zelle y cripto)
├─ Ubicación: mapa + dirección + referencia + horario
└─ Pie: contacto · horario · Instagram · Facebook

Productos    → las 12 categorías, con página propia por categoría
Servicios    → detalle de cada servicio + CTA
Nosotros     → 50 años, historia de Mario Maiale, misión y visión
Ubicación    → mapa ampliado, referencia, estacionamiento y galpón
Contacto     → WhatsApp, correo, redes, preguntas frecuentes
```

**Menú:** `Inicio · Productos · Servicios · Nosotros · Ubicación · Contacto`

**Sin sección de Marcas** en esta fase: el cliente no tiene marcas de preferencia definidas.

### Jerarquía del inicio
1. Quién es y qué vende — legible en menos de 3 segundos
2. Abierto ahora — resuelve la urgencia
3. WhatsApp — la conversión
4. Qué maneja — categorías
5. Por qué confiar — 50 años, escala, servicios
6. Dónde está — mapa

---

## 5. Decisiones de contenido

**Aniversario:** 2026 marca **50 años** (1976–2026). Debe aparecer en el bloque principal y en Nosotros. Es el activo de confianza más fuerte del negocio y coincide con el lanzamiento.

**Historia:** la del fundador Mario Maiale —metalúrgico de Benevento, nombre tomado del sector Motta de su tierra natal— es una narrativa genuina y poco común. Va en Nosotros, redactada en 3 párrafos breves.

**Formas de pago:** Zelle y criptomonedas obtienen bloque propio y visible, no una línea en el pie. En el contexto venezolano son un diferenciador comercial de primer orden.

**Tono:** tuteo, frases cortas, vocabulario de oficio. Sin relleno publicitario.

**Restricción del cliente:** *"sin que se vea muy cargada"* → espaciado amplio, pocos elementos por pantalla, una sola acción dominante por sección, sin carruseles ni animaciones decorativas.

**Categorías:** se usa el nombre que emplea el cliente local. El destacado nombra "Equipos y herramientas eléctricas" y "Materiales de construcción" según lo indicado.

---

## 6. Diseño visual

**Dirección:** industrial, limpio y con aire. Nada recargado.

| Elemento | Definición |
|---|---|
| Color | Azules del logo (`PENDIENTE`: extraer HEX). Un acento cálido de alto contraste reservado **solo** para el CTA de WhatsApp. |
| Tipografía | Sans-serif robusta, cuerpo ≥ 16 px. |
| Fotografía | Fotos reales del local por encima de cualquier imagen de banco. |
| Íconos | Uno por categoría, trazo simple y uniforme. |

**Componentes persistentes:** botón flotante de WhatsApp · indicador Abierto/Cerrado · dirección y horario en el pie.

**Anti-patrones prohibidos:** carrusel automático, ventanas emergentes, texto sobre foto sin capa de contraste, iconos sociales compitiendo con el CTA.

---

## 7. Requisitos no funcionales

| Requisito | Criterio |
|---|---|
| Peso inicial | **< 200 KB** — más estricto de lo habitual por la conectividad en Venezuela |
| Core Web Vitals | LCP < 2,5 s · INP < 200 ms · CLS < 0,1 en 4G |
| Imágenes | AVIF/WebP, carga diferida salvo la principal, dimensiones explícitas |
| Responsive | Móvil primero. Cortes en 360 / 768 / 1024 px. Sin scroll horizontal |
| Accesibilidad | **WCAG 2.2 AA** |
| SEO local | JSON-LD `HardwareStore` con horarios y coordenadas; metadatos por página; `sitemap.xml` |

**Criterios WCAG aplicados desde el diseño:**
- Contraste ≥ 4,5:1 — validar la paleta azul antes de aprobarla
- Objetivos táctiles de 44×44 px (uso con guantes, en obra)
- El botón flotante de WhatsApp no debe tapar el foco de teclado (2.4.11)
- Estado Abierto/Cerrado con **texto e icono**, nunca solo color (1.4.1)
- Sin scroll horizontal a 320 px ni al 400 % de zoom (1.4.10)

---

## 8. Fases de trabajo

| Fase | Contenido | Depende de |
|---|---|---|
| **1. Base** | Repositorio, Astro, estructura, tokens de diseño, layout | Colores del logo |
| **2. Maquetación** | Inicio y páginas internas con contenido real y fotos temporales | — |
| **3. Contenido** | Fotos definitivas, textos finales, historia | Drive del cliente |
| **4. CMS** | Decap, colección de promociones, alta del administrador | Fase 1 |
| **5. Verificación** | `accessibility-scan` / `-inspect` / `-audit`, skill `seo`, prueba en móvil real | Fase 3 |
| **6. Publicación** | Despliegue, DNS de GoDaddy → Netlify, verificación de HTTPS | Todas |

Las fases 1 y 2 pueden comenzar ya, usando marcadores de posición para logo y fotos.

---

## 9. Verificación

- `accessibility-scan` en cada plantilla → cero violaciones automáticas
- `accessibility-inspect` → recorrido completo por teclado, foco visible, reflujo a 320 px y 400 %
- `accessibility-audit` → conformidad WCAG 2.2 AA sobre las páginas muestreadas
- `seo` → validación del JSON-LD, metadatos y Core Web Vitals
- Prueba real en móvil con conexión limitada, no solo emulador
- Verificar que los enlaces `wa.me` abren WhatsApp con el mensaje contextual correcto

---

## 10. Pendientes

**Bloquean el diseño visual:**
1. Logotipo vectorial o PNG con transparencia — el JPG 1080×1080 no sirve para cabecera
2. Colores HEX (se extraen del logo)
3. Enlace de Drive con las fotografías

**Bloquean la publicación:**
4. Confirmar el reapuntado de DNS de GoDaddy a Netlify/Cloudflare
5. Crear la cuenta de GitHub y de Netlify del proyecto
6. Definir quién será el administrador externo (para darle acceso al CMS)

**Completan el contenido:**
7. Qué materiales se cortan a medida
8. Costo y cobertura de la entrega a domicilio
9. Teléfono fijo, cuando esté disponible
