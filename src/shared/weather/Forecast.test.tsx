import { render } from "@testing-library/react-native"

import { getForecast } from "./api"
import { Forecast } from "./Forecast"

jest.mock("./api", () => ({
  getForecast: jest.fn(),
}))

describe("Weather > Forecast", () => {
  it("works", async () => {
    jest.mocked(getForecast).mockResolvedValue([
      {
        day: "2026-06-05",
        temperatureMax: 28.3,
        temperatureMin: 18.1,
        condition: "Clear",
      },
      {
        day: "2026-06-06",
        temperatureMax: 26.7,
        temperatureMin: 17.4,
        condition: "Rain",
      },
    ])

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
    expect(getForecast).toHaveBeenCalledWith({
      name: "Barcelona",
      latitude: 41.385063,
      longitude: 2.173404,
    })
  })
})
