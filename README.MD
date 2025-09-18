# Expenses App

A simple cross‑platform expense tracking application built with Ionic React, TypeScript, Vite, and Capacitor.<br>
Add expenses with title, amount, category, and date, and view them in a clean, mobile‑friendly interface.

## Features

- Add and list expenses (title, amount, category, date)
- Responsive, mobile‑first UI with Ionic components
- Client‑side data persistence (via Preferences local storage)
- Runs in the browser and can be deployed to iOS/Android with Capacitor
- Unit and E2E testing setup (Vitest + Testing Library, Cypress)

## Tech Stack

- Ionic React 8, React 19, TypeScript
- Vite for tooling and builds
- Capacitor 7 for native platforms
- React Router 5
- Vitest, Testing Library, Cypress
- ESLint

## Prerequisites

- Node.js 18+ and npm
- Ionic CLI installed globally:
  ```bash
  npm install -g @ionic/cli
  ```
- For native builds (optional): Android Studio and/or Xcode

## Installation

From the project root:
```
npm install
```
## Run (Browser)

Use the Ionic CLI to serve the app locally:
```
ionic serve
```
The app will be available at:
- http://localhost:8100/

This command also watches for changes and live‑reloads the app.

## Build

- Development/production web assets (via Ionic CLI):
  ```
  ionic build
  ```
  Outputs to `app/dist`.

- Alternatively, using package scripts:
  ```bash
  npm run build
  ```
  Then preview the production build:
  ```bash
  npm run preview
  ```

## Scripts (inside `app`)

- `npm run dev` — Start Vite dev server
- `npm run build` — Type check and build for production
- `npm run preview` — Preview the production build locally
- `npm run test.unit` — Run unit tests (Vitest)
- `npm run test.e2e` — Run E2E tests (Cypress, headless)
- `npm run lint` — Lint with ESLint

## Project Structure (high level)

- `app/src/pages` — Screens
- `app/src/components` — Reusable UI components
- `app/src/data` — Client‑side data utilities
- `app/src/theme` — Ionic theme variables and styles
- `app/public` — Static assets
- `app/cypress` — E2E tests and configuration

## Testing

- Unit tests:
  ```bash
  npm run test.unit
  ```

- E2E tests:
  ```bash
  npm run test.e2e
  ```
  Interactive mode:
  ```bash
  npx cypress open
  ```

## Linting
```
bash
npm run lint
```
## Using Capacitor (Optional: iOS/Android)

1. Add a platform (once):
   ```bash
   npx cap add android
   npx cap add ios
   ```
2. After each web build, sync native projects:
   ```bash
   ionic build
   npx cap sync
   ```
3. Open in IDEs:
   ```bash
   npx cap open android
   npx cap open ios
   ```

## Deployment

- Web: Serve the `dist` folder with any static host (e.g., Netlify, Vercel, GitHub Pages).
- Mobile: Build native projects via Capacitor and distribute through the respective app stores.

## Troubleshooting

- If `ionic serve` doesn’t start, verify Node.js (18+) and that the Ionic CLI is installed.
- If dependencies change, re‑run:
  ```bash
  npm install
  ```
- After adding Capacitor plugins or changing native config, run:
  ```bash
  ionic build && npx cap sync
  ```
- For SPA routing on static hosts, ensure fallback to `index.html`.

## License

Add your license information here (e.g., MIT).
```
