import { cloneElement, useId } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export type FormGroupProps = {
  label: string
  children: React.ReactElement
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children: field }) => {
  const id = useId()

  return (
    <View style={styles.group}>
      <Typography nativeId={id} style={styles.label}>
        {label}
      </Typography>
      <View style={styles.value}>
        {cloneElement(field, {
          // @ts-expect-error Unknown element types
          accessibilityLabelledBy: id,
          accessibilityLabel: label,
        })}
      </View>
    </View>
  )
}

export default FormGroup

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
  },
})
