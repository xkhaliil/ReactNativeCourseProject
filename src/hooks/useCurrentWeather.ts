import { useEffect, useState } from "react"

import toWeather, { type Weather } from "../toWeather"

type Location = {
  name: string
  latitude: number
  longitude: number
}

type CurrentWeatherData = {
  condition: Weather
  temperature: number
  wind: number
  humidity: number
  uv: number
}

export function useCurrentWeather(location: Location) {
  const [data, setData] = useState<CurrentWeatherData>()

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
      )
      const json = (await response.json()) as {
        current: {
          weather_code: number
          temperature_2m: number
          wind_speed_10m: number
          relative_humidity_2m: number
          uv_index: number
        }
      }

      setData({
        condition: toWeather(json.current.weather_code),
        temperature: json.current.temperature_2m,
        wind: json.current.wind_speed_10m,
        humidity: json.current.relative_humidity_2m,
        uv: json.current.uv_index,
      })
    })()
  }, [location])

  return data
}
