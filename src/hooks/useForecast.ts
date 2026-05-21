import { useEffect, useState } from "react"

import toWeather, { type Weather } from "../toWeather"

type Location = {
  name: string
  latitude: number
  longitude: number
}

type ForecastDay = {
  day: string
  temperatureMax: number
  temperatureMin: number
  condition: Weather
}

export function useForecast(location: Location) {
  const [data, setData] = useState<ForecastDay[]>()

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      )
      const json = (await response.json()) as {
        daily: {
          time: string[]
          temperature_2m_max: number[]
          temperature_2m_min: number[]
          weather_code: number[]
        }
      }

      const forecast = []
      for (let i = 0; i < json.daily.time.length; i++) {
        forecast.push({
          day: json.daily.time[i],
          temperatureMax: json.daily.temperature_2m_max[i],
          temperatureMin: json.daily.temperature_2m_min[i],
          condition: toWeather(json.daily.weather_code[i]),
        })
      }

      setData(forecast)
    })()
  }, [location])

  return data
}
