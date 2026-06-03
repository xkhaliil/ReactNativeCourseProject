import { Stack } from "expo-router"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typegraphy"
import { colors, spacing } from "#design/foundations"
import { FavoriteEditForm, useFavorites } from "#features/favorites"

const App: React.FC = () => {
  const [editing, setEditing] = useState(false)

  const favorites = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <View style={styles.container}>
        {favorites.map((favorite) => (
          // TODO: List item with slide actions
          <Typography key={favorite.name} href={`/favorites/${favorite.id}`}>
            {favorite.name}
          </Typography>
        ))}

        <Icon
          style={styles.fab}
          name="add"
          size={32}
          color="white"
          onPress={() => setEditing(true)}
        />

        <FavoriteEditForm visible={editing} onClose={() => setEditing(false)} />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
