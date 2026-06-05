import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: ["src/features/onboarding/hooks.ts"],
  ignoreDependencies: [
    "expo-modules-core",
    "expo-updates",
    "expo-notifications", // Temporarily unused in dependency analysis
    "react-native-svg",
    "@storybook/react-native-ui-lite",
    "babel-loader",
  ],
  ignoreIssues: {
    "src/shared/**": ["exports", "types"],
  },
}

export default config
