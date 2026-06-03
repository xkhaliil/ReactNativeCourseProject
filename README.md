# SkyCast

## About the project

SkyCast is a cross-platform mobile weather app built as a React Native course project. It shows current conditions and a multi-day forecast for your device location or saved cities, so you can check the weather at a glance without opening a browser or a separate service. Saved favorites persist on the device for quick return visits, and the settings area includes working examples of lists, device APIs, and notifications—patterns you can reuse when building real products that need location, feedback, and local data.

## Technical overview

The app is a TypeScript Expo project organized by **domain** (features and shared capabilities), not by technical layer. **File-based routing** in `src/app` stays thin: route files compose screens and import behavior from modlets. Weather data is fetched from the public Open-Meteo HTTP API; location, haptics, motion sensors, and local notifications use Expo modules. Favorites are stored with AsyncStorage. A small internal design system provides reusable UI primitives, and Jest tests cover components and weather helpers. GitHub Actions runs typecheck, lint, Knip, and tests on every push.

### Tech stack

- **Runtime:** React Native 0.85, React 19, Expo SDK 56
- **Navigation:** Expo Router (tabs, stack, drawer)
- **Language & tooling:** TypeScript, ESLint, Prettier, Knip
- **Testing:** Jest, jest-expo, React Native Testing Library
- **Build & deploy:** EAS Build (`eas.json`)
- **Persistence:** `@react-native-async-storage/async-storage`
- **Device APIs:** `expo-location`, `expo-haptics`, `expo-sensors`, `expo-notifications`
- **External services:** [Open-Meteo Forecast API](https://open-meteo.com/) (no API key required)

## Onboarding

### Prerequisites

- [Node.js](https://nodejs.org/) **24** (see `.nvmrc`; run `nvm use` if you use nvm)
- npm (included with Node)
- [Expo Go](https://expo.dev/go) on a device, or Android Studio / Xcode for emulators
- Optional: [EAS CLI](https://docs.expo.dev/build/setup/) for cloud builds (`npm install -g eas-cli`)

### Environment variables

No `.env` file is required for local development. Weather requests use public Open-Meteo endpoints with no authentication. Location, motion, and notification screens may prompt for OS permissions when opened in Expo Go or a dev build.

If you add secrets later (for example a geocoding API), use `EXPO_PUBLIC_*` variables as described in [Expo environment variables](https://docs.expo.dev/guides/environment-variables/). Do not commit `.env` files that contain API keys.

### Install and run

```bash
git clone https://github.com/xkhaliil/ReactNativeCourseProject.git
cd ReactNativeCourseProject
npm install
npm start
```

From the Expo dev server, press `a` (Android emulator), `i` (iOS simulator), or scan the QR code with Expo Go.

### Commands

| Command                  | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `npm start`              | Start Expo dev server (`expo start --clear`) |
| `npm run lint`           | Typecheck, ESLint, Prettier check, and Knip  |
| `npm run lint-typecheck` | TypeScript only (`tsc --noEmit`)             |
| `npm run test`           | Jest in watch mode                           |
| `npm run test:ci`        | Jest once with coverage (used in CI)         |
| `npm run build`          | EAS Android build (non-interactive)          |

### Before you push

```bash
npm run lint
npm run test:ci
```

CI (`.github/workflows/verify-and-build.yaml`) runs the same checks on push. EAS production builds are triggered manually via `workflow_dispatch`.

## Project structure

```
src/
  app/                    # Routes and layouts only (Expo Router)
    (tabs)/               # Home, Favorites, Settings
    _layout.tsx
  features/               # Domain features (e.g. favorites)
  shared/
    design/               # Design system
    device/               # Location, haptics, sensors, notifications
    weather/              # Forecast UI, hooks, API integration
    settings/             # App settings service
```

| Modlet alias  | Public entry                   | Example import          |
| ------------- | ------------------------------ | ----------------------- |
| `#features/*` | `src/features/*/index.ts`      | `#features/favorites`   |
| `#design/*`   | `src/shared/design/*/index.ts` | `#design/elements/Icon` |
| `#shared/*`   | `src/shared/*/index.ts`        | `#shared/weather`       |

Import from each module’s `index.ts` barrel—never from deep paths inside another feature or shared package.

### Course concepts in the codebase

| Concept                    | Location                                                     |
| -------------------------- | ------------------------------------------------------------ |
| File-based routing         | `src/app/(tabs)/`, `src/app/(tabs)/favorites/[id].tsx`       |
| Feature-based organization | `src/features/favorites/`                                    |
| Design system              | `src/shared/design/`                                         |
| Weather API                | `src/shared/weather/CurrentWeather.tsx`, `Forecast.tsx`      |
| Custom hooks               | `useCurrentLocation`, `useFavorites`, `useFavoriteMutations` |
| Local persistence          | `src/features/favorites/favorites.ts`                        |
| FlatList / SectionList     | `src/app/(tabs)/settings/flat-list.tsx`, `section-list.tsx`  |
| Device capabilities        | `src/shared/device/`                                         |
| Unit tests                 | `*.test.tsx` alongside components; `toWeather.test.tsx`      |

## Reminders

These constraints apply to this repo and match the course requirements:

- **All application code lives in `src`.** Assets and config (`app.json`, `eas.json`, etc.) stay at the project root; screens, features, and shared modules are under `src/`.
- **Routing is separate from application logic.** `src/app` defines navigation (tabs, stack, drawer) and thin screens. Business logic, storage, API calls, and reusable UI belong in `src/features` or `src/shared`, not in route files.
- **File-based routing** is used via Expo Router; route files map to URLs and layouts without mixing in domain rules.
- **Each course concept is represented in code** (see table above), including **automated tests** for design components, weather helpers, and weather UI.
- **Modlets** isolate modules: each feature or shared area exposes a public API through `index.ts`, imported via `#features/*`, `#design/*`, and `#shared/*` in `package.json`—not a single root alias for the whole app.
- **Domain / feature organization**, not layer-based: code is grouped by capability (`favorites`, `weather`, `device`) rather than by type (`components/`, `services/`, `hooks/` at the top level).
- **Explicit module boundaries:** consume `#shared/weather`, `#features/favorites`, `#design/elements/Card`, etc. Avoid excessive `..` relative imports and do not reach into another module’s internal files.

## Planned enhancements

- Compare weather across two saved cities side by side
- Historic weather data views
