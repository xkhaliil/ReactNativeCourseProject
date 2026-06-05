import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export const Onboarding: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  return (
    <View style={styles.container}>
      <Typography variant="title">OnBoarding</Typography>
      <Typography onPress={onDone}>Done</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
