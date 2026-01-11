# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasySubs is a browser extension that helps users learn languages by watching movies and TV shows. It provides word translation, subtitle features, and integration with learning services like Anki, LinguaLeo, and Puzzle English.

**Supported streaming platforms:** YouTube, Netflix, KinoPub, Coursera, Amazon Prime Video, Plex, Udemy, Kinopoisk, Inoriginal

## Development Commands

- `pnpm build` - Build extension for Chrome (includes TypeScript check)
- `pnpm build:firefox` - Build extension for Firefox
- `pnpm dev` - Start development with hot reload and watch mode
- `pnpm dev:firefox` - Start Firefox development mode
- `pnpm test` - Run all tests with Vitest
- `pnpm test <pattern>` - Run tests matching pattern (e.g., `pnpm test translation`)
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm prettier` - Format code with Prettier

## Path Aliases

Configure in `vite.config.ts`, used throughout the codebase:
- `@src` → `src/`
- `@pages` → `src/pages/`
- `@assets` → `src/assets/`
- `@root` → project root

## Architecture

### State Management (Effector)
All state is managed via Effector stores and events in `src/models/`:
- `streamings/` - Current streaming service detection
- `settings/` - Extension settings and preferences
- `subs/` - Subtitle data and operations
- `translations/` - Translation data and caching
- `videos/` - Video player state and time tracking

Model initialization chain starts in `src/models/init.ts`.

### Browser Extension Structure
- `src/pages/content/` - Content scripts injected into streaming websites
- `src/pages/background/` - Service worker
- `src/pages/popup/` - Extension popup interface
- `public/` - Static assets including manifest and localization files

### Streaming Service Integration
Each streaming service in `src/streamings/` implements the `Service` interface from `src/streamings/service.ts`. To add a new streaming service:
1. Create a new file in `src/streamings/`
2. Implement the `Service` interface
3. Add URL patterns to `manifest.js` content_scripts matches
4. Register in `src/models/streamings/`

### Translation System
Multiple translation providers supported:
- Google Translate (default)
- DeepL
- Bing Translator
- Yandex Translate
- OpenAI

Export destinations: Anki (via AnkiConnect), LinguaLeo, Puzzle English

## Keyboard Shortcuts
- `A` - Previous subtitle
- `D` - Next subtitle
- `S` - Replay current subtitle
- `Alt+A/D` - Force navigation (ignores 5-second proximity check)

## Key Files
- `src/pages/content/main.tsx` - Content script entry point, sets up streaming detection and UI
- `src/models/init.ts` - Initializes all Effector models
- `manifest.js` - Dynamic manifest generation for Chrome/Firefox
- `src/utils/keyboardHandler.ts` - Keyboard shortcut handling