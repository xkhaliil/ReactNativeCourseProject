import { useCurrentRouteInfo, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Icon from "#design/elements/Icon"
import { colors, spacing } from "#design/foundations"
import { useFavoriteMutations } from "#features/favorites"

export const FavoriteEditForm: React.FC<{
  visible: boolean
  favoriteId?: string
  onClose: () => void
}> = ({ visible, favoriteId, onClose }) => {
  const router = useRouter()
  const route = useCurrentRouteInfo()

  const [favorite, updateFavorite] = useFavoriteMutations(favoriteId)

  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  useEffect(() => {
    if (!favorite) return

    setName(favorite.name)
    setLatitude(favorite.latitude.toString())
    setLongitude(favorite.longitude.toString())
  }, [favorite])

  function handleSave() {
    updateFavorite({
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    })

    if (route) router.replace(route?.pathnameWithParams)
    onClose()
  }

  if (!visible) return null

  return (
    <View style={styles.sheet}>
      <Icon
        style={styles.fab}
        name="close"
        size={32}
        color="white"
        onPress={() => onClose()}
      />

      <FormGroup label="Name">
        <TextField onChange={(value) => setName(value)} value={name} />
      </FormGroup>
      <FormGroup label="Latitude">
        <TextField onChange={(value) => setLatitude(value)} value={latitude} />
      </FormGroup>
      <FormGroup label="Longitude">
        <TextField
          onChange={(value) => setLongitude(value)}
          value={longitude}
        />
      </FormGroup>

      <Icon name="save" size={32} onPress={() => handleSave()} />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: colors.brand,
    borderRadius: 32,
    padding: 16,
    right: 16,
    bottom: 16,
  },
  sheet: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    padding: spacing.inside,
    borderTopColor: colors.brand,
    borderTopWidth: 1,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
