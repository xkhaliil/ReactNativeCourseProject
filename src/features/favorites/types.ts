import { type WeatherLocation } from "#shared/weather"

export type Favorite = {
  id: string
} & WeatherLocation
