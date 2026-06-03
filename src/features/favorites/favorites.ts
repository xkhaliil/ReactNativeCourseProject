import AsyncStorage from "@react-native-async-storage/async-storage"

import { type Favorite } from "./types"

const STORAGE_KEY = "favorites"

export async function getFavorites(): Promise<Favorite[]> {
  // await AsyncStorage.setItem(
  //   STORAGE_KEY,
  //   JSON.stringify([
  //     {
  //       id: Math.random().toString(16).slice(2),
  //       name: "Reno",
  //       latitude: 39.5299,
  //       longitude: 119.8143,
  //     },
  //     {
  //       id: Math.random().toString(16).slice(2),
  //       name: "Barcelona",
  //       latitude: 41.385063,
  //       longitude: 2.173404,
  //     },
  //   ]),
  // )

  const cached = await AsyncStorage.getItem(STORAGE_KEY)
  if (!cached) return []

  const favorites = JSON.parse(cached) as Favorite[]

  return favorites
}

export async function getFavorite(id: string): Promise<Favorite> {
  const favorites = await getFavorites()

  const favorite = favorites.find((favorite) => favorite.id === id)
  if (!favorite) throw new Error(`Unable to find favorite ${id}`)

  return favorite
}

export async function insertFavorite(
  favorite: Omit<Favorite, "id">,
): Promise<Favorite> {
  const favorites = await getFavorites()

  const fullFavorite = {
    id: Math.random().toString(16).slice(2),
    ...favorite,
  }

  await setFavorites([...favorites, fullFavorite])

  return fullFavorite
}

export async function updateFavorite(favorite: Favorite): Promise<Favorite> {
  const favorites = await getFavorites()

  const fullFavorite = {
    ...favorite,
  }

  await setFavorites(
    favorites.map((current) =>
      current.id === fullFavorite.id ? fullFavorite : current,
    ),
  )

  return fullFavorite
}

async function setFavorites(favorites: Favorite[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}
