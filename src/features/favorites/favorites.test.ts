import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  getFavorite,
  getFavorites,
  insertFavorite,
  updateFavorite,
} from "./favorites"

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}))

describe("Favorites storage", () => {
  const getItemMock = jest.mocked(AsyncStorage.getItem)
  const setItemMock = jest.mocked(AsyncStorage.setItem)

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it("returns an empty list when nothing is stored", async () => {
    getItemMock.mockResolvedValue(null)

    await expect(getFavorites()).resolves.toEqual([])
    expect(getItemMock).toHaveBeenCalledWith("favorites")
  })

  it("throws when a requested favorite does not exist", async () => {
    getItemMock.mockResolvedValue("[]")

    await expect(getFavorite("missing")).rejects.toThrow(
      "Unable to find favorite missing",
    )
  })

  it("inserts a new favorite and persists it", async () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5)
    getItemMock.mockResolvedValue(
      JSON.stringify([
        {
          id: "existing",
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        },
      ]),
    )
    setItemMock.mockResolvedValue()

    const inserted = await insertFavorite({
      name: "Reno",
      latitude: 39.5299,
      longitude: 119.8143,
    })

    expect(inserted).toEqual({
      id: "8",
      name: "Reno",
      latitude: 39.5299,
      longitude: 119.8143,
    })
    expect(setItemMock).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([
        {
          id: "existing",
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        },
        inserted,
      ]),
    )
  })

  it("updates an existing favorite and persists the replacement", async () => {
    getItemMock.mockResolvedValue(
      JSON.stringify([
        {
          id: "one",
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        },
        {
          id: "two",
          name: "Reno",
          latitude: 39.5299,
          longitude: 119.8143,
        },
      ]),
    )
    setItemMock.mockResolvedValue()

    const updated = await updateFavorite({
      id: "two",
      name: "Reno Updated",
      latitude: 39.5299,
      longitude: 119.8143,
    })

    expect(updated.name).toBe("Reno Updated")
    expect(setItemMock).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify([
        {
          id: "one",
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        },
        updated,
      ]),
    )
  })
})
