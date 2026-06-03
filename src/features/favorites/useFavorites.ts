import { useCallback, useEffect, useState } from "react"

import {
  getFavorite,
  getFavorites,
  insertFavorite,
  updateFavorite,
} from "./favorites"
import { type Favorite } from "./types"

export function useFavorites(): Favorite[] {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    void (async () => {
      const favorites = await getFavorites()
      setFavorites(favorites)
    })()
  }, [])

  return favorites
}

export function useFavorite(id?: string): Favorite | undefined {
  const [favorite, setFavorite] = useState<Favorite>()

  useEffect(() => {
    void (async () => {
      if (!id) return

      const favorite = await getFavorite(id)
      setFavorite(favorite)
    })()
  }, [id])

  return favorite
}

export function useFavoriteMutations(
  id?: string,
): [Favorite | undefined, (favorite: Omit<Favorite, "id">) => void] {
  const [favorite, setFavorite] = useState<Favorite>()

  useEffect(() => {
    void (async () => {
      if (!id) return

      const favorite = await getFavorite(id)
      setFavorite(favorite)
    })()
  }, [id])

  const upsert = useCallback(
    async (favorite: Omit<Favorite, "id">) => {
      if (typeof id === "undefined") {
        await insertFavorite(favorite)
      } else {
        await updateFavorite({ id, ...favorite })
      }
    },
    [id],
  )

  return [favorite, upsert]
}
