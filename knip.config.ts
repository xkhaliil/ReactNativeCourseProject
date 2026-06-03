import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  // ignoreFiles: ["dist/**", "web-build/**"],
  ignoreDependencies: [
    "expo-modules-core",
    "expo-updates",
    "expo-notifications", // TODO: Temporary
  ],
  ignoreIssues: {
    "src/shared/**": ["exports", "types"],
  },
}

export default config
