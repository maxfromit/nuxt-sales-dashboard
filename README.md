# nuxt-sales-dashboard

## description

Interactive analytics dashboard built with Nuxt 3 and TypeScript. This repository is a frontend test assignment and requires using Pinia for state management. The app visualizes sales data by category over a selectable period and uses a small server route that returns mock data for the UI.

## Tech stack

- Nuxt 3 (Composition API + TypeScript)
- Pinia
- ApexCharts (vue3-apexcharts)
- Lodash
- Zod (server-side query validation)
- @nuxt/ui / Tailwind for UI primitives

## How to run (recommended: pnpm)

Prerequisites: Node.js (LTS) and pnpm.

Install and run the dev server:

```bash
pnpm install
pnpm dev
```

Build / preview:

```bash
pnpm build
pnpm preview
```

## Project structure (high level)

- `pages/index.vue` — dashboard page that wires everything together
- `components/` — UI building blocks and chart wrapper (`ApexChart.vue`, `DashboardChart.*`, `DashboardStats.vue`, `DateRangePicker.vue`, `ThemeSettingsDropdown.vue`)
- `stores/sales.ts` — Pinia store: `fetchSales(range?)`, `sales`, `stats`, `loading`
- `server/api/sales.ts` — server route that validates query and returns `{ sales }`
- `server/utils/mockedServer.ts` — mock sales provider used by the route
- `types/index.ts` — shared types (`Sale`, `Range`)
- `utils/constants.ts` — small constants (locale, chart height)

## API contract

- GET /api/sales?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
  - Query validated via `zod` (ISO dates)
  - Response: `{ sales: Sale[] }`

Sale type (from `types/index.ts`):

If query parsing fails the server logs the issue and returns the full dataset (unfiltered).

## Features & implementation notes

- Date range filtering with predefined ranges (Today / Week / Month) and a calendar. Predefined ranges are clamped to today when appropriate.
- Charting: grouped by category, series are category sums per date; `ApexChart.vue` centralizes options and theme wiring.
- Metrics: total revenue, orders count, average check, unique users calculated in the store.
- Server route uses `zod` for robust query validation.

## Extra notes

- Theme & colors are editable via the gear menu and persist to `localStorage`. Secondary color is used sparingly.
- Calendar quick-buttons (today/week/month) become active when a manual selection matches them.
- Code is structured to be easily extended: chart wrapper, utility logic for card rounding, etc.
