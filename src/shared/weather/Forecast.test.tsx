import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"

describe("Weather > Forecast", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        daily: {
          time: ["2024-01-01", "2024-01-02"],
          temperature_2m_max: [25.3, 26.1],
          temperature_2m_min: [15.2, 16.0],
          weather_code: [0, 1],
        },
      }),
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("works", async () => {
    const { findAllByText } = render(
      <Forecast
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    await findAllByText(/[0-9]\.[0-9] C$/)
  })
})
