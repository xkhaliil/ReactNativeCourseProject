import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typegraphy"
import { spacing } from "#design/foundations"

import { getForecast, type ForecastData } from "./api"
import { type WeatherLocation } from "./types"

export const Forecast: React.FC<{
  location?: WeatherLocation
}> = ({ location }) => {
  const [data, setData] = useState<ForecastData>()

  useEffect(() => {
    void (async () => {
      if (!location) return

      const forecast = await getForecast(location)

      setData(forecast)
    })()
  }, [location])

  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Typography variant="large">
              {temperatureMax.toFixed(1)} C
            </Typography>
            <Typography variant="muted">
              {temperatureMin.toFixed(1)} C
            </Typography>
            <Typography variant="label">{condition}</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: spacing.between },
})
