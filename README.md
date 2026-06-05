# SkyCast

SkyCast is an Expo-based React Native weather app focused on giving users a simple mobile experience for checking current weather conditions and forecast data for places they care about. The app supports location-aware weather lookup, saved favorite places, onboarding for first-time users, settings flows, and a component-driven UI that is structured for ongoing classroom or team development. In practice, the project is useful as both a usable weather application and a solid reference app for learning mobile product structure, async device APIs, persistent local state, and feature-based React Native organization.

At a high level, the app is built with Expo and React Native using Expo Router for navigation, a feature/shared folder structure, local persistence through AsyncStorage, and device integrations such as location, haptics, sensors, notifications, and orientation APIs. Weather data is fetched from the Open-Meteo API, while EAS is configured for Android cloud builds. Important parts of the stack include Expo `^56.0.8`, React Native `0.85.3`, Expo Router, AsyncStorage, Storybook for component development, Jest plus Testing Library for tests, ESLint, Prettier, Knip, and EAS Build.

## Onboarding

To get the app running as a new team member, first make sure you have Node installed. The repository includes an `.nvmrc` set to `24`, so using that Node version is the safest option. Then install dependencies and start the Expo development server:

```bash
npm install
npm run start
```

From there, open the app in an Android emulator, iOS simulator, Expo Go, or a connected device depending on your local setup. There are currently no required environment variables in this project, so you do not need a `.env` file to run the app locally. The app will request device permissions such as location when relevant features are used. Useful day-to-day commands are:

```bash
npm run lint
npm run test:ci
npm run storybook
npm run build
```

`npm run storybook` starts the app with Storybook enabled, and `npm run build` triggers the configured EAS Android build flow. If you change Storybook stories and need to refresh the generated story registry, run:

```bash
npm run storybook:generate
```
