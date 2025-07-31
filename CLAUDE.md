# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasySubs is a browser extension that helps users learn languages by watching movies and TV shows. It provides word translation, subtitle features, and integration with learning services like Anki, LinguaLeo, and Puzzle English. The extension supports multiple streaming platforms including YouTube, Netflix, KinoPub, and Coursera.

## Development Commands

- `pnpm build` - Build extension for Chrome (includes TypeScript check)
- `pnpm build:firefox` - Build extension for Firefox
- `pnpm dev` - Start development with hot reload and watch mode
- `pnpm dev:firefox` - Start Firefox development mode
- `pnpm test` - Run tests with Vitest
- `pnpm lint` - Run ESLint on TypeScript/JavaScript files
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm prettier` - Format code with Prettier

## Architecture

### State Management
Uses Effector for state management with these main models:
- `src/models/streamings/` - Current streaming service detection and management
- `src/models/settings/` - Extension settings and preferences
- `src/models/subs/` - Subtitle data and operations
- `src/models/translations/` - Translation data and caching
- `src/models/videos/` - Video player state and time tracking

### Browser Extension Structure
- `src/pages/content/` - Content scripts injected into streaming websites
- `src/pages/background/` - Service worker/background script
- `src/pages/popup/` - Extension popup interface
- `public/` - Static assets including manifest and localization files

### Streaming Service Integration
Each streaming service implements the `Service` interface defined in `src/streamings/service.ts`:
- `getSubs()` - Fetch subtitles for a language
- `getSubsContainer()` - DOM element for subtitle rendering
- `getSettingsButtonContainer()` - Where to inject settings button
- `getSettingsContentContainer()` - Where to render settings panel
- `isOnFlight()` - Check if service is live/streaming
- `init()` - Initialize service-specific functionality

### Component Architecture
- React components use TypeScript and SCSS for styling
- Main UI components: `Settings`, `Subs`, `ProgressBar`
- Uses React Draggable for moveable subtitles
- Tailwind CSS for utility classes

### Translation System
- Google Translate integration for word and phrase translation
- Batch and single word translation fetchers
- Phrasal verb detection and translation
- Export to learning services (Anki, LinguaLeo, Puzzle English)

### Build System
- Vite for bundling with custom plugins for manifest generation
- Separate builds for Chrome and Firefox
- Hot module replacement for development
- TypeScript compilation with strict checking

## Key Files to Understand
- `src/pages/content/main.tsx` - Main content script entry point that sets up streaming service detection and UI rendering
- `src/models/init.ts` - Initializes all Effector models
- `manifest.js` - Dynamic manifest generation for different browsers
- `vite.config.ts` - Build configuration with extension-specific plugins