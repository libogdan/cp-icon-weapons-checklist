# Cyberpunk 2077 Iconic Weapons Checklist

Checklist for every iconic weapon in Cyberpunk 2077 (base game, Phantom Liberty, bonus/promo items).
Progress is saved in the browser via localStorage.

Stack: React 19, TypeScript, Tailwind CSS v4, Vite.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Requires Node.js 20.19+ or 22.12+ (Vite 8 requirement).

## Deploy to GitHub Pages

1. Push this project to a GitHub repo (branch `main`).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

`vite.config.ts` uses `base: "./"`, so it works under any repo name without changes.

## Project structure

```
src/
  data/weapons.ts        all weapon data (edit here to add/fix entries)
  hooks/useOwned.ts      localStorage persistence, backup/restore, cross-tab sync
  components/            Hero, Toolbar, CategorySection, WeaponRow, Footer
  types.ts               shared types
  index.css              Tailwind import + color tokens (light/dark)
```

Weapon `id`s are the localStorage keys. Don't rename an existing id, or saved progress for it is lost.

## Data source

Based on RPG Site's iconic weapon guide (updated for 2.12 / Phantom Liberty).
No iconic weapons from updates 2.2 / 2.3 are included, because no reliable source listing any was found.
