import FontAwesome from "@expo/vector-icons/FontAwesome"
import { StyleSheet } from "react-native"

export type IconProps = {
  name: keyof typeof icons
} & Omit<React.ComponentProps<typeof FontAwesome>, "name">

const icons = {
  add: "plus",
  close: "close",
  favorites: "star",
  home: "home",
  save: "save",
  settings: "gear",
} as const

const Icon: React.FC<IconProps> = ({ name, style, ...props }) => {
  return (
    <FontAwesome {...props} name={icons[name]} style={[styles.icon, style]} />
  )
}

export default Icon

const styles = StyleSheet.create({
  icon: {
    //
  },
})
