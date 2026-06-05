import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "onboarding"

export async function isOnboarded(): Promise<boolean> {
  const cached = await AsyncStorage.getItem(STORAGE_KEY)

  return !!cached
}

export async function setOnboarded(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true))
}
