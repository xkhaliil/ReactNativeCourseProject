# SkyCast

An Expo/React Native weather app for checking current conditions and forecasts for places you care about.

![TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)

## What it does

SkyCast is a mobile weather app built with Expo and Expo Router, structured into `features` (favorites, onboarding) and `shared` (design, device, settings, weather) modules. It supports location-aware weather lookup via `expo-location`, saves favorite places locally with `@react-native-async-storage/async-storage`, and includes a first-run onboarding flow and a settings screen. Device integrations include haptics, sensors, screen orientation, and notifications. Weather data is fetched from a remote API. <!-- TODO: confirm the specific weather data provider -->

## Tech stack

- **Framework:** Expo, Expo Router, React Native
- **UI/animation:** react-native-reanimated, react-native-gesture-handler, react-native-svg, @gorhom/bottom-sheet, react-native-screens, react-native-safe-area-context
- **Device APIs:** expo-location, expo-notifications, expo-sensors, expo-haptics, expo-screen-orientation, expo-constants, expo-font, expo-system-ui
- **Persistence:** @react-native-async-storage/async-storage
- **Component development:** Storybook (@storybook/react-native and on-device addons)
- **Testing:** Jest, @testing-library/react-native
- **Tooling:** ESLint (@christopherjbaker/eslint-config, eslint-plugin-expo), Prettier, Knip, TypeScript, EAS CLI

## Getting started

The repository pins Node via `.nvmrc` (version 24). Install dependencies and start the Expo dev server:

```bash
npm install
npm run start
```

Open the app in an Android emulator, iOS simulator, Expo Go, or a connected device. The app will request device permissions (e.g. location) when relevant features are used.

Other useful commands:

```bash
npm run lint         # typecheck, eslint, prettier check, and knip
npm run test         # jest in watch mode
npm run test:ci      # jest with coverage
npm run storybook    # start the app with Storybook enabled
npm run storybook:generate  # regenerate the Storybook story registry
npm run build        # eas build --platform android
```

<!-- TODO: add a screenshot -->

## License

No license file is present in this repository yet.
