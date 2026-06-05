import { render } from "@testing-library/react-native"

import { getCurrent } from "./api"
import { CurrentWeather } from "./CurrentWeather"

jest.mock("./api", () => ({
  getCurrent: jest.fn(),
}))

describe("Weather > CurrentWeather", () => {
  it("works", async () => {
    jest.mocked(getCurrent).mockResolvedValue({
      condition: "Clear",
      temperature: 23.4,
      wind: 12,
      humidity: 65,
      uv: 5,
    })

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
    await findByText("23.4 C")
    expect(getCurrent).toHaveBeenCalledWith({
      name: "Barcelona",
      latitude: 41.385063,
      longitude: 2.173404,
    })
  })
})
