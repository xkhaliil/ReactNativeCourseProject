import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { OnboardingProvider } from "#features/onboarding"
import { SettingsProvider } from "#shared/settings"

const Layout: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <SettingsProvider>
        <OnboardingProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </OnboardingProvider>

        <StatusBar style="auto" />
      </SettingsProvider>
    </GestureHandlerRootView>
  )
}

export default Layout
