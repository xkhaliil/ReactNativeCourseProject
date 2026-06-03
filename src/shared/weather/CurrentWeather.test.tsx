import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"

describe("Weather > CurrentWeather", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        current: {
          weather_code: 0,
          temperature_2m: 20.5,
          wind_speed_10m: 10,
          relative_humidity_2m: 50,
          uv_index: 5,
        },
      }),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("works", async () => {
    const { findByText } = render(
      <CurrentWeather
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    await findByText("Barcelona")
  })
})
