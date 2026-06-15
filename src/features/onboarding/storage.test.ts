import AsyncStorage from "@react-native-async-storage/async-storage"

import { isOnboarded, setOnboarded } from "./storage"

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}))

describe("Onboarding storage", () => {
  const getItemMock = jest.mocked(AsyncStorage.getItem)
  const setItemMock = jest.mocked(AsyncStorage.setItem)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns false when onboarding has not been stored", async () => {
    getItemMock.mockResolvedValue(null)

    await expect(isOnboarded()).resolves.toBe(false)
    expect(getItemMock).toHaveBeenCalledWith("onboarding")
  })

  it("returns true when onboarding has been stored", async () => {
    getItemMock.mockResolvedValue("true")

    await expect(isOnboarded()).resolves.toBe(true)
  })

  it("persists the onboarding flag", async () => {
    setItemMock.mockResolvedValue()

    await setOnboarded()

    expect(setItemMock).toHaveBeenCalledWith("onboarding", "true")
  })
})
