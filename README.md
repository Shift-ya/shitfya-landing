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

## Agenda con Google Calendar real

La landing ya puede:

- Consultar disponibilidad real desde Google Calendar.
- Crear un evento real al confirmar la reunion.
- Enviar una notificacion interna a `helloshiftya@gmail.com`.

### 1. Crear service account en Google Cloud

1. Entra a Google Cloud Console.
2. Crea o elige un proyecto.
3. Activa la Google Calendar API.
4. Crea una Service Account.
5. Genera una clave JSON.

Del JSON vas a usar:

- `client_email` -> `GOOGLE_CLIENT_EMAIL`
- `private_key` -> `GOOGLE_PRIVATE_KEY`

### 2. Compartir el calendario con la service account

1. Abre el Google Calendar donde quieres recibir las reuniones.
2. Ve a `Configuracion y uso compartido`.
3. En `Compartir con personas y grupos`, agrega el `client_email` de la service account.
4. Dale permiso `Hacer cambios en eventos`.

El ID del calendario va en `GOOGLE_CALENDAR_ID`.

### 3. Configurar variables de entorno

Crea tu `.env.development` tomando como base `.env.example`.

Variables necesarias:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `MEETING_NOTIFICATION_EMAIL`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CALENDAR_TIMEZONE`

Notas:

- `GMAIL_APP_PASSWORD` debe ser una app password de Google, no la password normal.
- `GOOGLE_PRIVATE_KEY` debe conservar los saltos de linea como `\n`.
- `GOOGLE_CALENDAR_TIMEZONE` puede quedar en `America/Argentina/Buenos_Aires`.

### 4. Flujo actual

- El modal consulta `/api/meetings?date=YYYY-MM-DD` para mostrar solo slots libres.
- Al confirmar, `POST /api/meetings` vuelve a validar disponibilidad.
- Si el slot sigue libre, crea el evento en Google Calendar.
- Despues manda email interno a `helloshiftya@gmail.com` con el link del evento.

### 5. Probar localmente

```bash
npm run dev
```

Luego:

1. Abre la landing.
2. Haz click en `Agendar reunion`.
3. Selecciona una fecha libre.
4. Completa el formulario.
5. Confirma que se crea el evento en tu calendario y llega el correo.

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
