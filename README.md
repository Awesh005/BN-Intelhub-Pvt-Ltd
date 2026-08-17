# BN IntelHub Pvt Ltd Website
already updated 

Modern single-page marketing site for **BN IntelHub Pvt Ltd**, built with React, Vite, and Tailwind CSS. It showcases services, internships, company information, and provides contact and application forms integrated with Google Forms.

## Tech Stack

- **Framework**: React 19 + React Router
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4, custom UI components
- **Animations**: `motion` (Framer Motion-like API)
- **Icons**: `lucide-react`
- **Forms**: Google Forms (contact + internship applications)

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm / yarn)

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

The app will start on `http://localhost:3000` (or the next available port).

### Type checking

```bash
npm run lint
```

### Production build

```bash
npm run build
```

The optimized static files are output to the `dist` folder.

You can preview the production build locally with:

```bash
npm run preview
```

## Environment Variables

This project is a static frontend. Do not expose private API keys in `.env` for browser-side use.

If you later add AI or backend integrations, keep secrets on the server side and call them through a protected API route or backend service.

## Deployment

This is a static SPA; you can deploy the `dist` folder to:

- Vercel (React/Vite preset)
- Netlify (build command: `npm run build`, publish directory: `dist`)
- Any static hosting (S3 + CloudFront, Nginx, Apache, etc.)

Ensure that your hosting platform is configured to **serve `index.html` for unknown routes** (SPA fallback) so client-side routing (e.g., `/about`, `/services`, `/internships`) works correctly.

For Apache/Hostinger, deploy the built contents of `dist/` and keep the generated `.htaccess` file in the site root.

## Key Features

- Responsive, mobile-first layout
- Animated hero, sections, and cards
- Internship application modal integrated with Google Forms
- Contact form integrated with Google Forms
- Route-based code splitting for faster initial load
