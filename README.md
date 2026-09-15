# PokéGuess

PokéGuess is a bilingual Pokémon deduction game built with React, TypeScript, and Vite. Guess the mystery Pokémon and use independently evaluated clues—types, stats, generation, abilities, evolution data, and physical traits—to narrow down the answer.

## Features

- English and Simplified Chinese interface and search
- Autocomplete for Pokémon names in either language
- Order-independent type and ability matching
- Total and individual base-stat direction clues
- Branching-aware evolution-stage information
- Hidden abilities and localized PokéAPI names
- Ten guesses per round with answer reveal
- Win-streak tracking during the current browser session
- Responsive comparison cards for desktop and mobile
- In-memory detail caching and a persistent bilingual search index
- A bilingual National Pokédex drawer with combined search, generation, type, and special filters
- Lazy-loaded Pokémon details with an explicit “Use as Guess” action

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

No API key or environment file is required. The game reads public data from [PokéAPI](https://pokeapi.co/) and its public localization dataset.

## Available scripts

```bash
npm run dev        # Start the development server
npm run typecheck  # Run TypeScript checks
npm run lint       # Run ESLint
npm run build      # Create a production build
npm run preview    # Preview the production build
```

## Project structure

```text
src/
├── components/          Reusable React UI components
│   └── pokedex/         Pokédex drawer, filters, grid, cards, and details
├── game/                Deterministic comparison engine
├── services/            PokéAPI fetching, normalization, and caching
├── types/               Shared normalized TypeScript models
├── App.tsx              Round state and game flow
├── i18n.ts              English and Chinese presentation strings
└── styles.css           Responsive visual system
```

The comparison engine uses stable PokéAPI identifiers rather than translated display values. This keeps results deterministic and prepares the project for a future candidate filter or solver.

## Data and limitations

- The playable pool contains the first 1,025 default Pokémon.
- Alternate forms are not currently included.
- Habitat is omitted when PokéAPI does not supply it, which is common for newer Pokémon.
- The win streak resets after a missed round or a page refresh.
- An internet connection is required to load uncached Pokémon details.

Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, and The Pokémon Company. This is an unofficial fan project and is not affiliated with or endorsed by them.
