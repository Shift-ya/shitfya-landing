# shift.ya Landing

Landing page construida con Next.js 16, React 19 y Tailwind CSS 4.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel Analytics

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Iniciar entorno local:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Levantar build:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Estructura

- `app/layout.tsx`: layout raíz y metadata.
- `app/page.tsx`: compone la landing.
- `app/globals.css`: tokens globales, estilos base y utilidades de texto de marca.
- `components/`: secciones de la landing y componentes UI.
- `public/`: iconos, placeholders e imágenes.

## Secciones de la home

Actualmente la home renderiza:

- `Navbar`
- `Hero`
- `ValueProps`
- `Services`
- `Process`
- `Founders`
- `Testimonials`
- `Cta`
- `Footer`

La sección `Projects` existe pero está comentada en [app/page.tsx](/c:/Users/dante/Documents/shitfya-landing/app/page.tsx). (Actualizar en un futuro)

## Personalización rápida

Texto y branding:

- Logo en [components/navbar.tsx](/c:/Users/dante/Documents/shitfya-landing/components/navbar.tsx)
- Logo en [components/footer.tsx](/c:/Users/dante/Documents/shitfya-landing/components/footer.tsx)
- Hero principal en [components/hero.tsx](/c:/Users/dante/Documents/shitfya-landing/components/hero.tsx)

Paleta de texto de marca:

- Tokens y utilidades en [app/globals.css](/c:/Users/dante/Documents/shitfya-landing/app/globals.css)
- Clases agregadas:
  - `brand-text-gradient`
  - `brand-text-accent`
  - `brand-text-soft`

Contenido de secciones:

- [components/value-props.tsx](/c:/Users/dante/Documents/shitfya-landing/components/value-props.tsx)
- [components/services.tsx](/c:/Users/dante/Documents/shitfya-landing/components/services.tsx)
- [components/process.tsx](/c:/Users/dante/Documents/shitfya-landing/components/process.tsx)
- [components/founders.tsx](/c:/Users/dante/Documents/shitfya-landing/components/founders.tsx)
- [components/testimonials.tsx](/c:/Users/dante/Documents/shitfya-landing/components/testimonials.tsx)
- [components/cta.tsx](/c:/Users/dante/Documents/shitfya-landing/components/cta.tsx)

## Notas

- El proyecto usa aliases tipo `@/components/...`.
- Hay componentes UI adicionales en `components/ui/` que no necesariamente se usan en la landing actual.
